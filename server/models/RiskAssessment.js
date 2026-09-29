import mongoose from 'mongoose';

const RiskAssessmentSchema = new mongoose.Schema({
  assessmentId: { type: String, required: true, unique: true },
  personnelId: { type: String, required: true },
  supportIndicator: { type: Number, min: 0, max: 100, required: true }, // e.g. 71/100
  category: { 
    type: String, 
    enum: ['Stable', 'Monitor', 'Elevated Support'], 
    required: true 
  },
  contributingFactors: [{ type: String }],
  protectiveFactors: [{ type: String }],
  factorBreakdown: {
    dutyHours: Number,
    deploymentDuration: Number,
    nightShifts: Number,
    leaveGap: Number,
    sleepDeficit: Number,
    selfReportedStress: Number,
    emotionalFatigue: Number
  },
  recommendedActions: [{ type: String }],
  confidenceScore: { type: Number, default: 0.85 },
  modelVersion: { type: String, default: 'CRPF-WelfareNet-v2.1' },
  generatedAt: { type: Date, default: Date.now }
});

export const RiskAssessment = mongoose.model('RiskAssessment', RiskAssessmentSchema);
