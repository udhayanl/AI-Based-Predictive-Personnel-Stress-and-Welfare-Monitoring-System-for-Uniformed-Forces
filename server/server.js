import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { connectDB, getDBStatus } from './config/db.js';
import { dataStore } from './utils/dataStore.js';
import { errorHandler } from './middleware/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Route imports
import authRoutes from './routes/authRoutes.js';
import personnelRoutes from './routes/personnelRoutes.js';
import wellnessRoutes from './routes/wellnessRoutes.js';
import workloadRoutes from './routes/workloadRoutes.js';
import leaveRoutes from './routes/leaveRoutes.js';
import riskRoutes from './routes/riskRoutes.js';
import interventionRoutes from './routes/interventionRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import privacyRoutes from './routes/privacyRoutes.js';
import auditRoutes from './routes/auditRoutes.js';
import alertRoutes from './routes/alertRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Parsing Middleware
app.use(cors({
  origin: '*', // Allow all origins for seamless development and hackathon evaluation
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// System Health & Diagnostics endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ONLINE',
    service: 'AI-Based Predictive Personnel Stress and Welfare Monitoring System',
    problemStatement: 'SIH26186',
    organization: 'Ministry of Home Affairs - CRPF',
    timestamp: new Date(),
    database: getDBStatus(),
    recordsSummary: {
      personnel: dataStore.personnel.length,
      users: dataStore.users.length,
      units: dataStore.units.length,
      interventions: dataStore.interventions.length,
      alerts: dataStore.alerts.length
    }
  });
});

// Mount API routes
app.use('/api/auth', authRoutes);
app.use('/api/personnel', personnelRoutes);
app.use('/api/wellness', wellnessRoutes);
app.use('/api/workload', workloadRoutes);
app.use('/api/leave', leaveRoutes);
app.use('/api/risk', riskRoutes);
app.use('/api/interventions', interventionRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/privacy', privacyRoutes);
app.use('/api/audit-logs', auditRoutes);
app.use('/api/alerts', alertRoutes);

// Serve compiled frontend in production (Single Unified Web Service)
const clientBuildPath = path.join(__dirname, '../client/dist');
if (fs.existsSync(clientBuildPath)) {
  app.use(express.static(clientBuildPath));

  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}

// Global Error Handler
app.use(errorHandler);

// Boot function
const startServer = async () => {
  try {
    // Attempt database connection
    await connectDB();
    
    // Seed and initialize unified data store with 105 personnel
    await dataStore.initialize();

    app.listen(PORT, () => {
      console.log(`\n======================================================`);
      console.log(`[CRPF Welfare Intelligence Platform] Backend Active`);
      console.log(`  Problem Statement: SIH26186`);
      console.log(`  Local Endpoint: http://localhost:${PORT}`);
      console.log(`  Health Check:   http://localhost:${PORT}/api/health`);
      console.log(`======================================================\n`);
    });
  } catch (err) {
    console.error('[Startup Failure]', err);
    process.exit(1);
  }
};

startServer();
