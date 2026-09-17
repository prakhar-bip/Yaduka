// =========================================================================
// Yaduka — Cedar Policy Definitions (Auth and Policy Track)
// Open Source Fine-Grained Authorization Policies
// =========================================================================

// Namespace definition
namespace Yaduka {

  // Rule 1: Business Founders have full permission over their own business profiles
  permit (
    principal in Role::"Founder",
    action in [
      Action::"ViewProfile",
      Action::"UpdateProfile",
      Action::"TriggerReconSweep",
      Action::"InitiateWarRoom",
      Action::"PostStrategyMessage",
      Action::"GenerateMasterPlan",
      Action::"ExportRoadmap"
    ],
    resource is BusinessProfile
  )
  when {
    principal.businessId == resource.businessId
  };

  // Rule 2: Strategy Advisors can view profiles, participate in War Room dialogues, and propose plans
  permit (
    principal in Role::"StrategyAdvisor",
    action in [
      Action::"ViewProfile",
      Action::"InitiateWarRoom",
      Action::"PostStrategyMessage",
      Action::"GenerateMasterPlan"
    ],
    resource is BusinessProfile
  )
  when {
    resource.isPublic == true || principal.assignedBusinesses.contains(resource.businessId)
  };

  // Rule 3: Read-only Investors and Team Members can inspect verified research dashboards and roadmaps
  permit (
    principal in Role::"Viewer",
    action in [
      Action::"ViewProfile",
      Action::"ViewResearchDashboard",
      Action::"ExportRoadmap"
    ],
    resource is BusinessProfile
  )
  when {
    principal.organizationId == resource.organizationId
  };

  // Rule 4: System Guardrail - Forbid live scraping actions if the business website has not passed safety checks
  forbid (
    principal,
    action == Action::"TriggerReconSweep",
    resource is BusinessProfile
  )
  unless {
    resource.isFlagged == false && resource.isVerifiedDomain == true
  };
}
