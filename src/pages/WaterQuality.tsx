import React, { useState } from 'react';
import { Droplets, Calendar, MapPin, User, Plus, TestTube, AlertTriangle, CheckCircle, XCircle, Filter } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useMockData } from '../hooks/useMockData';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { formatDate } from '../lib/utils';
import WaterQualityForm from '../components/water-quality/WaterQualityForm';
import ScrollReveal from '../components/common/ScrollReveal';

const WaterQuality: React.FC = () => {
  const { t } = useLanguage();
  const { waterReports, villages, loading, addWaterReport } = useMockData();
  const [showForm, setShowForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'all' | 'safe' | 'caution' | 'unsafe'>('all');

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

    if (issues.length === 0) return { status: 'safe', color: 'success', text: 'Safe', icon: CheckCircle };
    if (issues.length <= 2) return { status: 'caution', color: 'warning', text: 'Caution', icon: AlertTriangle };
    return { status: 'unsafe', color: 'danger', text: 'Unsafe', icon: XCircle };
  };

  const filteredReports = waterReports.filter(report => {
    if (filterStatus === 'all') return true;
    return getQualityStatus(report).status === filterStatus;
  });

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">{t('loading')}</p>
        </div>
      </div>
    );
  }

  const safeCount = waterReports.filter(r => getQualityStatus(r).status === 'safe').length;
  const cautionCount = waterReports.filter(r => getQualityStatus(r).status === 'caution').length;
  const unsafeCount = waterReports.filter(r => getQualityStatus(r).status === 'unsafe').length;

  return (
    <div className="flex-1 overflow-auto bg-gradient-to-br from-gray-50/50 via-white to-cyan-50/30">
      <div className="p-6 max-w-screen-2xl mx-auto">
        <ScrollReveal>
          <div className="mb-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-teal-600 bg-clip-text text-transparent mb-2">
                  {t('waterQuality')}
                </h1>
                <p className="text-gray-600 text-lg">
                  Monitor water source quality and contamination levels
                </p>
              </div>
              <Button
                onClick={() => setShowForm(true)}
                className="flex items-center space-x-2 px-5 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <Plus className="w-5 h-5" />
                <span>Add Water Test</span>
              </Button>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <ScrollReveal>
            <Card className="bg-white hover:shadow-xl transition-all duration-300 border-0 overflow-hidden group cursor-pointer" onClick={() => setFilterStatus('all')}>
              <CardContent className="p-0">
                <div className={`h-2 bg-gradient-to-r from-blue-500 to-cyan-500 ${filterStatus === 'all' ? '' : 'opacity-30'}`}></div>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 font-medium mb-1">Total Tests</p>
                      <p className="text-3xl font-bold text-gray-900">{waterReports.length}</p>
                    </div>
                    <TestTube className="w-10 h-10 text-blue-500 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <Card className="bg-white hover:shadow-xl transition-all duration-300 border-0 overflow-hidden group cursor-pointer" onClick={() => setFilterStatus('safe')}>
              <CardContent className="p-0">
                <div className={`h-2 bg-gradient-to-r from-emerald-500 to-green-500 ${filterStatus === 'safe' ? '' : 'opacity-30'}`}></div>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 font-medium mb-1">Safe Sources</p>
                      <p className="text-3xl font-bold text-emerald-600">{safeCount}</p>
                    </div>
                    <div className="w-10 h-10 bg-emerald-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <CheckCircle className="w-6 h-6 text-emerald-600" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <Card className="bg-white hover:shadow-xl transition-all duration-300 border-0 overflow-hidden group cursor-pointer" onClick={() => setFilterStatus('caution')}>
              <CardContent className="p-0">
                <div className={`h-2 bg-gradient-to-r from-amber-500 to-orange-500 ${filterStatus === 'caution' ? '' : 'opacity-30'}`}></div>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 font-medium mb-1">Caution</p>
                      <p className="text-3xl font-bold text-amber-600">{cautionCount}</p>
                    </div>
                    <div className="w-10 h-10 bg-amber-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <AlertTriangle className="w-6 h-6 text-amber-600" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <Card className="bg-white hover:shadow-xl transition-all duration-300 border-0 overflow-hidden group cursor-pointer" onClick={() => setFilterStatus('unsafe')}>
              <CardContent className="p-0">
                <div className={`h-2 bg-gradient-to-r from-red-500 to-pink-500 ${filterStatus === 'unsafe' ? '' : 'opacity-30'}`}></div>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 font-medium mb-1">Unsafe</p>
                      <p className="text-3xl font-bold text-red-600">{unsafeCount}</p>
                    </div>
                    <div className="w-10 h-10 bg-red-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <XCircle className="w-6 h-6 text-red-600" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>

        {filterStatus !== 'all' && (
          <div className="mb-6">
            <button
              onClick={() => setFilterStatus('all')}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium text-gray-700 transition-all duration-200"
            >
              <Filter className="w-4 h-4" />
              <span>Clear Filter</span>
            </button>
          </div>
        )}

        <div className="space-y-6">
          {filteredReports.map((report, index) => {
            const qualityStatus = getQualityStatus(report);
            const StatusIcon = qualityStatus.icon;

            return (
              <ScrollReveal key={report.id} delay={index * 50}>
                <Card className="bg-white hover:shadow-xl transition-all duration-300 border-0 overflow-hidden">
                  <CardHeader className={`border-b bg-gradient-to-r ${
                    qualityStatus.status === 'safe' ? 'from-emerald-50 to-green-50 border-emerald-100' :
                    qualityStatus.status === 'caution' ? 'from-amber-50 to-orange-50 border-amber-100' :
                    'from-red-50 to-pink-50 border-red-100'
                  }`}>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          qualityStatus.status === 'safe' ? 'bg-emerald-100' :
                          qualityStatus.status === 'caution' ? 'bg-amber-100' :
                          'bg-red-100'
                        }`}>
                          <Droplets className={`w-5 h-5 ${
                            qualityStatus.status === 'safe' ? 'text-emerald-600' :
                            qualityStatus.status === 'caution' ? 'text-amber-600' :
                            'text-red-600'
                          }`} />
                        </div>
                        <span className="text-gray-900">Water Quality Test #{report.id}</span>
                      </CardTitle>
                      <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl ${
                        qualityStatus.status === 'safe' ? 'bg-emerald-100 text-emerald-700' :
                        qualityStatus.status === 'caution' ? 'bg-amber-100 text-amber-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        <StatusIcon className="w-4 h-4" />
                        <span className="font-bold text-sm">{qualityStatus.text}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-900 text-sm">Test Details</h4>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 text-sm">
                            <MapPin className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-700">{getVillageName(report.village_id)}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-700">{formatDate(report.test_date)}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm">
                            <User className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-700">Tester: {report.reporter_id}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm">
                            <Droplets className="w-4 h-4 text-gray-500" />
                            <span className="capitalize text-gray-700">{report.source_type} Water</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-900 text-sm">pH Level</h4>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-gray-900 mb-2">
                            {report.ph_level}
                          </div>
                          <div className="text-xs font-medium mb-3">
                            {report.ph_level < 6.5 || report.ph_level > 8.5 ?
                              <span className="text-red-600">Outside safe range</span> :
                              <span className="text-emerald-600">Within safe range</span>
                            }
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                              className={`h-2.5 rounded-full transition-all duration-500 ${
                                report.ph_level < 6.5 || report.ph_level > 8.5 ? 'bg-gradient-to-r from-red-500 to-pink-500' : 'bg-gradient-to-r from-emerald-500 to-green-500'
                              }`}
                              style={{ width: `${Math.min(100, (report.ph_level / 14) * 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-900 text-sm">Turbidity (NTU)</h4>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-gray-900 mb-2">
                            {report.turbidity}
                          </div>
                          <div className="text-xs font-medium mb-3">
                            {report.turbidity > 10 ?
                              <span className="text-red-600">High turbidity</span> :
                              <span className="text-emerald-600">Acceptable</span>
                            }
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                              className={`h-2.5 rounded-full transition-all duration-500 ${
                                report.turbidity > 10 ? 'bg-gradient-to-r from-red-500 to-pink-500' : 'bg-gradient-to-r from-emerald-500 to-green-500'
                              }`}
                              style={{ width: `${Math.min(100, (report.turbidity / 20) * 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-900 text-sm">Contamination</h4>
                        <div className="space-y-3">
                          <div className="bg-gray-50 rounded-xl p-3">
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-gray-600 font-medium">Chlorine Level</span>
                              <span className={`font-bold text-sm ${
                                report.chlorine_level < 0.2 ? 'text-red-600' : 'text-emerald-600'
                              }`}>
                                {report.chlorine_level} mg/L
                              </span>
                            </div>
                          </div>
                          <div className="bg-gray-50 rounded-xl p-3">
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-gray-600 font-medium">Bacterial Presence</span>
                              <span className={`font-bold text-sm ${
                                report.bacterial_presence ? 'text-red-600' : 'text-emerald-600'
                              }`}>
                                {report.bacterial_presence ? 'Detected' : 'Not Detected'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-100">
                      <h4 className="font-semibold text-gray-900 mb-3 text-sm">Recommendations</h4>
                      <div className={`rounded-xl p-4 ${
                        qualityStatus.status === 'unsafe' ? 'bg-red-50 border-l-4 border-red-500' :
                        qualityStatus.status === 'caution' ? 'bg-amber-50 border-l-4 border-amber-500' :
                        'bg-emerald-50 border-l-4 border-emerald-500'
                      }`}>
                        <div className={`text-sm font-bold mb-2 ${
                          qualityStatus.status === 'unsafe' ? 'text-red-800' :
                          qualityStatus.status === 'caution' ? 'text-amber-800' :
                          'text-emerald-800'
                        }`}>
                          {qualityStatus.status === 'unsafe' && 'Immediate Action Required:'}
                          {qualityStatus.status === 'caution' && 'Monitor Closely:'}
                          {qualityStatus.status === 'safe' && 'Water Source Safe:'}
                        </div>
                        <ul className={`text-xs space-y-1.5 ${
                          qualityStatus.status === 'unsafe' ? 'text-red-700' :
                          qualityStatus.status === 'caution' ? 'text-amber-700' :
                          'text-emerald-700'
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
              </ScrollReveal>
            );
          })}
        </div>

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
