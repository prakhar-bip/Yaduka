import logging
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.business import BusinessProfile, MarketResearchReport, WebsiteScan
from app.schemas.business import (
    WebsiteScanRequest,
    WebsiteScanResponse,
    ComprehensiveIntakeCreate,
    BusinessProfileDetailResponse,
    BusinessIntakeCreate,
    BusinessProfileResponse
)
from app.services.scraper import scan_website_url
from app.services.analyzer import analyze_business_profile
from app.services.market_research import generate_market_research

logger = logging.getLogger("yaduka.routes.intake")

router = APIRouter(prefix="/intake", tags=["Business Intake & Reconnaissance"])

@router.post("/scan-website", response_model=WebsiteScanResponse)
async def scan_website_endpoint(request: WebsiteScanRequest, db: Session = Depends(get_db)):
    """
    Autonomously scans a website URL, extracts business metadata, and logs the scan.
    """
    if not request.url or not request.url.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="A valid website URL is required."
        )

    scan_result = await scan_website_url(request.url)

    # Persist the scan attempt to database
    try:
        scan_record = WebsiteScan(
            scanned_url=scan_result.url,
            title=scan_result.title,
            meta_description=scan_result.meta_description,
            detected_category=scan_result.detected_category,
            detected_value_prop=scan_result.detected_value_prop,
            detected_keywords=scan_result.detected_keywords,
            detected_competitors=scan_result.suggested_competitors,
            scan_status="completed" if scan_result.scan_success else "partial"
        )
        db.add(scan_record)
        db.commit()
    except Exception as e:
        db.rollback()
        logger.warning("Could not persist website scan record: %s", str(e))

    return scan_result

@router.post("/comprehensive", response_model=BusinessProfileDetailResponse, status_code=status.HTTP_201_CREATED)
def submit_comprehensive_intake(payload: ComprehensiveIntakeCreate, db: Session = Depends(get_db)):
    """
    Ingests full 5-module business profile, computes strategic readiness,
    automatically triggers the 6-vector market research engine, and persists everything.
    """
    try:
        # Calculate readiness score
        score = 65
        if len(payload.product_description.strip()) > 20: score += 10
        if len(payload.mvp_offer.strip()) > 15: score += 10
        if len(payload.target_audience.strip()) > 15: score += 10
        if payload.top_competitors and len(payload.top_competitors) > 0: score += 5
        score = min(score, 98)

        diagnostic_summary = {
            "readiness_score": score,
            "readiness_label": "Expedition Ready" if score >= 80 else "Calibrated",
            "recommended_focus": f"Dominate {payload.target_territory} through {payload.mvp_offer}",
            "primary_trap": "Spreading ad budget too thin across multiple SKUs before proving traction on your MVP.",
            "strategic_opportunity": f"Capture underserved demand in {payload.target_territory} where incumbents have customer service flaws."
        }

        profile = BusinessProfile(
            business_name=payload.business_name,
            website_url=payload.website_url,
            social_handles=payload.social_handles,
            product_description=payload.product_description,
            skus_count=payload.skus_count,
            mvp_offer=payload.mvp_offer,
            delivery_mechanism=payload.delivery_mechanism,
            moats=payload.moats,
            operating_base=payload.operating_base,
            target_territory=payload.target_territory,
            distribution_channels=payload.distribution_channels,
            category=payload.category,
            target_audience=payload.target_audience,
            buying_trigger=payload.buying_trigger,
            pricing_structure=payload.pricing_structure,
            average_deal_size=payload.average_deal_size,
            gross_margin_percentage=payload.gross_margin_percentage,
            estimated_ltv=payload.estimated_ltv,
            stage=payload.stage,
            revenue_bracket=payload.revenue_bracket,
            monthly_marketing_budget=payload.monthly_marketing_budget,
            past_channels=payload.past_channels,
            top_competitors=payload.top_competitors,
            primary_bottleneck=payload.primary_bottleneck,
            north_star_metric=payload.north_star_metric,
            operational_capacity=payload.operational_capacity,
            brand_guardrails=payload.brand_guardrails,
            readiness_score=score,
            diagnostic_summary=diagnostic_summary
        )
        db.add(profile)
        db.commit()
        db.refresh(profile)

        # Trigger autonomous market research immediately
        research_data = generate_market_research(profile)
        report = MarketResearchReport(
            business_id=profile.id,
            area_giants=research_data["area_giants"],
            price_spectrum=research_data["price_spectrum"],
            market_manipulations=research_data["market_manipulations"],
            audience_intent=research_data["audience_intent"],
            external_threats=research_data["external_threats"],
            strategic_synthesis=research_data["strategic_synthesis"]
        )
        db.add(report)
        db.commit()
        db.refresh(profile)

        return profile

    except Exception as e:
        db.rollback()
        logger.error("Error creating comprehensive business profile: %s", str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error while saving profile: {str(e)}"
        )

# Backward-compatible simple intake endpoint
@router.post("/submit", response_model=BusinessProfileResponse, status_code=status.HTTP_201_CREATED)
def submit_business_intake(payload: BusinessIntakeCreate, db: Session = Depends(get_db)):
    """Simple intake for legacy tests."""
    analysis = analyze_business_profile(payload)
    profile = BusinessProfile(
        business_name=payload.business_name,
        website_url=payload.website_url,
        category=payload.category,
        product_description=payload.value_proposition or "General Offer",
        skus_count="1-5 SKUs",
        mvp_offer=payload.value_proposition or "Core Offer",
        operating_base="Local",
        target_territory="Regional",
        target_audience=payload.target_audience or "General Audience",
        average_deal_size=payload.average_deal_size,
        revenue_bracket=payload.revenue_bracket,
        monthly_marketing_budget=payload.monthly_marketing_budget,
        past_channels=payload.past_channels,
        top_competitors=payload.top_competitors,
        primary_bottleneck=payload.primary_bottleneck,
        readiness_score=analysis["readiness_score"],
        diagnostic_summary=analysis
    )
    db.add(profile)
    db.commit()
    db.refresh(profile)
    return profile

@router.get("/{business_id}", response_model=BusinessProfileDetailResponse)
def get_business_profile(business_id: int, db: Session = Depends(get_db)):
    """Retrieves an ingested business profile by its ID along with its research report."""
    profile = db.query(BusinessProfile).filter(BusinessProfile.id == business_id).first()
    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Business profile with ID {business_id} not found."
        )
    return profile

@router.get("/", response_model=List[BusinessProfileResponse])
def list_recent_businesses(limit: int = 10, db: Session = Depends(get_db)):
    """Lists recently ingested businesses."""
    return db.query(BusinessProfile).order_by(BusinessProfile.created_at.desc()).limit(limit).all()
