/**
 * AI-Based Predictive Personnel Stress and Welfare Monitoring System
 * Service: Modular Predictive Risk & Welfare Analytics Engine
 * SIH26186 - CRPF / Ministry of Home Affairs
 *
 * NOTE: Welfare support indicators are NOT medical/psychological diagnoses.
 * Used exclusively for early welfare intervention, workload balancing, and support planning.
 */

export class WelfareRiskEngine {
  static evaluateMetrics({
    dutyHoursWeekly = 48,
    deploymentDays = 30,
    nightShifts30d = 4,
    daysSinceLeave = 25,
    sleepQualityScore = 7.0, // 1 - 10
    selfReportedStress = 4.0, // 1 - 10
    emotionalFatigue = 4.0,   // 1 - 10
    teamSupportScore = 7.5,   // 1 - 10
    recentWellnessParticipation = true
  }) {
    const contributing = [];
    const protective = [];
    const factorBreakdown = {};

    // 1. Duty Hours Factor (0 - 100)
    let dutyScore = 0;
    if (dutyHoursWeekly <= 48) {
      dutyScore = Math.max(10, (dutyHoursWeekly / 48) * 35);
      protective.push(`Regulated duty schedule (${dutyHoursWeekly} hrs/wk)`);
    } else if (dutyHoursWeekly <= 60) {
      dutyScore = 40 + ((dutyHoursWeekly - 48) / 12) * 30;
    } else {
      dutyScore = Math.min(100, 70 + ((dutyHoursWeekly - 60) / 20) * 30);
      contributing.push(`High weekly duty duration (${dutyHoursWeekly} hrs/wk)`);
    }
    factorBreakdown.dutyHours = Math.round(dutyScore);

    // 2. Deployment Duration (Days in arduous / forward field)
    let deployScore = 0;
    if (deploymentDays <= 45) {
      deployScore = (deploymentDays / 45) * 35;
      protective.push(`Standard deployment cycle (${deploymentDays} days)`);
    } else if (deploymentDays <= 75) {
      deployScore = 35 + ((deploymentDays - 45) / 30) * 35;
    } else {
      deployScore = Math.min(100, 70 + ((deploymentDays - 75) / 45) * 30);
      contributing.push(`Extended forward deployment (${deploymentDays} consecutive days)`);
    }
    factorBreakdown.deploymentDuration = Math.round(deployScore);

    // 3. Night Shifts past 30 days
    let nightScore = 0;
    if (nightShifts30d <= 5) {
      nightScore = (nightShifts30d / 5) * 30;
    } else if (nightShifts30d <= 10) {
      nightScore = 30 + ((nightShifts30d - 5) / 5) * 35;
    } else {
      nightScore = Math.min(100, 65 + ((nightShifts30d - 10) / 8) * 35);
      contributing.push(`Elevated night duty frequency (${nightShifts30d} shifts / 30d)`);
    }
    factorBreakdown.nightShifts = Math.round(nightScore);

    // 4. Leave Gap (Days since last sanctioned leave)
    let leaveScore = 0;
    if (daysSinceLeave <= 45) {
      leaveScore = (daysSinceLeave / 45) * 30;
      protective.push(`Recent sanctioned rest leave (${daysSinceLeave} days ago)`);
    } else if (daysSinceLeave <= 75) {
      leaveScore = 30 + ((daysSinceLeave - 45) / 30) * 35;
    } else {
      leaveScore = Math.min(100, 65 + ((daysSinceLeave - 75) / 45) * 30);
      contributing.push(`Extended interval since sanctioned leave (${daysSinceLeave} days)`);
    }
    factorBreakdown.leaveGap = Math.round(leaveScore);

    // 5. Sleep Deficit (Inverted from sleep quality 1-10)
    const sleepDeficit = Math.max(0, Math.min(100, (10 - sleepQualityScore) * 10));
    if (sleepQualityScore >= 7.5) {
      protective.push(`Adequate restorative sleep reported (${sleepQualityScore}/10)`);
    } else if (sleepQualityScore <= 4.0) {
      contributing.push(`Significant sleep disturbance reported (${sleepQualityScore}/10)`);
    }
    factorBreakdown.sleepDeficit = Math.round(sleepDeficit);

    // 6. Self-Reported Stress (1 - 10 to 0 - 100)
    const stressScaled = Math.max(0, Math.min(100, (selfReportedStress - 1) * (100 / 9)));
    if (selfReportedStress >= 7.0) {
      contributing.push(`Self-reported elevated stress intensity (${selfReportedStress}/10)`);
    } else if (selfReportedStress <= 3.5) {
      protective.push(`Low self-reported stress (${selfReportedStress}/10)`);
    }
    factorBreakdown.selfReportedStress = Math.round(stressScaled);

    // 7. Emotional Fatigue (1 - 10 to 0 - 100)
    const fatigueScaled = Math.max(0, Math.min(100, (emotionalFatigue - 1) * (100 / 9)));
    if (emotionalFatigue >= 7.0) {
      contributing.push(`Accumulated emotional fatigue indicator (${emotionalFatigue}/10)`);
    }
    factorBreakdown.emotionalFatigue = Math.round(fatigueScaled);

    // Protective Buffers
    let bufferReduction = 0;
    if (teamSupportScore >= 7.0) {
      protective.push(`Strong team cohesion & peer support (${teamSupportScore}/10)`);
      bufferReduction += (teamSupportScore - 6.0) * 2.5;
    } else if (teamSupportScore <= 3.5) {
      contributing.push('Low perceived peer/unit support');
    }

    if (recentWellnessParticipation) {
      protective.push('Active participation in institutional wellness check-ins');
      bufferReduction += 3.0;
    }

    // Calibrated Weights
    const weights = {
      dutyHours: 0.18,
      deploymentDuration: 0.17,
      nightShifts: 0.14,
      leaveGap: 0.16,
      sleepDeficit: 0.13,
      selfReportedStress: 0.12,
      emotionalFatigue: 0.10
    };

    const rawScore = 
      factorBreakdown.dutyHours * weights.dutyHours +
      factorBreakdown.deploymentDuration * weights.deploymentDuration +
      factorBreakdown.nightShifts * weights.nightShifts +
      factorBreakdown.leaveGap * weights.leaveGap +
      factorBreakdown.sleepDeficit * weights.sleepDeficit +
      factorBreakdown.selfReportedStress * weights.selfReportedStress +
      factorBreakdown.emotionalFatigue * weights.emotionalFatigue;

    const supportIndicator = Math.max(8, Math.min(96, Math.round(rawScore - bufferReduction)));

    let category = 'Stable';
    let recommendations = [];

    if (supportIndicator < 40) {
      category = 'Stable';
      recommendations = [
        'Maintain current rotation balance and hydration routines',
        'Continue periodic voluntary wellness check-ins',
        'Reinforce peer support practices within the squad'
      ];
    } else if (supportIndicator < 65) {
      category = 'Monitor';
      recommendations = [
        'Schedule informal check-in with unit Welfare Officer',
        'Review recent night duty and shift cadence',
        'Verify upcoming rest cycle or sanctioned leave window'
      ];
    } else {
      category = 'Elevated Support';
      recommendations = [
        'Initiate supportive, non-punitive welfare consultation within 7 days',
        'Review current operational duty hours and explore rotation adjustments',
        'Expedite pending leave sanction or recovery rest period',
        'Provide confidential counseling and peer welfare resources'
      ];
    }

    return {
      supportIndicator,
      category,
      contributingFactors: contributing,
      protectiveFactors: protective,
      factorBreakdown,
      recommendedActions: recommendations,
      confidenceScore: 0.88,
      modelVersion: 'CRPF-WelfareNet-v2.1',
      disclaimer: 'AI-generated welfare support indicator — not a medical diagnosis. Intended exclusively for preventive welfare planning and authorized counseling support.'
    };
  }
}
