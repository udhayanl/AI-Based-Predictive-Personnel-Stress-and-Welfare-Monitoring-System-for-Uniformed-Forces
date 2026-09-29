import mongoose from 'mongoose';

const WellnessAssessmentSchema = new mongoose.Schema({
  assessmentId: { type: String, required: true, unique: true },
  personnelId: { type: String, required: true },
  stressLevel: { type: Number, min: 1, max: 10, required: true },
  sleepQuality: { type: Number, min: 1, max: 10, required: true },
  workloadLevel: { type: Number, min: 1, max: 10, required: true },
  emotionalFatigue: { type: Number, min: 1, max: 10, required: true },
  teamSupport: { type: Number, min: 1, max: 10, required: true },
  supportRequested: { type: Boolean, default: false },
  supportNotes: { type: String, default: '' },
  calculatedIndicator: { type: Number, default: 0 },
  calculatedCategory: { type: String, default: 'Stable' },
  createdAt: { type: Date, default: Date.now }
});

export const WellnessAssessment = mongoose.model('WellnessAssessment', WellnessAssessmentSchema);
