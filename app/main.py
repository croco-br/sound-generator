from fastapi import Body, FastAPI, HTTPException
from fastapi.templating import Jinja2Templates
from fastapi.responses import (
    FileResponse,
    HTMLResponse,
    JSONResponse,
    StreamingResponse,
)
from fastapi.requests import Request
from fastapi.staticfiles import StaticFiles

from app.engine import generate_audio


app = FastAPI()

templates = Jinja2Templates(directory="app/templates")
app.mount("/static", StaticFiles(directory="app/static"), name="static")


@app.get("/", response_class=HTMLResponse)
async def index(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.get("/frequencies", response_class=HTMLResponse)
async def render_tab2(request: Request):
    return templates.TemplateResponse("frequencies.html", {"request": request})


@app.get("/audio/{note_name}")
async def get_audio(note_name: str):
    audio_buffer = generate_audio(note_name)
    if audio_buffer is None:
        raise HTTPException(status_code=404, detail="Note not found")

    return StreamingResponse(audio_buffer, media_type="audio/wav")
