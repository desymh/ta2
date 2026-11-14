from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional

from app import database, models, schemas
from app.decision_engine import run_decision_engine
from app.schemas import CalculationInput, CalculationResult

app = FastAPI(title="Portfolio Decision Support API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup():
    database.init_db()


@app.get("/")
def root():
    return {"message": "Portfolio Decision Support API running"}


@app.post("/profiles/", response_model=schemas.UserProfileOut)
def create_profile(profile: schemas.UserProfileCreate, db: Session = Depends(database.get_db)):
    db_profile = models.UserProfile(
        name=profile.name,
        x_m3=profile.x_m3,
        x_m2=profile.x_m2,
        x_m1=profile.x_m1,
        x_target=profile.x_target,
    )
    db.add(db_profile)
    db.flush()
    for p in profile.products:
        db.add(models.Product(
            profile_id=db_profile.id,
            name=p.name,
            price=p.price,
            sold_monthly=p.sold_monthly,
            commission_pct=p.commission_pct,
        ))
    db.commit()
    db.refresh(db_profile)
    return db_profile


@app.get("/profiles/", response_model=List[schemas.UserProfileOut])
def list_profiles(db: Session = Depends(database.get_db)):
    return db.query(models.UserProfile).all()


@app.get("/profiles/{profile_id}", response_model=schemas.UserProfileOut)
def get_profile(profile_id: int, db: Session = Depends(database.get_db)):
    profile = db.query(models.UserProfile).filter(models.UserProfile.id == profile_id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile


@app.post("/calculate/", response_model=CalculationResult)
def calculate(input_data: CalculationInput):
    result = run_decision_engine(
        x_m3=input_data.x_m3,
        x_m2=input_data.x_m2,
        x_m1=input_data.x_m1,
        x_target=input_data.x_target,
        products=input_data.products,
        daily_evaluation=input_data.daily_evaluation,
    )
    return result


@app.post("/profiles/{profile_id}/decide", response_model=schemas.DecisionOut)
def decide(profile_id: int, db: Session = Depends(database.get_db)):
    profile = db.query(models.UserProfile).filter(models.UserProfile.id == profile_id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")

    products = db.query(models.Product).filter(models.Product.profile_id == profile_id).all()
    product_schemas = [
        schemas.ProductBase(
            name=p.name,
            price=p.price,
            sold_monthly=p.sold_monthly,
            commission_pct=p.commission_pct,
        )
        for p in products
    ]

    result = run_decision_engine(
        x_m3=profile.x_m3,
        x_m2=profile.x_m2,
        x_m1=profile.x_m1,
        x_target=profile.x_target,
        products=product_schemas,
    )

    existing = db.query(models.Decision).filter(models.Decision.profile_id == profile_id).first()
    if existing:
        existing.q_total = result["q_total"]
        existing.q_hari = result["q_hari"]
        existing.growth_ratio = result["growth_ratio"]
        existing.x2_avg = result["x2_avg"]
        existing.threshold_20 = result["threshold_20"]
        existing.threshold_40 = result["threshold_40"]
        existing.class_label = result["class_label"]
        existing.class_name = result["class_name"]
        existing.daily_mission = result["daily_mission"]
        db.commit()
        db.refresh(existing)
        return existing

    decision = models.Decision(
        profile_id=profile_id,
        q_total=result["q_total"],
        q_hari=result["q_hari"],
        growth_ratio=result["growth_ratio"],
        x2_avg=result["x2_avg"],
        threshold_20=result["threshold_20"],
        threshold_40=result["threshold_40"],
        class_label=result["class_label"],
        class_name=result["class_name"],
        daily_mission=result["daily_mission"],
    )
    db.add(decision)
    db.commit()
    db.refresh(decision)
    return decision


@app.get("/profiles/{profile_id}/decision", response_model=schemas.DecisionOut)
def get_decision(profile_id: int, db: Session = Depends(database.get_db)):
    decision = db.query(models.Decision).filter(models.Decision.profile_id == profile_id).first()
    if not decision:
        raise HTTPException(status_code=404, detail="Decision not found")
    return decision


@app.post("/profiles/{profile_id}/daily-evaluation", response_model=schemas.DailyEvaluationOut)
def add_daily_evaluation(profile_id: int, eval_in: schemas.DailyEvaluationCreate, db: Session = Depends(database.get_db)):
    profile = db.query(models.UserProfile).filter(models.UserProfile.id == profile_id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    db_eval = models.DailyEvaluation(
        profile_id=profile_id,
        gmv_riil=eval_in.gmv_riil,
        komisi_riil=eval_in.komisi_riil,
        video_riil=eval_in.video_riil,
    )
    db.add(db_eval)
    db.commit()
    db.refresh(db_eval)
    return db_eval


@app.get("/profiles/{profile_id}/daily-evaluations", response_model=List[schemas.DailyEvaluationOut])
def list_daily_evaluations(profile_id: int, db: Session = Depends(database.get_db)):
    return db.query(models.DailyEvaluation).filter(models.DailyEvaluation.profile_id == profile_id).all()
