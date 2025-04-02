import os
import openai
import faiss
import numpy as np
from langchain.vectorstores import FAISS
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.chat_models import ChatOpenAI
from langchain.chains import RetrievalQA
from langchain.document_loaders import TextLoader
from langchain.text_splitter import CharacterTextSplitter

# Set up OpenAI API key
openai.api_key = "your_openai_api_key"

# Load and preprocess documents
def load_documents(file_path, question):
    loader = TextLoader(file_path)
    documents = loader.load()
    text_splitter = CharacterTextSplitter(chunk_size=500, chunk_overlap=100)
    texts = text_splitter.split_documents(documents)
    embeddings = OpenAIEmbeddings()
    vector_store = FAISS.from_documents(texts, embeddings)
    llm = ChatOpenAI(model_name="gpt-4", temperature=0)
    retriever = vector_store.as_retriever()
    qa_chain = RetrievalQA(llm=llm, retriever=retriever)
    return qa_chain.run(question)