from fastapi import FastAPI, Request
from google.adk.cli.fast_api import get_fast_api_app
from pydantic import BaseModel
from uuid import uuid4
import sys
import os

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from .agent import root_agent

app = FastAPI()
adk_app = get_fast_api_app(
    agent_dir=os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
    session_db_url="sqlite:///./sessions.db",
    allow_origins=["*"],
    web=True,
)
app.mount("/adk", adk_app)

# In-memory session store
session_messages = {}

class Message(BaseModel):
    text: str

# Register root_agent for ADK
app.agents = {"root_agent": root_agent}

@app.post("/api/sessions")
def create_session():
    session_id = str(uuid4())
    session_messages[session_id] = []
    return {"sessionId": session_id}

@app.post("/api/chat/{session_id}")
def send_message(session_id: str, message: Message):
    agent = app.agents["root_agent"]
    session_messages[session_id].append({"sender": "user", "text": message.text})
    response = agent.run(message.text, {})
    session_messages[session_id].append({"sender": "agent", "text": response["response"]})
    return {"response": response["response"]}

@app.get("/api/chat/{session_id}")
def get_chat_history(session_id: str):
    return session_messages.get(session_id, []) 