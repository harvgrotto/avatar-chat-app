from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import openai
import os
from dotenv import load_dotenv

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

app = FastAPI()

# 👇 Add this to allow frontend to talk to backend
origins = [
    "https://https://https://avatar-chat-hen9izjpo-james-projects-65c1adad.vercel.app",  # your deployed Vercel URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # or ["*"] for all domains during testing
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
async def chat(req: ChatRequest):
    try:
        response = openai.ChatCompletion.create(
            model="gpt-4",  # or "gpt-3.5-turbo"
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": req.message}
            ]
        )
        return {"reply": response.choices[0].message["content"]}
    except Exception as e:
        return {"reply": f"Error: {str(e)}"}
