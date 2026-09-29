import mongoose from 'mongoose';

const LeaveRecordSchema = new mongoose.Schema({
  leaveId: { type: String, required: true, unique: true },
  personnelId: { type: String, required: true },
  leaveType: { 
    type: String, 
    enum: ['Annual Leave', 'Casual Leave', 'Medical Rest', 'Compassionate Leave'], 
    default: 'Annual Leave' 
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  durationDays: { type: Number, required: true },
  status: { type: String, enum: ['Approved', 'Completed', 'Requested'], default: 'Completed' },
  reason: { type: String, default: 'Scheduled rest & family visit' },
  createdAt: { type: Date, default: Date.now }
});

export const LeaveRecord = mongoose.model('LeaveRecord', LeaveRecordSchema);
