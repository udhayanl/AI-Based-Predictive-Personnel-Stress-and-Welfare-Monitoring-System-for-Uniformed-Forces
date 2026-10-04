# MWI · MISSION WELLBEING — Frontend Architecture

**AI-Based Predictive Personnel Stress and Welfare Monitoring System for Uniformed Forces**

A high-performance, editorial React + Vite + TypeScript web application styled with Tailwind CSS and Framer Motion, inspired by heavy grotesk typography, asymmetrical layouts, bold charcoal/lime contrast, and mission-control intelligence aesthetics.

---

## 🎨 Visual Design System

* **Background**: Deep Charcoal (`hsl(160, 12%, 11%)`)
* **Foreground**: Off-White (`hsl(150, 12%, 95%)`)
* **Accent**: Electric Lime (`hsl(84, 82%, 56%)`)
* **Borders & Dividers**: Subtle Charcoal (`hsl(160, 10%, 20%)`)
* **Cards**: Deep Slate Charcoal (`hsl(160, 12%, 15%)`)
* **Typography**: **Archivo** (Google Fonts)
  * `H1`: Archivo 900, uppercase, `clamp(52px, 8vw, 118px)`, line-height 0.92, letter-spacing -0.03em
  * `H2`: Archivo 900, uppercase, `clamp(34px, 4.5vw, 64px)`
  * `Body`: Archivo 500, 17px, line-height 1.6
  * `Labels`: Archivo 700, 13px, uppercase, letter-spacing 0.1em

---

## 🛠 Tech Stack

* **Framework**: React 19 + TypeScript
* **Bundler & Tooling**: Vite 8
* **Styling**: Tailwind CSS + Custom Archivo Typography
* **Motion & Animation**: Framer Motion (`framer-motion`)
* **Icons**: `lucide-react`
* **Utilities**: `clsx`, `tailwind-merge`

---

## 🚀 Running the Frontend Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev -- --host 127.0.0.1 --port 3000
```
Open your browser at: **`http://127.0.0.1:3000`**

### 3. Build for Production
```bash
npm run build
```
Creates an optimized, minified bundle in `dist/`.

---

## 🧩 Architectural Sections

1. **Top Information Bar**: 40px lime alert banner emphasizing human review and screening ethics.
2. **Sticky 78px Navbar**: Brand mark `MWI · MISSION WELLBEING`, routing controls, and backend health status pill with connection configuration modal.
3. **Hero Section**: Staggered animated H1 line-by-line (`UNDERSTAND STRESS. SUPPORT PEOPLE.`), call to actions, and the **AI Signal Field** visual.
4. **Signature Signal Field**: Editorial split card using hard diagonal CSS clip-path separating **Human Signals** from **AI Insight**.
5. **From Signals to Support (How It Works)**: 4 large blocks with oversized lime numerals (`01 ASSESS`, `02 ANALYZE`, `03 PREDICT`, `04 SUPPORT`).
6. **Model Pipeline**: Visual horizontal (desktop) and vertical (mobile) pipeline connecting User Input to Welfare Guidance.
7. **Assessment Page**: Multi-stage protocol (`01 Profile`, `02 Work Context`, `03 Wellbeing`, `04 Review & Submit`), segmented controls, 1-click test profiles, and review summary.
8. **AI Inference Overlay**: Modal with 4-step progress sequence during live FastAPI calls.
9. **Result Page**: Displays actual predicted `Growing_Stress` (`No`, `Maybe`, or `Yes`), animated class probability bars, model confidence score, contextual interpretation, AI Signal Meters, and non-punitive welfare support cards (`Support, Not Labels.`).
10. **Welfare Intelligence Dashboard**: Oversized KPI statistics, proportional class distribution bar, and recent audit activity.
11. **Assessment History**: Editorial timeline with search by ID, category filters, feature inspection modal, and CSV/JSON export.
12. **About & Responsible AI**: Detailed project disclosure, model comparison (Logistic Regression, Decision Tree, Random Forest), dataset proxy limitations, and governance principles.
13. **Final Full-Width Lime CTA**: High-impact closing banner inviting assessment completion.
