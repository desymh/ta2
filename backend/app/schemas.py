from pydantic import BaseModel, Field, ConfigDict
from typing import Optional, List
from datetime import datetime


class ProductBase(BaseModel):
    name: Optional[str] = None
    price: float = Field(..., gt=0)
    sold_monthly: float = Field(..., gt=0)
    commission_pct: float = Field(..., gt=0)


class ProductCreate(ProductBase):
    pass


class ProductOut(ProductBase):
    id: int
    profile_id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class DailyEvaluationBase(BaseModel):
    gmv_riil: float = Field(..., ge=0)
    komisi_riil: float = Field(..., ge=0)
    video_riil: int = Field(..., ge=0)


class DailyEvaluationCreate(DailyEvaluationBase):
    pass


class DailyEvaluationOut(DailyEvaluationBase):
    id: int
    profile_id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class DecisionOut(BaseModel):
    id: int
    profile_id: int
    q_total: float
    q_hari: float
    growth_ratio: float
    x2_avg: float
    threshold_20: float
    threshold_40: float
    class_label: int
    class_name: str
    daily_mission: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class UserProfileBase(BaseModel):
    name: str
    x_m3: float = Field(..., gt=0)
    x_m2: float = Field(..., gt=0)
    x_m1: float = Field(..., gt=0)
    x_target: float = Field(..., gt=0)


class UserProfileCreate(UserProfileBase):
    products: List[ProductCreate] = []


class UserProfileOut(UserProfileBase):
    id: int
    x_lalu_avg: Optional[float] = None
    growth_ratio: Optional[float] = None
    created_at: datetime
    products: List[ProductOut] = []
    daily_evaluation: List[DailyEvaluationOut] = []
    decision: Optional[DecisionOut] = None

    model_config = ConfigDict(from_attributes=True)


class CalculationInput(BaseModel):
    x_m3: float
    x_m2: float
    x_m1: float
    x_target: float
    products: List[ProductBase] = []
    daily_evaluation: Optional[DailyEvaluationBase] = None


class CalculationResult(BaseModel):
    x_lalu_avg: float
    growth_ratio: float
    x1_avg: float
    x2_avg: float
    x3_avg: float
    c_unit: float
    q_total: float
    q_hari: float
    threshold_20: float
    threshold_40: float
    class_label: int
    class_name: str
    daily_mission: str
