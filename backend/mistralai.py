import os
from dotenv import load_dotenv
from mistralai.client import MistralClient

# Load environment variables
load_dotenv()

# Set up API Key and Model
api_key = os.getenv("MISTRAL_API_KEY")
model = "mistral-large-latest"

# Initialize Mistral Client
client = MistralClient(api_key=api_key)

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
                    "content": f"Perform a web-style search and summarize key results for: {query}",
                }
            ],
        )
        return response.choices[0].message.content

# Example Usage
if __name__ == "__main__":
    search_tool = MistralSearchTool(model=model)
    result = search_tool.search("Latest advancements in AI")
    print("Search Result:", result)

    # Another direct chat example
    chat_response = client.chat(
        model=model,
        messages=[
            {
                "role": "user",
                "content": "What is the best French cheese?",
            }
        ],
    )
    print("Chat Response:", chat_response.choices[0].message.content)
