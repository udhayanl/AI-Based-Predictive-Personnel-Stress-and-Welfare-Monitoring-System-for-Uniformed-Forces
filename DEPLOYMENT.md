# Production Deployment Guide: Render + Vercel + Supabase

**AI-Based Predictive Personnel Stress & Welfare Monitoring System for Uniformed Forces**

This guide provides step-by-step instructions to deploy your full-stack project across production cloud providers:
* **Database**: **Supabase** (PostgreSQL cloud database)
* **Backend**: **Render** (FastAPI Python machine learning web service)
* **Frontend**: **Vercel** (React + Vite + Tailwind CSS single-page application)

---

## 🏗️ Production Architecture

```
[ USER BROWSER ]
       │
       ▼
[ VERCEL (Frontend) ]
  • URL: https://personnel-stress-ai.vercel.app
  • Framework: React + Vite + TypeScript + Tailwind
  • Env: VITE_API_BASE_URL
       │
       │ HTTP POST /predict (JSON)
       ▼
[ RENDER (Backend) ]
  • URL: https://personnel-stress-backend.onrender.com
  • Runtime: Python FastAPI + Uvicorn
  • ML Model: personnel_stress_model.pkl (Scikit-Learn Pipeline)
  • Env: SUPABASE_URL, SUPABASE_KEY, PORT
       │
       │ PostgREST / REST API
       ▼
[ SUPABASE (Database) ]
  • PostgreSQL Cloud Database
  • Table: public.assessments
```

---

## 🗄️ Step 1: Set Up Supabase (Database)

1. Go to [supabase.com](https://supabase.com/) and sign in (or create a free account).
2. Click **"New Project"**.
   * **Name**: `personnel-stress-db`
   * **Database Password**: Choose a secure password (save it safely).
   * **Region**: Choose the closest region to your location.
   * Click **"Create new project"** (takes ~1-2 minutes).
3. Once the dashboard opens, click **"SQL Editor"** in the left sidebar.
4. Click **"New query"** and copy the contents of [`supabase/schema.sql`](file:///c:/Users/vanth/Personal_Stress_AI/supabase/schema.sql):
   ```sql
   -- Create assessments table
   CREATE TABLE IF NOT EXISTS public.assessments (
       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       assessment_id TEXT UNIQUE NOT NULL,
       personnel_id TEXT NOT NULL,
       created_at TIMESTAMPTZ DEFAULT NOW(),
       date TEXT NOT NULL,
       prediction TEXT NOT NULL,
       confidence NUMERIC(5, 2) NOT NULL,
       probabilities JSONB NOT NULL,
       inputs JSONB NOT NULL,
       guidance TEXT,
       is_demo BOOLEAN DEFAULT FALSE
   );

   CREATE INDEX IF NOT EXISTS idx_assessments_created_at ON public.assessments(created_at DESC);
   ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;
   CREATE POLICY "Allow public read" ON public.assessments FOR SELECT USING (true);
   CREATE POLICY "Allow inserts" ON public.assessments FOR INSERT WITH CHECK (true);
   ```
5. Click **"Run"**. You will see `Success. No rows returned`.
6. Retrieve your Supabase API keys:
   * Go to **Project Settings** (gear icon) -> **API**.
   * Copy the **Project URL** (e.g. `https://xyzcompany.supabase.co`).
   * Copy the **anon public key** or **service_role secret key**.

---

## 🚀 Step 2: Deploy Backend to Render

### A. Important: Pushing the 172 MB Model to GitHub
GitHub blocks files over 100 MB by default. Since `personnel_stress_model.pkl` is 172 MB, use **Git LFS** (Large File Storage):

```bash
# 1. Install Git LFS (if not already installed)
git lfs install

# 2. Track large model files
git lfs track "*.pkl"

# 3. Add and commit all files
git add .
git commit -m "feat: setup full-stack for Render, Vercel and Supabase"

# 4. Push to your GitHub repository
git push origin main
```

*(Alternative Option: If you do not wish to use Git LFS, upload `personnel_stress_model.pkl` to a Supabase Storage bucket or GitHub Release, and provide its public download link in the Render environment variable `MODEL_DOWNLOAD_URL`. The backend will automatically download it on startup!)*

### B. Create Web Service on Render
1. Go to [render.com](https://render.com/) and sign in.
2. Click **"New +"** -> **"Web Service"**.
3. Connect your GitHub repository: `Personal_Stress_AI`.
4. Configure the service:
   * **Name**: `personnel-stress-backend`
   * **Root Directory**: `backend`
   * **Environment**: `Python 3`
   * **Region**: Oregon (US West) or closest region
   * **Branch**: `main`
   * **Build Command**: `pip install -r requirements.txt`
   * **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   * **Instance Type**: `Free`
5. In the **Environment Variables** section, add:
   * `PYTHON_VERSION` = `3.11.9`
   * `SUPABASE_URL` = `https://your-project-ref.supabase.co`
   * `SUPABASE_KEY` = `your-supabase-anon-or-service-role-key`
6. Click **"Deploy Web Service"**.
7. Once deployed, Render will provide your public backend URL, for example:
   ```
   https://personnel-stress-backend.onrender.com
   ```
   Test it in your browser: `https://personnel-stress-backend.onrender.com/health` -> should return `{"status": "healthy", "model_loaded": true}`!

---

## ⚡ Step 3: Deploy Frontend to Vercel

1. Go to [vercel.com](https://vercel.com/) and log in with GitHub.
2. Click **"Add New..."** -> **"Project"**.
3. Select your GitHub repository.
4. Configure Project Settings:
   * **Framework Preset**: `Vite`
   * **Root Directory**: Click "Edit" and choose **`frontend`**
   * **Build Command**: `npm run build` (or leave default)
   * **Output Directory**: `dist` (default)
5. Under **Environment Variables**, add:
   * **Key**: `VITE_API_BASE_URL`
   * **Value**: `https://personnel-stress-backend.onrender.com` *(your live Render backend URL from Step 2)*
6. Click **"Deploy"**.
7. Vercel will build and launch your application in ~45 seconds, providing a production domain like:
   ```
   https://personnel-stress-ai.vercel.app
   ```

---

## ✅ Step 4: End-to-End Verification

1. Open your live Vercel URL (e.g. `https://personnel-stress-ai.vercel.app`).
2. Verify that the navbar status pill displays: **`🟢 ML Pipeline Online`**.
3. Click **"START ASSESSMENT"**.
4. Click one of the 1-click test profiles (e.g. **🔴 High Accumulation (Expected: Yes)**).
5. Click **"GENERATE AI ASSESSMENT"**.
6. The request will travel from Vercel to your Render backend, run through your 172 MB Random Forest pipeline, and return the real-time prediction and probabilities!
7. Check your **Supabase Dashboard** -> **Table Editor** -> **assessments**: You will see the new assessment row stored securely in PostgreSQL!

---

## 🛠️ Summary of Deployment Files Created

* [`supabase/schema.sql`](file:///c:/Users/vanth/Personal_Stress_AI/supabase/schema.sql): PostgreSQL table schema, indexes, and RLS policies.
* [`backend/main.py`](file:///c:/Users/vanth/Personal_Stress_AI/backend/main.py): FastAPI app with Supabase PostgREST client, dynamic `$PORT` handling, and CORS.
* [`backend/.env.example`](file:///c:/Users/vanth/Personal_Stress_AI/backend/.env.example): Example backend environment variables.
* [`render.yaml`](file:///c:/Users/vanth/Personal_Stress_AI/render.yaml): Render Blueprint file for 1-click cloud service creation.
* [`frontend/vercel.json`](file:///c:/Users/vanth/Personal_Stress_AI/frontend/vercel.json): Vercel SPA routing rewrite rules.
* [`frontend/.env.example`](file:///c:/Users/vanth/Personal_Stress_AI/frontend/.env.example): Frontend environment variable documentation (`VITE_API_BASE_URL`).
* [`.gitattributes`](file:///c:/Users/vanth/Personal_Stress_AI/.gitattributes): Git LFS tracking for 172 MB model `.pkl` file.
* [`.gitignore`](file:///c:/Users/vanth/Personal_Stress_AI/.gitignore): Excludes node_modules, build artifacts, and secret keys.
