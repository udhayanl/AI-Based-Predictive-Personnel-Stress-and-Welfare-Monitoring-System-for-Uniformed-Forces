import { dataStore } from '../utils/dataStore.js';
import { WelfareRiskEngine } from '../services/riskEngine.js';

export const submitAssessment = async (req, res, next) => {
  try {
    const personnelId = req.user.userId;
    const {
      stressLevel = 5,
      sleepQuality = 5,
      workloadLevel = 5,
      emotionalFatigue = 5,
      teamSupport = 5,
      supportRequested = false,
      supportNotes = ''
    } = req.body;

    const personnel = dataStore.personnel.find(p => p.personnelId === personnelId);
    if (!personnel) {
      return res.status(404).json({
        success: false,
        message: 'Personnel profile record not found.'
      });
    }

    // Run Explainable AI Risk Evaluation with latest metrics
    const aiEvaluation = WelfareRiskEngine.evaluateMetrics({
      dutyHoursWeekly: personnel.currentDutyHoursWeekly,
      deploymentDays: personnel.deploymentDurationDays,
      nightShifts30d: personnel.nightDutyCountLastMonth,
      daysSinceLeave: personnel.daysSinceLastLeave,
      sleepQualityScore: Number(sleepQuality),
      selfReportedStress: Number(stressLevel),
      emotionalFatigue: Number(emotionalFatigue),
      teamSupportScore: Number(teamSupport),
      recentWellnessParticipation: true
    });

    const newAssessment = {
      assessmentId: `ASM-${Date.now()}`,
      personnelId,
      stressLevel: Number(stressLevel),
      sleepQuality: Number(sleepQuality),
      workloadLevel: Number(workloadLevel),
      emotionalFatigue: Number(emotionalFatigue),
      teamSupport: Number(teamSupport),
      supportRequested: Boolean(supportRequested),
      supportNotes: supportNotes || '',
      calculatedIndicator: aiEvaluation.supportIndicator,
      calculatedCategory: aiEvaluation.category,
      createdAt: new Date()
    };
    dataStore.assessments.unshift(newAssessment);

    // Update risk assessment entry for this personnel
    const riskIndex = dataStore.riskAssessments.findIndex(r => r.personnelId === personnelId);
    const updatedRisk = {
      assessmentId: `RISK-${Date.now()}`,
      personnelId,
      supportIndicator: aiEvaluation.supportIndicator,
      category: aiEvaluation.category,
      contributingFactors: aiEvaluation.contributingFactors,
      protectiveFactors: aiEvaluation.protectiveFactors,
      factorBreakdown: aiEvaluation.factorBreakdown,
      recommendedActions: aiEvaluation.recommendedActions,
      confidenceScore: aiEvaluation.confidenceScore,
      modelVersion: aiEvaluation.modelVersion,
      disclaimer: aiEvaluation.disclaimer,
      generatedAt: new Date()
    };

    if (riskIndex !== -1) {
      dataStore.riskAssessments[riskIndex] = updatedRisk;
    } else {
      dataStore.riskAssessments.push(updatedRisk);
    }

    // Update profile average scores
    personnel.sleepQualityAvg = Number(sleepQuality);
    personnel.stressScoreAvg = Number(stressLevel);
    personnel.emotionalFatigueAvg = Number(emotionalFatigue);
    personnel.teamSupportScore = Number(teamSupport);
    personnel.updatedAt = new Date();

    // If support was voluntarily requested or indicator elevated, create automatic alert for welfare officer
    if (supportRequested || aiEvaluation.category === 'Elevated Support') {
      dataStore.alerts.unshift({
        alertId: `ALT-${Date.now()}`,
        unitId: personnel.unitId,
        type: 'Welfare Follow-up',
        title: supportRequested ? 'Confidential Welfare Support Requested' : 'Elevated Support Indicator Detected',
        message: supportRequested 
          ? `Personnel in ${personnel.unitName} has submitted a voluntary request for welfare check-in.`
          : `Personnel in ${personnel.unitName} reflects an elevated support indicator (${aiEvaluation.supportIndicator}/100). Consider supportive check-in.`,
        severity: 'attention',
        targetRoles: ['welfare_officer'],
        isRead: false,
        createdAt: new Date()
      });
    }

    dataStore.logAudit(
      personnelId,
      req.user.name,
      'personnel',
      'SUBMIT_WELLNESS_ASSESSMENT',
      `Assessment ID: ${newAssessment.assessmentId}`,
      'Voluntary wellness check-in completed by personnel',
      'SUCCESS'
    );

    return res.status(201).json({
      success: true,
      message: 'Thank you for completing your wellness assessment. Your responses help guide supportive welfare planning.',
      data: {
        assessment: newAssessment,
        aiEvaluation: {
          supportIndicator: aiEvaluation.supportIndicator,
          category: aiEvaluation.category,
          recommendedNextSteps: aiEvaluation.recommendedActions,
          protectiveFactors: aiEvaluation.protectiveFactors,
          contributingFactors: aiEvaluation.contributingFactors,
          disclaimer: aiEvaluation.disclaimer
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getAssessmentHistory = async (req, res, next) => {
  try {
    const list = dataStore.assessments.filter(a => a.personnelId === req.user.userId);
    return res.status(200).json({
      success: true,
      data: list
    });
  } catch (error) {
    next(error);
  }
};

export const getPersonnelAssessments = async (req, res, next) => {
  try {
    const { personnelId } = req.params;
    const list = dataStore.assessments.filter(a => a.personnelId === personnelId);
    return res.status(200).json({
      success: true,
      data: list
    });
  } catch (error) {
    next(error);
  }
};
