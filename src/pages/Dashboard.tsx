import React from 'react';
import {
  Activity,
  AlertTriangle,
  Droplets,
  Users,
  TrendingUp,
  TrendingDown,
  MapPin,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  Eye
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useMockData } from '../hooks/useMockData';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import StatsCard from '../components/dashboard/StatsCard';
import TrendChart from '../components/dashboard/TrendChart';
import RiskMap from '../components/dashboard/RiskMap';
import RecentAlerts from '../components/dashboard/RecentAlerts';
import ScrollReveal from '../components/common/ScrollReveal';

const Dashboard: React.FC = () => {
  const { t } = useLanguage();
  const { villages, healthReports, alerts, waterReports, loading } = useMockData();

  const highRiskVillages = villages.filter(v => v.risk_level === 'high').length;
  const mediumRiskVillages = villages.filter(v => v.risk_level === 'medium').length;
  const activeAlerts = alerts.filter(a => a.status === 'active').length;
  const totalReports = healthReports.length;

  const stats = [
    {
      title: 'Total Villages',
      value: villages.length.toString(),
      change: '+12%',
      trend: 'up',
      icon: MapPin,
      color: 'from-teal-500 to-cyan-500',
      bgColor: 'from-teal-50 to-cyan-50',
    },
    {
      title: 'Active Alerts',
      value: activeAlerts.toString(),
      change: '-8%',
      trend: 'down',
      icon: AlertTriangle,
      color: 'from-red-500 to-pink-500',
      bgColor: 'from-red-50 to-pink-50',
    },
    {
      title: 'Health Reports',
      value: totalReports.toString(),
      change: '+24%',
      trend: 'up',
      icon: Activity,
      color: 'from-emerald-500 to-green-500',
      bgColor: 'from-emerald-50 to-green-50',
    },
    {
      title: 'Water Tests',
      value: waterReports.length.toString(),
      change: '+15%',
      trend: 'up',
      icon: Droplets,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50',
    },
  ];

  const recentActivity = [
    {
      id: 1,
      village: 'Majuli Village',
      action: 'High risk alert issued',
      time: '5 mins ago',
      status: 'critical',
      icon: AlertTriangle,
    },
    {
      id: 2,
      village: 'Kokrajhar',
      action: 'Water quality test completed',
      time: '1 hour ago',
      status: 'success',
      icon: Droplets,
    },
    {
      id: 3,
      village: 'Dibrugarh',
      action: 'Health report submitted',
      time: '2 hours ago',
      status: 'info',
      icon: Activity,
    },
    {
      id: 4,
      village: 'Tezpur',
      action: 'Resources delivered',
      time: '3 hours ago',
      status: 'success',
      icon: Users,
    },
  ];

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">{t('loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto bg-gradient-to-br from-gray-50/50 via-white to-teal-50/30">
      <div className="p-6 max-w-screen-2xl mx-auto">
        <ScrollReveal>
          <div className="mb-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent mb-2">
                  {t('dashboard')}
                </h1>
                <p className="text-gray-600 text-lg">
                  Monitor health metrics and water quality across Northeast India
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm">
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700 font-medium">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                </div>
                <button className="px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <div className="flex items-center space-x-2">
                    <Eye className="w-4 h-4" />
                    <span>View Reports</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <ScrollReveal key={stat.title} delay={index * 100}>
              <Card className="bg-white hover:shadow-xl transition-all duration-300 border-0 overflow-hidden group">
                <CardContent className="p-0">
                  <div className={`h-2 bg-gradient-to-r ${stat.color}`}></div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <stat.icon className={`w-6 h-6 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} style={{ WebkitTextFillColor: 'transparent', WebkitBackgroundClip: 'text' }} />
                      </div>
                      <div className={`flex items-center space-x-1 px-2 py-1 rounded-lg ${
                        stat.trend === 'up' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                      }`}>
                        {stat.trend === 'up' ? (
                          <ArrowUpRight className="w-3 h-3" />
                        ) : (
                          <ArrowDownRight className="w-3 h-3" />
                        )}
                        <span className="text-xs font-bold">{stat.change}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium mb-1">{stat.title}</p>
                      <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <ScrollReveal className="lg:col-span-2">
            <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0">
              <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-teal-50 to-cyan-50">
                <CardTitle className="flex items-center space-x-2 text-gray-900">
                  <BarChart3 className="w-5 h-5 text-teal-600" />
                  <span>Health Trends</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <TrendChart />
              </CardContent>
            </Card>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0">
              <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-red-50 to-pink-50">
                <CardTitle className="flex items-center space-x-2 text-gray-900">
                  <Activity className="w-5 h-5 text-red-600" />
                  <span>Recent Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-gray-100">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="p-4 hover:bg-gray-50 transition-colors duration-200">
                      <div className="flex items-start space-x-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          activity.status === 'critical' ? 'bg-red-100' :
                          activity.status === 'success' ? 'bg-emerald-100' :
                          'bg-blue-100'
                        }`}>
                          <activity.icon className={`w-4 h-4 ${
                            activity.status === 'critical' ? 'text-red-600' :
                            activity.status === 'success' ? 'text-emerald-600' :
                            'text-blue-600'
                          }`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">{activity.village}</p>
                          <p className="text-xs text-gray-600 mt-0.5">{activity.action}</p>
                          <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ScrollReveal>
            <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0">
              <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-blue-50 to-cyan-50">
                <CardTitle className="flex items-center space-x-2 text-gray-900">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <span>Risk Distribution Map</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <RiskMap />
              </CardContent>
            </Card>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0">
              <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-amber-50 to-orange-50">
                <CardTitle className="flex items-center space-x-2 text-gray-900">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  <span>Active Alerts</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <RecentAlerts />
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={300}>
          <div className="mt-8 bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 rounded-2xl p-8 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Need Help?</h3>
                  <p className="text-white/90 text-sm max-w-xl">
                    Our team is available 24/7 to assist with health monitoring and water quality management across Northeast India.
                  </p>
                </div>
                <button className="px-6 py-3 bg-white text-teal-600 rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default Dashboard;
