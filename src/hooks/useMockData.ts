import { useState, useEffect } from 'react';
import { Village, HealthReport, WaterQualityReport, Alert, PredictionData, DashboardStats } from '../types';

// Mock data generation
const generateMockVillages = (): Village[] => [
  {
    id: '1',
    name: 'Majuli',
    district: 'Jorhat',
    latitude: 27.0238,
    longitude: 94.2030,
    population: 15000,
    risk_level: 'high',
    last_updated: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Dibrugarh',
    district: 'Dibrugarh',
    latitude: 27.4728,
    longitude: 94.9120,
    population: 25000,
    risk_level: 'medium',
    last_updated: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: '3',
    name: 'Tezpur',
    district: 'Sonitpur',
    latitude: 26.6333,
    longitude: 92.8000,
    population: 18000,
    risk_level: 'low',
    last_updated: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: '4',
    name: 'Silchar',
    district: 'Cachar',
    latitude: 24.8333,
    longitude: 92.7789,
    population: 22000,
    risk_level: 'medium',
    last_updated: new Date(Date.now() - 1800000).toISOString(),
  },
  {
    id: '5',
    name: 'Kokrajhar',
    district: 'Kokrajhar',
    latitude: 26.4015,
    longitude: 90.2722,
    population: 12000,
    risk_level: 'high',
    last_updated: new Date(Date.now() - 900000).toISOString(),
  },
];

const generateMockHealthReports = (): HealthReport[] => [
  {
    id: '1',
    village_id: '1',
    reporter_id: 'asha_1',
    report_date: new Date().toISOString().split('T')[0],
    symptoms: { diarrhea: 15, fever: 20, vomiting: 8, dehydration: 5 },
    total_cases: 48,
    notes: 'Increased cases after recent flooding',
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    village_id: '2',
    reporter_id: 'asha_2',
    report_date: new Date().toISOString().split('T')[0],
    symptoms: { diarrhea: 8, fever: 12, vomiting: 4, dehydration: 2 },
    total_cases: 26,
    notes: 'Normal seasonal pattern',
    created_at: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: '3',
    village_id: '5',
    reporter_id: 'asha_3',
    report_date: new Date().toISOString().split('T')[0],
    symptoms: { diarrhea: 12, fever: 18, vomiting: 6, dehydration: 4 },
    total_cases: 40,
    notes: 'Water source contamination suspected',
    created_at: new Date(Date.now() - 1800000).toISOString(),
  },
];

const generateMockWaterReports = (): WaterQualityReport[] => [
  {
    id: '1',
    village_id: '1',
    reporter_id: 'asha_1',
    test_date: new Date().toISOString().split('T')[0],
    ph_level: 5.8,
    turbidity: 15.2,
    chlorine_level: 0.1,
    bacterial_presence: true,
    source_type: 'well',
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    village_id: '2',
    reporter_id: 'asha_2',
    test_date: new Date().toISOString().split('T')[0],
    ph_level: 7.2,
    turbidity: 5.1,
    chlorine_level: 0.5,
    bacterial_presence: false,
    source_type: 'piped',
    created_at: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: '3',
    village_id: '3',
    reporter_id: 'asha_3',
    test_date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    ph_level: 7.8,
    turbidity: 3.2,
    chlorine_level: 0.8,
    bacterial_presence: false,
    source_type: 'borehole',
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '4',
    village_id: '4',
    reporter_id: 'asha_4',
    test_date: new Date(Date.now() - 172800000).toISOString().split('T')[0],
    ph_level: 6.9,
    turbidity: 8.5,
    chlorine_level: 0.3,
    bacterial_presence: false,
    source_type: 'surface',
    created_at: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: '5',
    village_id: '5',
    reporter_id: 'asha_5',
    test_date: new Date(Date.now() - 259200000).toISOString().split('T')[0],
    ph_level: 5.2,
    turbidity: 22.1,
    chlorine_level: 0.05,
    bacterial_presence: true,
    source_type: 'well',
    created_at: new Date(Date.now() - 259200000).toISOString(),
  },
];

const generateMockAlerts = (): Alert[] => [
  {
    id: '1',
    village_id: '1',
    alert_type: 'outbreak_risk',
    severity: 'high',
    message: 'High risk of cholera outbreak detected in Majuli. Immediate intervention required.',
    message_as: 'মাজুলীত কলেৰা প্ৰাদুৰ্ভাৱৰ উচ্চ বিপদ ধৰা পৰিছে। তৎক্ষণাৎ হস্তক্ষেপৰ প্ৰয়োজন।',
    created_at: new Date().toISOString(),
    acknowledged: false,
  },
  {
    id: '2',
    village_id: '5',
    alert_type: 'water_contamination',
    severity: 'critical',
    message: 'Water contamination detected in Kokrajhar. Alternative water sources needed urgently.',
    message_as: 'কোকৰাঝাৰত পানী দূষণ ধৰা পৰিছে। তৎক্ষণাৎ বিকল্প পানীৰ উৎসৰ প্ৰয়োজন।',
    created_at: new Date(Date.now() - 1800000).toISOString(),
    acknowledged: false,
  },
];

const generateMockPredictions = (): PredictionData[] => [
  {
    village_id: '1',
    prediction_date: new Date().toISOString(),
    outbreak_probability: 0.85,
    risk_factors: {
      water_quality_score: 0.9,
      symptom_trend_score: 0.8,
      seasonal_score: 0.7,
      population_density_score: 0.6,
    },
    confidence_level: 0.92,
    next_7_days: [0.85, 0.82, 0.78, 0.75, 0.72, 0.68, 0.65],
    next_14_days: [0.85, 0.82, 0.78, 0.75, 0.72, 0.68, 0.65, 0.62, 0.58, 0.55, 0.52, 0.48, 0.45, 0.42],
  },
  {
    village_id: '5',
    prediction_date: new Date().toISOString(),
    outbreak_probability: 0.76,
    risk_factors: {
      water_quality_score: 0.85,
      symptom_trend_score: 0.7,
      seasonal_score: 0.6,
      population_density_score: 0.5,
    },
    confidence_level: 0.88,
    next_7_days: [0.76, 0.73, 0.70, 0.67, 0.64, 0.61, 0.58],
    next_14_days: [0.76, 0.73, 0.70, 0.67, 0.64, 0.61, 0.58, 0.55, 0.52, 0.49, 0.46, 0.43, 0.40, 0.37],
  },
];

const generateDashboardStats = (
  villages: Village[],
  healthReports: HealthReport[],
  alerts: Alert[]
): DashboardStats => {
  const today = new Date().toISOString().split('T')[0];
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  return {
    total_villages: villages.length,
    total_reports_today: healthReports.filter(r => r.report_date === today).length,
    high_risk_villages: villages.filter(v => v.risk_level === 'high').length,
    active_alerts: alerts.filter(a => !a.acknowledged).length,
    total_cases_week: healthReports
      .filter(r => r.created_at >= weekAgo)
      .reduce((sum, r) => sum + r.total_cases, 0),
  };
};

export function useMockData() {
  const [villages, setVillages] = useState<Village[]>([]);
  const [healthReports, setHealthReports] = useState<HealthReport[]>([]);
  const [waterReports, setWaterReports] = useState<WaterQualityReport[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [predictions, setPredictions] = useState<PredictionData[]>([]);
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API loading delay
    const loadData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockVillages = generateMockVillages();
      const mockHealthReports = generateMockHealthReports();
      const mockWaterReports = generateMockWaterReports();
      const mockAlerts = generateMockAlerts();
      const mockPredictions = generateMockPredictions();
      const mockStats = generateDashboardStats(mockVillages, mockHealthReports, mockAlerts);

      setVillages(mockVillages);
      setHealthReports(mockHealthReports);
      setWaterReports(mockWaterReports);
      setAlerts(mockAlerts);
      setPredictions(mockPredictions);
      setDashboardStats(mockStats);
      setLoading(false);
    };

    loadData();
  }, []);

  return {
    villages,
    healthReports,
    waterReports,
    alerts,
    predictions,
    dashboardStats,
    loading,
    // Helper functions for adding new data
    addHealthReport: (report: Omit<HealthReport, 'id' | 'created_at'>) => {
      const newReport: HealthReport = {
        ...report,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
      };
      setHealthReports(prev => [newReport, ...prev]);
    },
    acknowledgeAlert: (alertId: string) => {
      setAlerts(prev => prev.map(alert => 
        alert.id === alertId ? { ...alert, acknowledged: true } : alert
      ));
    },
    addWaterReport: (report: Omit<WaterQualityReport, 'id' | 'created_at'>) => {
      const newReport: WaterQualityReport = {
        ...report,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
      };
      setWaterReports(prev => [newReport, ...prev]);
    },
  };
}