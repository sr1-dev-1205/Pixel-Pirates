export const translations = {
  en: {
    // Navigation
    dashboard: 'Dashboard',
    villages: 'Villages',
    healthReports: 'Health Reports',
    waterQuality: 'Water Quality',
    alerts: 'Alerts',
    predictions: 'AI Predictions',
    settings: 'Settings',
    
    // Dashboard
    totalVillages: 'Total Villages',
    reportsToday: 'Reports Today',
    highRiskVillages: 'High Risk Villages',
    activeAlerts: 'Active Alerts',
    casesThisWeek: 'Cases This Week',
    
    // Risk Levels
    low: 'Low Risk',
    medium: 'Medium Risk',
    high: 'High Risk',
    critical: 'Critical',
    
    // Common
    loading: 'Loading...',
    error: 'Error',
    save: 'Save',
    cancel: 'Cancel',
    submit: 'Submit',
    delete: 'Delete',
    edit: 'Edit',
    view: 'View',
    
    // Health Reports
    symptoms: 'Symptoms',
    diarrhea: 'Diarrhea Cases',
    fever: 'Fever Cases',
    vomiting: 'Vomiting Cases',
    dehydration: 'Dehydration Cases',
    totalCases: 'Total Cases',
    
    // Water Quality
    phLevel: 'pH Level',
    turbidity: 'Turbidity',
    chlorineLevel: 'Chlorine Level',
    bacterialPresence: 'Bacterial Presence',
    sourceType: 'Water Source Type',
    
    // Alerts
    outbreakRisk: 'Outbreak Risk Alert',
    waterContamination: 'Water Contamination Alert',
    resourceShortage: 'Resource Shortage Alert',
  },
  as: {
    // Navigation (Assamese)
    dashboard: 'ড্যাশবৰ্ড',
    villages: 'গাঁও সমূহ',
    healthReports: 'স্বাস্থ্য প্ৰতিবেদন',
    waterQuality: 'পানীৰ গুণগত মান',
    alerts: 'সতৰ্কবাণী',
    predictions: 'AI পূৰ্বাভাস',
    settings: 'সংহতি',
    
    // Dashboard
    totalVillages: 'মুঠ গাঁও',
    reportsToday: 'আজিৰ প্ৰতিবেদন',
    highRiskVillages: 'উচ্চ বিপদাপন্ন গাঁও',
    activeAlerts: 'সক্ৰিয় সতৰ্কবাণী',
    casesThisWeek: 'এই সপ্তাহৰ কেচ',
    
    // Risk Levels
    low: 'কম বিপদ',
    medium: 'মধ্যম বিপদ',
    high: 'উচ্চ বিপদ',
    critical: 'গুৰুতৰ',
    
    // Common
    loading: 'ল\'ড হৈ আছে...',
    error: 'ত্ৰুটি',
    save: 'সংৰক্ষণ কৰক',
    cancel: 'বাতিল কৰক',
    submit: 'দাখিল কৰক',
    delete: 'মচি দিয়ক',
    edit: 'সম্পাদনা',
    view: 'চাওক',
    
    // Health Reports
    symptoms: 'লক্ষণ সমূহ',
    diarrhea: 'ডায়েৰিয়া কেচ',
    fever: 'জ্বৰ কেচ',
    vomiting: 'বমি কেচ',
    dehydration: 'পানীশূন্যতা কেচ',
    totalCases: 'মুঠ কেচ',
    
    // Water Quality
    phLevel: 'pH স্তৰ',
    turbidity: 'ঘোলা ভাব',
    chlorineLevel: 'ক্লৰিন স্তৰ',
    bacterialPresence: 'বেক্টেৰিয়াৰ উপস্থিতি',
    sourceType: 'পানীৰ উৎসৰ প্ৰকাৰ',
    
    // Alerts
    outbreakRisk: 'প্ৰাদুৰ্ভাৱ বিপদ সতৰ্কবাণী',
    waterContamination: 'পানী দূষণ সতৰ্কবাণী',
    resourceShortage: 'সম্পদৰ অভাৱ সতৰ্কবাণী',
  },
};

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;