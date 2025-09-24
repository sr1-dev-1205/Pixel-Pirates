export interface User {
  id: string;
  email: string;
  name: string;
  role: 'asha_worker' | 'health_official' | 'district_admin';
  village_id?: string;
  district: string;
  phone: string;
  language_preference: 'en' | 'as';
  created_at: string;
}

export interface Village {
  id: string;
  name: string;
  district: string;
  latitude: number;
  longitude: number;
  population: number;
  risk_level: 'low' | 'medium' | 'high';
  last_updated: string;
}

export interface HealthReport {
  id: string;
  village_id: string;
  reporter_id: string;
  report_date: string;
  symptoms: {
    diarrhea: number;
    fever: number;
    vomiting: number;
    dehydration: number;
  };
  total_cases: number;
  notes?: string;
  created_at: string;
}

export interface WaterQualityReport {
  id: string;
  village_id: string;
  reporter_id: string;
  test_date: string;
  ph_level: number;
  turbidity: number;
  chlorine_level: number;
  bacterial_presence: boolean;
  source_type: 'well' | 'borehole' | 'surface' | 'piped';
  created_at: string;
}

export interface Alert {
  id: string;
  village_id: string;
  alert_type: 'outbreak_risk' | 'water_contamination' | 'resource_shortage';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  message_as?: string;
  created_at: string;
  acknowledged: boolean;
  acknowledged_by?: string;
}

export interface PredictionData {
  village_id: string;
  prediction_date: string;
  outbreak_probability: number;
  risk_factors: {
    water_quality_score: number;
    symptom_trend_score: number;
    seasonal_score: number;
    population_density_score: number;
  };
  confidence_level: number;
  next_7_days: number[];
  next_14_days: number[];
}

export interface DashboardStats {
  total_villages: number;
  total_reports_today: number;
  high_risk_villages: number;
  active_alerts: number;
  total_cases_week: number;
}