import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import {
  Shield,
  Lock,
  UserCheck,
  ShieldCheck,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [userId, setUserId] = useState('WO-2001');
  const [password, setPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [showForgotModal, setShowForgotModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId.trim() || !password.trim()) {
      setError('Please provide Service / Employee ID and password.');
      return;
    }

    setLoading(true);
    setError('');

    const success = await login(userId.trim(), password.trim());
    setLoading(false);

    if (success) {
      setIsSuccess(true);
      showToast('Authentication successful', 'Access granted to FORCEWELL AI terminal', 'success');
      setTimeout(() => {
        navigate('/dashboard');
      }, 700);
    } else {
      setError('Unable to sign in. Please check your credentials and try again.');
    }
  };

  const handleSelectDemoAccount = (id: string, label: string) => {
    setUserId(id);
    setPassword('password123');
    setError('');
    showToast(`Loaded ${label} Credentials`, `ID: ${id}`, 'info');
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden font-body text-white bg-slate-950 selection:bg-white selection:text-slate-950">
      {/* 2. Fullscreen Looping Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
          type="video/mp4"
        />
      </video>

      {/* 3. Subtle Readability Treatment Over Video (No Blobs/Gradients) */}
      <div className="absolute inset-0 bg-slate-950/40 z-0 pointer-events-none" />

      {/* Top Bar: Portal Link & Branding */}
      <header className="relative z-10 pt-6 sm:pt-10 px-4 flex flex-col items-center animate-fade-rise">
        <div className="w-full max-w-5xl mx-auto flex items-center justify-between mb-4">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 text-xs text-slate-200 transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Public Portal</span>
          </Link>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] font-mono text-slate-200">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Authorized Network</span>
          </div>
        </div>

        {/* 6. Branding Area */}
        <div className="text-center space-y-1 mt-1">
          <div className="inline-flex items-center justify-center gap-2.5 mb-1">
            <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-lg">
              <Shield className="w-5 h-5 text-blue-200" />
            </div>
            <span className="font-mono text-xs uppercase tracking-widest text-slate-300 font-medium">
              Ministry of Home Affairs
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-white font-normal tracking-wide drop-shadow-sm">
            FORCEWELL AI
          </h1>
          <p className="font-body text-xs sm:text-sm text-slate-200 font-light tracking-widest uppercase">
            Personnel Welfare Intelligence
          </p>
        </div>
      </header>

      {/* 7 & 8. Centered Authentication Interface & Glassmorphic Login Card */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-5 py-6 my-2">
        <div className="login-glass liquid-glass rounded-3xl p-7 sm:p-10 w-full max-w-md mx-auto shadow-2xl space-y-6 animate-fade-rise-delay">
          {/* 10. Login Headline */}
          <div className="space-y-1">
            <h2 className="font-display text-3xl sm:text-4xl text-white font-normal tracking-tight">
              Welcome back.
            </h2>
            <p className="font-body text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              Sign in to access your secure personnel welfare dashboard.
            </p>
          </div>

          {/* 14. Error State */}
          {error && (
            <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-start gap-2.5 backdrop-blur-md animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block">Unable to sign in</span>
                <span className="text-red-300 text-[11px] leading-relaxed">
                  Please check your credentials and try again.
                </span>
              </div>
            </div>
          )}

          {/* 14. Success State */}
          {isSuccess && (
            <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2.5 backdrop-blur-md animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Authentication successful. Redirecting to workspace...</span>
            </div>
          )}

          {/* 11. Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Service ID */}
            <div>
              <label
                htmlFor="service-id"
                className="block text-xs font-medium text-slate-300 mb-1.5 font-body"
              >
                Service ID
              </label>
              <input
                id="service-id"
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="Enter your service ID"
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/40 transition-all font-body backdrop-blur-sm"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-medium text-slate-300 mb-1.5 font-body"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full pl-4 pr-11 py-3 bg-white/5 border border-white/15 rounded-xl text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/40 transition-all font-body backdrop-blur-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* 12. Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-xs text-slate-300 font-body pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer select-none group">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-white/20 bg-white/10 text-blue-500 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-slate-300 group-hover:text-white transition-colors">
                  Remember me
                </span>
              </label>

              <button
                type="button"
                onClick={() => setShowForgotModal(true)}
                className="text-slate-300 hover:text-white transition-colors underline-offset-2 hover:underline"
              >
                Forgot password?
              </button>
            </div>

            {/* 13. Primary Button */}
            <button
              type="submit"
              disabled={loading || isSuccess}
              className="rounded-full px-6 py-3 w-full font-medium text-sm text-slate-950 bg-white hover:bg-slate-100 transition-all duration-300 hover:scale-[1.02] shadow-lg flex items-center justify-center gap-2 disabled:opacity-60 disabled:hover:scale-100 disabled:cursor-not-allowed font-body mt-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : isSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Authentication successful</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </form>

          {/* 15. Security Indicator */}
          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-[11px] text-slate-300 font-body">
            <span className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-blue-400" />
              <span>Secure authentication</span>
            </span>
            <span className="text-slate-500">•</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Role-based access</span>
            </span>
            <span className="text-slate-500">•</span>
            <span className="flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-purple-400" />
              <span>Privacy protected</span>
            </span>
          </div>

          {/* 1-Click Demo Profiles for Hackathon Evaluators */}
          <div className="pt-3 border-t border-white/10 space-y-2">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block text-center">
              Evaluator 1-Click Persona Access (Default: password123)
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-[11px]">
              <button
                type="button"
                onClick={() => handleSelectDemoAccount('PF-1024', 'Personnel')}
                className={`p-2 rounded-xl border text-center transition-all ${
                  userId === 'PF-1024'
                    ? 'bg-white/20 border-white/40 text-white font-semibold shadow-inner'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-300'
                }`}
              >
                <div className="font-medium text-xs">👤 Personnel</div>
                <div className="text-[10px] text-slate-400 font-mono">PF-1024</div>
              </button>

              <button
                type="button"
                onClick={() => handleSelectDemoAccount('WO-2001', 'Welfare Officer')}
                className={`p-2 rounded-xl border text-center transition-all ${
                  userId === 'WO-2001'
                    ? 'bg-white/20 border-white/40 text-white font-semibold shadow-inner'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-300'
                }`}
              >
                <div className="font-medium text-xs">🩺 Welfare Off.</div>
                <div className="text-[10px] text-slate-400 font-mono">WO-2001</div>
              </button>

              <button
                type="button"
                onClick={() => handleSelectDemoAccount('CMD-3001', 'Commander')}
                className={`p-2 rounded-xl border text-center transition-all ${
                  userId === 'CMD-3001'
                    ? 'bg-white/20 border-white/40 text-white font-semibold shadow-inner'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-300'
                }`}
              >
                <div className="font-medium text-xs">🎖️ Commander</div>
                <div className="text-[10px] text-slate-400 font-mono">CMD-3001</div>
              </button>

              <button
                type="button"
                onClick={() => handleSelectDemoAccount('ADM-4001', 'Admin')}
                className={`p-2 rounded-xl border text-center transition-all ${
                  userId === 'ADM-4001'
                    ? 'bg-white/20 border-white/40 text-white font-semibold shadow-inner'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-300'
                }`}
              >
                <div className="font-medium text-xs">🛡️ Admin</div>
                <div className="text-[10px] text-slate-400 font-mono">ADM-4001</div>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* 16 & 22. Footer */}
      <footer className="relative z-10 text-center py-6 px-4 space-y-1 text-xs text-slate-400 font-body animate-fade-rise-delay-2">
        <p>AI-assisted welfare support for authorized personnel.</p>
        <p className="text-[11px] text-slate-500">Your privacy and dignity come first.</p>
      </footer>

      {/* Defense Network Credential Recovery Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="login-glass rounded-2xl max-w-sm w-full p-6 space-y-4 border border-white/20 shadow-2xl text-left">
            <h3 className="font-display text-xl text-white font-normal">
              Credential Recovery Protocol
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-body">
              In uniformed defense systems, password credentials are encrypted and managed directly by your Unit Adjutant or Base IT Security Officer.
            </p>
            <div className="bg-white/5 p-3.5 rounded-xl border border-white/10 text-xs text-slate-300 space-y-1 font-body">
              <p>
                <strong>Intranet Support:</strong> ext 4401 / 4402
              </p>
              <p>
                <strong>IT Security Helpline:</strong> support@forcewell.gov.in
              </p>
            </div>
            <button
              onClick={() => setShowForgotModal(false)}
              className="w-full py-2.5 bg-white text-slate-950 hover:bg-slate-100 rounded-full text-xs font-semibold transition-all font-body cursor-pointer"
            >
              Return to Sign In
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
