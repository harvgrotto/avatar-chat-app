
# Avatar Chat App

This is a starter project for an interactive avatar app with:
- Text + voice input
- D-ID WebSDK avatar output
- OpenAI GPT backend (FastAPI)

## Prerequisites

- Python 3.10+
- Node.js + npm
- OpenAI API key
- D-ID API key and Avatar ID

## Setup (Mac Instructions)

### Backend

```
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# edit .env and add your OPENAI_API_KEY
uvicorn main:app --reload --port 8000
```

### Frontend

```
cd frontend
cp .env.example .env
# edit .env and add your D-ID keys
npm install
npm start
```

App runs at: http://localhost:3000
Backend at: http://localhost:8000
