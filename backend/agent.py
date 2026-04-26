import os
from groq import Groq
from dotenv import load_dotenv
import json

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def process_document(text: str) -> dict:
    completion = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "system",
                "content": "You are an intelligent onboarding agent for a software consulting company. Analyze the provided document and extract structured information. Always respond in valid JSON format only, no extra text, no markdown, no backticks."
            },
            {
                "role": "user", 
                "content": f"Analyze this document and extract the following information in JSON format: datos_cliente (name, company, email, phone, cuit), servicio_requerido, documentacion (presente list, faltante list), alertas list, score_completitud integer 0-100, estado (APROBADO if >70, PENDIENTE if 40-70, RECHAZADO if below 40). Document: {text}"
            }
        ]
    )

    response_text = completion.choices[0].message.content
    return json.loads(response_text)
