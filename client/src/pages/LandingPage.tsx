import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Shield,
  HeartPulse,
  BrainCircuit,
  Lock,
  ArrowRight,
  CheckCircle2,
  Users,
  CalendarCheck,
  Activity,
  HeartHandshake,
  FileCheck2,
  EyeOff,
  Database,
  KeyRound,
  FileText,
  UserCheck,
} from 'lucide-react';
import { EthicalDisclaimerBanner } from '../components/EthicalDisclaimerBanner';

export const LandingPage: React.FC = () => {
  const { switchDemoRole } = useAuth();
  const navigate = useNavigate();

  const handleQuickDemo = async (role: any) => {
    await switchDemoRole(role);
    navigate('/dashboard');
  };

  return (
    <div className="space-y-16 py-6 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-blue-950 text-white py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/60 border border-blue-700/60 text-blue-300 text-xs font-semibold tracking-wide uppercase">
            <Shield className="w-3.5 h-3.5 text-blue-400" />
            <span>Ministry of Home Affairs • CRPF Police II Division • SIH26186</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
            FORCEWELL <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300">AI</span>
          </h1>
          <p className="text-lg sm:text-xl font-semibold text-blue-200 tracking-wide">
            AI-Powered Personnel Welfare & Readiness Intelligence
          </p>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
            An enterprise-grade intelligence platform engineered to identify early indicators of workload stress, fatigue, burnout-related patterns, and welfare-support needs while strictly protecting personnel privacy.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              to="/login"
              className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-semibold shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 group"
            >
              <span>Authorized Sign In</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <button
              onClick={() => handleQuickDemo('welfare_officer')}
              className="px-6 py-3.5 bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-sm font-semibold transition-all flex items-center gap-2"
            >
              <span>Explore Platform (Demo Mode)</span>
            </button>
          </div>

          {/* Quick Demo Selector for Judges */}
          <div className="pt-8">
            <p className="text-xs text-slate-400 mb-3 font-semibold uppercase tracking-wider">
              Instant Hackathon Judge Access:
            </p>
            <div className="flex flex-wrap justify-center gap-2.5 max-w-2xl mx-auto">
              <button
                onClick={() => handleQuickDemo('personnel')}
                className="px-3 py-1.5 bg-slate-800/80 hover:bg-blue-900/60 border border-slate-700 rounded-lg text-xs text-slate-300 hover:text-white transition-all flex items-center gap-1.5"
              >
                <span>👤 Personnel (PF-1024)</span>
              </button>
              <button
                onClick={() => handleQuickDemo('welfare_officer')}
                className="px-3 py-1.5 bg-slate-800/80 hover:bg-blue-900/60 border border-slate-700 rounded-lg text-xs text-slate-300 hover:text-white transition-all flex items-center gap-1.5"
              >
                <span>🩺 Welfare Officer (WO-2001)</span>
              </button>
              <button
                onClick={() => handleQuickDemo('commander')}
                className="px-3 py-1.5 bg-slate-800/80 hover:bg-blue-900/60 border border-slate-700 rounded-lg text-xs text-slate-300 hover:text-white transition-all flex items-center gap-1.5"
              >
                <span>🎖️ Commander (CMD-3001)</span>
              </button>
              <button
                onClick={() => handleQuickDemo('admin')}
                className="px-3 py-1.5 bg-slate-800/80 hover:bg-blue-900/60 border border-slate-700 rounded-lg text-xs text-slate-300 hover:text-white transition-all flex items-center gap-1.5"
              >
                <span>🛡️ Administrator (ADM-4001)</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Ethical Disclaimer Notice */}
        <EthicalDisclaimerBanner />

        {/* Why This Platform */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-1">
              Preventive & Supportive
            </h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Why This Platform?
            </h3>
            <p className="text-slate-600 text-sm mt-2">
              Engineered exclusively for compassionate personnel well-being, duty balance, and confidential support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition-colors space-y-2.5">
              <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">AI Intelligence</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Explainable Gradient Boosting ensembles identifying subtle fatigue drift without medical diagnosis.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition-colors space-y-2.5">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                <HeartPulse className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Welfare First</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Proactive workload balancing and restorative leave rotations prioritizing dignity and rest.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition-colors space-y-2.5">
              <div className="w-10 h-10 rounded-lg bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600">
                <EyeOff className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Data Privacy</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Full DPDP Act compliance, cryptographic pseudonymization, and voluntary personnel consent switches.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition-colors space-y-2.5">
              <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-300 flex items-center justify-center text-slate-700">
                <Lock className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Enterprise Security</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Role-based access boundaries, AES-256 encryption at rest, TLS 1.3 in transit, and immutable audit trails.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition-colors space-y-2.5">
              <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Human Support</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                AI assists authorized welfare officers to conduct compassionate check-ins and peer counseling.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works - 5 Step Flow */}
        <section className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-8">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-1">
              End-to-End Operational Lifecycle
            </h2>
            <h3 className="text-2xl font-bold text-slate-900">How It Works</h3>
            <p className="text-slate-500 text-xs mt-1">
              A 5-step ethical workflow prioritizing personnel dignity and institutional support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center space-y-2">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center mx-auto shadow-sm">
                1
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Collect</h4>
              <p className="text-xs text-slate-500">
                Voluntary wellness check-ins & authorized duty parameters.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center space-y-2">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center mx-auto shadow-sm">
                2
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Analyze</h4>
              <p className="text-xs text-slate-500">
                Predictive AI models detect shifts in workload, sleep, and leave gaps.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center space-y-2">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center mx-auto shadow-sm">
                3
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Assess</h4>
              <p className="text-xs text-slate-500">
                Generate calibrated support indicators with explainable factor breakdowns.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center space-y-2">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center mx-auto shadow-sm">
                4
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Support</h4>
              <p className="text-xs text-slate-500">
                Authorized officers formulate personalized welfare interventions & rest plans.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center space-y-2">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center mx-auto shadow-sm">
                5
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Follow Up</h4>
              <p className="text-xs text-slate-500">
                Track whether assistance was delivered and monitor wellness recovery.
              </p>
            </div>
          </div>
        </section>

        {/* Privacy First Section */}
        <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-2xl p-8 sm:p-10 shadow-xl border border-blue-900 space-y-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-900/50 px-3 py-1 rounded-full border border-blue-700/50">
              Institutional Trust & Defense Standards
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-3">
              Privacy-First & Ethical Architecture
            </h3>
            <p className="text-slate-300 text-sm mt-2 leading-relaxed">
              Every design choice guarantees that wellness data cannot be weaponized. Personnel maintain complete transparency and control over their voluntary inputs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-blue-800/40 border border-blue-700/40 text-blue-300 flex-shrink-0">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-white">Consent-Based Collection</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Voluntary assessments with granular opt-in controls for biometrics and research.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-blue-800/40 border border-blue-700/40 text-blue-300 flex-shrink-0">
                <EyeOff className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-white">Role-Based Access (RBAC)</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Commanders view aggregated unit statistics; raw clinical notes are never exposed.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-blue-800/40 border border-blue-700/40 text-blue-300 flex-shrink-0">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-white">Data Minimization</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Only factors relevant to fatigue, deployment stress, and welfare are processed.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-blue-800/40 border border-blue-700/40 text-blue-300 flex-shrink-0">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-white">Cryptographic Security</h4>
                <p className="text-xs text-slate-400 mt-1">
                  JWT authentication, bcrypt hashed credentials, and TLS encrypted communications.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-blue-800/40 border border-blue-700/40 text-blue-300 flex-shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-white">Immutable Audit Logging</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Every record view, assessment submission, and intervention change is permanently logged.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-blue-800/40 border border-blue-700/40 text-blue-300 flex-shrink-0">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-white">De-identification & Anonymity</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Pseudonymized identifiers protect personnel identity across macro-command reviews.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
