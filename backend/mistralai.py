from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain.llms import OpenAI
from langchain.agents import initialize_agent, Tool, AgentType

import requests
from PIL import Image
import pytesseract

# Function to search the Table of Contents (ToC)
def rag_tool(toc_text, query):
    """
    """

# Tool for Mistral API processing
rag_tool = Tool(
    name="Rag Tool",
    func=rag_tool,
    description="Use tokenization to implement rag"
)

# Set up LangChain with both OCR and Mistral tools
tools = [rag_tool]

# Initialize LangChain agent
agent = initialize_agent(
    tools,
    agent_type=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    llm=OpenAI(),
    verbose=True
)

