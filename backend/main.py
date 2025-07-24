from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import openai
import os
from dotenv import load_dotenv

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

app = FastAPI()

# 💡 Replace this with your actual deployed frontend URL
origins = [
    "https://avatar-chat-app-puce.vercel.app",
    "https://avatar-chat-app-git-main-james-projects-65c1adad.vercel.app",
    "http://localhost:3000",  # (optional for local testing)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,     # 👈 must match exactly
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
async def chat(req: ChatRequest):
    try:
        response = client.chat.completions.create(  # ✅ new syntax
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": req.message}
            ]
        )
        return {"reply": response.choices[0].message.content}  # ✅ new access method
    except Exception as e:
        return {"reply": f"Error: {str(e)}"}
