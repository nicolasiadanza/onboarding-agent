from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from agent import process_document
from pdf_reader import extract_text_from_pdf

app = FastAPI(title="Onboarding Agent API")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create Pydantic model
class TextInput(BaseModel):
    text: str

# Endpoint 1: GET /health
@app.get("/health")
async def health_check():
    return {"status": "ok", "message": "Onboarding Agent API running"}

# Endpoint 2: POST /process-text
@app.post("/process-text")
async def process_text(input: TextInput):
    try:
        result = process_document(input.text)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Endpoint 3: POST /process-pdf
@app.post("/process-pdf")
async def process_pdf(file: UploadFile = File(...)):
    try:
        file_bytes = await file.read()
        text = extract_text_from_pdf(file_bytes)
        if not text:
            raise HTTPException(status_code=400, detail="Could not extract text from PDF")
        result = process_document(text)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
