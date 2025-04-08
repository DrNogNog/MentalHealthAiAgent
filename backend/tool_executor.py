from langchain_anthropic import ChatAnthropic
from langchain_core.messages import HumanMessage
from langgraph.checkpoint.memory import MemorySaver
from langgraph.prebuilt import create_react_agent
from gmail import GmailSendMessage
from rag import TextProcessor

#ping the route for response
import requests
url = "http://127.0.0.1:5000/api/data"
response = requests.get(url)

processor = TextProcessor("Your large input string here")
answer_tool = processor.ask_question("How is your day?")
# Create the agent
memory = MemorySaver()
model = ChatAnthropic(model_name="claude-3-sonnet-20240229")
tools =[answer_tool, GmailSendMessage()]
agent_executor = create_react_agent(model, tools, checkpointer=memory)
# Use the agent
config = {"configurable": {"thread_id": "abc123"}}
for step in agent_executor.stream(
    {"messages": [HumanMessage(content=f"You are a psychiatrist please diagnose a patient with this response: {response}")]},
    config,
    stream_mode="values",
):
    step["messages"][-1].pretty_print()


# import pyTigerGraph as tg

# conn = tg.TigerGraphConnection(host="DATABASE_HOST_HERE", graphname="GRAPH_NAME_HERE", username="USERNAME_HERE", password="PASSWORD_HERE")
# conn.ai.configureInquiryAIHost("INQUIRYAI_HOST_HERE")

# from langchain_community.graphs import TigerGraph

# graph = TigerGraph(conn)
# result = graph.query("How many servers are there?")
# print(result)
