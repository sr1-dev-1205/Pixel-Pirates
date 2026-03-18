import { Village, HealthReport, WaterQualityReport, Alert, PredictionData } from '../types';

const STORAGE_KEYS = {
  VILLAGES: 'aarogya_jal_villages',
  HEALTH_REPORTS: 'aarogya_jal_health_reports',
  WATER_REPORTS: 'aarogya_jal_water_reports',
  ALERTS: 'aarogya_jal_alerts',
  PREDICTIONS: 'aarogya_jal_predictions',
  SETTINGS: 'aarogya_jal_settings',
  LAST_SYNC: 'aarogya_jal_last_sync',
};

export class DataPersistence {
  // Generic storage methods
  static get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error reading from localStorage (${key}):`, error);
      return null;
    }
  }

  static set<T>(key: string, value: T): boolean {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error writing to localStorage (${key}):`, error);
      return false;
    }
  }

  static remove(key: string): boolean {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing from localStorage (${key}):`, error);
      return false;
    }
  }

  static clear(): boolean {
    try {
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  }

  // Village methods
  static getVillages(): Village[] {
    return this.get<Village[]>(STORAGE_KEYS.VILLAGES) || [];
  }

  static setVillages(villages: Village[]): boolean {
    return this.set(STORAGE_KEYS.VILLAGES, villages);
  }

  static getVillageById(id: string): Village | null {
    const villages = this.getVillages();
    return villages.find(v => v.id === id) || null;
  }

  static updateVillageRiskLevels(villages: Village[], predictions: PredictionData[]): Village[] {
    return villages.map(village => {
      const prediction = predictions.find(p => p.village_id === village.id);
      let newRisk: 'low' | 'medium' | 'high' = 'low';
      
      if (prediction) {
        if (prediction.outbreak_probability >= 0.7) newRisk = 'high';
        else if (prediction.outbreak_probability >= 0.4) newRisk = 'medium';
      }
      
      return { ...village, risk_level: newRisk };
    });
  }

  // Health Report methods
  static getHealthReports(): HealthReport[] {
    return this.get<HealthReport[]>(STORAGE_KEYS.HEALTH_REPORTS) || [];
  }

  static setHealthReports(reports: HealthReport[]): boolean {
    return this.set(STORAGE_KEYS.HEALTH_REPORTS, reports);
  }

  static addHealthReport(report: HealthReport): boolean {
    const reports = this.getHealthReports();
    reports.unshift(report);
    return this.setHealthReports(reports);
  }

  // Water Quality methods
  static getWaterReports(): WaterQualityReport[] {
    return this.get<WaterQualityReport[]>(STORAGE_KEYS.WATER_REPORTS) || [];
  }

  static setWaterReports(reports: WaterQualityReport[]): boolean {
    return this.set(STORAGE_KEYS.WATER_REPORTS, reports);
  }

  static addWaterReport(report: WaterQualityReport): boolean {
    const reports = this.getWaterReports();
    reports.unshift(report);
    return this.setWaterReports(reports);
  }

  // Alert methods
  static getAlerts(): Alert[] {
    return this.get<Alert[]>(STORAGE_KEYS.ALERTS) || [];
  }

  static setAlerts(alerts: Alert[]): boolean {
    return this.set(STORAGE_KEYS.ALERTS, alerts);
  }

  static acknowledgeAlert(alertId: string): boolean {
    const alerts = this.getAlerts();
    const alertIndex = alerts.findIndex(a => a.id === alertId);
    
    if (alertIndex !== -1) {
      alerts[alertIndex] = {
        ...alerts[alertIndex],
        acknowledged: true,
        acknowledged_by: 'current_user',
        acknowledged_at: new Date().toISOString(),
      };
      return this.setAlerts(alerts);
    }
    return false;
  }

  // Settings methods
  static getSettings(): Record<string, any> {
    return this.get<Record<string, any>>(STORAGE_KEYS.SETTINGS) || {};
  }

  static setSettings(settings: Record<string, any>): boolean {
    return this.set(STORAGE_KEYS.SETTINGS, settings);
  }

  static updateSetting(key: string, value: any): boolean {
    const settings = this.getSettings();
    settings[key] = value;
    return this.setSettings(settings);
  }

  // Sync timestamp
  static getLastSync(): string | null {
    return this.get<string>(STORAGE_KEYS.LAST_SYNC);
  }

  static setLastSync(): boolean {
    return this.set(STORAGE_KEYS.LAST_SYNC, new Date().toISOString());
  }

  // Export all data
  static exportAllData(): Record<string, any> {
    return {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      villages: this.getVillages(),
      healthReports: this.getHealthReports(),
      waterReports: this.getWaterReports(),
      alerts: this.getAlerts(),
      settings: this.getSettings(),
    };
  }

  // Import all data
  static importAllData(data: Record<string, any>): boolean {
    try {
      if (data.villages) this.setVillages(data.villages);
      if (data.healthReports) this.setHealthReports(data.healthReports);
      if (data.waterReports) this.setWaterReports(data.waterReports);
      if (data.alerts) this.setAlerts(data.alerts);
      if (data.settings) this.setSettings(data.settings);
      this.setLastSync();
      return true;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  }

  // Clear specific data type
  static clearData(type: 'villages' | 'health' | 'water' | 'alerts' | 'all'): boolean {
    switch (type) {
      case 'villages':
        return this.remove(STORAGE_KEYS.VILLAGES);
      case 'health':
        return this.remove(STORAGE_KEYS.HEALTH_REPORTS);
      case 'water':
        return this.remove(STORAGE_KEYS.WATER_REPORTS);
      case 'alerts':
        return this.remove(STORAGE_KEYS.ALERTS);
      case 'all':
        return this.clear();
      default:
        return false;
    }
  }

  // Get storage statistics
  static getStorageStats() {
    let total = 0;
    const stats: Record<string, number> = {};
    
    Object.entries(STORAGE_KEYS).forEach(([keyName, storageKey]) => {
      const item = localStorage.getItem(storageKey);
      const size = item ? item.length : 0;
      stats[keyName] = size;
      total += size;
    });

    return {
      total,
      totalKB: (total / 1024).toFixed(2),
      breakdown: stats,
      limit: 5 * 1024 * 1024, // 5MB typical limit
      usagePercent: ((total / (5 * 1024 * 1024)) * 100).toFixed(2),
    };
  }
}
