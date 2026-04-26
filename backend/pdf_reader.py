import fitz  # PyMuPDF

def extract_text_from_pdf(file_bytes: bytes) -> str:
    try:
        document = fitz.open(stream=file_bytes, filetype="pdf")
        text = ""
        for page_num in range(len(document)):
            page = document.load_page(page_num)
            text += page.get_text() + "\n"
        return text
    except Exception as e:
        print(f"Error extracting text from PDF: {e}")
        return ""
