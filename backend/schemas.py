from pydantic import BaseModel
from datetime import datetime

class URLCreate(BaseModel):
    original_url: str

class URLResponse(BaseModel):
    original_url: str
    short_code: str
    created_at: datetime
    click_count: int

    class Config:
        from_attributes = True
        