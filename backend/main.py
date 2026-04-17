from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
import shortuuid

from database import engine, get_db
from models import Base, URL
from schemas import URLCreate, URLResponse

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_methods=['*'],
    allow_headers=['*'],
)

@app.post('/api/shorten', response_model=URLResponse)
def shorten_url(payload: URLCreate, db: Session=Depends(get_db)):
    existing_url = db.query(URL).filter(URL.original_url == payload.original_url).first()
    
    if existing_url:
        return URLResponse(
          original_url=existing_url.original_url,
          short_code=existing_url.short_code,
        )
    
    short_code = shortuuid.ShortUUID().random(length=6)
    url_entry = URL(original_url=payload.original_url, short_code=short_code)
    db.add(url_entry)
    db.commit()
    db.refresh(url_entry)
    return url_entry

@app.get('/api/{short_code}')
def redirect_url(short_code: str, db: Session=Depends(get_db)):
    
    url_entry = db.query(URL).filter(URL.short_code == short_code).first()
    
    if not url_entry:
        raise HTTPException(status_code=404, detail='URL not found')
    
    url_entry.click_count += 1
    db.commit()
    return RedirectResponse(url=url_entry.original_url)

@app.get('/api/stats/{short_code}', response_model=URLResponse)
def get_stats(short_code: str, db: Session=Depends(get_db)):
    
    url_entry = db.query(URL).filter(URL.short_code == short_code).first()
    
    if not url_entry:
        raise HTTPException(status_code=404, detail='URL not found')
    return url_entry

@app.get('/api/all/urls', response_model=list[URLResponse])
def get_all_urls(db: Session=Depends(get_db)):
    
    urls = db.query(URL).order_by(URL.created_at.desc()).all()

    return urls
