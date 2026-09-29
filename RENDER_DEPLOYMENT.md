# Deploying FORCEWELL AI to Render

This guide explains how to deploy **FORCEWELL AI — Personnel Welfare & Readiness Intelligence** to [Render](https://render.com) in under 2 minutes.

---

## Architecture Overview on Render

The platform is configured as a **Unified Full-Stack Web Service**:
- **Frontend:** React + Vite + TypeScript (built into static production assets in `client/dist`).
- **Backend:** Express API server (serves all `/api/*` endpoints and handles SPA routing fallback for the React frontend).
- **Database:** Connects automatically to **MongoDB Atlas** when `MONGODB_URI` is provided, or seamlessly activates the **Resilient In-Memory Data Store** (pre-seeded with 105 personnel across 5 battalions, 108 accounts, and full risk metrics) if no external database is configured.

This unified architecture means:
- **Zero CORS issues** (frontend and backend share the same origin).
- **Single Free Web Service** on Render (fits entirely within Render's free tier).
- **1-Click deployment** via `render.yaml`.

---

## Method 1: Deploy with Render Blueprint (Recommended)

1. Log in to [Render Dashboard](https://dashboard.render.com).
2. Click **New +** and select **Blueprint**.
3. Connect your GitHub repository:
   `https://github.com/udhayanl/AI-Based-Predictive-Personnel-Stress-and-Welfare-Monitoring-System-for-Uniformed-Forces`
4. Render will automatically detect [`render.yaml`](./render.yaml).
5. Click **Apply**. Render will automatically build the client and start the server!

---

## Method 2: Manual Web Service Setup

If you prefer to create the Web Service manually:

1. In Render Dashboard, click **New +** $\rightarrow$ **Web Service**.
2. Connect your GitHub repository:
   `https://github.com/udhayanl/AI-Based-Predictive-Personnel-Stress-and-Welfare-Monitoring-System-for-Uniformed-Forces`
3. Configure the following fields:
   * **Name:** `forcewell-ai` (or your preferred name)
   * **Region:** Any (e.g. `Oregon (US West)` or `Frankfurt (EU)`)
   * **Branch:** `main`
   * **Runtime:** `Node`
   * **Build Command:**
     ```bash
     npm run build
     ```
   * **Start Command:**
     ```bash
     npm start
     ```
   * **Plan:** `Free`

4. In the **Environment Variables** section, add:
   | Key | Value | Notes |
   |---|---|---|
   | `NODE_ENV` | `production` | Enables production caching & static file serving |
   | `JWT_SECRET` | `forcewell-jwt-secure-secret-key-2026` | Random secure string for authentication |
   | `MONGODB_URI` | *(Optional)* | Your MongoDB Atlas connection string |

5. Click **Create Web Service**.

---

## Verifying Deployment

Once Render finishes deploying:
1. Open your live URL: `https://<your-service-name>.onrender.com`
2. You will see the **FORCEWELL AI** cinematic authentication page.
3. Test the API health check:
   `https://<your-service-name>.onrender.com/api/health`

### Demo Evaluator Accounts (Password: `password123`)
* **Personnel:** `PF-1024` (SI Rajesh Kumar)
* **Welfare Officer:** `WO-2001` (Dr. Meenakshi Sharma)
* **Commander:** `CMD-3001` (Commandant Arvind Singhal)
* **System Admin:** `ADM-4001` (Suresh Menon)
