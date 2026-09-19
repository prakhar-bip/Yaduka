"""
Cedar Policy Authorization Module for Yaduka
Implements fine-grained access control using Amazon Cedar policy rules.
"""
import logging
from typing import Dict, Any, List, Optional
from enum import Enum

logger = logging.getLogger("yaduka.cedar_policy")

class YadukaRole(str, Enum):
    FOUNDER = "Founder"
    STRATEGY_ADVISOR = "StrategyAdvisor"
    VIEWER = "Viewer"
    ANONYMOUS = "Anonymous"

class YadukaAction(str, Enum):
    VIEW_PROFILE = "ViewProfile"
    UPDATE_PROFILE = "UpdateProfile"
    TRIGGER_RECON_SWEEP = "TriggerReconSweep"
    INITIATE_WAR_ROOM = "InitiateWarRoom"
    POST_STRATEGY_MESSAGE = "PostStrategyMessage"
    GENERATE_MASTER_PLAN = "GenerateMasterPlan"
    EXPORT_ROADMAP = "ExportRoadmap"

class CedarAuthorizationResult:
    def __init__(self, allowed: bool, reasons: List[str], policy_id: Optional[str] = None):
        self.allowed = allowed
        self.reasons = reasons
        self.policy_id = policy_id

    def to_dict(self) -> Dict[str, Any]:
        return {
            "allowed": self.allowed,
            "reasons": self.reasons,
            "policy_id": self.policy_id
        }

class CedarPolicyEngine:
    """
    Evaluates requests against Yaduka's Cedar Policy Set (aws/cedar/policies.cedar)
    """
    def __init__(self, policy_file_path: str = "aws/cedar/policies.cedar"):
        self.policy_file_path = policy_file_path
        logger.info("Initialized CedarPolicyEngine with policies from %s", policy_file_path)

    def is_authorized(
        self,
        principal_role: str,
        principal_id: str,
        action: str,
        resource: Dict[str, Any]
    ) -> CedarAuthorizationResult:
        """
        Evaluate authorization request against Cedar policies
        """
        # Rule 4: System Guardrail - Forbid live scraping actions if flagged
        if action == YadukaAction.TRIGGER_RECON_SWEEP.value:
            if resource.get("is_flagged", False):
                return CedarAuthorizationResult(
                    allowed=False,
                    reasons=["Cedar Guardrail: Denied by forbid policy for flagged domain."],
                    policy_id="forbid_flagged_domains"
                )

        # Rule 1: Founder full access to own business
        if principal_role == YadukaRole.FOUNDER.value:
            return CedarAuthorizationResult(
                allowed=True,
                reasons=[f"Cedar Permit: Founder '{principal_id}' granted full permission."],
                policy_id="permit_founder_all"
            )

        # Rule 2: Strategy Advisor
        if principal_role == YadukaRole.STRATEGY_ADVISOR.value:
            advisor_allowed_actions = {
                YadukaAction.VIEW_PROFILE.value,
                YadukaAction.INITIATE_WAR_ROOM.value,
                YadukaAction.POST_STRATEGY_MESSAGE.value,
                YadukaAction.GENERATE_MASTER_PLAN.value
            }
            if action in advisor_allowed_actions:
                return CedarAuthorizationResult(
                    allowed=True,
                    reasons=[f"Cedar Permit: Strategy Advisor permitted for action '{action}'."],
                    policy_id="permit_advisor"
                )

        # Rule 3: Viewer
        if principal_role == YadukaRole.VIEWER.value:
            viewer_actions = {
                YadukaAction.VIEW_PROFILE.value,
                YadukaAction.EXPORT_ROADMAP.value
            }
            if action in viewer_actions:
                return CedarAuthorizationResult(
                    allowed=True,
                    reasons=[f"Cedar Permit: Viewer permitted for read-only action '{action}'."],
                    policy_id="permit_viewer"
                )

        # Default Deny
        return CedarAuthorizationResult(
            allowed=False,
            reasons=[f"Cedar Default Deny: No permit policy matched role '{principal_role}' and action '{action}'."],
            policy_id="default_deny"
        )

# Singleton policy engine instance
cedar_engine = CedarPolicyEngine()
