import React, { useState, useMemo } from 'react';
import { AlertTriangle, Clock, CheckCircle, Bell, MapPin, Calendar, Filter, Search } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useMockData } from '../hooks/useMockData';
import { Card, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { formatDateTime } from '../lib/utils';
import { Alert } from '../types';
import PageHeader from '../components/layout/PageHeader';
import { useDebounceValue } from '../lib/lazyLoad';

const Alerts: React.FC = () => {
  const { t, language } = useLanguage();
  const { alerts, villages, acknowledgeAlert, loading } = useMockData();
  const [filter, setFilter] = useState<'all' | 'active' | 'acknowledged'>('all');
  const [severityFilter, setSeverityFilter] = useState<'all' | 'critical' | 'high' | 'medium' | 'low'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounceValue(searchTerm, 300);

  const getVillageName = (villageId: string) => {
    const village = villages.find(v => v.id === villageId);
    return village ? village.name : 'Unknown Village';
  };

  const getSeverityVariant = (severity: Alert['severity']) => {
    switch (severity) {
      case 'critical':
        return 'danger';
      case 'high':
        return 'warning';
      case 'medium':
        return 'info';
      default:
        return 'default';
    }
  };

  const getSeverityIcon = (severity: Alert['severity']) => {
    if (severity === 'critical' || severity === 'high') {
      return <AlertTriangle className="w-4 h-4" />;
    }
    return <Clock className="w-4 h-4" />;
  };

  const getAlertTypeIcon = (alertType: Alert['alert_type']) => {
    switch (alertType) {
      case 'outbreak_risk':
        return '🦠';
      case 'water_contamination':
        return '💧';
      case 'resource_shortage':
        return '📦';
      default:
        return '⚠️';
    }
  };

  // Memoized filtered alerts for performance
  const filteredAlerts = useMemo(() => {
    return alerts.filter(alert => {
      // Status filter
      if (filter === 'active' && alert.acknowledged) return false;
      if (filter === 'acknowledged' && !alert.acknowledged) return false;
      
      // Severity filter
      if (severityFilter !== 'all' && alert.severity !== severityFilter) return false;
      
      // Search filter
      if (debouncedSearch) {
        const searchLower = debouncedSearch.toLowerCase();
        const villageName = getVillageName(alert.village_id).toLowerCase();
        const message = (language === 'as' && alert.message_as) ? alert.message_as : alert.message;
        const messageLower = message.toLowerCase();
        
        return (
          villageName.includes(searchLower) ||
          messageLower.includes(searchLower) ||
          alert.alert_type.includes(searchLower)
        );
      }
      
      return true;
    });
  }, [alerts, filter, severityFilter, debouncedSearch, language, villages]);

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
    <div className="flex-1 overflow-auto">
      <div className="p-6">
        <PageHeader
          title={t('alerts')}
          subtitle="Monitor and manage health alerts across all villages"
        />

        {/* Alert Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Alerts</p>
                  <p className="text-3xl font-bold text-gray-900">{alerts.length}</p>
                </div>
                <Bell className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Alerts</p>
                  <p className="text-3xl font-bold text-red-600">
                    {alerts.filter(a => !a.acknowledged).length}
                  </p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Critical</p>
                  <p className="text-3xl font-bold text-red-600">
                    {alerts.filter(a => a.severity === 'critical').length}
                  </p>
                </div>
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                  <span className="text-red-600 text-lg">🚨</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Acknowledged</p>
                  <p className="text-3xl font-bold text-green-600">
                    {alerts.filter(a => a.acknowledged).length}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col gap-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search alerts by village or message..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Filter Controls */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Filters:</span>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Status:</span>
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value as any)}
                    className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Alerts</option>
                    <option value="active">Active Only</option>
                    <option value="acknowledged">Acknowledged Only</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Severity:</span>
                  <select
                    value={severityFilter}
                    onChange={(e) => setSeverityFilter(e.target.value as any)}
                    className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Severities</option>
                    <option value="critical">Critical</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>

                <div className="ml-auto text-sm text-gray-500">
                  Showing {filteredAlerts.length} of {alerts.length} alerts
                  {debouncedSearch && ` (filtered from search)`}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alerts List */}
        <div className="space-y-4">
          {filteredAlerts.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Alerts Found</h3>
                <p className="text-gray-600">
                  {filter === 'active' ? 'No active alerts at this time.' :
                    filter === 'acknowledged' ? 'No acknowledged alerts found.' :
                      'No alerts match the current filters.'}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredAlerts.map((alert) => (
              <Card
                key={alert.id}
                className={`hover:shadow-lg transition-shadow ${alert.acknowledged ? 'opacity-75' : ''
                  } ${alert.severity === 'critical' ? 'border-l-4 border-red-500' :
                    alert.severity === 'high' ? 'border-l-4 border-yellow-500' :
                      'border-l-4 border-blue-500'
                  }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="text-2xl">
                          {getAlertTypeIcon(alert.alert_type)}
                        </div>
                        <div className="flex items-center space-x-2">
                          {getSeverityIcon(alert.severity)}
                          <Badge variant={getSeverityVariant(alert.severity)}>
                            {alert.severity.toUpperCase()}
                          </Badge>
                          {alert.acknowledged && (
                            <Badge variant="success">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Acknowledged
                            </Badge>
                          )}
                        </div>
                      </div>

                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {alert.alert_type === 'outbreak_risk' && 'Disease Outbreak Risk'}
                        {alert.alert_type === 'water_contamination' && 'Water Contamination Alert'}
                        {alert.alert_type === 'resource_shortage' && 'Resource Shortage Alert'}
                      </h3>

                      <p className="text-gray-700 mb-4">
                        {language === 'as' && alert.message_as
                          ? alert.message_as
                          : alert.message}
                      </p>

                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{getVillageName(alert.village_id)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDateTime(alert.created_at)}</span>
                        </div>
                      </div>

                      {alert.acknowledged && alert.acknowledged_by && (
                        <div className="mt-3 p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                          <p className="text-sm text-green-800">
                            <strong>Acknowledged by:</strong> {alert.acknowledged_by}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="ml-4 flex flex-col space-y-2">
                      {!alert.acknowledged && (
                        <Button
                          size="sm"
                          onClick={() => acknowledgeAlert(alert.id)}
                          className="whitespace-nowrap"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Acknowledge
                        </Button>
                      )}

                      <Button
                        size="sm"
                        variant="outline"
                        className="whitespace-nowrap"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>

                  {/* Action Recommendations */}
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="font-medium text-gray-900 mb-2">Recommended Actions</h4>
                    <div className={`p-3 rounded-lg ${alert.severity === 'critical' ? 'bg-red-50' :
                      alert.severity === 'high' ? 'bg-yellow-50' :
                        'bg-blue-50'
                      }`}>
                      <ul className={`text-sm space-y-1 ${alert.severity === 'critical' ? 'text-red-700' :
                        alert.severity === 'high' ? 'text-yellow-700' :
                          'text-blue-700'
                        }`}>
                        {alert.alert_type === 'outbreak_risk' && (
                          <>
                            <li>• Deploy medical team to affected area</li>
                            <li>• Increase health surveillance activities</li>
                            <li>• Launch community awareness campaign</li>
                            <li>• Ensure adequate medical supplies</li>
                          </>
                        )}
                        {alert.alert_type === 'water_contamination' && (
                          <>
                            <li>• Test water sources immediately</li>
                            <li>• Provide alternative safe water supply</li>
                            <li>• Implement water treatment measures</li>
                            <li>• Educate community on water safety</li>
                          </>
                        )}
                        {alert.alert_type === 'resource_shortage' && (
                          <>
                            <li>• Assess current resource levels</li>
                            <li>• Coordinate with supply chain team</li>
                            <li>• Arrange emergency resource delivery</li>
                            <li>• Update resource allocation plans</li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Alerts;