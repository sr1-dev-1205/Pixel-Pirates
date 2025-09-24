import React from 'react';
import { FileText, Calendar, MapPin, User } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useMockData } from '../hooks/useMockData';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { formatDate } from '../lib/utils';

const HealthReports: React.FC = () => {
  const { t } = useLanguage();
  const { healthReports, villages, loading } = useMockData();

  const getVillageName = (villageId: string) => {
    const village = villages.find(v => v.id === villageId);
    return village ? village.name : 'Unknown Village';
  };

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
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">{t('healthReports')}</h1>
          <p className="text-gray-600 mt-1">
            Daily health surveillance reports from field workers
          </p>
        </div>

        <div className="space-y-6">
          {healthReports.map((report) => (
            <Card key={report.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <span>Health Report #{report.id}</span>
                  </CardTitle>
                  <div className="text-sm text-gray-500">
                    {formatDate(report.created_at)}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Report Info */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">Report Details</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span>{getVillageName(report.village_id)}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span>{formatDate(report.report_date)}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <User className="w-4 h-4 text-gray-500" />
                        <span>Reporter: {report.reporter_id}</span>
                      </div>
                    </div>
                  </div>

                  {/* Symptoms Breakdown */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">Symptoms</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Diarrhea</span>
                        <span className="font-medium text-red-600">
                          {report.symptoms.diarrhea}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Fever</span>
                        <span className="font-medium text-orange-600">
                          {report.symptoms.fever}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Vomiting</span>
                        <span className="font-medium text-purple-600">
                          {report.symptoms.vomiting}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Dehydration</span>
                        <span className="font-medium text-blue-600">
                          {report.symptoms.dehydration}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Total Cases */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">Summary</h4>
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-gray-900">
                        {report.total_cases}
                      </div>
                      <div className="text-sm text-gray-600">Total Cases</div>
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">Notes</h4>
                    <p className="text-sm text-gray-600 bg-yellow-50 p-3 rounded-lg border-l-4 border-yellow-400">
                      {report.notes || 'No additional notes provided'}
                    </p>
                  </div>
                </div>

                {/* Severity Indicator */}
                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Risk Assessment</span>
                    <div className="flex items-center space-x-2">
                      {report.total_cases >= 40 ? (
                        <>
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <span className="text-sm text-red-700 font-medium">High Risk</span>
                        </>
                      ) : report.total_cases >= 20 ? (
                        <>
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <span className="text-sm text-yellow-700 font-medium">Medium Risk</span>
                        </>
                      ) : (
                        <>
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-green-700 font-medium">Low Risk</span>
                        </>
                      )}
                    </div>
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

export default HealthReports;