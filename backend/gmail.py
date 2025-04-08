import base64
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from typing import Any, Dict, List, Optional, Type, Union
import os

from langchain_core.callbacks import CallbackManagerForToolRun
from pydantic import BaseModel, Field
from langchain_community.tools.gmail.base import GmailBaseTool

# Example utility for Gmail auth – replace this with your actual implementation
from googleapiclient.discovery import build
from google.oauth2.credentials import Credentials  # Assuming you're using OAuth

API_KEY = os.getenv("GMAIL_API_KEY")

def get_authenticated_gmail_service() -> Any:
    creds = Credentials.from_authorized_user_file("token.json", ["https://www.googleapis.com/auth/gmail.send"])
    return build("gmail", "v1", credentials=creds)


class SendMessageSchema(BaseModel):
    """Input schema for GmailSendMessage."""
    message: str = Field(..., description="The message to send.")
    to: Union[str, List[str]] = Field(..., description="The list of recipients.")
    subject: str = Field(..., description="The subject of the message.")
    cc: Optional[Union[str, List[str]]] = Field(None, description="The list of CC recipients.")
    bcc: Optional[Union[str, List[str]]] = Field(None, description="The list of BCC recipients.")


class GmailSendMessage(GmailBaseTool):  # type: ignore[override]
    name: str = "send_gmail_message"
    description: str = "Use this tool to send email messages. Input includes message, recipients, and subject."
    args_schema: Type[SendMessageSchema] = SendMessageSchema

    def __init__(self, api_resource: Optional[Any] = None, **kwargs):
        super().__init__(**kwargs)
        self.api_resource = api_resource or get_authenticated_gmail_service()

    def _prepare_message(
        self,
        message: str,
        to: Union[str, List[str]],
        subject: str,
        cc: Optional[Union[str, List[str]]] = None,
        bcc: Optional[Union[str, List[str]]] = None,
    ) -> Dict[str, Any]:
        """Create a MIME message and encode it for Gmail API."""
        mime_message = MIMEMultipart()
        mime_message.attach(MIMEText(message, "html"))

        mime_message["To"] = ", ".join(to if isinstance(to, list) else [to])
        mime_message["Subject"] = subject
        if cc:
            mime_message["Cc"] = ", ".join(cc if isinstance(cc, list) else [cc])
        if bcc:
            mime_message["Bcc"] = ", ".join(bcc if isinstance(bcc, list) else [bcc])

        encoded_message = base64.urlsafe_b64encode(mime_message.as_bytes()).decode()
        return {"raw": encoded_message}

    def _run(
        self,
        message: str,
        to: Union[str, List[str]],
        subject: str,
        cc: Optional[Union[str, List[str]]] = None,
        bcc: Optional[Union[str, List[str]]] = None,
        run_manager: Optional[CallbackManagerForToolRun] = None,
    ) -> str:
        """Send the email using Gmail API."""
        try:
            create_message = self._prepare_message(message, to, subject, cc=cc, bcc=bcc)
            send_message = (
                self.api_resource.users()
                .messages()
                .send(userId="me", body=create_message)
            )
            sent_message = send_message.execute()
            return f"Message sent. Message Id: {sent_message['id']}"
        except Exception as error:
            raise Exception(f"An error occurred while sending email: {error}")
