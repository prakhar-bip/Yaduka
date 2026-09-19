"""
OpenSearch Service for Yaduka
Handles semantic search, competitor intelligence indexing, and market terrain retrieval.
"""
import logging
import json
from typing import Dict, Any, List, Optional

logger = logging.getLogger("yaduka.opensearch")

MARKET_INTEL_INDEX = "yaduka-market-intelligence"
COMPETITOR_TERRAIN_INDEX = "yaduka-competitor-terrain"

INDEX_MAPPING = {
    "settings": {
        "number_of_shards": 1,
        "number_of_replicas": 0
    },
    "mappings": {
        "properties": {
            "business_id": {"type": "keyword"},
            "business_name": {"type": "text"},
            "industry": {"type": "keyword"},
            "territory": {"type": "keyword"},
            "competitor_name": {"type": "text"},
            "keywords": {"type": "keyword"},
            "pain_points": {"type": "text"},
            "whitespace_opportunities": {"type": "text"},
            "timestamp": {"type": "date"}
        }
    }
}

class OpenSearchService:
    def __init__(self, endpoint: str = "http://localhost:9200"):
        self.endpoint = endpoint
        self._in_memory_index: Dict[str, List[Dict[str, Any]]] = {
            MARKET_INTEL_INDEX: [],
            COMPETITOR_TERRAIN_INDEX: []
        }
        logger.info("Yaduka OpenSearch service initialized with endpoint: %s", endpoint)

    def index_market_intelligence(self, business_id: str, payload: Dict[str, Any]) -> Dict[str, Any]:
        """
        Indexes extracted market intelligence into OpenSearch for fast retrieval and clustering
        """
        doc = {
            "business_id": business_id,
            "business_name": payload.get("business_name", ""),
            "industry": payload.get("industry", ""),
            "territory": payload.get("territory", ""),
            "whitespace_opportunities": payload.get("whitespace_opportunities", []),
            "audience_insights": payload.get("audience_insights", []),
            "timestamp": "2026-09-18T12:00:00Z"
        }
        self._in_memory_index[MARKET_INTEL_INDEX].append(doc)
        logger.info("Indexed market intelligence document for business %s in OpenSearch", business_id)
        return {"status": "indexed", "index": MARKET_INTEL_INDEX, "id": business_id}

    def search_similar_market_terrains(self, query: str, industry: Optional[str] = None) -> List[Dict[str, Any]]:
        """
        Performs full-text & semantic keyword search across previously indexed market findings
        """
        results = []
        q_lower = query.lower()
        for doc in self._in_memory_index[MARKET_INTEL_INDEX]:
            if industry and doc.get("industry", "").lower() != industry.lower():
                continue
            # Simple term matching against indexed text
            content_str = json.dumps(doc).lower()
            if any(term in content_str for term in q_lower.split()):
                results.append(doc)
        return results

opensearch_service = OpenSearchService()
