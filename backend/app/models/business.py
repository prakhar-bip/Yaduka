from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime, JSON, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class BusinessProfile(Base):
    __tablename__ = "businesses"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    
    # Module 1: Offering & Identity
    business_name = Column(String(255), nullable=False, index=True)
    website_url = Column(String(512), nullable=True)
    social_handles = Column(JSON, nullable=True, default=dict)
    product_description = Column(Text, nullable=False)
    skus_count = Column(String(100), nullable=False, default="1-5 SKUs")
    mvp_offer = Column(Text, nullable=False)
    delivery_mechanism = Column(String(100), nullable=True, default="Digital / Physical")
    moats = Column(Text, nullable=True)

    # Module 2: Geographic Footprint
    operating_base = Column(String(255), nullable=False, default="Not specified")
    target_territory = Column(String(255), nullable=False, default="National")
    distribution_channels = Column(JSON, nullable=True, default=list)

    # Module 3: Customer & Commercials
    category = Column(String(100), nullable=False, default="B2B Software / Tech")
    target_audience = Column(Text, nullable=False)
    buying_trigger = Column(Text, nullable=True)
    pricing_structure = Column(String(255), nullable=True)
    average_deal_size = Column(String(100), nullable=True)
    gross_margin_percentage = Column(String(50), nullable=True)
    estimated_ltv = Column(String(100), nullable=True)

    # Module 4: Marketing Reality & Traction
    stage = Column(String(100), nullable=True, default="Early Growth")
    revenue_bracket = Column(String(100), nullable=True, default="Pre-revenue")
    monthly_marketing_budget = Column(String(100), nullable=True, default="$1,000 - $3,000 / mo")
    past_channels = Column(JSON, nullable=True, default=list)
    top_competitors = Column(JSON, nullable=True, default=list)
    primary_bottleneck = Column(String(100), nullable=True, default="Traffic")

    # Module 5: Goals & Operational Limits
    north_star_metric = Column(Text, nullable=True)
    operational_capacity = Column(String(255), nullable=True)
    brand_guardrails = Column(Text, nullable=True)

    # Computed Readiness
    readiness_score = Column(Integer, default=80)
    diagnostic_summary = Column(JSON, nullable=True, default=dict)

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationship to research report
    research_report = relationship("MarketResearchReport", back_populates="business", uselist=False, cascade="all, delete-orphan")


class MarketResearchReport(Base):
    __tablename__ = "market_research_reports"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    business_id = Column(Integer, ForeignKey("businesses.id"), nullable=False, index=True)
    
    # 6 Core Research Vectors
    area_giants = Column(JSON, nullable=False, default=dict)
    price_spectrum = Column(JSON, nullable=False, default=dict)
    market_manipulations = Column(JSON, nullable=False, default=dict)
    audience_intent = Column(JSON, nullable=False, default=dict)
    external_threats = Column(JSON, nullable=False, default=dict)
    strategic_synthesis = Column(JSON, nullable=False, default=dict)

    created_at = Column(DateTime, default=datetime.utcnow)

    business = relationship("BusinessProfile", back_populates="research_report")


class WebsiteScan(Base):
    __tablename__ = "website_scans"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    scanned_url = Column(String(512), nullable=False, index=True)
    title = Column(String(512), nullable=True)
    meta_description = Column(Text, nullable=True)
    detected_category = Column(String(100), nullable=True)
    detected_value_prop = Column(Text, nullable=True)
    detected_keywords = Column(JSON, nullable=True, default=list)
    detected_competitors = Column(JSON, nullable=True, default=list)
    scan_status = Column(String(50), default="completed")
    created_at = Column(DateTime, default=datetime.utcnow)


class StrategySession(Base):
    __tablename__ = "strategy_sessions"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    business_id = Column(Integer, ForeignKey("businesses.id"), nullable=False, index=True)
    messages = Column(JSON, nullable=False, default=list)
    current_battle = Column(String(50), default="positioning")
    agreed_decisions = Column(JSON, nullable=False, default=dict)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    business = relationship("BusinessProfile")


class MasterExecutionPlan(Base):
    __tablename__ = "master_execution_plans"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    business_id = Column(Integer, ForeignKey("businesses.id"), nullable=False, index=True)
    plan_data = Column(JSON, nullable=False, default=dict)
    created_at = Column(DateTime, default=datetime.utcnow)

    business = relationship("BusinessProfile")

