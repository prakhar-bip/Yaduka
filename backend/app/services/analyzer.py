from typing import Dict, Any
from app.schemas.business import BusinessIntakeCreate

def analyze_business_profile(data: BusinessIntakeCreate) -> Dict[str, Any]:
    """
    Computes the Expedition Readiness Score and synthesizes key strategic levers
    for the newly ingested business.
    """
    score = 40  # base starting points

    # Evaluate clarity of value prop
    if len(data.value_proposition.strip()) > 30:
        score += 15
    # Evaluate target audience specificity
    if len(data.target_audience.strip()) > 20:
        score += 15
    # Evaluate budget clarity
    if data.monthly_marketing_budget and data.monthly_marketing_budget != "Uncertain":
        score += 15
    # Evaluate competitors
    if len(data.top_competitors) > 0:
        score += 15

    score = min(score, 95)

    # Diagnostic logic based on primary bottleneck & category
    bottleneck = (data.primary_bottleneck or "traffic").lower()
    category = data.category.lower()

    if "traffic" in bottleneck:
        trap = "Pouring capital into cold display ads before validating that your messaging pierces skepticism."
        opportunity = "Capture existing high-intent search queries and competitor alternative comparisons."
        focus = "High-Intent Search & Problem-Centric Comparison Landing Pages."
        next_target = "Elevation 1,800m — Uncovering uncontested search whitespace."
        levers = [
            "Deploy 3 targeted comparison pages against your named competitors.",
            "Test one problem-focused headline on your primary hero section.",
            "Establish a clear lead capture mechanism with a diagnostic lead magnet."
        ]
    elif "conversion" in bottleneck:
        trap = "Sending expensive ad traffic to a generic, feature-heavy homepage that confuses prospects."
        opportunity = "Restructure the value proposition around a single acute pain point and remove cognitive friction."
        focus = "Offer Clarification & Social Proof Architecture."
        next_target = "Elevation 3,600m — Pruning wasted ad spend by 40%."
        levers = [
            "Re-architect page flow: Hook -> Problem -> Proof -> Offer -> Risk Reversal.",
            "Add high-trust customer evidence and verifiable outcomes above the fold.",
            "Implement exit-intent capture with a high-value assessment tool."
        ]
    elif "retention" in bottleneck:
        trap = "Obsessing over first-order acquisition while bleeding customers after month 1."
        opportunity = "Automate onboarding milestone celebrations and proactive value-delivery triggers."
        focus = "Post-Purchase / Onboarding Value Loops."
        next_target = "Elevation 5,400m — Compounding Customer Lifetime Value."
        levers = [
            "Deploy 14-day automated onboarding sequence focused on first customer win.",
            "Build tiered loyalty incentives or annual upgrade incentives.",
            "Conduct 5 customer exit interviews to uncover exact churn friction points."
        ]
    else:  # Pricing / Economics
        trap = "Competing on price in a race to the bottom, starving the business of margin."
        opportunity = "Package expertise into a flagship tier with premium positioning."
        focus = "Value Ladder Restructuring & Packaging."
        next_target = "Elevation 8,200m — Enduring, High-Margin Market Scale."
        levers = [
            "Introduce a high-tier Flagship package at 2.5x current price point.",
            "Guarantee specific deliverable timelines to remove buyer anxiety.",
            "Shift positioning from vendor to strategic category leader."
        ]

    label = "Expedition Ready" if score >= 80 else "Strategic Calibration Recommended"

    return {
        "readiness_score": score,
        "readiness_label": label,
        "primary_trap": trap,
        "strategic_opportunity": opportunity,
        "recommended_focus": focus,
        "next_altitude_target": next_target,
        "key_levers": levers
    }
