import mongoose from 'mongoose';

const AlertSchema = new mongoose.Schema({
  alertId: { type: String, required: true, unique: true },
  unitId: { type: String, default: 'ALL' },
  type: { 
    type: String, 
    enum: ['Workload Alert', 'Welfare Follow-up', 'Deployment Alert', 'Leave Pattern'], 
    required: true 
  },
  title: { type: String, required: true },
  message: { type: String, required: true },
  severity: { type: String, enum: ['info', 'attention', 'warning'], default: 'info' },
  targetRoles: [{ type: String }],
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export const Alert = mongoose.model('Alert', AlertSchema);
