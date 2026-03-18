import { useState, useEffect, useCallback } from 'react';
import { Village, HealthReport, WaterQualityReport, Alert, PredictionData, DashboardStats } from '../types';
import { calculateVillageRisk } from '../lib/riskEngine';
import { DataPersistence } from '../lib/dataPersistence';
import toast from 'react-hot-toast';

// Mock data generation (keep initial generators for seeding data)
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
    name: 'Majuli-Past', // Extra historical report
    village_id: '1',
    reporter_id: 'asha_1',
    report_date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    symptoms: { diarrhea: 10, fever: 15, vomiting: 5, dehydration: 2 },
    total_cases: 32,
    created_at: new Date(Date.now() - 86400000).toISOString(),
  } as any, // casting for quick mock fix
  {
    id: '3',
    village_id: '2',
    reporter_id: 'asha_2',
    report_date: new Date().toISOString().split('T')[0],
    symptoms: { diarrhea: 8, fever: 12, vomiting: 4, dehydration: 2 },
    total_cases: 26,
    notes: 'Normal seasonal pattern',
    created_at: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: '4',
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

  // Load data from localStorage or generate initial data
  const loadData = useCallback(async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      // Try to load from localStorage first
      const storedVillages = DataPersistence.getVillages();
      const storedHealthReports = DataPersistence.getHealthReports();
      const storedWaterReports = DataPersistence.getWaterReports();
      const storedAlerts = DataPersistence.getAlerts();

      if (storedVillages.length > 0) {
        setVillages(storedVillages);
        setHealthReports(storedHealthReports);
        setWaterReports(storedWaterReports);
        setAlerts(storedAlerts);
        console.log('✓ Data loaded from localStorage');
      } else {
        // Generate initial mock data if nothing in storage
        const mockVillages = generateMockVillages();
        const mockHealthReports = generateMockHealthReports();
        const mockWaterReports = generateMockWaterReports();
        const mockAlerts = generateMockAlerts();

        setVillages(mockVillages);
        setHealthReports(mockHealthReports);
        setWaterReports(mockWaterReports);
        setAlerts(mockAlerts);
        
        // Save to localStorage
        DataPersistence.setVillages(mockVillages);
        DataPersistence.setHealthReports(mockHealthReports);
        DataPersistence.setWaterReports(mockWaterReports);
        DataPersistence.setAlerts(mockAlerts);
        
        console.log('✓ Initial data generated and saved to localStorage');
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Failed to load data');
      setLoading(false);
    }
  }, []);

  // Initial Data Load
  useEffect(() => {
    loadData();
  }, [loadData]);

  // Recalculate predictions and stats whenever data changes
  useEffect(() => {
    if (villages.length === 0) return;

    // 1. Calculate Predictions
    const newPredictions = villages.map(village =>
      calculateVillageRisk(village.id, healthReports, waterReports)
    );
    setPredictions(newPredictions);

    // 2. Update Village Risk Levels
    const updatedVillages = villages.map(village => {
      const pred = newPredictions.find(p => p.village_id === village.id);
      let newRisk: 'low' | 'medium' | 'high' = 'low';
      if (pred) {
        if (pred.outbreak_probability >= 0.7) newRisk = 'high';
        else if (pred.outbreak_probability >= 0.4) newRisk = 'medium';
      }
      return { ...village, risk_level: newRisk };
    });

    // Check if risk levels actually changed to avoid infinite loops if we were setting villages directly
    // But here we can't easily setVillages inside this effect if 'villages' is a dependency.
    // So we'll update stats instead, and perhaps rely on dashboard stats for UI.
    // IMPORTANT: To properly update village risk levels in the UI without infinite loops, 
    // we would need a more complex state management.
    // For now, let's just update the Dashboard stats based on the *calculated* risk, 
    // and rely on the predictions array for looking up risk in other components if needed.
    // OR: We check JSON.stringify to see if we really need to update villages.

    // Let's take a simpler approach: We won't update 'villages' state here to avoid loops.
    // Instead we compute derived stats.

    const derivedStats = generateDashboardStats(updatedVillages, healthReports, alerts);
    setDashboardStats(derivedStats);

  }, [healthReports, waterReports, alerts, villages.length]);
  // removed `villages` from dependency to avoid loop if we were updating it, 
  // but strictly we should probably update villages. 

  // A safe way to update village risk levels without loops:
  useEffect(() => {
    if (villages.length === 0 || predictions.length === 0) return;

    let changed = false;
    const updatedVillages = villages.map(village => {
      const pred = predictions.find(p => p.village_id === village.id);
      if (!pred) return village;

      let newRisk: 'low' | 'medium' | 'high' = 'low';
      if (pred.outbreak_probability >= 0.7) newRisk = 'high';
      else if (pred.outbreak_probability >= 0.4) newRisk = 'medium';

      if (village.risk_level !== newRisk) {
        changed = true;
        return { ...village, risk_level: newRisk };
      }
      return village;
    });

    if (changed) {
      setVillages(updatedVillages);
    }
  }, [predictions]); // Only run when predictions update


  return {
    villages,
    healthReports,
    waterReports,
    alerts,
    predictions,
    dashboardStats,
    loading,
    refreshData: loadData,
    // Helper functions for adding new data with persistence
    addHealthReport: (report: Omit<HealthReport, 'id' | 'created_at'>) => {
      const newReport: HealthReport = {
        ...report,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
      };
      setHealthReports(prev => {
        const updated = [newReport, ...prev];
        DataPersistence.setHealthReports(updated);
        return updated;
      });
      toast.success('Health report saved successfully');
    },
    acknowledgeAlert: (alertId: string) => {
      setAlerts(prev => {
        const updated = prev.map(alert =>
          alert.id === alertId ? { 
            ...alert, 
            acknowledged: true,
            acknowledged_by: 'current_user',
            acknowledged_at: new Date().toISOString(),
          } : alert
        );
        DataPersistence.setAlerts(updated);
        toast.success('Alert acknowledged');
        return updated;
      });
    },
    addWaterReport: (report: Omit<WaterQualityReport, 'id' | 'created_at'>) => {
      const newReport: WaterQualityReport = {
        ...report,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
      };      setWaterReports(prev => {
        const updated = [newReport, ...prev];
        DataPersistence.setWaterReports(updated);
        return updated;
      });
      toast.success('Water quality report saved successfully');
    },
    exportData: () => {
      const data = DataPersistence.exportAllData();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `aarogya_jal_backup_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast.success('Data exported successfully');
    },
    importData: (file: File) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target?.result as string);
          if (DataPersistence.importAllData(data)) {
            loadData();
            toast.success('Data imported successfully');
          } else {
            toast.error('Failed to import data');
          }
        } catch (error) {
          toast.error('Invalid data file');
        }
      };
      reader.readAsText(file);
    },
    clearAllData: () => {
      if (window.confirm('Are you sure you want to clear all data? This cannot be undone.')) {
        DataPersistence.clear();
        loadData();
        toast.success('All data cleared');
      }
    },
  };
}