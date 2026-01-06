export type Language = 'en' | 'as';

export type TranslationKey =
  | 'dashboard'
  | 'villages'
  | 'healthReports'
  | 'waterQuality'
  | 'predictions'
  | 'resources'
  | 'settings'
  | 'loading'
  | 'totalVillages'
  | 'reportsToday'
  | 'highRiskVillages'
  | 'activeAlerts'
  | 'casesThisWeek'
  | 'addReport'
  | 'riskLevel'
  | 'date'
  | 'actions'
  | 'viewDetails'
  | 'submit'
  | 'cancel'
  | 'language'
  | 'theme'
  | 'profile'
  | 'notifications'
  | 'logout'
  | 'welcome'
  | 'healthIntelligence'
  | 'recommendedActions'
  | 'silentVillages'
  | 'todaysInsights'
  | 'recentAlerts'
  | 'riskMap'
  | 'search'
  | 'filter'
  | 'status'
  | 'trend'
  | 'safe'
  | 'unsafe'
  | 'caution'
  | 'monitor'
  | 'deployTeam'
  | 'acknowledge'
  | 'alerts'
  | 'resolved';

export const translations: Record<Language, Record<TranslationKey, string>> = {
  en: {
    dashboard: 'Dashboard',
    villages: 'Villages',
    healthReports: 'Health Reports',
    waterQuality: 'Water Quality',
    predictions: 'AI Predictions',
    resources: 'Resources',
    settings: 'Settings',
    loading: 'Loading system data...',
    totalVillages: 'Total Villages',
    reportsToday: 'Reports Today',
    highRiskVillages: 'High Risk Villages',
    activeAlerts: 'Active Alerts',
    casesThisWeek: 'Cases This Week',
    addReport: 'Add Report',
    riskLevel: 'Risk Level',
    date: 'Date',
    actions: 'Actions',
    viewDetails: 'View Details',
    submit: 'Submit',
    cancel: 'Cancel',
    language: 'Language',
    theme: 'Theme',
    profile: 'Profile',
    notifications: 'Notifications',
    logout: 'Logout',
    welcome: 'Welcome to AarogyaJal',
    healthIntelligence: 'Health Intelligence',
    recommendedActions: 'Recommended Actions',
    silentVillages: 'Silent Villages',
    todaysInsights: "Today's Insights",
    recentAlerts: 'Recent Alerts',
    riskMap: 'Risk Heatmap',
    search: 'Search...',
    filter: 'Filter',
    status: 'Status',
    trend: 'Trend',
    safe: 'Safe',
    unsafe: 'Unsafe',
    caution: 'Caution',
    monitor: 'Monitor',
    deployTeam: 'Deploy Team',
    acknowledge: 'Acknowledge',
    resolved: 'Resolved',
    alerts: 'Alerts'
  },
  as: {
    dashboard: 'ডেশবোর্ড',
    villages: 'গাওঁসমূহ',
    healthReports: 'স্বাস্থ্য প্ৰতিবেদন',
    waterQuality: 'পানীৰ গুণমান',
    predictions: 'AI ভৱিষ্যদ্বাণী',
    resources: 'সম্পদ',
    loading: 'তথ্য লোড হৈ আছে...',
    settings: 'চেটিংছ',
    totalVillages: 'মুঠ গাওঁ',
    reportsToday: 'আজির প্ৰতিবেদন',
    highRiskVillages: 'উচ্চ বিপদের গাওঁ',
    activeAlerts: 'সক্ৰিয় সতৰ্কতা',
    casesThisWeek: 'এই সপ্তাহৰ ৰোগী',
    addReport: 'প্ৰতিবেদন যোগ কৰক',
    riskLevel: 'বিপদৰ স্তৰ',
    date: 'তাৰিখ',
    actions: 'কাৰ্য',
    viewDetails: 'বিৱৰণ চাওক',
    submit: 'দাখিল কৰক',
    cancel: 'বাতিল কৰক',
    language: 'ভাষা',
    theme: 'থিম',
    profile: 'প্ৰফাইল',
    notifications: 'জাননী',
    logout: 'প্ৰস্থান',
    welcome: 'আৰোগ্যজললৈ স্বাগতম',
    healthIntelligence: 'স্বাস্থ্য বুদ্ধিমত্তা',
    recommendedActions: 'পৰামৰ্শকৃত পদক্ষেপ',
    silentVillages: 'নিৰৱ গাওঁসমূহ',
    todaysInsights: 'আজির অন্তর্দৃষ্টি',
    recentAlerts: 'শেহতীয়া সতৰ্কতা',
    riskMap: 'বিপদৰ মানচিত্ৰ',
    search: 'সন্ধান কৰক...',
    filter: 'ফিল্টাৰ',
    status: 'স্থিতি',
    trend: 'প্ৰৱণতা',
    safe: 'সুৰক্ষিত',
    unsafe: 'অসুৰক্ষিত',
    caution: 'সাৱধান',
    monitor: 'নিৰীক্ষণ',
    deployTeam: 'দল প্ৰেৰণ কৰক',
    acknowledge: 'স্বীকাৰ কৰক',
    resolved: 'মীমাংসিত',
    alerts: 'সতৰ্কতা'
  }
};