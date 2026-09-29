import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

let isConnected = false;
let isInMemoryFallback = false;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/personnel_welfare';
  
  try {
    // Attempt connecting with short timeout so it doesn't hang if no Mongo service is active
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2000,
    });
    isConnected = true;
    console.log(`[MongoDB] Connected successfully to: ${uri}`);
  } catch (err) {
    console.warn(`[MongoDB Warning] Could not connect to local/remote MongoDB (${err.message}).`);
    console.log('[Data Layer] Activating High-Fidelity Resilient In-Memory Store for full evaluation & instant zero-config testing.');
    isInMemoryFallback = true;
  }
};

export const getDBStatus = () => ({
  isConnected,
  isInMemoryFallback,
  type: isInMemoryFallback ? 'In-Memory Resilient Store' : 'Active MongoDB Database'
});
