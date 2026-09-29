import mongoose from 'mongoose';

const WelfareInterventionSchema = new mongoose.Schema({
  interventionId: { type: String, required: true, unique: true },
  personnelId: { type: String, required: true },
  officerId: { type: String, required: true },
  officerName: { type: String, default: 'Welfare Officer' },
  interventionType: { 
    type: String, 
    enum: [
      'Welfare Check-in',
      'Counseling Referral',
      'Workload Review',
      'Leave Planning',
      'Peer Support',
      'Rest / Recovery',
      'Family Support Referral',
      'Medical / Wellness Referral'
    ],
    required: true 
  },
  recommendation: { type: String, required: true },
  notes: { type: String, default: '' },
  status: { 
    type: String, 
    enum: ['New', 'Under Review', 'Support Planned', 'In Progress', 'Follow-up Required', 'Completed'], 
    default: 'New' 
  },
  followUpDate: { type: Date },
  outcome: { type: String, default: 'Pending assessment follow-up' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const WelfareIntervention = mongoose.model('WelfareIntervention', WelfareInterventionSchema);
