from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String, Boolean
from sqlalchemy.orm import declarative_base, sessionmaker, Session
from typing import List, Optional

app = FastAPI(title="Glamora Photography API")

# Setup CORS to allow frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Database Setup ---
DATABASE_URL = "sqlite:///./glamora.db"
# check_same_thread is needed for SQLite
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# --- Database Models (SQLAlchemy) ---
class Shoot(Base):
    __tablename__ = "shoots"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    size = Column(String)
    img_url = Column(String)

class PricingPlan(Base):
    __tablename__ = "pricing_plans"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    price = Column(String)
    features = Column(String) # We'll store it as a comma-separated string for simplicity
    popular = Column(Boolean, default=False)

# Create tables
Base.metadata.create_all(bind=engine)

# --- Pydantic Schemas (for Validation & Responses) ---
class ShootBase(BaseModel):
    title: str
    size: str
    img_url: str

class ShootCreate(ShootBase):
    pass

class ShootResponse(ShootBase):
    id: int

    model_config = {
        "from_attributes": True,
        "orm_mode": True
    }

class PricingPlanBase(BaseModel):
    name: str
    price: str
    features: List[str]
    popular: bool = False

class PricingPlanCreate(PricingPlanBase):
    pass

class PricingPlanResponse(PricingPlanBase):
    id: int

    model_config = {
        "from_attributes": True,
        "orm_mode": True
    }

# --- Dependencies ---
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --- Initial Data Seed ---
def seed_data(db: Session):
    if db.query(Shoot).count() == 0:
        initial_shoots = [
            {"title": "WEDDING DAY", "size": "col-span-1 sm:col-span-2 row-span-1", "img_url": "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"},
            {"title": "MATERNITY", "size": "col-span-1 row-span-1", "img_url": "https://images.unsplash.com/photo-1559599101-f09722fb4948?auto=format&fit=crop&w=800&q=80"},
            {"title": "FAMILY", "size": "col-span-1 row-span-1 sm:row-span-2", "img_url": "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=800&q=80"},
            {"title": "COUPLE", "size": "col-span-1 row-span-1", "img_url": "https://images.unsplash.com/photo-1475688621402-4257c812d6db?auto=format&fit=crop&w=800&q=80"},
            {"title": "STUDIO", "size": "col-span-1 row-span-1", "img_url": "https://images.unsplash.com/photo-1520390138845-fd2d229dd553?auto=format&fit=crop&w=800&q=80"},
            {"title": "PORTRAIT", "size": "col-span-1 row-span-1", "img_url": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"},
        ]
        for shoot in initial_shoots:
            db.add(Shoot(**shoot))
            
    if db.query(PricingPlan).count() == 0:
        initial_plans = [
            {"name": "LIGHT", "price": "$250", "features": "1 Hour session,15 Retouched photos,Online gallery,Personal usage rights", "popular": False},
            {"name": "STANDARD", "price": "$500", "features": "2 Hour session,30 Retouched photos,Makeup artist included,Print-ready files", "popular": True},
            {"name": "PREMIUM", "price": "$850", "features": "4 Hour session,60 Retouched photos,Video highlights,Physical photo album", "popular": False},
            {"name": "ALL INCLUSIVE", "price": "$1500", "features": "Full day session,Unlimited retouched photos,Custom location scouting,Express 48h delivery", "popular": False},
        ]
        for plan in initial_plans:
            db.add(PricingPlan(**plan))
    db.commit()

# --- App Lifecycle ---
# This is valid in newer FastAPI versions.
@app.on_event("startup")
def startup_event():
    db = SessionLocal()
    seed_data(db)
    db.close()

# --- API Endpoints: Shoots ---
@app.get("/api/shoots", response_model=List[ShootResponse])
def get_shoots(db: Session = Depends(get_db)):
    return db.query(Shoot).all()

@app.post("/api/shoots", response_model=ShootResponse)
def create_shoot(shoot: ShootCreate, db: Session = Depends(get_db)):
    shoot_data = shoot.model_dump() if hasattr(shoot, "model_dump") else shoot.dict()
    db_shoot = Shoot(**shoot_data)
    db.add(db_shoot)
    db.commit()
    db.refresh(db_shoot)
    return db_shoot

@app.put("/api/shoots/{shoot_id}", response_model=ShootResponse)
def update_shoot(shoot_id: int, shoot: ShootCreate, db: Session = Depends(get_db)):
    db_shoot = db.query(Shoot).filter(Shoot.id == shoot_id).first()
    if not db_shoot:
        raise HTTPException(status_code=404, detail="Shoot not found")
    
    shoot_data = shoot.model_dump() if hasattr(shoot, "model_dump") else shoot.dict()
    for key, value in shoot_data.items():
        setattr(db_shoot, key, value)
    
    db.commit()
    db.refresh(db_shoot)
    return db_shoot

@app.delete("/api/shoots/{shoot_id}")
def delete_shoot(shoot_id: int, db: Session = Depends(get_db)):
    db_shoot = db.query(Shoot).filter(Shoot.id == shoot_id).first()
    if not db_shoot:
        raise HTTPException(status_code=404, detail="Shoot not found")
    db.delete(db_shoot)
    db.commit()
    return {"message": "Shoot deleted"}

# --- API Endpoints: Pricing Plans ---
@app.get("/api/pricing-plans", response_model=List[PricingPlanResponse])
def get_pricing_plans(db: Session = Depends(get_db)):
    plans = db.query(PricingPlan).all()
    # Map back CSV strings to lists of features
    response_plans = []
    for plan in plans:
        plan_dict = {
            "id": plan.id,
            "name": plan.name,
            "price": plan.price,
            "features": plan.features.split(",") if plan.features else [],
            "popular": plan.popular
        }
        response_plans.append(plan_dict)
    return response_plans

@app.post("/api/pricing-plans", response_model=PricingPlanResponse)
def create_pricing_plan(plan: PricingPlanCreate, db: Session = Depends(get_db)):
    plan_data = plan.model_dump() if hasattr(plan, "model_dump") else plan.dict()
    db_plan_data = plan_data.copy()
    db_plan_data["features"] = ",".join(plan_data["features"])
    
    db_plan = PricingPlan(**db_plan_data)
    db.add(db_plan)
    db.commit()
    db.refresh(db_plan)
    
    response_dict = {
        "id": db_plan.id,
        "name": db_plan.name,
        "price": db_plan.price,
        "features": db_plan.features.split(","),
        "popular": db_plan.popular
    }
    return response_dict

@app.put("/api/pricing-plans/{plan_id}", response_model=PricingPlanResponse)
def update_pricing_plan(plan_id: int, plan: PricingPlanCreate, db: Session = Depends(get_db)):
    db_plan = db.query(PricingPlan).filter(PricingPlan.id == plan_id).first()
    if not db_plan:
        raise HTTPException(status_code=404, detail="Pricing plan not found")
        
    plan_data = plan.model_dump() if hasattr(plan, "model_dump") else plan.dict()
    db_plan_data = plan_data.copy()
    db_plan_data["features"] = ",".join(plan_data["features"])
    
    for key, value in db_plan_data.items():
        setattr(db_plan, key, value)
        
    db.commit()
    db.refresh(db_plan)
    
    response_dict = {
        "id": db_plan.id,
        "name": db_plan.name,
        "price": db_plan.price,
        "features": db_plan.features.split(","),
        "popular": db_plan.popular
    }
    return response_dict

@app.delete("/api/pricing-plans/{plan_id}")
def delete_pricing_plan(plan_id: int, db: Session = Depends(get_db)):
    db_plan = db.query(PricingPlan).filter(PricingPlan.id == plan_id).first()
    if not db_plan:
        raise HTTPException(status_code=404, detail="Pricing plan not found")
    db.delete(db_plan)
    db.commit()
    return {"message": "Pricing plan deleted"}

@app.get("/")
def root():
    return {"message": "Welcome to Glamora API. Visit /docs for documentation"}
