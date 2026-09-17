import logging
from typing import Dict, Any, List, Optional
from pydantic import BaseModel
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.business import BusinessProfile, MarketResearchReport, StrategySession, MasterExecutionPlan
from app.services.llm_client import chat_strategy_copilot, generate_master_execution_plan_with_gemini

logger = logging.getLogger("yaduka.routes.strategy")

router = APIRouter(prefix="/strategy", tags=["Strategy War Room & Master Plan"])

class StrategyMessageRequest(BaseModel):
    session_id: int
    user_message: str
    decision_type: Optional[str] = None

class FinalizeStrategyRequest(BaseModel):
    agreed_strategy: Optional[Dict[str, Any]] = None

@router.post("/start/{business_id}")
def start_strategy_session(business_id: int, db: Session = Depends(get_db)):
    """
    Starts an interactive strategic war room session between founder and Yaduka.
    Initializes Battle 1: Positioning vs. Discovered Competitor Flaws.
    """
    business = db.query(BusinessProfile).filter(BusinessProfile.id == business_id).first()
    if not business:
        raise HTTPException(status_code=404, detail="Business not found")

    report = db.query(MarketResearchReport).filter(MarketResearchReport.business_id == business_id).first()
    giant_name = "Category Incumbent"
    giant_flaw = "bureaucratic support and hidden fees"
    if report and report.area_giants:
        primary_giants = report.area_giants.get("primary_giants", [])
        if primary_giants:
            giant_name = primary_giants[0].get("name", giant_name)
            flaws = primary_giants[0].get("mined_review_flaws", [])
            if flaws:
                giant_flaw = flaws[0]

    opening_message = (
        f"Welcome to the Strategy War Room, founder of {business.business_name}. "
        f"Our autonomous reconnaissance scoured {business.target_territory} and uncovered that {giant_name} holds significant market share, "
        f"but their customer reviews reveal a massive vulnerability: '{giant_flaw}'. "
        f"Let's win Battle 1: Positioning. How do you want to attack their weakness with your {business.mvp_offer}?"
    )

    quick_options = [
        f"Attack their flaw directly: Position as the fast, transparent alternative to {giant_name}",
        f"Focus on customer trust: Emphasize white-glove service and guaranteed milestones",
        "Target high-intent comparison searchers who are actively seeking alternatives"
    ]

    session = StrategySession(
        business_id=business_id,
        messages=[
            {"role": "yaduka", "content": opening_message, "quick_options": quick_options}
        ],
        current_battle="positioning",
        agreed_decisions={}
    )
    db.add(session)
    db.commit()
    db.refresh(session)

    return {
        "session_id": session.id,
        "business_name": business.business_name,
        "current_battle": session.current_battle,
        "battle_number": 1,
        "total_battles": 3,
        "messages": session.messages,
        "is_ready_for_plan": False
    }

@router.post("/message")
def post_strategy_message(req: StrategyMessageRequest, db: Session = Depends(get_db)):
    """
    Sends a user decision or message to Yaduka in the Strategy War Room.
    Advances through the 3 tactical battles:
    1. Positioning -> 2. Channels & Budget -> 3. Offer & Risk Reversal -> Finalize.
    """
    session = db.query(StrategySession).filter(StrategySession.id == req.session_id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Strategy session not found")

    business = db.query(BusinessProfile).filter(BusinessProfile.id == session.business_id).first()
    report = db.query(MarketResearchReport).filter(MarketResearchReport.business_id == session.business_id).first()
    
    primary_flaw = "slow support and hidden fees"
    if report and report.area_giants:
        giants = report.area_giants.get("primary_giants", [])
        if giants and giants[0].get("mined_review_flaws"):
            primary_flaw = giants[0]["mined_review_flaws"][0]

    # Append user message
    messages = list(session.messages)
    messages.append({"role": "founder", "content": req.user_message})

    # Track agreed decisions
    decisions = dict(session.agreed_decisions)
    current_battle = session.current_battle

    # Process next battle state
    quick_options = []
    is_ready = False

    if current_battle == "positioning":
        decisions["positioning_decision"] = req.user_message
        session.current_battle = "channels"
        battle_num = 2
        
        reply_content = chat_strategy_copilot(
            messages, req.user_message,
            business.business_name, business.product_description,
            business.target_territory, business.monthly_marketing_budget,
            primary_flaw
        )
        quick_options = [
            "Lock the 65% Search Capture / 35% Social Proof budget split",
            "Allocate 50% to direct comparison search and 50% to retargeting",
            "Shift more budget toward local organic authority and case study videos"
        ]

    elif current_battle == "channels":
        decisions["channels_decision"] = req.user_message
        session.current_battle = "offer"
        battle_num = 3

        reply_content = chat_strategy_copilot(
            messages, req.user_message,
            business.business_name, business.product_description,
            business.target_territory, business.monthly_marketing_budget,
            primary_flaw
        )
        quick_options = [
            "The Pilot Guarantee: 14-day zero-risk trial with zero card on file",
            "The Milestone Pledge: Guaranteed turnaround timeline or 50% refund",
            "The White-Glove Switcher: Free onboarding and data migration from their old provider"
        ]

    else: # battle == 'offer' or completed
        decisions["offer_decision"] = req.user_message
        session.current_battle = "completed"
        battle_num = 3
        is_ready = True

        reply_content = (
            f"All 3 strategic pillars are aligned, founder! We have locked your competitive positioning against incumbent flaws, "
            f"calibrated your {business.monthly_marketing_budget} channel budget split, and established your risk-reversal offer. "
            f"Click 'Generate Master Execution Plan' below to receive your 12-week roadmap and customized direct-response ad copy."
        )

    messages.append({
        "role": "yaduka",
        "content": reply_content,
        "quick_options": quick_options
    })

    session.messages = messages
    session.agreed_decisions = decisions
    db.commit()
    db.refresh(session)

    return {
        "session_id": session.id,
        "current_battle": session.current_battle,
        "battle_number": battle_num,
        "total_battles": 3,
        "messages": session.messages,
        "is_ready_for_plan": is_ready,
        "agreed_decisions": session.agreed_decisions
    }

@router.post("/finalize/{business_id}")
def finalize_master_plan(business_id: int, req: FinalizeStrategyRequest, db: Session = Depends(get_db)):
    """
    Step 5: Synthesizes the locked strategic agreements into the final
    Master Marketing Execution Plan (12-week sprints, ad copy playbook, budget model).
    """
    business = db.query(BusinessProfile).filter(BusinessProfile.id == business_id).first()
    if not business:
        raise HTTPException(status_code=404, detail="Business not found")

    session = db.query(StrategySession).filter(StrategySession.business_id == business_id).order_by(StrategySession.id.desc()).first()
    agreed = req.agreed_strategy or (session.agreed_decisions if session else {})

    plan_data = generate_master_execution_plan_with_gemini(
        business_name=business.business_name,
        product=business.product_description,
        location=business.target_territory,
        mvp=business.mvp_offer,
        budget=business.monthly_marketing_budget,
        agreed_strategy=agreed
    )

    existing_plan = db.query(MasterExecutionPlan).filter(MasterExecutionPlan.business_id == business_id).first()
    if existing_plan:
        existing_plan.plan_data = plan_data
        db.commit()
        db.refresh(existing_plan)
        return existing_plan.plan_data

    new_plan = MasterExecutionPlan(
        business_id=business_id,
        plan_data=plan_data
    )
    db.add(new_plan)
    db.commit()
    db.refresh(new_plan)
    return new_plan.plan_data

@router.get("/plan/{business_id}")
def get_master_plan(business_id: int, db: Session = Depends(get_db)):
    """Retrieves the stored Master Execution Plan for a business."""
    plan = db.query(MasterExecutionPlan).filter(MasterExecutionPlan.business_id == business_id).first()
    if not plan:
        raise HTTPException(status_code=404, detail="Master execution plan not found. Please complete the Strategy War Room first.")
    return plan.plan_data
