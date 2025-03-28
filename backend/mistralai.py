from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain.llms import OpenAI
from langchain.agents import initialize_agent, Tool, AgentType

import requests
from PIL import Image
import pytesseract

# Function for OCR processing
def extract_text_from_image(image_path: str) -> str:
    """
    Extracts text from an image using Tesseract OCR.
    """
    image = Image.open(image_path)
    text = pytesseract.image_to_string(image)
    return text

# Function to call Mistral API for processing the extracted text
def call_mistral_api(text: str) -> str:
    """
    Call the Mistral API to process the extracted text and return the response.
    """
    url = 'https://api.mistral.ai/v1/complete'
    headers = {
        'Authorization': 'Bearer YOUR_MISTRAL_API_KEY',  # Replace with your Mistral API key
        'Content-Type': 'application/json'
    }
    data = {
        "prompt": text,
        "max_tokens": 100,
        "temperature": 0.7
    }

    response = requests.post(url, json=data, headers=headers)
    
    if response.status_code == 200:
        return response.json().get('choices')[0].get('text')
    else:
        return f"Error: {response.status_code}"

# Function to search the Table of Contents (ToC)
def search_toc(toc_text, query):
    """
    Searches the extracted Table of Contents text for the query.
    """
    results = []
    lines = toc_text.split("\n")
    for line in lines:
        if query.lower() in line.lower():
            results.append(line.strip())
    return results

# Tool for OCR processing
ocr_tool = Tool(
    name="OCR",
    func=extract_text_from_image,
    description="Extract text from images using OCR"
)

# Tool for Mistral API processing
mistral_tool = Tool(
    name="Mistral",
    func=call_mistral_api,
    description="Use Mistral API to process extracted text"
)

# Set up LangChain with both OCR and Mistral tools
tools = [ocr_tool, mistral_tool]

# Initialize LangChain agent
agent = initialize_agent(
    tools,
    agent_type=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    llm=OpenAI(),
    verbose=True
)

# Example flow: Extract text from an image and search Table of Contents
image_path = "path_to_your_image.png"  # Replace with your image path
toc_text = extract_text_from_image(image_path)

# Now use LangChain agent to process the OCR extracted text (which is the ToC)
search_query = "Chapter 3"  # Example query to search for "Chapter 3"
toc_search_results = search_toc(toc_text, search_query)

if toc_search_results:
    print(f"Found entries in the Table of Contents: {toc_search_results}")
    # You can use the results here to make further API calls or process with Mistral API
    for result in toc_search_results:
        # Call Mistral API on the relevant chapter or section of the ToC
        mistral_response = call_mistral_api(result)
        print(f"Mistral Processed Result for {result}: {mistral_response}")
else:
    print(f"No results found for '{search_query}' in the Table of Contents.")
