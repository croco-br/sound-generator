from fastapi import Body, FastAPI
from fastapi.templating import Jinja2Templates
from fastapi.responses import FileResponse, HTMLResponse, JSONResponse
from fastapi.requests import Request
from fastapi.staticfiles import StaticFiles

from app.engine import generate


app = FastAPI()

templates = Jinja2Templates(directory="app/templates")
app.mount("/static", StaticFiles(directory="app/static"), name="static")


@app.get("/", response_class=HTMLResponse)
async def index(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@app.post("/generate", response_class=JSONResponse)
async def calculate(data: dict = Body(...)):

    # Generate the sound and get the filename
    filename = generate(
        data.get("frequency"), data.get("duration"), data.get("sample_rate")
    )

    # Return the file as a response for download
    return FileResponse(filename, media_type="audio/wav", filename=filename)
