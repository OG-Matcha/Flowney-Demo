from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from app import schemas
from utils.analyze import AnalyzeGenerator

llm = APIRouter()

@llm.post("/api/analyze", tags=["Analyze"])
async def analyze(info: schemas.PersonalInfo):
    generator = AnalyzeGenerator()
    result = generator.start_process(info.gender, info.income)
    return StreamingResponse(result, media_type="text/plain")