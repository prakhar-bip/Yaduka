import re
import logging
from urllib.parse import urlparse
import httpx
from bs4 import BeautifulSoup
from app.schemas.business import WebsiteScanResponse

logger = logging.getLogger("yaduka.scraper")

async def scan_website_url(url: str) -> WebsiteScanResponse:
    """
    Autonomously fetches and parses a website to extract:
    - Business title / brand name
    - Meta descriptions & value proposition
    - Inferred category (SaaS, D2C, Agency, Local, etc.)
    - Keywords and potential competitor archetypes
    """
    raw_url = url.strip()
    if not raw_url.startswith(("http://", "https://")):
        raw_url = "https://" + raw_url

    parsed = urlparse(raw_url)
    domain_name = parsed.netloc.replace("www.", "")
    fallback_business_name = domain_name.split(".")[0].capitalize()

    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                      "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 YadukaBot/1.0"
    }

    try:
        async with httpx.AsyncClient(headers=headers, timeout=10.0, follow_redirects=True, verify=False) as client:
            response = await client.get(raw_url)
            response.raise_for_status()
            html = response.text

        soup = BeautifulSoup(html, "html.parser")

        # 1. Title
        title_tag = soup.find("title")
        raw_title = title_tag.get_text().strip() if title_tag else fallback_business_name
        # Clean title (e.g. "Acme | The Modern Analytics Platform" -> "Acme")
        business_name = raw_title.split("|")[0].split("-")[0].split("—")[0].strip()
        if not business_name or len(business_name) > 60:
            business_name = fallback_business_name

        # 2. Meta description & Open Graph
        meta_desc = ""
        desc_el = soup.find("meta", attrs={"name": re.compile(r"description", re.I)})
        if not desc_el:
            desc_el = soup.find("meta", attrs={"property": "og:description"})
        if desc_el and desc_el.get("content"):
            meta_desc = desc_el.get("content").strip()

        # 3. Headings for Value Proposition
        h1_el = soup.find("h1")
        h1_text = h1_el.get_text().strip() if h1_el else ""
        
        # Determine value proposition
        if h1_text and len(h1_text) < 160:
            value_prop = h1_text
        elif meta_desc:
            value_prop = meta_desc
        else:
            value_prop = f"Premium solutions designed by {business_name}."

        # 4. Inferred Category & Keywords
        full_text = " ".join([h1_text, meta_desc, raw_title]).lower()
        
        category = "B2B Software / Tech"
        competitors = ["Hubspot", "Segment", "Zapier"]
        if any(w in full_text for w in ["shop", "store", "cart", "product", "apparel", "wear", "shipping", "bottle", "skin"]):
            category = "Direct-to-Consumer (D2C)"
            competitors = ["Gymshark", "Glossier", "Allbirds"]
        elif any(w in full_text for w in ["agency", "consulting", "services", "advisory", "marketing", "partner"]):
            category = "Consulting & Agency"
            competitors = ["WPP", "Accenture Interactive", "Ogilvy"]
        elif any(w in full_text for w in ["clinic", "dental", "law", "local", "plumbing", "repair", "doctor"]):
            category = "Local Service Business"
            competitors = ["Local Market Leaders", "Regional Independents"]

        # Extract keywords
        words = re.findall(r"\b[a-zA-Z]{4,15}\b", full_text)
        stopwords = {"this", "that", "with", "from", "your", "have", "more", "about", "will", "what", "their"}
        keywords = list(dict.fromkeys([w for w in words if w not in stopwords]))[:6]

        return WebsiteScanResponse(
            url=raw_url,
            title=raw_title,
            meta_description=meta_desc,
            detected_business_name=business_name,
            detected_category=category,
            detected_value_prop=value_prop,
            detected_keywords=keywords,
            suggested_competitors=competitors,
            scan_success=True,
            message="Autonomous reconnaissance successfully extracted business metadata."
        )

    except Exception as e:
        logger.warning("Scraping error for URL %s: %s", raw_url, str(e))
        # Graceful fallback: synthesize based on domain
        return WebsiteScanResponse(
            url=raw_url,
            title=f"{fallback_business_name} Home",
            meta_description="",
            detected_business_name=fallback_business_name,
            detected_category="B2B Software / Tech",
            detected_value_prop=f"Intelligent growth and solutions powered by {fallback_business_name}.",
            detected_keywords=["growth", "scale", "performance", "digital"],
            suggested_competitors=["Industry Incumbents", "Category Alternatives"],
            scan_success=False,
            message=f"Site preview generated via domain heuristic (Network check: {str(e)[:60]}...)"
        )
