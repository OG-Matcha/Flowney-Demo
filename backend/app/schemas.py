from pydantic import BaseModel

class PersonalInfo(BaseModel):
    gender: str
    income: str

    class Config:
        from_attributes = True