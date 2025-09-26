import React from 'react';
import { MapPin, FileText, AlertTriangle, TrendingUp, Users } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useMockData } from '../hooks/useMockData';
import StatsCard from '../components/dashboard/StatsCard';
import RiskMap from '../components/dashboard/RiskMap';
import RecentAlerts from '../components/dashboard/RecentAlerts';
import TrendChart from '../components/dashboard/TrendChart';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';

const Dashboard: React.FC = () => {
  const { t } = useLanguage();
  const { 
    villages, 
    healthReports, 
    alerts, 
    dashboardStats, 
    loading, 
    acknowledgeAlert 
  } = useMockData();

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t('loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto bg-mesh">
      <div className="p-8">
        {/* Page Header */}
        <div className="mb-12 text-center animate-fade-in-up">
          <h1 className="text-5xl font-bold heading-hero mb-4">
            Smart Health Intelligence
          </h1>
          <p className="text-xl text-secondary-600 font-medium max-w-3xl mx-auto">
            Advanced AI-powered health monitoring and early warning system for Northeast India's rural communities
          </p>
          <div className="mt-6 flex justify-center space-x-4">
            <div className="flex items-center space-x-2 glass px-4 py-2 rounded-full">
              <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-emerald-600">Live Monitoring</span>
            </div>
            <div className="flex items-center space-x-2 glass px-4 py-2 rounded-full">
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-blue-600">AI Predictions Active</span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        {dashboardStats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            <div className="animate-fade-in-up animate-delay-100">
              <StatsCard
                title={t('totalVillages')}
                value={dashboardStats.total_villages}
                icon={MapPin}
                color="blue"
              />
            </div>
            <div className="animate-fade-in-up animate-delay-200">
              <StatsCard
                title={t('reportsToday')}
                value={dashboardStats.total_reports_today}
                icon={FileText}
                color="green"
              />
            </div>
            <div className="animate-fade-in-up animate-delay-300">
              <StatsCard
                title={t('highRiskVillages')}
                value={dashboardStats.high_risk_villages}
                icon={AlertTriangle}
                color="red"
              />
            </div>
            <div className="animate-fade-in-up animate-delay-400">
              <StatsCard
                title={t('activeAlerts')}
                value={dashboardStats.active_alerts}
                icon={TrendingUp}
                color="yellow"
              />
            </div>
            <div className="animate-fade-in-up animate-delay-500">
              <StatsCard
                title={t('casesThisWeek')}
                value={dashboardStats.total_cases_week}
                icon={Users}
                color="red"
              />
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mb-12 animate-fade-in-up animate-delay-600">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold gradient-text mb-2">Quick Actions</h2>
            <p className="text-secondary-600">Streamlined access to critical functions</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <button className="glass p-6 rounded-2xl hover-lift transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-secondary-900 mb-1">New Report</h3>
              <p className="text-xs text-secondary-600">Submit health data</p>
            </button>
            <button className="glass p-6 rounded-2xl hover-lift transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-secondary-900 mb-1">Send Alert</h3>
              <p className="text-xs text-secondary-600">Emergency notification</p>
            </button>
            <button className="glass p-6 rounded-2xl hover-lift transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-secondary-900 mb-1">Analytics</h3>
              <p className="text-xs text-secondary-600">View insights</p>
            </button>
            <button className="glass p-6 rounded-2xl hover-lift transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-secondary-900 mb-1">Resources</h3>
              <p className="text-xs text-secondary-600">Manage supplies</p>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Risk Map */}
          <div className="lg:col-span-2 animate-fade-in-left animate-delay-700">
            <Card className="overflow-hidden">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <span>Interactive Risk Heatmap</span>
                  </CardTitle>
                  <div className="flex space-x-2">
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-xs font-semibold text-green-600">Low</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                      <span className="text-xs font-semibold text-yellow-600">Medium</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                      <span className="text-xs font-semibold text-red-600">High</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-96 relative">
                  <RiskMap villages={villages} />
                  <div className="absolute top-4 left-4 glass rounded-xl p-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                      <span className="text-sm font-semibold text-emerald-600">Real-time Data</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Alerts */}
          <div className="animate-fade-in-right animate-delay-800">
            <RecentAlerts alerts={alerts} onAcknowledge={acknowledgeAlert} />
          </div>
        </div>

        {/* AI Insights Section */}
        <div className="mb-12 animate-fade-in-up animate-delay-900">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold gradient-text mb-2">AI-Powered Insights</h2>
            <p className="text-secondary-600">Machine learning predictions and recommendations</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="glass">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center animate-pulse">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-secondary-900">Outbreak Prediction</h3>
                    <p className="text-sm text-secondary-600">Next 7 days</p>
                  </div>
                </div>
                <div className="text-3xl font-bold gradient-text mb-2">85%</div>
                <p className="text-sm text-secondary-600">Confidence in Majuli risk assessment</p>
                <div className="mt-4 progress-modern">
                  <div className="progress-fill-modern" style={{ width: '85%' }}></div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center animate-pulse">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-secondary-900">Resource Optimization</h3>
                    <p className="text-sm text-secondary-600">Allocation efficiency</p>
                  </div>
                </div>
                <div className="text-3xl font-bold gradient-text mb-2">94%</div>
                <p className="text-sm text-secondary-600">Optimal resource distribution achieved</p>
                <div className="mt-4 progress-modern">
                  <div className="progress-fill-modern" style={{ width: '94%' }}></div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center animate-pulse">
                    <AlertTriangle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-secondary-900">Early Warning</h3>
                    <p className="text-sm text-secondary-600">System accuracy</p>
                  </div>
                </div>
                <div className="text-3xl font-bold gradient-text mb-2">97%</div>
                <p className="text-sm text-secondary-600">Alert precision rate this month</p>
                <div className="mt-4 progress-modern">
                  <div className="progress-fill-modern" style={{ width: '97%' }}></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Trend Chart */}
        <div className="mb-12 animate-fade-in-up animate-delay-1000">
          <TrendChart healthReports={healthReports} />
        </div>

        {/* Performance Metrics */}
        <div className="mb-12 animate-fade-in-up animate-delay-1000">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold gradient-text mb-2">System Performance</h2>
            <p className="text-secondary-600">Real-time monitoring and analytics</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="glass text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <span className="text-2xl">⚡</span>
                </div>
                <div className="text-2xl font-bold gradient-text mb-1">99.9%</div>
                <p className="text-sm text-secondary-600 font-medium">System Uptime</p>
              </CardContent>
            </Card>
            <Card className="glass text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-3xl flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <span className="text-2xl">🚀</span>
                </div>
                <div className="text-2xl font-bold gradient-text mb-1">1.2s</div>
                <p className="text-sm text-secondary-600 font-medium">Response Time</p>
              </CardContent>
            </Card>
            <Card className="glass text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <span className="text-2xl">📊</span>
                </div>
                <div className="text-2xl font-bold gradient-text mb-1">2.4M</div>
                <p className="text-sm text-secondary-600 font-medium">Data Points</p>
              </CardContent>
            </Card>
            <Card className="glass text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <span className="text-2xl">🎯</span>
                </div>
                <div className="text-2xl font-bold gradient-text mb-1">92%</div>
                <p className="text-sm text-secondary-600 font-medium">Prediction Accuracy</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Risk Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in-up animate-delay-1000">
          <Card className="glass border-l-4 border-emerald-500">
            <CardHeader>
              <CardTitle className="text-emerald-600 flex items-center space-x-2">
                <div className="w-8 h-8 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <span className="text-emerald-600">✓</span>
                </div>
                <span>Low Risk Villages</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {villages
                  .filter(v => v.risk_level === 'low')
                  .slice(0, 5)
                  .map((village, index) => (
                    <div key={village.id} className={`flex justify-between items-center p-3 glass rounded-xl hover-lift animate-fade-in-right animate-delay-${(index + 1) * 100}`}>
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                        <span className="font-medium text-secondary-900">{village.name}</span>
                      </div>
                      <span className="text-sm text-secondary-500 font-medium">{village.district}</span>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-l-4 border-amber-500">
            <CardHeader>
              <CardTitle className="text-amber-600 flex items-center space-x-2">
                <div className="w-8 h-8 bg-amber-100 rounded-xl flex items-center justify-center">
                  <span className="text-amber-600">⚠</span>
                </div>
                <span>Medium Risk Villages</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {villages
                  .filter(v => v.risk_level === 'medium')
                  .slice(0, 5)
                  .map((village, index) => (
                    <div key={village.id} className={`flex justify-between items-center p-3 glass rounded-xl hover-lift animate-fade-in-right animate-delay-${(index + 1) * 100}`}>
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-amber-400 rounded-full animate-pulse"></div>
                        <span className="font-medium text-secondary-900">{village.name}</span>
                      </div>
                      <span className="text-sm text-secondary-500 font-medium">{village.district}</span>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-l-4 border-red-500">
            <CardHeader>
              <CardTitle className="text-red-600 flex items-center space-x-2">
                <div className="w-8 h-8 bg-red-100 rounded-xl flex items-center justify-center">
                  <span className="text-red-600">🚨</span>
                </div>
                <span>High Risk Villages</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {villages
                  .filter(v => v.risk_level === 'high')
                  .slice(0, 5)
                  .map((village, index) => (
                    <div key={village.id} className={`flex justify-between items-center p-3 glass rounded-xl hover-lift animate-fade-in-right animate-delay-${(index + 1) * 100}`}>
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                        <span className="font-medium text-secondary-900">{village.name}</span>
                      </div>
                      <span className="text-sm text-secondary-500 font-medium">{village.district}</span>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
              title={t('totalVillages')}
              value={dashboardStats.total_villages}
              icon={MapPin}
              color="blue"
            />
            <StatsCard
              title={t('reportsToday')}
              value={dashboardStats.total_reports_today}
              icon={FileText}
              color="green"
            />
            <StatsCard
              title={t('highRiskVillages')}
              value={dashboardStats.high_risk_villages}
              icon={AlertTriangle}
              color="red"
            />
            <StatsCard
              title={t('activeAlerts')}
              value={dashboardStats.active_alerts}
              icon={TrendingUp}
              color="yellow"
            />
            <StatsCard
              title={t('casesThisWeek')}
              value={dashboardStats.total_cases_week}
              icon={Users}
              color="red"
            />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Risk Map */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Village Risk Heatmap</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-96">
                  <RiskMap villages={villages} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Alerts */}
          <div>
            <RecentAlerts alerts={alerts} onAcknowledge={acknowledgeAlert} />
          </div>
        </div>

        {/* Trend Chart */}
        <div className="mb-6">
          <TrendChart healthReports={healthReports} />
        </div>

        {/* Risk Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-green-600">Low Risk Villages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {villages
                  .filter(v => v.risk_level === 'low')
                  .slice(0, 5)
                  .map(village => (
                    <div key={village.id} className="flex justify-between items-center">
                      <span className="text-sm">{village.name}</span>
                      <span className="text-xs text-gray-500">{village.district}</span>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-yellow-600">Medium Risk Villages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {villages
                  .filter(v => v.risk_level === 'medium')
                  .slice(0, 5)
                  .map(village => (
                    <div key={village.id} className="flex justify-between items-center">
                      <span className="text-sm">{village.name}</span>
                      <span className="text-xs text-gray-500">{village.district}</span>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-red-600">High Risk Villages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {villages
                  .filter(v => v.risk_level === 'high')
                  .slice(0, 5)
                  .map(village => (
                    <div key={village.id} className="flex justify-between items-center">
                      <span className="text-sm">{village.name}</span>
                      <span className="text-xs text-gray-500">{village.district}</span>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;