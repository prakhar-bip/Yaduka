<div align="center">

# 🏔️ YADUKA
### *The Strategic Growth Expedition for Ambitious Startups*

**An Autonomous Market Reconnaissance & Strategy War Room Engine**  
*Built for the AWS Hackathon (17 Sept – 19 Sept 2026)*

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![AWS Track: BUILD IT](https://img.shields.io/badge/AWS%20Track-BUILD%20IT%20(Open%20Source)-orange.svg)](aws/template.yaml)
[![AWS Track: SHIP IT](https://img.shields.io/badge/AWS%20Track-SHIP%20IT%20(Cloud%20Deploy)-green.svg)](aws/template.yaml)
[![Python 3.11+](https://img.shields.io/badge/Python-3.11%2B-blue.svg)](backend/run.py)
[![React 18](https://img.shields.io/badge/Frontend-React%2018%20%2B%20Vite-61dafb.svg)](src/App.jsx)

</div>

---

## 🎯 Executive Summary & Hackathon Tracks Alignment

**Yaduka** solves the fatal flaw killing 90% of early-stage startups and small businesses: **burning their marketing runway on blind ad spend**. Instead of throwing capital at unvalidated campaigns, Yaduka absorbs the founder's business reality, scours the competitive landscape for untapped customer niches, stress-tests positioning in an interactive AI Strategy War Room, and outputs an executable 30-60-90 day growth blueprint.

This project was architected from Day 1 to address the **Two Main Tracks** of the AWS Hackathon:

| Hackathon Requirement | Track 1: **BUILD IT** (Open Source / Local)<br/>*No AWS account, no credit card, no bill* | Track 2: **SHIP IT** (Deployed / Cloud)<br/>*Cloud-ready, up to $200 free tier* |
| :--- | :--- | :--- |
| **Agents and AI** | **Strands Agents SDK** multi-agent loop with local LLM orchestration | **SageMaker AI** & Bedrock foundation model endpoints |
| **Containers & K8s** | **Finch** CLI container engine (`Dockerfile.backend`, `Dockerfile.frontend`) | **ECS Fargate** & **EKS** container clusters |
| **Serverless** | **SAM CLI** (`aws/template.yaml`) + **LocalStack** (`aws/docker-compose.localstack.yml`) | **AWS Lambda**, **API Gateway HTTP APIs**, **Step Functions** |
| **Servers & Runtimes** | **Amazon Corretto** / Python runtime with **Firecracker** lightweight isolation | **AWS App Runner**, **EC2**, **Amplify Hosting** |
| **Data and Search** | **OpenSearch** (`backend/app/services/opensearch_service.py`) for semantic market clustering | **Amazon S3** (artifact storage), **DynamoDB** (sessions), **Aurora/RDS** (PostgreSQL) |
| **Auth and Policy** | **Cedar Policy Engine** (`aws/cedar/policies.cedar`, `backend/app/core/cedar_policy.py`) | **Amazon Cognito** user pool & federated identity |
| **The Plumbing** | Local asynchronous event dispatcher | **CloudFront**, **EventBridge**, **SQS**, **SNS**, **CloudWatch** |

---

## 🧭 The Yaduka 5-Stage Expedition Doctrine

```mermaid
flowchart LR
    A["1. Intake & Deep Scrape\n(URL & Business Realities)"] --> B["2. Market Recon Radar\n(Scout Competitors & Niches)"]
    B --> C["3. Strategic Awakening\n(Unit Economics & Moat Audit)"]
    C --> D["4. Strategy War Room\n(Interactive Multi-Turn AI Co-Pilot)"]
    D --> E["5. Master Execution Plan\n(30-60-90 Day Milestone Blueprint)"]

    style A fill:#FAF7F2,stroke:#5F4E4A,stroke-width:2px,color:#382C29
    style B fill:#FAF7F2,stroke:#D6ADAD,stroke-width:2px,color:#382C29
    style C fill:#FAF7F2,stroke:#5F4E4A,stroke-width:2px,color:#382C29
    style D fill:#F4EFEA,stroke:#5F4E4A,stroke-width:3px,color:#382C29
    style E fill:#382C29,stroke:#D6ADAD,stroke-width:2px,color:#FAF7F2
```

1. **Autonomous Ingestion**: Founders input their website URL or business profile. Yaduka's autonomous scraper parses value propositions, metadata, offerings, and audience signals.
2. **Reconnaissance Radar**: Explores competitor terrain, identifying 3+ untapped customer niches and quantifying potential ad spend waste before launch.
3. **Strategic Awakening**: Diagnoses unit economics, customer lifetime value (LTV), customer acquisition cost (CAC), and channel vulnerabilities.
4. **Strategy War Room**: A live, multi-turn tactical co-pilot that interviews the founder, validates positioning, and reaches consensus on strategic levers.
5. **Master Execution Plan**: Synthesizes a structured 30-60-90 day tactical roadmap with step-by-step milestones, KPI benchmarks, and contingency playbooks.

---

## 🏛️ System Architecture

```mermaid
graph TB
    subgraph Client["Client Tier (React 18 + Vite + Tailwind)"]
        UI["Yaduka Duo-Tone Web UI"]
        Radar["Live Recon Radar SVG"]
        WarRoomUI["War Room Dialogue Room"]
        PlanUI["Master Execution Plan View"]
    end

    subgraph Auth["Auth & Policy Tier"]
        Cedar["Amazon Cedar Policies\n(RBAC/ABAC Fine-Grained Rules)"]
    end

    subgraph Backend["Application Tier (FastAPI + Async Python)"]
        API["FastAPI REST & WebSocket Gateway"]
        Scraper["Autonomous Web Scraper Engine"]
        ReconAgent["Market Intelligence Agent"]
        StrategyAgent["War Room AI Co-pilot"]
        PlanAgent["Roadmap Synthesizer"]
    end

    subgraph Search["Search & Vector Tier"]
        OpenSearch["Amazon OpenSearch\n(Semantic Niche & Pain Point Index)"]
    end

    subgraph Storage["Storage & Persistence"]
        DB[(PostgreSQL / SQLite Dual Engine)]
        S3[(AWS S3 / Artifact Store)]
        DDB[(DynamoDB Session Store)]
    end

    UI --> API
    Radar --> API
    WarRoomUI --> API
    PlanUI --> API

    API --> Cedar
    API --> Scraper
    API --> ReconAgent
    API --> StrategyAgent
    API --> PlanAgent

    ReconAgent --> OpenSearch
    ReconAgent --> DB
    StrategyAgent --> DDB
    PlanAgent --> S3
```

---

## 🚀 Quick Start Guide

### 1. Local Development (Native Python & Node)

#### Prerequisites:
- Python 3.10+ (Python 3.11 recommended)
- Node.js 18+ (Node 20+ recommended)

#### Step 1: Start Backend
```bash
# Navigate to backend and install requirements
cd backend
pip install -r requirements.txt

# Start FastAPI server (defaults to port 8000)
python run.py
```
- API Base: `http://127.0.0.1:8000`
- Swagger Interactive Docs: `http://127.0.0.1:8000/docs`
- Health Check: `http://127.0.0.1:8000/api/health`

#### Step 2: Start Frontend
```bash
# In project root
npm install
npm run dev
```
- Frontend UI: `http://localhost:3000`

---

### 2. Zero-Cost AWS Emulation (Track 1: LocalStack & OpenSearch)

To test the complete serverless architecture locally with **zero AWS billing**:

```bash
# Launch LocalStack and OpenSearch
docker-compose -f aws/docker-compose.localstack.yml up -d

# Verify LocalStack health
curl http://localhost:4566/_localstack/health
```

---

### 3. Containerized Deployment (Finch or Docker)

```bash
# Build and run the entire stack with a single command:
docker-compose up --build
```
Or with **AWS Finch**:
```bash
finch compose up --build
```

---

## 🔒 Fine-Grained Authorization with Cedar

Yaduka implements **Amazon Cedar** policies located at [`aws/cedar/policies.cedar`](aws/cedar/policies.cedar):

```cedar
// Sample Cedar Policy: Founder Authorization
permit (
  principal in Role::"Founder",
  action in [
    Action::"ViewProfile",
    Action::"TriggerReconSweep",
    Action::"InitiateWarRoom",
    Action::"GenerateMasterPlan"
  ],
  resource is BusinessProfile
)
when {
  principal.businessId == resource.businessId
};

// System Guardrail: Forbid reconnaissance against unverified/flagged domains
forbid (
  principal,
  action == Action::"TriggerReconSweep",
  resource is BusinessProfile
)
unless {
  resource.isFlagged == false && resource.isVerifiedDomain == true
};
```

---

## 📅 Hackathon Development Timeline (17 Sept – 19 Sept 2026)

- **Day 1 (17 Sept 2026)**: Inception, workspace foundation, Cedar policy architecture, FastAPI backend scaffold, and React duo-tone UI design system.
- **Day 2 (18 Sept 2026)**: Autonomous website scraper, LLM reasoning co-pilot, market reconnaissance analyzer, Strategy War Room dialogue engine, and 30-60-90 day roadmap synthesizer.
- **Day 3 (19 Sept 2026)**: AWS SAM serverless templates, LocalStack compose configuration, OpenSearch semantic indexing, hackathon documentation, and v1.0.0 release.

---

<div align="center">
<strong>YADUKA — Strategic Growth Expedition Engine</strong><br/>
<em>"When you reach your first level of success, the climb doesn’t end. It awards you the happiness of victory, followed immediately by the thrill of higher, steeper mountains."</em>
</div>
