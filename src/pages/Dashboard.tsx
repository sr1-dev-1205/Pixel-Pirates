import React from 'react';
import { MapPin, FileText, AlertTriangle, TrendingUp, Users } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useMockData } from '../hooks/useMockData';
import StatsCard from '../components/dashboard/StatsCard';
import RiskMap from '../components/dashboard/RiskMap';
import RecentAlerts from '../components/dashboard/RecentAlerts';
import TrendChart from '../components/dashboard/TrendChart';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import HealthIntelligenceSummary from '../components/dashboard/HealthIntelligenceSummary';
import PageHeader from '../components/layout/PageHeader';
import Skeleton from '../components/ui/Skeleton';

const Dashboard: React.FC = () => {
  const { t } = useLanguage();
  const {
    villages,
    healthReports,
    alerts,
    predictions,
    dashboardStats,
    loading,
    acknowledgeAlert
  } = useMockData();

  if (loading) {
    return (
      <div className="flex-1 overflow-auto p-6 space-y-6">
        <div className="mb-6">
          <Skeleton className="h-10 w-64 mb-2" />
          <Skeleton className="h-5 w-96" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-lg" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <Skeleton className="lg:col-span-2 h-96 rounded-lg" />
          <Skeleton className="h-96 rounded-lg" />
        </div>
        <Skeleton className="h-80 rounded-lg mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-48 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6">
        {/* Page Header */}
        <PageHeader
          title={t('dashboard')}
          subtitle="Real-time public health surveillance & decision support system"
        />

        {/* Stats Cards */}
        {dashboardStats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
            <StatsCard
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

        {/* Health Intelligence Layer */}
        <HealthIntelligenceSummary
          villages={villages}
          predictions={predictions}
          alerts={alerts}
        />

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