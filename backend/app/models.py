from sqlalchemy import Column, Integer, Float, String, DateTime, ForeignKey, Text, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base


class UserProfile(Base):
    __tablename__ = "user_profiles"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    x_m3 = Column(Float, nullable=False)
    x_m2 = Column(Float, nullable=False)
    x_m1 = Column(Float, nullable=False)
    x_target = Column(Float, nullable=False)
    x_lalu_avg = Column(Float, nullable=True)
    growth_ratio = Column(Float, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    products = relationship("Product", back_populates="profile", cascade="all, delete-orphan")
    daily_evaluation = relationship("DailyEvaluation", back_populates="profile", cascade="all, delete-orphan")
    decision = relationship("Decision", back_populates="profile", uselist=False, cascade="all, delete-orphan")


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    profile_id = Column(Integer, ForeignKey("user_profiles.id"), nullable=False)
    name = Column(String(200), nullable=True)
    price = Column(Float, nullable=False)
    sold_monthly = Column(Float, nullable=False)
    commission_pct = Column(Float, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    profile = relationship("UserProfile", back_populates="products")


class DailyEvaluation(Base):
    __tablename__ = "daily_evaluations"

    id = Column(Integer, primary_key=True, index=True)
    profile_id = Column(Integer, ForeignKey("user_profiles.id"), nullable=False)
    gmv_riil = Column(Float, nullable=False)
    komisi_riil = Column(Float, nullable=False)
    video_riil = Column(Integer, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    profile = relationship("UserProfile", back_populates="daily_evaluation")


class Decision(Base):
    __tablename__ = "decisions"

    id = Column(Integer, primary_key=True, index=True)
    profile_id = Column(Integer, ForeignKey("user_profiles.id"), nullable=False, unique=True)
    q_total = Column(Float, nullable=False)
    q_hari = Column(Float, nullable=False)
    growth_ratio = Column(Float, nullable=False)
    x2_avg = Column(Float, nullable=False)
    threshold_20 = Column(Float, nullable=False)
    threshold_40 = Column(Float, nullable=False)
    class_label = Column(Integer, nullable=False)
    class_name = Column(String(50), nullable=False)
    daily_mission = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    profile = relationship("UserProfile", back_populates="decision")
