# main.py
import os
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from google.adk.cli.fast_api import get_fast_api_app

# The AGENT_DIR will be the root of your project, where main.py is located.
# get_fast_api_app will scan this directory for agent modules (agentlab_v1, agentlab_v2, etc.)
AGENT_DIR = os.path.dirname(os.path.abspath(__file__))

# Configuration for the ADK FastAPI app
# You might adjust SESSION_DB_URL if you want a persistent DB outside the container later
SESSION_DB_URL = "sqlite:///./sessions.db"  # Default SQLite DB in the current directory
ALLOWED_ORIGINS = ["http://localhost:3000"]  # Allow React dev server
SERVE_WEB_INTERFACE = True # This ensures the ADK Web UI is served

# Get the FastAPI application instance from ADK
app: FastAPI = get_fast_api_app(
    agent_dir=AGENT_DIR,
    session_db_url=SESSION_DB_URL,
    allow_origins=ALLOWED_ORIGINS,
    web=SERVE_WEB_INTERFACE,
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define API endpoints
@app.post("/api/chat/{session_id}")
async def send_message(session_id: str, message: dict):
    # Handle sending message to agent
    return {"status": "Message sent", "session_id": session_id}

@app.get("/api/status/{session_id}")
async def get_status(session_id: str):
    # Retrieve current agent status
    return {"status": "active", "agent": "VentureBot"}

@app.post("/api/sessions")
async def create_session():
    # Create a new session
    return {"session_id": "new_session_id"}

# You can add custom FastAPI routes here if needed in the future
# @app.get("/custom-hello")
# async def read_custom_hello():
#     return {"message": "Hello from custom route"}

if __name__ == "__main__":
    # This block is for running locally, e.g., python main.py
    # The Dockerfile CMD will run uvicorn directly.
    # The PORT environment variable is used here for consistency with container environments.
    port = int(os.environ.get("PORT", 80)) # Default to port 80
    uvicorn.run(app, host="0.0.0.0", port=port) 