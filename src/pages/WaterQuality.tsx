import React, { useState } from 'react';
import { Droplets, Calendar, MapPin, User, Plus, TestTube, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useMockData } from '../hooks/useMockData';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { formatDate } from '../lib/utils';
import WaterQualityForm from '../components/water-quality/WaterQualityForm';

const WaterQuality: React.FC = () => {
  const { t } = useLanguage();
  const { waterReports, villages, loading, addWaterReport } = useMockData();
  const [showForm, setShowForm] = useState(false);

  const getVillageName = (villageId: string) => {
    const village = villages.find(v => v.id === villageId);
    return village ? village.name : 'Unknown Village';
  };

  const getQualityStatus = (report: any) => {
    const issues = [];
    if (report.ph_level < 6.5 || report.ph_level > 8.5) issues.push('pH');
    if (report.turbidity > 10) issues.push('Turbidity');
    if (report.chlorine_level < 0.2) issues.push('Chlorine');
    if (report.bacterial_presence) issues.push('Bacteria');

    if (issues.length === 0) return { status: 'safe', color: 'success', text: 'Safe' };
    if (issues.length <= 2) return { status: 'caution', color: 'warning', text: 'Caution' };
    return { status: 'unsafe', color: 'danger', text: 'Unsafe' };
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
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{t('waterQuality')}</h1>
            <p className="text-gray-600 mt-1">
              Monitor water source quality and contamination levels
            </p>
          </div>
          <Button onClick={() => setShowForm(true)} className="flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Add Water Test</span>
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Tests</p>
                  <p className="text-3xl font-bold text-gray-900">{waterReports.length}</p>
                </div>
                <TestTube className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Safe Sources</p>
                  <p className="text-3xl font-bold text-green-600">
                    {waterReports.filter(r => getQualityStatus(r).status === 'safe').length}
                  </p>
                </div>
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600">✓</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Caution</p>
                  <p className="text-3xl font-bold text-yellow-600">
                    {waterReports.filter(r => getQualityStatus(r).status === 'caution').length}
                  </p>
                </div>
                <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <span className="text-yellow-600">⚠</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Unsafe</p>
                  <p className="text-3xl font-bold text-red-600">
                    {waterReports.filter(r => getQualityStatus(r).status === 'unsafe').length}
                  </p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Water Quality Reports */}
        <div className="space-y-6">
          {waterReports.map((report) => {
            const qualityStatus = getQualityStatus(report);
            return (
              <Card key={report.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <Droplets className="w-5 h-5 text-blue-600" />
                      <span>Water Quality Test #{report.id}</span>
                    </CardTitle>
                    <Badge variant={qualityStatus.color as any}>
                      {qualityStatus.text}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Test Info */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900">Test Details</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-sm">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span>{getVillageName(report.village_id)}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span>{formatDate(report.test_date)}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <User className="w-4 h-4 text-gray-500" />
                          <span>Tester: {report.reporter_id}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <Droplets className="w-4 h-4 text-gray-500" />
                          <span className="capitalize">{report.source_type} Water</span>
                        </div>
                      </div>
                    </div>

                    {/* pH Level */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900">pH Level</h4>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">
                          {report.ph_level}
                        </div>
                        <div className="text-sm text-gray-600">
                          {report.ph_level < 6.5 || report.ph_level > 8.5 ? 
                            <span className="text-red-600">Outside safe range</span> :
                            <span className="text-green-600">Within safe range</span>
                          }
                        </div>
                        <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              report.ph_level < 6.5 || report.ph_level > 8.5 ? 'bg-red-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${Math.min(100, (report.ph_level / 14) * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* Turbidity */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900">Turbidity (NTU)</h4>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">
                          {report.turbidity}
                        </div>
                        <div className="text-sm text-gray-600">
                          {report.turbidity > 10 ? 
                            <span className="text-red-600">High turbidity</span> :
                            <span className="text-green-600">Acceptable</span>
                          }
                        </div>
                        <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              report.turbidity > 10 ? 'bg-red-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${Math.min(100, (report.turbidity / 20) * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* Chlorine & Bacteria */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900">Contamination</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Chlorine Level</span>
                          <span className={`font-medium ${
                            report.chlorine_level < 0.2 ? 'text-red-600' : 'text-green-600'
                          }`}>
                            {report.chlorine_level} mg/L
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Bacterial Presence</span>
                          <span className={`font-medium ${
                            report.bacterial_presence ? 'text-red-600' : 'text-green-600'
                          }`}>
                            {report.bacterial_presence ? 'Detected' : 'Not Detected'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="mt-6 pt-4 border-t">
                    <h4 className="font-medium text-gray-900 mb-2">Recommendations</h4>
                    <div className={`p-3 rounded-lg ${
                      qualityStatus.status === 'unsafe' ? 'bg-red-50 border-l-4 border-red-500' :
                      qualityStatus.status === 'caution' ? 'bg-yellow-50 border-l-4 border-yellow-500' :
                      'bg-green-50 border-l-4 border-green-500'
                    }`}>
                      <div className={`text-sm font-medium ${
                        qualityStatus.status === 'unsafe' ? 'text-red-800' :
                        qualityStatus.status === 'caution' ? 'text-yellow-800' :
                        'text-green-800'
                      }`}>
                        {qualityStatus.status === 'unsafe' && 'Immediate Action Required:'}
                        {qualityStatus.status === 'caution' && 'Monitor Closely:'}
                        {qualityStatus.status === 'safe' && 'Water Source Safe:'}
                      </div>
                      <ul className={`text-xs mt-1 space-y-1 ${
                        qualityStatus.status === 'unsafe' ? 'text-red-700' :
                        qualityStatus.status === 'caution' ? 'text-yellow-700' :
                        'text-green-700'
                      }`}>
                        {qualityStatus.status === 'unsafe' && (
                          <>
                            <li>• Stop using this water source immediately</li>
                            <li>• Provide alternative safe water supply</li>
                            <li>• Conduct water treatment or source repair</li>
                          </>
                        )}
                        {qualityStatus.status === 'caution' && (
                          <>
                            <li>• Increase testing frequency</li>
                            <li>• Consider water treatment options</li>
                            <li>• Monitor for health impacts</li>
                          </>
                        )}
                        {qualityStatus.status === 'safe' && (
                          <>
                            <li>• Continue regular monitoring</li>
                            <li>• Maintain current water treatment practices</li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Water Quality Form Modal */}
        {showForm && (
          <WaterQualityForm
            villages={villages}
            onSubmit={(data) => {
              addWaterReport(data);
              setShowForm(false);
            }}
            onClose={() => setShowForm(false)}
          />
        )}
      </div>
    </div>
  );
};

export default WaterQuality;