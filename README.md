> ⚡ **Enterprise-Grade ERP Platform** — 6 integrated application suites under a unified Multi-Company architecture with two-layer AI integration.

<br/>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js 15"/>
  <img src="https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19"/>
  <img src="https://img.shields.io/badge/TailwindCSS_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="TailwindCSS v4"/>
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"/>
  <img src="https://img.shields.io/badge/Lucide_Icons-F56565?style=for-the-badge&logo=lucide&logoColor=white" alt="Lucide Icons"/>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript"/>
</p>

<br/>

<div align="center">
  <h1>🏢 Enterprise All-in-One Platform</h1>
  <h3>AI-Powered ERP & Business Automation System</h3>
  <br/>
  <strong>Manufacturing · Multi-Outlet Retail · E-Commerce · Accounts · HR Payroll · AI Automation</strong>
  <br/><br/><br/>
</div>

---

<details>
<summary><strong>📖 Table of Contents</strong></summary>

- [Overview](#overview)
- [Platform Architecture](#platform-architecture)
- [Application Suites](#-application-suites)
  - [1. Business App (Core)](#1-business-app-core)
  - [2. HR & Payroll App](#2-hr--payroll-app)
  - [3. Manufacturing App](#3-manufacturing-app-rmg-production)
  - [4. R&D and Automation Apps](#4-rd--automation-apps)
  - [5. E-Commerce Analytics Storefront](#5-e-commerce-analytics-storefront)
  - [6. Executive Mobile App](#6-executive-mobile-app)
- [Multi-Company Architecture](#multi-company-architecture)
- [AI Integration Layer](#-ai-integration-layer)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [API Routes](#api-routes)
- [Project Structure](#project-structure)
- [UI/UX Design System](#uiux-design-system)
- [License](#license)

</details>

---

## Overview

A comprehensive **Enterprise Resource Planning (ERP) and automation platform** built for **Baby Shop Ltd.** — a vertically integrated baby-products brand operating 60+ retail outlets, in-house RMG garment manufacturing, and direct-to-consumer e-commerce.

The system unifies every business function on a single technology backbone — eliminating data silos, manual reconciliation, and operational opacity.

### What Makes This Platform Unique

| Feature | Description |
|---|---|
| **Multi-Company** | Baby Shop Ltd. & SNS operate as fully isolated entities sharing one codebase |
| **Dual AI Layers** | Conversational "Ask AI" + Internal automation/predictive engine |
| **6 App Suites** | From factory floor to executive boardroom — one unified interface |
| **Real-Time API** | All tables perform live state mutations with backend simulation |
| **Dark/Light UI** | Premium adaptive theme with glassmorphic design language |

---

## Platform Architecture

```
┌──────────────────────────────────────────────────────────┐
│                    MULTI-COMPANY PORTAL                    │
│              Baby Shop Ltd.  │  SNS                       │
├──────────────────────────────────────────────────────────┤
│                                                           │
│  ┌────────────┐  ┌────────┐  ┌──────────┐  ┌─────────┐  │
│  │  Business   │  │  HR &   │  │ Manufac- │  │  R&D &  │  │
│  │  App Core   │  │ Payroll │  │  turing  │  │Automation│  │
│  ├────────────┤  ├────────┤  ├──────────┤  ├─────────┤  │
│  │• Products   │  │• HRM   │  │• Prod.   │  │• AI Task│  │
│  │• Inventory  │  │• Payroll│  │  Orders  │  │  Engine │  │
│  │• POS        │  │• Recruit│  │• Stage   │  │• Actions│  │
│  │• Deposits   │  │• Attend │  │  Tracking│  │• Approv.│  │
│  │• Accounts   │  │• Perf.  │  │• QC      │  │• Heatmap│  │
│  └────────────┘  └────────┘  │• Sub-con. │  └─────────┘  │
│                              └──────────┘                │
│  ┌────────────┐  ┌────────────┐                          │
│  │  E-Commerce │  │  Executive  │                         │
│  │  Storefront │  │  Mobile App │                         │
│  ├────────────┤  ├────────────┤                          │
│  │• Orders     │  │• Dashboard  │                         │
│  │• Returns    │  │• AI Assist  │                         │
│  │• Fulfillment│  │• Approvals  │                         │
│  │• Multi-lang │  │• Reports    │                         │
│  └────────────┘  └────────────┘                          │
│                                                           │
├──────────────────────────────────────────────────────────┤
│                    AI INTEGRATION LAYER                    │
│   Ask AI (Conversational)  │  Internal AI (Automation)    │
└──────────────────────────────────────────────────────────┘
```

---

## 🏪 Application Suites

### 1. Business App (Core)

**Product · Inventory · Procurement · Sales · POS · Accounts · Finance · Reports**

The operational backbone — from style-based product management through multi-outlet POS, daily bank deposit reconciliation, and management reporting.

| Module | Key Features |
|---|---|
| **Style & Product** | Style master, variant matrix, auto SKU/QR, BOM, lifecycle management |
| **Inventory** | Multi-location stock, STN, goods-in-transit, min stock alerts, batch traceability |
| **Procurement** | PR → PO → GRN workflow, supplier scorecard, landed cost, BOM-driven suggestions |
| **Multi-Outlet POS** | Barcode scan, multi-payment, offline mode, cashier shift mgmt, loyalty |
| **Bank Deposits** | Day-end collection → deposit → verification → reconciliation workflow |
| **Accounts** | Double-entry, auto-journal posting, branch P&L, style margin, VAT/tax |
| **Reports** | Executive dashboard, outlet leaderboard, inventory health, AI report queries |

**Interactive Features:**
- ✅ Style status update via API (Active / Seasonal / Discontinued)
- ✅ Deposit verification with toast notifications
- ✅ Real-time inventory status badges (OK / LOW / CRITICAL)

---

### 2. HR & Payroll App

**HRM · Payroll · Recruitment · Leave · Attendance · Performance · Training · AI Monitoring**

Complete employee lifecycle management with AI-powered productivity monitoring for factory workers, outlet staff, and head office teams.

| Module | Key Features |
|---|---|
| **Core HRM** | Employee master, org chart, document mgmt, probation tracking, self-service |
| **Payroll** | Grade-based config, factory piece-rate, OT calc, bank transfer file, tax |
| **Recruitment** | Job requisition → posting → screening → interview → offer → onboarding |
| **Leave** | Multi-type leave, balance tracking, calendar view, factory integration |
| **Attendance** | Biometric/RFID integration, shift mgmt, OT calc, monthly summary |
| **Performance** | KPI framework, 360 feedback, PIP workflow, rating-linked increments |
| **AI Monitoring** | Productivity scoring, QC pass analysis, burnout alerts, top performer ID |

**Interactive Features:**
- ✅ Approve & Lock Payroll with backend state update
- ✅ Employee status badges (Active / Probation)
- ✅ Attendance tracking with Present/Late/Absent indicators

---

### 3. Manufacturing App (RMG Production)

**RMG Production · Style · Sample · BOM · Stage Tracking · QA · Sub-contractor · Efficiency**

Tracks every garment from design concept through sample approval, production planning, stage-by-stage manufacturing, quality control, and finished goods transfer.

| Module | Key Features |
|---|---|
| **Style & Sample** | Concept → Tech Pack → Sample → Approval → Mass Production workflow |
| **Production Stages** | 8-stage tracking: Cutting → Sewing → Embroidery → Washing → QC → Finishing → Packaging → Transfer |
| **Stage QC** | Pass/Fail per piece, defect categorization, rework tracking |
| **Sub-Contractor** | JWO management, material issuance, goods receipt, ledger, performance scoring |
| **Efficiency** | Line efficiency, SMV-based, bottleneck analysis, operator performance, CPM |
| **Supply Chain** | Raw material MRP, BOM-driven PR, fabric roll mgmt, wastage tracking |

**Interactive Features:**
- ✅ Production order progress bars with color-coded completion
- ✅ 8-stage flow visualization with active stage highlighting
- ✅ Mark JWO Complete with backend state sync

---

### 4. R&D & Automation Apps

**AI Task Engine · Action Suggestions · Approval Management · Purchase Requisition · R&D · Branch Heatmap**

Supercharges daily operations with AI-driven task intelligence, smart recommendations, streamlined approvals, and powerful visual analytics.

| Feature | Key Features |
|---|---|
| **AI Action Panel** | Preset queries, natural language input, streaming response animation |
| **Action Suggestions** | Personalized "My Actions" by role, priority-scored, auto-assigned |
| **Approval Management** | Centralized dashboard, multi-level chains, approve/reject with one tap |
| **Smart PR** | AI-assisted item suggestion, budget check, recurring templates |
| **AI Task Engine** | Auto-task creation from system events, escalation rules, analytics |
| **Branch Heatmap** | 60+ outlet performance visualization, color-coded by target attainment |

**Interactive Features:**
- ✅ AI chat with preset queries + typing animation
- ✅ Approve/Reject actions with instant state update
- ✅ Complete action items with feedback
- ✅ Branch heatmap grid with performance colors

---

### 5. E-Commerce Analytics Storefront

**Multi-Language · Multi-Country · AI Search · AI Suggestions · AI Chatbot · Integrated with ERP**

Professional, AI-powered online store sharing the same product catalogue and inventory pool as physical outlets.

| Feature | Key Features |
|---|---|
| **Storefront** | Mobile-first, style-based pages, live inventory, SEO-optimized |
| **Order Management** | Pick → Pack → Dispatch, courier API, customer tracking portal |
| **Return Management** | Nearest outlet routing, condition inspection, refund processing |
| **Multi-Language** | Bengali & English, additional languages addable |
| **AI Features** | Natural language search, recommendations, chatbot, visual search, sizing assistant |

**Interactive Features:**
- ✅ Order status filter pipeline (Pending → Picked → Shipped → Delivered)
- ✅ Return management with Receive/Reject/Refund workflow
- ✅ Nearest outlet routing logic visualization

---

### 6. Executive Mobile App

**Dashboard · Reports · Tasks · Approvals · AI Assistant · AI Chatbot**

Dedicated mobile experience for MD, Directors, and senior managers — designed for decision-making on the go.

| Feature | Key Features |
|---|---|
| **Dashboard** | Today's revenue, top styles, outlet status, cross-company KPIs |
| **AI Assistant** | Voice/text queries, AI Digest morning summary, anomaly alerts |
| **Task Management** | AI-curated action feed, task assignment, progress tracking |
| **Approvals** | One-tap approve/reject, delegation during absence |
| **Reports** | Financial summary, production status, HR snapshot, push notifications |

**Interactive Features:**
- ✅ AI query panel with preset business questions
- ✅ Cross-company KPI comparison cards
- ✅ Quick actions grid for common tasks

---

## Multi-Company Architecture

The platform serves two independent businesses under a single unified portal:

```
┌─────────────────────────────────────┐
│         SINGLE LOGIN PORTAL          │
├──────────────────┬──────────────────┤
│   Baby Shop Ltd.  │       SNS        │
│   62 Outlets      │    18 Outlets    │
│   1,240 Employees │    480 Employees │
│   ৳2.84Cr Revenue │   ৳1.23Cr Revenue│
├──────────────────┴──────────────────┤
│   Full Data Isolation · Shared       │
│   Infrastructure · Company Context   │
└─────────────────────────────────────┘
```

Switching companies instantly reloads all dashboard data, graphs, and tables via the global state provider.

---

## 🤖 AI Integration Layer

Two distinct AI systems work in concert across all six application suites:

| AI Layer | Type | Capabilities |
|---|---|---|
| **Ask AI & Reporting** | Conversational (ChatGPT-style) | Natural language Q&A trained on business data, instant plain-language answers |
| **Recommendation & Automation** | Internal ML + Rule Engine | Predictive restocking, efficiency alerts, anomaly detection, smart routing, sales forecasting |

**Example AI Queries:**
```
"What were last week's top selling styles?"
"Show me all styles with margin below 30%"
"Compare outlet Dhanmondi vs Uttara last month"
"Who are the top 5 performers in Outlet Dhanmondi this quarter?"
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Next.js 15 (App Router), React 19, TailwindCSS v4 |
| **State Management** | React Context API (Company, Theme, Toast) |
| **Icons** | Lucide React |
| **Backend/API** | Next.js API Routes (RESTful) |
| **Database** | MongoDB with Mongoose (schema blueprints) |
| **Charts** | Recharts (integrated) |
| **Authentication** | JWT-ready (RBAC structure in place) |
| **Theme** | Dark/Light adaptive with glassmorphic design |

---

## Getting Started

### Prerequisites

- Node.js 18+ (v24.12.0 recommended)
- npm 10+
- MongoDB (local or Atlas)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd enterprise-platform

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`.

### Build for Production

```bash
npm run build
npm start
```

### Run Linter

```bash
npm run lint
```

---

## API Routes

All routes are implemented as Next.js App Router API handlers in pure JavaScript:

| Route | Methods | Purpose |
|---|---|---|
| `/api/company` | GET, POST | Multi-company context switching |
| `/api/products` | GET, PUT | Style & product management |
| `/api/inventory` | GET, POST | Multi-location stock management |
| `/api/deposits` | GET, PUT | Daily bank deposit workflow |
| `/api/purchase-requisitions` | GET, POST | Smart procurement |
| `/api/payroll` | GET, POST | Payroll processing & approval |
| `/api/employees` | GET, PUT | Employee lifecycle |
| `/api/attendance` | GET | Biometric attendance tracking |
| `/api/production` | GET, PUT | Production order management |
| `/api/subcontractors` | GET, PUT | Sub-contractor & JWO management |
| `/api/approvals` | GET, PUT | Centralized approval dashboard |
| `/api/orders` | GET | E-commerce order management |
| `/api/returns` | GET, PUT | Return routing & processing |
| `/api/actions` | GET, PUT | AI action item management |
| `/api/ai` | GET, POST | Ask AI conversational engine |

---

## Project Structure

```
enterprise-platform/
├── src/
│   ├── app/
│   │   ├── api/                    # 16 RESTful API routes
│   │   │   ├── ai/
│   │   │   ├── approvals/
│   │   │   ├── attendance/
│   │   │   ├── company/
│   │   │   ├── deposits/
│   │   │   ├── employees/
│   │   │   ├── inventory/
│   │   │   ├── orders/
│   │   │   ├── payroll/
│   │   │   ├── production/
│   │   │   ├── products/
│   │   │   ├── purchase-requisitions/
│   │   │   ├── returns/
│   │   │   ├── subcontractors/
│   │   │   └── actions/
│   │   ├── globals.css             # Design system & utility classes
│   │   ├── layout.js               # Root layout with providers
│   │   └── page.js                 # Entry point
│   ├── components/
│   │   ├── apps/
│   │   │   ├── PlatformDashboard.js
│   │   │   ├── business/
│   │   │   ├── hr/
│   │   │   ├── manufacturing/
│   │   │   ├── rd-automation/
│   │   │   ├── ecommerce/
│   │   │   └── executive/
│   │   ├── layout/
│   │   │   ├── Sidebar.js
│   │   │   ├── TopBar.js
│   │   │   ├── CompanySwitcher.js
│   │   │   └── MainLayout.js
│   │   └── ui/                    # Reusable UI primitives
│   ├── lib/
│   │   └── mockData.js            # Central data repository
│   └── providers/
│       ├── CompanyContext.js
│       ├── ThemeContext.js
│       └── ToastContext.js
├── public/
├── package.json
├── next.config.mjs
└── README.md
```

---

## UI/UX Design System

Built with modern, premium design principles inspired by industry-leading patterns:

### Design Language

- **Glassmorphism** — Frosted glass panels with backdrop blur
- **Gradient Accents** — Subtle gradient borders and text highlights
- **Micro-Interactions** — Smooth transitions, hover states, active scales
- **Dark-First** — High-contrast professional dark mode with warm lighting
- **Responsive Grids** — Adaptive layouts across all screen sizes

### Component Library

| Component | Usage |
|---|---|
| `glass-card` | Container panels with glassmorphic styling |
| `stat-card` | Metric display cards with icon + value |
| `sidebar-link` | Navigation items with active state |
| `badge-*` | Status indicators (success/warning/danger/info) |
| `btn-*` | Button variants (primary/secondary/danger/success) |
| `table-container` | Bordered table wrapper with hover states |
| `input` | Form input with focus ring |
| `modal-overlay` | Modal dialog backdrop + content |
| `toast` | Notification toast with slide-up animation |

---

## License

This project is built for **Baby Shop Ltd. & SNS** — an enterprise ERP solution by **Taskco Digital**.

---

<div align="center">
  <br/>
  <p>
    Built with ❤️ by <strong>Rantu_Dev</strong> ·
    <a href="mailto:jahangir@taskco.io">Contact</a> ·
    <a href="https://taskco.io">taskco.io</a>
  </p>
  <p>
    <em>Next.js 15 · React 19 · TailwindCSS v4 · MongoDB · AI-Powered</em>
  </p>
  <br/>
</div>
