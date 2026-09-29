"""
AI-Based Predictive Personnel Stress and Welfare Monitoring System
Module: ML Risk Analytics Engine
Problem Statement ID: SIH26186 / 26186
Organization: Ministry of Home Affairs - CRPF

IMPORTANT ETHICAL & CLINICAL NOTICE:
This system produces AI-assisted welfare support indicators only.
It is strictly designed for preventive welfare, workload balancing, and early intervention.
It is NOT a medical or psychological diagnosis and MUST NOT be used for disciplinary action,
punishment, promotion decisions, or stigmatization.
"""

from dataclasses import dataclass, field
from typing import List, Dict, Any, Optional
import math
import json
import sys

@dataclass
class PersonnelWelfareMetrics:
    personnel_id: str
    duty_hours_weekly: float       # Standard baseline ~ 48-54h; Arduous > 60h
    deployment_days: int           # Consecutive days in deployment / arduous area
    night_shifts_30d: int          # Night duties in past 30 days
    days_since_leave: int          # Days since last sanctioned leave / rest break
    sleep_quality_score: float     # 1 (Poor) to 10 (Optimal)
    self_reported_stress: float    # 1 (Low) to 10 (Extreme)
    emotional_fatigue: float       # 1 (Minimal) to 10 (Severe)
    team_support_score: float      # 1 (Isolated) to 10 (Highly supportive)
    training_load_weekly_hours: float = 10.0
    transfers_last_24m: int = 1
    recent_wellness_participation: bool = True

@dataclass
class RiskEngineOutput:
    support_indicator_score: int    # 0 - 100
    category: str                   # 'Stable', 'Monitor', 'Elevated Support'
    risk_level: str                 # 'Low', 'Moderate', 'Elevated'
    contributing_factors: List[str]
    protective_factors: List[str]
    factor_breakdown: Dict[str, float]
    recommended_interventions: List[str]
    confidence_score: float
    disclaimer: str = (
        "AI-generated welfare support indicator — not a medical diagnosis. "
        "Intended exclusively for preventive welfare planning and authorized counseling support."
    )

class WelfareRiskEngine:
    """
    Explainable predictive risk model weighting organizational stressors,
    duty parameters, and voluntary wellness self-assessments.
    """
    
    # Calibrated weights for organizational & voluntary factors
    WEIGHTS = {
        'duty_hours': 0.18,
        'deployment_duration': 0.17,
        'night_shifts': 0.14,
        'leave_gap': 0.16,
        'sleep_deficit': 0.13,
        'self_reported_stress': 0.12,
        'emotional_fatigue': 0.10
    }

    @classmethod
    def evaluate(cls, metrics: PersonnelWelfareMetrics) -> RiskEngineOutput:
        contributing: List[str] = []
        protective: List[str] = []
        factor_scores: Dict[str, float] = {}

        # 1. Duty Hours Factor (Normalized 0 - 100)
        # Optimal <= 48 hrs; Moderate 49-60; Severe > 60 hrs/wk
        if metrics.duty_hours_weekly <= 48:
            duty_score = max(10.0, (metrics.duty_hours_weekly / 48.0) * 35.0)
            protective.append(f"Regulated weekly duty schedule ({metrics.duty_hours_weekly:.1f} hrs/wk)")
        elif metrics.duty_hours_weekly <= 60:
            duty_score = 40.0 + ((metrics.duty_hours_weekly - 48.0) / 12.0) * 30.0
        else:
            duty_score = min(100.0, 70.0 + ((metrics.duty_hours_weekly - 60.0) / 20.0) * 30.0)
            contributing.append(f"High weekly duty duration ({metrics.duty_hours_weekly:.1f} hrs/wk)")
        factor_scores['duty_hours'] = round(duty_score, 1)

        # 2. Deployment Duration Factor
        # Baseline <= 45 days; Moderate 46-75; Extended > 75 days
        if metrics.deployment_days <= 45:
            deploy_score = (metrics.deployment_days / 45.0) * 35.0
            protective.append(f"Standard deployment duration ({metrics.deployment_days} days)")
        elif metrics.deployment_days <= 75:
            deploy_score = 35.0 + ((metrics.deployment_days - 45.0) / 30.0) * 35.0
        else:
            deploy_score = min(100.0, 70.0 + ((metrics.deployment_days - 75.0) / 45.0) * 30.0)
            contributing.append(f"Extended forward/arduous deployment ({metrics.deployment_days} continuous days)")
        factor_scores['deployment_duration'] = round(deploy_score, 1)

        # 3. Night Shifts (past 30 days)
        # Optimal <= 5; Moderate 6-10; High > 10
        if metrics.night_shifts_30d <= 5:
            night_score = (metrics.night_shifts_30d / 5.0) * 30.0
        elif metrics.night_shifts_30d <= 10:
            night_score = 30.0 + ((metrics.night_shifts_30d - 5.0) / 5.0) * 35.0
        else:
            night_score = min(100.0, 65.0 + ((metrics.night_shifts_30d - 10.0) / 8.0) * 35.0)
            contributing.append(f"Frequent circadian disruption ({metrics.night_shifts_30d} night shifts in 30 days)")
        factor_scores['night_shifts'] = round(night_score, 1)

        # 4. Leave Gap (Days since last sanctioned leave)
        # Healthy <= 45 days; Due 46-75 days; Overdue > 75 days
        if metrics.days_since_leave <= 45:
            leave_score = (metrics.days_since_leave / 45.0) * 30.0
            protective.append(f"Recent rest cycle / sanctioned leave ({metrics.days_since_leave} days ago)")
        elif metrics.days_since_leave <= 75:
            leave_score = 30.0 + ((metrics.days_since_leave - 45.0) / 30.0) * 35.0
        else:
            leave_score = min(100.0, 65.0 + ((metrics.days_since_leave - 75.0) / 45.0) * 35.0)
            contributing.append(f"Prolonged leave interval ({metrics.days_since_leave} days since last leave)")
        factor_scores['leave_gap'] = round(leave_score, 1)

        # 5. Sleep Deficit (Inverted from sleep quality 1-10)
        # 10 is optimal sleep (deficit = 0), 1 is severe sleep disruption (deficit = 100)
        sleep_deficit = max(0.0, min(100.0, (10.0 - metrics.sleep_quality_score) * 10.0))
        if metrics.sleep_quality_score >= 7.5:
            protective.append(f"Adequate restorative sleep reported ({metrics.sleep_quality_score:.1f}/10)")
        elif metrics.sleep_quality_score <= 4.0:
            contributing.append(f"Significant sleep disruption reported ({metrics.sleep_quality_score:.1f}/10)")
        factor_scores['sleep_deficit'] = round(sleep_deficit, 1)

        # 6. Self-Reported Stress (1 - 10 scaled to 0 - 100)
        stress_scaled = max(0.0, min(100.0, (metrics.self_reported_stress - 1.0) * (100.0 / 9.0)))
        if metrics.self_reported_stress >= 7.0:
            contributing.append(f"Self-reported elevated stress intensity ({metrics.self_reported_stress:.1f}/10)")
        elif metrics.self_reported_stress <= 3.0:
            protective.append(f"Low self-reported personal stress ({metrics.self_reported_stress:.1f}/10)")
        factor_scores['self_reported_stress'] = round(stress_scaled, 1)

        # 7. Emotional Fatigue (1 - 10 scaled to 0 - 100)
        fatigue_scaled = max(0.0, min(100.0, (metrics.emotional_fatigue - 1.0) * (100.0 / 9.0)))
        if metrics.emotional_fatigue >= 7.0:
            contributing.append(f"Accumulated emotional fatigue indicator ({metrics.emotional_fatigue:.1f}/10)")
        factor_scores['emotional_fatigue'] = round(fatigue_scaled, 1)

        # 8. Protective Buffer: Team Support & Wellness Participation
        buffer_reduction = 0.0
        if metrics.team_support_score >= 7.0:
            protective.append(f"Strong unit cohesion & team support ({metrics.team_support_score:.1f}/10)")
            buffer_reduction += (metrics.team_support_score - 6.0) * 2.5
        elif metrics.team_support_score <= 3.0:
            contributing.append("Perceived lack of peer or unit-level social support")

        if metrics.recent_wellness_participation:
            protective.append("Active participation in institutional wellness check-ins")
            buffer_reduction += 3.0

        # Weighted calculation
        raw_score = sum(factor_scores[k] * cls.WEIGHTS[k] for k in cls.WEIGHTS)
        
        # Apply protective buffer
        final_score = max(5, min(95, round(raw_score - buffer_reduction)))

        # Categorization based on prompt specifications
        if final_score < 40:
            category = "Stable"
            risk_level = "Low"
            recommendations = [
                "Maintain regular rest and hydration cycles",
                "Encourage ongoing peer connection and routine welfare check-ins",
                "Continue standard rotation schedule"
            ]
        elif final_score < 65:
            category = "Monitor"
            risk_level = "Moderate"
            recommendations = [
                "Schedule informal welfare check-in with unit welfare officer",
                "Review workload and nighttime duty distribution",
                "Ensure upcoming rest window or sanctioned leave is planned"
            ]
        else:
            category = "Elevated Support"
            risk_level = "Elevated"
            recommendations = [
                "Conduct supportive, non-punitive welfare consultation within 7 days",
                "Review shift load and prioritize rest/recovery interval",
                "Evaluate upcoming leave sanction eligibility",
                "Offer voluntary confidential counseling resources"
            ]

        confidence = 0.88 if len(contributing) + len(protective) >= 3 else 0.75

        return RiskEngineOutput(
            support_indicator_score=final_score,
            category=category,
            risk_level=risk_level,
            contributing_factors=contributing,
            protective_factors=protective,
            factor_breakdown=factor_scores,
            recommended_interventions=recommendations,
            confidence_score=confidence
        )

# Command-line testing bridge
if __name__ == "__main__":
    # Test case matching Prompt Section 34 demo scenario:
    demo_sample = PersonnelWelfareMetrics(
        personnel_id="PF-1024",
        duty_hours_weekly=66.0,
        deployment_days=94,
        night_shifts_30d=11,
        days_since_leave=82,
        sleep_quality_score=3.5,
        self_reported_stress=6.5,
        emotional_fatigue=7.0,
        team_support_score=7.8,
        recent_wellness_participation=True
    )
    result = WelfareRiskEngine.evaluate(demo_sample)
    print("\n--- AI Risk Analytics Engine: Demo Personnel Assessment ---")
    print(f"Personnel ID: {demo_sample.personnel_id}")
    print(f"Welfare Support Indicator: {result.support_indicator_score}/100")
    print(f"Support Category: {result.category}")
    print(f"Contributing Factors: {result.contributing_factors}")
    print(f"Protective Factors: {result.protective_factors}")
    print(f"Recommended Actions: {result.recommended_interventions}")
    print(f"Disclaimer: {result.disclaimer}\n")
