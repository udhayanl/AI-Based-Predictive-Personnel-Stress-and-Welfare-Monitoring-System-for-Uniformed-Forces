import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { wellnessApi } from '../api';
import {
  HeartPulse,
  Smile,
  Meh,
  Frown,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  HelpCircle,
  Briefcase,
  Moon,
  BatteryMedium,
  Users2,
  HeartHandshake,
} from 'lucide-react';
import { EthicalDisclaimerBanner } from '../components/EthicalDisclaimerBanner';
import { SupportIndicatorBadge } from '../components/SupportIndicatorBadge';

export const WellnessAssessmentPage: React.FC = () => {
  const navigate = useNavigate();

  // Wizard state
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;

  // Form values (1 - 10 scales as specified)
  const [stressLevel, setStressLevel] = useState(4);
  const [workloadLevel, setWorkloadLevel] = useState(5);
  const [sleepQuality, setSleepQuality] = useState(6);
  const [emotionalFatigue, setEmotionalFatigue] = useState(4);
  const [teamSupport, setTeamSupport] = useState(8);
  const [supportRequested, setSupportRequested] = useState(false);
  const [supportNotes, setSupportNotes] = useState('');

  // Submission state
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [resultData, setResultData] = useState<any>(null);

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await wellnessApi.submitAssessment({
        stressLevel,
        workloadLevel,
        sleepQuality,
        emotionalFatigue,
        teamSupport,
        supportRequested,
        supportNotes,
      });

      if (res.data?.success) {
        setResultData(res.data.data);
        setSubmitted(true);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      alert('Unable to submit assessment. Please check network connection.');
    }
  };

  if (submitted && resultData) {
    const { aiEvaluation } = resultData;
    return (
      <div className="max-w-2xl mx-auto space-y-6 py-6">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-8 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">Assessment Completed</h2>
            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Thank you for completing your voluntary wellness assessment. Your responses help guide proactive, non-punitive welfare support.
            </p>
          </div>

          {/* AI Result Summary */}
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-left space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Welfare Support Indicator
                </span>
                <div className="text-2xl font-extrabold text-slate-900 mt-0.5">
                  {aiEvaluation.supportIndicator} / 100
                </div>
              </div>
              <SupportIndicatorBadge score={aiEvaluation.supportIndicator} category={aiEvaluation.category} size="lg" />
            </div>

            {/* Protective factors */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Identified Positive Protective Factors
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {aiEvaluation.protectiveFactors?.map((pf: string, i: number) => (
                  <li key={i} className="flex items-center gap-2 text-emerald-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>{pf}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recommended next steps */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Recommended Supportive Next Steps
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {aiEvaluation.recommendedNextSteps?.map((step: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-slate-800">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-[11px] text-slate-500 italic pt-2 border-t border-slate-200">
              {aiEvaluation.disclaimer}
            </div>
          </div>

          <div className="flex justify-center gap-3">
            <Link
              to="/dashboard"
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-colors"
            >
              Return to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 py-4">
      {/* Header */}
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-bold text-slate-900">Periodic Wellness Check-in</h1>
        <p className="text-xs text-slate-500">
          Step {currentStep} of {totalSteps}: Confidential, non-diagnostic self-reflection
        </p>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
        <div
          className="bg-blue-600 h-2 transition-all duration-300 ease-out rounded-full"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>

      {/* Voluntary Ethical Disclaimer Banner */}
      <div className="bg-blue-50/80 border border-blue-200 rounded-lg p-3 text-xs text-blue-900 flex items-start gap-2.5">
        <ShieldCheck className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Voluntary Participation Notice:</strong> This assessment is voluntary. Your responses are strictly used to support institutional welfare services and are <strong className="underline decoration-blue-400">never</strong> intended for performance or disciplinary evaluation.
        </p>
      </div>

      {/* Wizard Form Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-lg p-6 sm:p-8 space-y-6">
        {/* Step 1: Recent Feeling */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-semibold uppercase text-blue-600 tracking-wider">Step 1</span>
              <h2 className="text-lg font-bold text-slate-900">
                How have you been feeling overall recently?
              </h2>
              <p className="text-xs text-slate-500">
                Reflect on your mood, peace of mind, and general mental well-being over the past two weeks.
              </p>
            </div>

            {/* Quick feeling selectors */}
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setStressLevel(3)}
                className={`p-4 rounded-xl border text-center transition-all ${
                  stressLevel <= 3
                    ? 'border-emerald-500 bg-emerald-50/80 text-emerald-900 ring-2 ring-emerald-500'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <Smile className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                <span className="text-xs font-bold block">Good / Calm</span>
                <span className="text-[10px] text-slate-400">Low stress</span>
              </button>

              <button
                type="button"
                onClick={() => setStressLevel(6)}
                className={`p-4 rounded-xl border text-center transition-all ${
                  stressLevel > 3 && stressLevel <= 6
                    ? 'border-blue-500 bg-blue-50/80 text-blue-900 ring-2 ring-blue-500'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <Meh className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <span className="text-xs font-bold block">Moderate</span>
                <span className="text-[10px] text-slate-400">Managing well</span>
              </button>

              <button
                type="button"
                onClick={() => setStressLevel(8)}
                className={`p-4 rounded-xl border text-center transition-all ${
                  stressLevel > 6
                    ? 'border-amber-500 bg-amber-50/80 text-amber-900 ring-2 ring-amber-500'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <Frown className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                <span className="text-xs font-bold block">Tense / Stressed</span>
                <span className="text-[10px] text-slate-400">High pressure</span>
              </button>
            </div>

            {/* Granular Slider */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-xs text-slate-600 font-medium">
                <span>1 (Completely relaxed)</span>
                <span className="font-bold text-blue-700 text-sm">Rating: {stressLevel} / 10</span>
                <span>10 (Extremely stressed)</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={stressLevel}
                onChange={(e) => setStressLevel(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
          </div>
        )}

        {/* Step 2: Workload */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-semibold uppercase text-blue-600 tracking-wider">Step 2</span>
              <h2 className="text-lg font-bold text-slate-900">
                How would you rate your recent workload and duty schedule?
              </h2>
              <p className="text-xs text-slate-500">
                Consider shift intensity, continuous patrol hours, and time available for rest.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { val: 3, label: 'Balanced Duty', desc: 'Standard roster (< 48 hrs)' },
                { val: 6, label: 'Intense Duty', desc: 'Extended shifts (48 - 60 hrs)' },
                { val: 9, label: 'Overloaded', desc: 'Heavy rotation (> 60 hrs)' },
              ].map((item) => (
                <button
                  key={item.val}
                  type="button"
                  onClick={() => setWorkloadLevel(item.val)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    workloadLevel === item.val
                      ? 'border-indigo-600 bg-indigo-50/80 text-indigo-900 ring-2 ring-indigo-500'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <Briefcase className="w-5 h-5 text-indigo-600 mb-2" />
                  <span className="text-xs font-bold block">{item.label}</span>
                  <span className="text-[10px] text-slate-500">{item.desc}</span>
                </button>
              ))}
            </div>

            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-xs text-slate-600 font-medium">
                <span>1 (Very Light)</span>
                <span className="font-bold text-indigo-700 text-sm">Rating: {workloadLevel} / 10</span>
                <span>10 (Overwhelming)</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={workloadLevel}
                onChange={(e) => setWorkloadLevel(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>
          </div>
        )}

        {/* Step 3: Sleep Quality */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-semibold uppercase text-blue-600 tracking-wider">Step 3</span>
              <h2 className="text-lg font-bold text-slate-900">
                How would you rate your sleep quality and rest?
              </h2>
              <p className="text-xs text-slate-500">
                Think about whether you wake up feeling rested or frequently disturbed by shift cadence.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { val: 8, label: 'Restful Sleep', desc: '7+ hours uninterrupted' },
                { val: 5, label: 'Interrupted Sleep', desc: '5-6 hours or broken rest' },
                { val: 2, label: 'Severe Disruption', desc: '< 5 hours or frequent insomnia' },
              ].map((item) => (
                <button
                  key={item.val}
                  type="button"
                  onClick={() => setSleepQuality(item.val)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    sleepQuality === item.val
                      ? 'border-purple-600 bg-purple-50/80 text-purple-900 ring-2 ring-purple-500'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <Moon className="w-5 h-5 text-purple-600 mb-2" />
                  <span className="text-xs font-bold block">{item.label}</span>
                  <span className="text-[10px] text-slate-500">{item.desc}</span>
                </button>
              ))}
            </div>

            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-xs text-slate-600 font-medium">
                <span>1 (Severe Disruption)</span>
                <span className="font-bold text-purple-700 text-sm">Rating: {sleepQuality} / 10</span>
                <span>10 (Optimal Rest)</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={sleepQuality}
                onChange={(e) => setSleepQuality(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
            </div>
          </div>
        )}

        {/* Step 4: Emotional Fatigue */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-semibold uppercase text-blue-600 tracking-wider">Step 4</span>
              <h2 className="text-lg font-bold text-slate-900">
                How frequently have you felt emotionally drained or fatigued?
              </h2>
              <p className="text-xs text-slate-500">
                Consider physical weariness, feeling burned out, or detachment during daily responsibilities.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-xs text-slate-600 font-medium">
                <span>1 (Rarely / Never)</span>
                <span className="font-bold text-amber-700 text-sm">Rating: {emotionalFatigue} / 10</span>
                <span>10 (Constantly Exhausted)</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={emotionalFatigue}
                onChange={(e) => setEmotionalFatigue(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
              />
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border text-xs text-slate-600">
              <p>
                <strong>Why this is measured:</strong> Emotional fatigue is often the earliest signal of cumulative deployment weariness. Catching it early allows for prompt workload adjustments before burnout occurs.
              </p>
            </div>
          </div>
        )}

        {/* Step 5: Team Support */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-semibold uppercase text-blue-600 tracking-wider">Step 5</span>
              <h2 className="text-lg font-bold text-slate-900">
                How supported do you feel by your squad, peers, and unit officers?
              </h2>
              <p className="text-xs text-slate-500">
                Strong unit cohesion is one of the most powerful protective shields against stress.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-xs text-slate-600 font-medium">
                <span>1 (Isolated / Unsupported)</span>
                <span className="font-bold text-emerald-700 text-sm">Rating: {teamSupport} / 10</span>
                <span>10 (Strong Unit Cohesion)</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={teamSupport}
                onChange={(e) => setTeamSupport(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
            </div>

            <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-lg text-xs text-emerald-900">
              <p>
                <strong>Protective Factor:</strong> High team bonding acts as an institutional buffer that reduces vulnerability to operational stressors.
              </p>
            </div>
          </div>
        )}

        {/* Step 6: Confidential Welfare Support Request */}
        {currentStep === 6 && (
          <div className="space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-semibold uppercase text-blue-600 tracking-wider">Step 6</span>
              <h2 className="text-lg font-bold text-slate-900">
                Would you like confidential welfare or counseling support?
              </h2>
              <p className="text-xs text-slate-500">
                You can voluntarily request an informal check-in with your Welfare Officer, counseling session, or leave consultation.
              </p>
            </div>

            <div className="space-y-3">
              <label className="flex items-start gap-3 p-4 border rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                <input
                  type="checkbox"
                  checked={supportRequested}
                  onChange={(e) => setSupportRequested(e.target.checked)}
                  className="w-5 h-5 rounded text-blue-600 border-slate-300 mt-0.5 focus:ring-blue-500"
                />
                <div>
                  <span className="font-semibold text-xs text-slate-900 block">
                    Yes, I would appreciate a confidential check-in or welfare follow-up.
                  </span>
                  <span className="text-[11px] text-slate-500">
                    A unit welfare officer will reach out privately without alarming squad members.
                  </span>
                </div>
              </label>

              {supportRequested && (
                <div className="space-y-1.5 pt-2">
                  <label className="block text-xs font-semibold text-slate-700">
                    Optional notes or preferred area of support:
                  </label>
                  <textarea
                    value={supportNotes}
                    onChange={(e) => setSupportNotes(e.target.value)}
                    placeholder="e.g. Would like guidance on family communication or sleep disruption advice..."
                    rows={3}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentStep === 1}
            className={`px-4 py-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
              currentStep === 1
                ? 'text-slate-300 cursor-not-allowed'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous</span>
          </button>

          {currentStep < totalSteps ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
            >
              {loading ? (
                <span>Submitting & Analyzing...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Submit Voluntary Assessment</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
