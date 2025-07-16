from fastapi import FastAPI
from pydantic import BaseModel
import openai
import os
from dotenv import load_dotenv

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

app = FastAPI()

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
async def chat(req: ChatRequest):
    try:
        response = openai.ChatCompletion.create(
            model="gpt-4",  # or "gpt-3.5-turbo" if you don't have GPT-4 access
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": req.message}
            ]
        )
        return {"reply": response.choices[0].message["content"]}
    except Exception as e:
        return {"reply": f"Error: {str(e)}"}
