import { dataStore } from '../utils/dataStore.js';

export const getConsentSettings = async (req, res, next) => {
  try {
    const personnelId = req.user.userId;
    let consent = dataStore.consents.find(c => c.personnelId === personnelId);

    if (!consent) {
      consent = {
        consentId: `CNS-${Date.now()}`,
        personnelId,
        wellnessConsent: true,
        biometricConsent: false,
        analyticsConsent: true,
        updatedAt: new Date()
      };
      dataStore.consents.push(consent);
    }

    // Privacy & Data Inventory Matrix according to Section 15
    const dataInventory = [
      {
        category: 'Wellness Self-Assessments',
        collected: consent.wellnessConsent ? 'Collected' : 'Paused',
        status: consent.wellnessConsent,
        purpose: 'Periodic self-check to identify stress levels and guide welfare resources.',
        accessLevel: 'Self & Authorized Unit Welfare Officers',
        retention: 'Rolling 12 months, then anonymized',
        toggleKey: 'wellnessConsent'
      },
      {
        category: 'Workload & Duty Hours',
        collected: 'Collected (Organizational)',
        status: true,
        purpose: 'Fatigue mitigation, shift balancing, and rotation planning.',
        accessLevel: 'Unit Welfare Officer & Sector Command (Aggregated)',
        retention: '3 years operational retention',
        toggleKey: null // Administrative operational record
      },
      {
        category: 'Leave & Rest Intervals',
        collected: 'Collected (Organizational)',
        status: true,
        purpose: 'Monitoring rest cycles and preventing cumulative burnout.',
        accessLevel: 'Welfare Officer & Unit Commander',
        retention: 'Permanent service record',
        toggleKey: null
      },
      {
        category: 'Deployment & Outpost History',
        collected: 'Collected (Organizational)',
        status: true,
        purpose: 'Tracking arduous area duration and rotation eligibility.',
        accessLevel: 'Authorized Welfare & Command Staff',
        retention: 'Permanent service record',
        toggleKey: null
      },
      {
        category: 'Optional Biometric Integration',
        collected: consent.biometricConsent ? 'Active (Consented)' : 'Disabled (No Consent)',
        status: consent.biometricConsent,
        purpose: 'Prototype resting heart rate and sleep duration trend analysis.',
        accessLevel: 'Personnel Only (strictly confidential)',
        retention: 'Local device or 30 days max',
        toggleKey: 'biometricConsent'
      },
      {
        category: 'Anonymized Welfare Research',
        collected: consent.analyticsConsent ? 'Enabled' : 'Disabled',
        status: consent.analyticsConsent,
        purpose: 'Improving institutional force-wide welfare support algorithms.',
        accessLevel: 'Aggregated & De-identified only',
        retention: 'Anonymized dataset',
        toggleKey: 'analyticsConsent'
      }
    ];

    const accessMatrix = [
      { role: 'Personnel', ownData: 'Full Access', unitData: 'No Access', orgTrends: 'Limited', sensitiveNotes: 'Private Self-Notes' },
      { role: 'Welfare Officer', ownData: 'N/A', unitData: 'Authorized Welfare Indicators', orgTrends: 'Full Unit Access', sensitiveNotes: 'Welfare Recommendations' },
      { role: 'Commander', ownData: 'N/A', unitData: 'Aggregated Trends (Masked)', orgTrends: 'Full Sector Overview', sensitiveNotes: 'No Access to Raw Responses' },
      { role: 'System Admin', ownData: 'N/A', unitData: 'Audit & System Health Only', orgTrends: 'System Usage', sensitiveNotes: 'Strictly Denied' }
    ];

    return res.status(200).json({
      success: true,
      data: {
        consent,
        dataInventory,
        accessMatrix,
        privacyPrinciples: [
          { title: 'Data Minimization', description: 'Only operational and voluntary welfare metrics strictly necessary for stress monitoring are collected.' },
          { title: 'Purpose Limitation', description: 'Data is strictly reserved for personnel welfare support. It is NEVER used for disciplinary evaluation, rank promotion, or punishment.' },
          { title: 'Explainable AI', description: 'Every support indicator clearly discloses all contributing and protective factors.' },
          { title: 'Encryption & Auditability', description: 'All access events are immutably logged and monitored for unauthorized access.' }
        ]
      }
    });
  } catch (error) {
    next(error);
  }
};

export const updateConsentSettings = async (req, res, next) => {
  try {
    const personnelId = req.user.userId;
    const { wellnessConsent, biometricConsent, analyticsConsent } = req.body;

    let consent = dataStore.consents.find(c => c.personnelId === personnelId);
    if (!consent) {
      consent = {
        consentId: `CNS-${Date.now()}`,
        personnelId,
        wellnessConsent: wellnessConsent !== undefined ? wellnessConsent : true,
        biometricConsent: biometricConsent !== undefined ? biometricConsent : false,
        analyticsConsent: analyticsConsent !== undefined ? analyticsConsent : true,
        updatedAt: new Date()
      };
      dataStore.consents.push(consent);
    } else {
      if (wellnessConsent !== undefined) consent.wellnessConsent = wellnessConsent;
      if (biometricConsent !== undefined) consent.biometricConsent = biometricConsent;
      if (analyticsConsent !== undefined) consent.analyticsConsent = analyticsConsent;
      consent.updatedAt = new Date();
    }

    // Also update user profile consentStatus
    const user = dataStore.users.find(u => u.userId === personnelId);
    if (user) {
      user.consentStatus = {
        wellnessConsent: consent.wellnessConsent,
        biometricConsent: consent.biometricConsent,
        analyticsConsent: consent.analyticsConsent,
        consentDate: new Date()
      };
    }

    dataStore.logAudit(
      personnelId,
      req.user.name,
      req.user.role,
      'UPDATE_PRIVACY_CONSENT',
      `Personnel ID: ${personnelId}`,
      `Updated: Wellness=${consent.wellnessConsent}, Biometric=${consent.biometricConsent}, Analytics=${consent.analyticsConsent}`,
      'SUCCESS'
    );

    return res.status(200).json({
      success: true,
      message: 'Privacy and consent preferences updated successfully.',
      data: consent
    });
  } catch (error) {
    next(error);
  }
};
