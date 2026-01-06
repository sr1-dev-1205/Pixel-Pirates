import { HealthReport, WaterQualityReport, PredictionData } from '../types';

// Constants for weights
const WATER_QUALITY_WEIGHT = 0.45;
const SYMPTOM_WEIGHT = 0.35;
const SEASONAL_WEIGHT = 0.20;

export function calculateVillageRisk(
    villageId: string,
    healthReports: HealthReport[],
    waterReports: WaterQualityReport[]
): PredictionData {
    // 1. Calculate Water Quality Score (0 = Bad, 1 = Good) -> Inverted for Risk (1 = High Risk)
    const recentWaterReports = waterReports
        .filter(r => r.village_id === villageId)
        .sort((a, b) => new Date(b.test_date).getTime() - new Date(a.test_date).getTime())
        .slice(0, 3); // Take last 3 reports

    let waterRiskScore = 0;

    if (recentWaterReports.length > 0) {
        const latest = recentWaterReports[0];

        // pH risk (ideal 6.5-8.5)
        const phRisk = (latest.ph_level < 6.5 || latest.ph_level > 8.5) ? 0.8 : 0.1;

        // Turbidity risk (> 5 NTU is bad)
        const turbidityRisk = latest.turbidity > 5 ? Math.min(latest.turbidity / 10, 1) : 0.1;

        // Chlorine risk (< 0.2 is bad if piped/treated, but we'll assume general low chlorine is risky)
        const chlorineRisk = latest.chlorine_level < 0.2 ? 0.7 : 0.1;

        // Bacterial presence (Critical)
        const bacterialRisk = latest.bacterial_presence ? 1.0 : 0.0;

        // Average them, but bacteria is weighted heavily
        waterRiskScore = (phRisk * 0.1 + turbidityRisk * 0.2 + chlorineRisk * 0.2 + bacterialRisk * 0.5);
    } else {
        waterRiskScore = 0.3; // Default moderate/low risk if no data
    }

    // 2. Calculate Symptom Trend Score (0-1)
    const recentHealthReports = healthReports
        .filter(r => r.village_id === villageId)
        .sort((a, b) => new Date(b.report_date).getTime() - new Date(a.report_date).getTime())
        .slice(0, 7); // Last 7 reports

    let symptomRiskScore = 0;

    if (recentHealthReports.length > 0) {
        // Check for recent spikes
        const totalRecentCases = recentHealthReports.reduce((sum, r) => sum + r.total_cases, 0);
        const avgCases = totalRecentCases / recentHealthReports.length;

        // Basic threshold logic (configurable)
        // If avg cases > 20/day, high risk. > 10, medium.
        symptomRiskScore = Math.min(avgCases / 30, 1);

        // Specific symptom check: Diarrhea causes higher risk
        const totalDiarrhea = recentHealthReports.reduce((sum, r) => sum + r.symptoms.diarrhea, 0);
        if (totalDiarrhea > (totalRecentCases * 0.4)) {
            symptomRiskScore = Math.min(symptomRiskScore * 1.5, 1);
        }
    } else {
        symptomRiskScore = 0.1;
    }

    // 3. Seasonal Score (Mocked based on month)
    const currentMonth = new Date().getMonth(); // 0-11
    // Monsoon months (June-Sept) are higher risk in NE India
    const isMonsoon = currentMonth >= 5 && currentMonth <= 8;
    const seasonalScore = isMonsoon ? 0.8 : 0.3;

    // 4. Calculate Final Probability
    const outbreakProbability = (
        (waterRiskScore * WATER_QUALITY_WEIGHT) +
        (symptomRiskScore * SYMPTOM_WEIGHT) +
        (seasonalScore * SEASONAL_WEIGHT)
    );

    // Generate trend line (mocked but based on score)
    const baseLine = outbreakProbability;
    const next7Days = Array.from({ length: 7 }, (_, i) => {
        // Add slight random fluctuation
        const change = (Math.random() - 0.5) * 0.1;
        return Math.max(0, Math.min(1, baseLine + change + (i * 0.01 * (baseLine > 0.5 ? 1 : -1))));
    });

    const next14Days = Array.from({ length: 14 }, (_, i) => {
        const change = (Math.random() - 0.5) * 0.15;
        return Math.max(0, Math.min(1, baseLine + change + (i * 0.01 * (baseLine > 0.5 ? 1 : -1))));
    });

    return {
        village_id: villageId,
        prediction_date: new Date().toISOString(),
        outbreak_probability: Number(outbreakProbability.toFixed(2)),
        risk_factors: {
            water_quality_score: Number(waterRiskScore.toFixed(2)),
            symptom_trend_score: Number(symptomRiskScore.toFixed(2)),
            seasonal_score: Number(seasonalScore.toFixed(2)),
            population_density_score: 0.5, // Static for now
        },
        confidence_level: 0.85 + (Math.random() * 0.1), // Mock confidence
        next_7_days: next7Days,
        next_14_days: next14Days,
    };
}
