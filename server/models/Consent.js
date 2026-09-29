import mongoose from 'mongoose';

const ConsentSchema = new mongoose.Schema({
  consentId: { type: String, required: true, unique: true },
  personnelId: { type: String, required: true, unique: true },
  wellnessConsent: { type: Boolean, default: true },
  biometricConsent: { type: Boolean, default: false },
  analyticsConsent: { type: Boolean, default: true },
  consentedAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const Consent = mongoose.model('Consent', ConsentSchema);
