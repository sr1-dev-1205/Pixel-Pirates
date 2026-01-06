import React from 'react';
import { MapPin, Users, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useMockData } from '../hooks/useMockData';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { getRiskLevelColor, formatDateTime } from '../lib/utils';

import Skeleton from '../components/ui/Skeleton';
import PageHeader from '../components/layout/PageHeader';

const Villages: React.FC = () => {
  const { t } = useLanguage();
  const { villages, loading } = useMockData();

  if (loading) {
    return (
      <div className="flex-1 overflow-auto p-6">
        <div className="mb-6">
          <Skeleton className="h-10 w-48 mb-2" />
          <Skeleton className="h-5 w-72" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-64 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6">
        <PageHeader
          title={t('villages')}
          subtitle="Monitor health status across all villages"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {villages.map((village) => (
            <Card key={village.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{village.name}</CardTitle>
                  <Badge
                    variant={
                      village.risk_level === 'high' ? 'danger' :
                        village.risk_level === 'medium' ? 'warning' : 'success'
                    }
                  >
                    {village.risk_level} risk
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{village.district} District</span>
                  </div>

                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{village.population.toLocaleString()} residents</span>
                  </div>

                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>Updated {formatDateTime(village.last_updated)}</span>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Location</span>
                    </div>
                    <p className="text-xs text-gray-500">
                      {village.latitude.toFixed(4)}°N, {village.longitude.toFixed(4)}°E
                    </p>
                  </div>

                  <div className={`p-3 rounded-lg ${getRiskLevelColor(village.risk_level)}`}>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Risk Level</span>
                      <span className="text-sm">
                        {village.risk_level === 'high' ? '🔴' :
                          village.risk_level === 'medium' ? '🟡' : '🟢'}
                      </span>
                    </div>
                    <p className="text-xs mt-1">
                      {village.risk_level === 'high' ? 'Immediate attention required' :
                        village.risk_level === 'medium' ? 'Monitor closely' :
                          'Situation normal'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Villages;