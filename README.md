# CRPF WelfareNet | AI-Based Predictive Personnel Stress and Welfare Monitoring System

[![Smart India Hackathon](https://img.shields.io/badge/SIH-2026-blue.svg)](https://sih.gov.in)
[![Problem Statement ID](https://img.shields.io/badge/Problem%20ID-SIH26186%20%2F%2026186-orange.svg)](#)
[![Ministry](https://img.shields.io/badge/Ministry-Home%20Affairs%20(MHA)-red.svg)](#)
[![Organization](https://img.shields.io/badge/Organization-CRPF%20Police%20II%20Division-navy.svg)](#)
[![Category](https://img.shields.io/badge/Category-Software%20%7C%20MedTech-emerald.svg)](#)

---

## 1. Executive Summary & Objective

**CRPF WelfareNet** is a production-quality, ethical AI-powered **Personnel Stress and Welfare Monitoring Platform** built for the Central Reserve Police Force (CRPF), Police II Division, under Ministry of Home Affairs guidelines for **Smart India Hackathon (SIH26186 / 26186)**.

The system helps authorized unit welfare officers and senior commanders detect early operational strain, workload imbalance, circadian fatigue, and cumulative burnout indicators among uniformed personnel.

### Ethical AI & Welfare Non-Diagnostic Doctrine
* **Support Indicator, Not a Medical Diagnosis:** Stress metrics are strictly presented as *AI-assisted welfare support indicators* and never as clinical or psychiatric diagnoses.
* **Non-Punitive & Non-Disciplinary:** The platform is explicitly restricted to welfare interventions, workload rebalancing, and rest cycle planning. It cannot be used for punitive measures, promotion evaluations, or disciplinary inquiries.
* **Privacy-First RBAC Architecture:** Commanders receive anonymized, aggregated battalion-level trends without raw psychological self-reports, protecting personnel dignity.

---

## 2. Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, TypeScript, Vite, Tailwind CSS, Lucide React, Recharts, React Router |
| **Backend** | Node.js, Express.js REST APIs, JWT Bearer Authentication, bcryptjs password hashing |
| **Database** | MongoDB & Mongoose ODM (with automated zero-dependency in-memory fallback for instant hackathon evaluation) |
| **AI / ML Engine** | Modular Predictive Risk & Explainability Engine (`server/services/riskEngine.js` & `ml-service/risk_engine.py`) |
| **Security & Privacy** | Role-Based Access Control (RBAC), Data Minimization, Immutable Audit Logging, Field Masking |

---

## 3. Demo User Accounts (Instant 1-Click Evaluation)

All accounts share the default password: **`password123`**

| Role | Service ID | Name & Rank | Authorization Scope |
| :--- | :--- | :--- | :--- |
| **Personnel** | `PF-1024` | SI Rajesh Kumar (101 Bn Alpha) | Personal wellness dashboard, voluntary check-in, leave & workload status, consent controls |
| **Welfare Officer** | `WO-2001` | Dr. Meenakshi Sharma (Chief Welfare Officer) | Force welfare intelligence, personnel risk registry, intervention lifecycle, counseling routing |
| **Commander** | `CMD-3001` | Commandant Arvind Singhal (Sector HQ) | Aggregated battalion trends, workload balance, deployment stress patterns (masked IDs) |
| **System Admin** | `ADM-4001` | Suresh Menon (Director IT) | User governance, immutable security audit trail logs, system health diagnostics |

> **Pro Tip for Hackathon Judges:** A floating **Demo Persona Switcher** is embedded in the top navigation bar, allowing you to transition between all 4 personas in a single click!

---

## 4. End-to-End Demo Workflow (Section 34 Scenario)

1. **Personnel State (PF-1024):**
   * Continuous forward deployment: **94 days**
   * Average weekly duty: **66.0 hrs/week**
   * Night shifts: **11 shifts in 30 days**
   * Interval since sanctioned leave: **82 days**
   * Self-reported sleep: **3.5 / 10**
2. **AI Predictive Analytics Engine:**
   * Generates **Support Indicator: 71 / 100** (Category: *Elevated Support Indicator*)
   * Breaks down **Contributing Stressors** (+ extended deployment, + duty hours > 60h, + sleep disturbance, + leave gap)
   * Factors in **Protective Buffers** (✓ strong unit cohesion score: 7.8/10, ✓ wellness participation)
3. **Officer Review & Intervention Action:**
   * Welfare Officer (Dr. Sharma) reviews the explainable factors.
   * Clicks **"Create Welfare Intervention"** → Selects *Workload Review & Shift Rotation* and *Priority Leave Sanction*.
   * Tracks lifecycle from *New* → *Support Planned* → *In Progress* → *Follow-up Required* → *Completed*.

---

## 5. Project Directory Structure

```text
ai-based-predictive-personnel-stress-and-welfare-monitoring-system/
├── client/                     # Frontend Application (React + Vite + Tailwind + TypeScript)
│   ├── src/
│   │   ├── api/                # Axios API services (auth, personnel, wellness, risk, interventions, etc.)
│   │   ├── components/         # Reusable UI (Navbar, Sidebar, StatCards, AIExplainabilityModal, etc.)
│   │   ├── context/            # AuthContext with 1-click role switcher
│   │   ├── layouts/            # DashboardLayout and PublicLayout
│   │   ├── pages/              # 12+ Feature pages (Landing, Dashboards, Tables, Assessment, etc.)
│   │   └── types/              # Comprehensive TypeScript interfaces
│   └── package.json
│
├── server/                     # Backend API (Node.js + Express + Mongoose + Resilient Store)
│   ├── config/                 # Database configuration (MongoDB with auto-memory fallback)
│   ├── controllers/            # 11 REST controllers
│   ├── middleware/             # authenticateUser, authorizeRole, checkDataAccess, auditSensitiveAccess
│   ├── models/                 # Mongoose schemas (User, PersonnelProfile, WellnessAssessment, etc.)
│   ├── routes/                 # REST API endpoints
│   ├── services/               # WelfareRiskEngine (Explainable AI risk scoring)
│   ├── utils/                  # Unified data store pre-seeded with 105 personnel & 5 units
│   └── server.js               # Main Express entry point
│
├── ml-service/                 # Python Predictive Risk Analytics Microservice
│   └── risk_engine.py          # Standalone explainable ML risk engine with CLI execution
│
├── .env.example                # Template configuration file
├── package.json                # Root package with concurrently launcher
└── README.md
```

---

## 6. How to Run Locally

### Quick Start (Runs both Frontend and Backend concurrently):

```bash
# 1. Install root dependencies (concurrently)
npm install

# 2. Run both Client (Port 5173) and Server (Port 5000)
npm run dev
```

### Alternatively, Run Separately:

#### Backend:
```bash
cd server
npm install
npm run dev
```
* Backend active at: `http://localhost:5000`
* Health Check: `http://localhost:5000/api/health`

#### Frontend:
```bash
cd client
npm install
npm run dev
```
* Frontend active at: `http://localhost:5173`

#### Test Python ML Risk Engine:
```bash
python ml-service/risk_engine.py
```

---

## 7. Compliance & Standards

* **Digital Personal Data Protection (DPDP) Act, 2023** compliant architecture.
* **Role-Based Access Control (RBAC)** strictly enforced at backend middleware layer.
* **Zero Hardcoded Secrets:** Configured via `.env`.
* **Zero-Setup Database Guarantee:** Connects automatically to local MongoDB; if unavailable, seamlessly initializes high-fidelity in-memory document store pre-populated with 105 personnel profiles, 5 battalions, historical duty logs, and audit trails.
