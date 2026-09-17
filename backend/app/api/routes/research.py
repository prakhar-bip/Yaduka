import logging
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.business import BusinessProfile, MarketResearchReport
from app.schemas.business import MarketResearchReportResponse
from app.services.market_research import generate_market_research

logger = logging.getLogger("yaduka.routes.research")

router = APIRouter(prefix="/research", tags=["Market Research Intelligence"])

@router.post("/generate/{business_id}", response_model=MarketResearchReportResponse, status_code=status.HTTP_201_CREATED)
def generate_research_endpoint(business_id: int, db: Session = Depends(get_db)):
    """
    Triggers the autonomous market research engine for a specific business profile.
    Conducts online reconnaissance across all 6 strategic vectors and persists the report.
    """
    business = db.query(BusinessProfile).filter(BusinessProfile.id == business_id).first()
    if not business:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Business profile with ID {business_id} not found."
        )

    # Generate the 6-vector research payload
    research_payload = generate_market_research(business)

    # Check if a report already exists for this business
    existing_report = db.query(MarketResearchReport).filter(MarketResearchReport.business_id == business_id).first()

    if existing_report:
        existing_report.area_giants = research_payload["area_giants"]
        existing_report.price_spectrum = research_payload["price_spectrum"]
        existing_report.market_manipulations = research_payload["market_manipulations"]
        existing_report.audience_intent = research_payload["audience_intent"]
        existing_report.external_threats = research_payload["external_threats"]
        existing_report.strategic_synthesis = research_payload["strategic_synthesis"]
        db.commit()
        db.refresh(existing_report)
        return existing_report

    new_report = MarketResearchReport(
        business_id=business_id,
        area_giants=research_payload["area_giants"],
        price_spectrum=research_payload["price_spectrum"],
        market_manipulations=research_payload["market_manipulations"],
        audience_intent=research_payload["audience_intent"],
        external_threats=research_payload["external_threats"],
        strategic_synthesis=research_payload["strategic_synthesis"]
    )
    db.add(new_report)
    db.commit()
    db.refresh(new_report)
    return new_report

@router.get("/{business_id}", response_model=MarketResearchReportResponse)
def get_research_endpoint(business_id: int, db: Session = Depends(get_db)):
    """Retrieves the market research report for a given business ID."""
    report = db.query(MarketResearchReport).filter(MarketResearchReport.business_id == business_id).first()
    if not report:
        # If report doesn't exist yet, generate it on the fly
        business = db.query(BusinessProfile).filter(BusinessProfile.id == business_id).first()
        if not business:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Business profile with ID {business_id} not found."
            )
        research_payload = generate_market_research(business)
        report = MarketResearchReport(
            business_id=business_id,
            area_giants=research_payload["area_giants"],
            price_spectrum=research_payload["price_spectrum"],
            market_manipulations=research_payload["market_manipulations"],
            audience_intent=research_payload["audience_intent"],
            external_threats=research_payload["external_threats"],
            strategic_synthesis=research_payload["strategic_synthesis"]
        )
        db.add(report)
        db.commit()
        db.refresh(report)

    return report
