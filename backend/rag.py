from langchain.text_splitter import CharacterTextSplitter
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import FAISS
from langchain.chat_models import ChatOpenAI
from langchain.chains import RetrievalQA

class TextProcessor:
    def __init__(self, input_text: str, chunk_size=500, chunk_overlap=100, model_name="gpt-4", temperature=0):
        self.input_text = input_text
        self.chunk_size = chunk_size
        self.chunk_overlap = chunk_overlap
        self.model_name = model_name
        self.temperature = temperature
        
        self._process_text()

    def _process_text(self):
        text_splitter = CharacterTextSplitter(chunk_size=self.chunk_size, chunk_overlap=self.chunk_overlap)
        texts = text_splitter.split_text(self.input_text)
        
        embeddings = OpenAIEmbeddings()
        vector_store = FAISS.from_texts(texts, embeddings)
        
        self.llm = ChatOpenAI(model_name=self.model_name, temperature=self.temperature)
        self.retriever = vector_store.as_retriever()
        self.qa_chain = RetrievalQA(llm=self.llm, retriever=self.retriever)
    
    def ask_question(self, question: str):
        return self.qa_chain.run(question)

# Example Usage:
# processor = TextProcessor("Your large input string here")
# answer = processor.ask_question("How is your day?")
# print(answer)

