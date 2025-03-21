import os
from dotenv import load_dotenv
from mistralai.client import MistralClient
from langgraph.prebuilt import ToolInvocation, ToolExecutor
# Load environment variables
load_dotenv()

# Set up API Key and Model
api_key = os.getenv("MISTRAL_API_KEY")
model = "mistral-large-latest"

# Initialize Mistral Client
client = MistralClient(api_key=api_key)
pdf_path = "C:\Users\Brava\OneDrive\Desktop\Base\MentalHealthAi\backend\American Psychiatric Association.pdf"
# Mistral Search Tool Class
class MistralSearchTool:
    def __init__(self, model: str = "mistral-medium"):
        self.model = model

    def search(self, query: str) -> str:
        response = client.chat(
            model=self.model,
            messages=[
                {
                    "role": "user",
                    "content": f"Extract text from the pdf.\n{pdf_path}",
                }
            ],
        )
        return response.choices[0].message.content

# Example Usage
if __name__ == "__main__":
    search_tool = MistralSearchTool(model=model)
    result = search_tool.search("Get me the text in summary format.")
    tool_executor = ToolExecutor([result])
    
