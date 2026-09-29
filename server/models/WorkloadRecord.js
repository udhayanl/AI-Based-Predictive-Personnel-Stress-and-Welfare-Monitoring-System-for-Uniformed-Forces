import mongoose from 'mongoose';

const WorkloadRecordSchema = new mongoose.Schema({
  workloadId: { type: String, required: true, unique: true },
  personnelId: { type: String, required: true },
  dutyHours: { type: Number, required: true },
  nightShifts: { type: Number, default: 0 },
  trainingHours: { type: Number, default: 0 },
  deploymentDays: { type: Number, default: 0 },
  weekNumber: { type: Number },
  year: { type: Number, default: 2026 },
  recordedAt: { type: Date, default: Date.now }
});

export const WorkloadRecord = mongoose.model('WorkloadRecord', WorkloadRecordSchema);
