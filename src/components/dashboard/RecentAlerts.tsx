import React from 'react';
import { AlertTriangle, Clock, CheckCircle } from 'lucide-react';
import { Alert } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { formatDateTime } from '../../lib/utils';

interface RecentAlertsProps {
  alerts: Alert[];
  onAcknowledge: (alertId: string) => void;
}

const RecentAlerts: React.FC<RecentAlertsProps> = ({ alerts, onAcknowledge }) => {
  const { t, language } = useLanguage();

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

  return (
    <Card className="glass hover-lift">
      <CardHeader>
        <CardTitle className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-white animate-pulse" />
            </div>
            <span>Critical Alerts</span>
          </div>
          <Badge variant="danger" className="animate-pulse">
            {alerts.filter(a => !a.acknowledged).length} Active
          </Badge>
        </CardTitle>
        <p className="text-secondary-600">Real-time monitoring and notifications</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
          {alerts.length === 0 ? (
            <div className="text-center py-12 text-secondary-500">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-4 animate-pulse">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <p className="font-semibold">All Clear!</p>
              <p className="text-sm">No active alerts at this time</p>
            </div>
          ) : (
            alerts.slice(0, 5).map((alert, index) => (
              <div
                key={alert.id}
                className={`p-5 rounded-2xl border-l-4 transition-all duration-300 hover-lift animate-fade-in-up animate-delay-${(index + 1) * 100} ${
                  alert.severity === 'critical'
                    ? 'glass border-red-500 bg-gradient-to-r from-red-50/50 to-pink-50/50'
                    : alert.severity === 'high'
                    ? 'glass border-yellow-500 bg-gradient-to-r from-yellow-50/50 to-orange-50/50'
                    : 'glass border-blue-500 bg-gradient-to-r from-blue-50/50 to-cyan-50/50'
                } ${alert.acknowledged ? 'opacity-60' : ''}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      {getSeverityIcon(alert.severity)}
                      <Badge variant={getSeverityVariant(alert.severity)}>
                        {alert.severity.toUpperCase()}
                      </Badge>
                      {alert.acknowledged && (
                        <Badge variant="success" className="animate-pulse">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Acknowledged
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm font-bold text-secondary-900 mb-2">
                      {language === 'as' && alert.message_as
                        ? alert.message_as
                        : alert.message}
                    </p>
                    <p className="text-xs text-secondary-500 font-medium">
                      {formatDateTime(alert.created_at)}
                    </p>
                  </div>
                  {!alert.acknowledged && (
                    <Button
                      size="sm"
                      className="btn-modern ml-4"
                      onClick={() => onAcknowledge(alert.id)}
                    >
                      Acknowledge
                    </Button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
        {alerts.length > 5 && (
          <div className="mt-6 pt-4 border-t border-white/10">
            <Button 
              variant="outline" 
              className="w-full hover-glow"
            >
              View All {alerts.length} Alerts
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentAlerts;