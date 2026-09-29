import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true }, // e.g., 'PF-1024', 'WO-2001'
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['personnel', 'welfare_officer', 'commander', 'admin'], 
    required: true 
  },
  rank: { type: String, default: 'Constable' },
  unitId: { type: String, default: 'UNIT-101' },
  permissions: [{ type: String }],
  consentStatus: {
    wellnessConsent: { type: Boolean, default: true },
    biometricConsent: { type: Boolean, default: false },
    analyticsConsent: { type: Boolean, default: true },
    consentDate: { type: Date, default: Date.now }
  },
  lastLogin: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

export const User = mongoose.model('User', UserSchema);
