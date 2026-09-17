from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from datetime import datetime

class WebsiteScanRequest(BaseModel):
    url: str = Field(..., description="Website URL to crawl and analyze")

class WebsiteScanResponse(BaseModel):
    url: str
    title: Optional[str] = None
    meta_description: Optional[str] = None
    detected_business_name: Optional[str] = None
    detected_category: Optional[str] = None
    detected_value_prop: Optional[str] = None
    detected_product: Optional[str] = None
    detected_skus: Optional[str] = None
    detected_location: Optional[str] = None
    detected_keywords: List[str] = Field(default_factory=list)
    suggested_competitors: List[str] = Field(default_factory=list)
    scan_success: bool = True
    message: Optional[str] = None

# Comprehensive Intake Schema covering all 5 modules
class ComprehensiveIntakeCreate(BaseModel):
    # Module 1: Offering & Identity
    business_name: str = Field(..., min_length=1, max_length=255)
    website_url: Optional[str] = None
    social_handles: Optional[Dict[str, str]] = Field(default_factory=dict)
    product_description: str = Field(..., description="Exact product or service specifications")
    skus_count: str = Field(default="1-5 SKUs", description="Catalog depth e.g. 1-5, 10-50, 100+")
    mvp_offer: str = Field(..., description="The core flagship offer / entry product")
    delivery_mechanism: Optional[str] = "Digital / Physical"
    moats: Optional[str] = None

    # Module 2: Geographic Footprint
    operating_base: str = Field(..., description="HQ City/Zip code or primary base")
    target_territory: str = Field(..., description="Hyper-local radius, Metro, Regional, National, Global")
    distribution_channels: Optional[List[str]] = Field(default_factory=list)

    # Module 3: Customer & Commercials
    category: str = Field(default="B2B Software / Tech")
    target_audience: str = Field(..., description="Ideal customer profile / target buyer")
    buying_trigger: Optional[str] = None
    pricing_structure: Optional[str] = None
    average_deal_size: Optional[str] = "$100 - $500"
    gross_margin_percentage: Optional[str] = "60%"
    estimated_ltv: Optional[str] = None

    # Module 4: Marketing Reality & Traction
    stage: Optional[str] = "Early Growth"
    revenue_bracket: Optional[str] = "Pre-revenue"
    monthly_marketing_budget: Optional[str] = "$1,000 - $3,000 / mo"
    past_channels: Optional[List[str]] = Field(default_factory=list)
    top_competitors: Optional[List[str]] = Field(default_factory=list)
    primary_bottleneck: Optional[str] = "Traffic"

    # Module 5: Goals & Operational Limits
    north_star_metric: Optional[str] = None
    operational_capacity: Optional[str] = None
    brand_guardrails: Optional[str] = None

# Market Research Report Schema for the 6 Vectors
class MarketResearchReportResponse(BaseModel):
    id: int
    business_id: int
    area_giants: Dict[str, Any]
    price_spectrum: Dict[str, Any]
    market_manipulations: Dict[str, Any]
    audience_intent: Dict[str, Any]
    external_threats: Dict[str, Any]
    strategic_synthesis: Dict[str, Any]
    created_at: datetime

    class Config:
        from_attributes = True

# Full Business Profile Detail Response
class BusinessProfileDetailResponse(BaseModel):
    id: int
    business_name: str
    website_url: Optional[str] = None
    product_description: str
    skus_count: str
    mvp_offer: str
    operating_base: str
    target_territory: str
    category: str
    target_audience: str
    pricing_structure: Optional[str] = None
    average_deal_size: Optional[str] = None
    monthly_marketing_budget: Optional[str] = None
    revenue_bracket: Optional[str] = None
    top_competitors: List[str] = []
    primary_bottleneck: Optional[str] = None
    readiness_score: int
    diagnostic_summary: Optional[Dict[str, Any]] = None
    research_report: Optional[MarketResearchReportResponse] = None
    created_at: datetime

    class Config:
        from_attributes = True

# Legacy wrapper for backwards compatibility
class BusinessIntakeCreate(BaseModel):
    business_name: str
    website_url: Optional[str] = None
    category: str = "B2B Software / Tech"
    value_proposition: str = ""
    target_audience: str = ""
    average_deal_size: Optional[str] = None
    revenue_bracket: Optional[str] = None
    monthly_marketing_budget: Optional[str] = None
    past_channels: List[str] = []
    top_competitors: List[str] = []
    primary_bottleneck: Optional[str] = None

class BusinessProfileResponse(BaseModel):
    id: int
    business_name: str
    website_url: Optional[str] = None
    category: str
    readiness_score: int
    diagnostic_summary: Optional[Dict[str, Any]] = None
    created_at: datetime

    class Config:
        from_attributes = True
