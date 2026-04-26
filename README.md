# 🤖 Agente de Onboarding Inteligente

## Demo en Vivo
- **App:** [https://onboarding-agent-steel.vercel.app/](https://onboarding-agent-steel.vercel.app/)
- **API:** [https://onboarding-agent-zk4w.onrender.com/health](https://onboarding-agent-zk4w.onrender.com/health)

## Sobre el Proyecto
El Agente de Onboarding Inteligente es una solución AI diseñada para automatizar el proceso de onboarding de clientes. Procesa documentos en formato PDF o texto libre, extrae automáticamente datos estructurados, detecta documentación faltante y evalúa el estado del cliente.

Inspirationado por el caso de éxito de Customer Data Integration de Interinnova, donde el tiempo de incorporación se redujo de 3 meses a 3 días, esta solución lo hace en menos de un minuto.

## Funcionalidades
- **Procesamiento de PDFs y texto libre:** El agente puede procesar documentos tanto en formato PDF como texto plano.
- **Extracción automática de datos del cliente:** Extrae automáticamente información relevante del documento.
- **Detección de documentación presente y faltante:** Identifica qué documentos están presentes y cuáles faltan.
- **Score de completitud 0-100%:** Proporciona un puntaje que indica el nivel de completitud del proceso de onboarding.
- **Estado automático:** Evalúa automáticamente el estado del cliente como APROBADO, PENDIENTE o RECHAZADO.
- **Alertas y riesgos detectados por AI:** Identifica posibles alertas y riesgos durante el proceso.

## Stack Tecnológico
- **Backend:** Python + FastAPI
- **AI:** Groq API (Llama 3.3 70B)
- **Frontend:** React + Vite
- **Deploy:** Render + Vercel

## Setup Local

### Backend
1. Navega al directorio del backend:
   ```bash
   cd backend
   ```
2. Crea y activa un entorno virtual:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```
3. Instala las dependencias:
   ```bash
   pip install -r requirements.txt
   ```
4. Inicia el servidor:
   ```bash
   uvicorn main:app --reload
   ```

### Frontend
1. Navega al directorio del frontend:
   ```bash
   cd frontend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

## Endpoints API

### /health
- **Descripción:** Verifica si la API está en funcionamiento.
- **Método:** GET
- **Respuesta Exitosa:**
  ```json
  {
    "status": "ok",
    "message": "Onboarding Agent API running"
  }
  ```

### /process-text
- **Descripción:** Procesa un texto ingresado por el usuario.
- **Método:** POST
- **Parámetros:**
  - `text` (string): El texto a procesar.
- **Respuesta Exitosa:**
  ```json
  {
    "data": {...}
  }
  ```

### /process-pdf
- **Descripción:** Procesa un archivo PDF subido por el usuario.
- **Método:** POST
- **Parámetros:**
  - `file` (file): El archivo PDF a procesar.
- **Respuesta Exitosa:**
  ```json
  {
    "data": {...}
  }
  ```

## Contacto
Para cualquier consulta o colaboración, puedes contactarnos en [interinnova@example.com](mailto:interinnova@example.com).

---

Este README proporciona una descripción detallada del proyecto, sus funcionalidades, el stack tecnológico utilizado y las instrucciones para configurar el entorno local. También incluye información sobre los endpoints de la API y cómo interactuar con ellos.
