import mongoose from 'mongoose';

const PersonnelProfileSchema = new mongoose.Schema({
  personnelId: { type: String, required: true, unique: true }, // e.g. PF-1024
  userId: { type: String, required: true },
  name: { type: String, required: true },
  unitId: { type: String, required: true }, // e.g. 'UNIT-101'
  unitName: { type: String, default: '101 Bn (Alpha)' },
  designation: { type: String, default: 'Head Constable' },
  joiningDate: { type: Date, default: () => new Date(Date.now() - 1000 * 3600 * 24 * 365 * 4) },
  deploymentDurationDays: { type: Number, default: 30 },
  currentDutyHoursWeekly: { type: Number, default: 48 },
  nightDutyCountLastMonth: { type: Number, default: 4 },
  daysSinceLastLeave: { type: Number, default: 25 },
  sleepQualityAvg: { type: Number, default: 7.2 },
  stressScoreAvg: { type: Number, default: 4.0 },
  anonymizedCode: { type: String }, // For aggregated commander view e.g. "ANON-8821"
  deploymentHistory: [{
    location: String,
    role: String,
    startDate: Date,
    endDate: Date,
    arduousLevel: { type: String, enum: ['Standard', 'Moderate', 'High Arduous'], default: 'Standard' }
  }],
  transferHistory: [{
    fromUnit: String,
    toUnit: String,
    transferDate: Date
  }],
  updatedAt: { type: Date, default: Date.now }
});

export const PersonnelProfile = mongoose.model('PersonnelProfile', PersonnelProfileSchema);
