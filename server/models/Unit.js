import mongoose from 'mongoose';

const UnitSchema = new mongoose.Schema({
  unitId: { type: String, required: true, unique: true }, // e.g. 'UNIT-101'
  unitName: { type: String, required: true }, // '101 Bn (Alpha)'
  sector: { type: String, required: true }, // 'Sector J&K', 'Sector N.East', etc.
  baseLocation: { type: String, required: true },
  commanderName: { type: String, default: 'Commandant' },
  personnelCount: { type: Number, default: 20 },
  averageIndicator: { type: Number, default: 42 },
  activeDeployments: { type: Number, default: 12 },
  createdAt: { type: Date, default: Date.now }
});

export const Unit = mongoose.model('Unit', UnitSchema);
