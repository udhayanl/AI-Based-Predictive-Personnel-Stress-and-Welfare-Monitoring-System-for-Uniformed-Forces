import mongoose from 'mongoose';

const AuditLogSchema = new mongoose.Schema({
  logId: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  userName: { type: String, default: 'Authorized User' },
  role: { type: String, required: true },
  action: { type: String, required: true },
  resource: { type: String, required: true },
  details: { type: String, default: '' },
  ipAddress: { type: String, default: '10.24.8.12 (Intranet CRPF)' },
  status: { type: String, enum: ['SUCCESS', 'FAILURE', 'DENIED'], default: 'SUCCESS' },
  timestamp: { type: Date, default: Date.now }
});

export const AuditLog = mongoose.model('AuditLog', AuditLogSchema);
