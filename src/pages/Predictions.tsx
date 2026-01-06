import React from 'react';
import { Brain, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useMockData } from '../hooks/useMockData';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import PredictionChart from '../components/predictions/PredictionChart';

import Skeleton from '../components/ui/Skeleton';
import PageHeader from '../components/layout/PageHeader';

const Predictions: React.FC = () => {
  const { t } = useLanguage();
  const { predictions, villages, loading } = useMockData();

  const getVillageName = (villageId: string) => {
    const village = villages.find(v => v.id === villageId);
    return village ? village.name : 'Unknown Village';
  };

  const getRiskBadge = (probability: number) => {
    if (probability >= 0.7) return { variant: 'danger' as const, text: 'High Risk' };
    if (probability >= 0.4) return { variant: 'warning' as const, text: 'Medium Risk' };
    return { variant: 'success' as const, text: 'Low Risk' };
  };

  if (loading) {
    return (
      <div className="flex-1 overflow-auto p-6 space-y-6">
        <div className="mb-6">
          <Skeleton className="h-10 w-48 mb-2" />
          <Skeleton className="h-5 w-96" />
        </div>
        <Skeleton className="h-64 rounded-lg" />
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-80 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6">
        <PageHeader
          title={t('predictions')}
          subtitle="AI-powered outbreak prediction and risk assessment"
        />

        {/* Prediction Chart */}
        <div className="mb-6">
          <PredictionChart predictions={predictions} />
        </div>

        {/* Prediction Details */}
        <div className="space-y-6">
          {predictions.map((prediction, index) => (
            <Card key={`${prediction.village_id}-${index}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="w-5 h-5 text-blue-600" />
                    <span>{getVillageName(prediction.village_id)} - Outbreak Prediction</span>
                  </CardTitle>
                  <Badge {...getRiskBadge(prediction.outbreak_probability)}>
                    {getRiskBadge(prediction.outbreak_probability).text}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Overall Risk */}
                  <div className="text-center p-6 bg-gradient-to-br from-red-50 to-red-100 rounded-lg border-l-4 border-red-500">
                    <div className="text-3xl font-bold text-red-600 mb-2">
                      {Math.round(prediction.outbreak_probability * 100)}%
                    </div>
                    <div className="text-sm font-medium text-red-700">
                      Outbreak Probability
                    </div>
                    <div className="text-xs text-red-600 mt-1">
                      Confidence: {Math.round(prediction.confidence_level * 100)}%
                    </div>
                  </div>

                  {/* Risk Factors */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900 flex items-center space-x-1">
                      <TrendingUp className="w-4 h-4" />
                      <span>Risk Factors</span>
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Water Quality</span>
                        <div className="flex items-center space-x-1">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-red-500 h-2 rounded-full"
                              style={{
                                width: `${prediction.risk_factors.water_quality_score * 100}%`,
                              }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">
                            {Math.round(prediction.risk_factors.water_quality_score * 100)}%
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Symptom Trends</span>
                        <div className="flex items-center space-x-1">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-orange-500 h-2 rounded-full"
                              style={{
                                width: `${prediction.risk_factors.symptom_trend_score * 100}%`,
                              }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">
                            {Math.round(prediction.risk_factors.symptom_trend_score * 100)}%
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Seasonal Factors</span>
                        <div className="flex items-center space-x-1">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-yellow-500 h-2 rounded-full"
                              style={{
                                width: `${prediction.risk_factors.seasonal_score * 100}%`,
                              }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">
                            {Math.round(prediction.risk_factors.seasonal_score * 100)}%
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Population Density</span>
                        <div className="flex items-center space-x-1">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full"
                              style={{
                                width: `${prediction.risk_factors.population_density_score * 100}%`,
                              }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">
                            {Math.round(prediction.risk_factors.population_density_score * 100)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900 flex items-center space-x-1">
                      <AlertCircle className="w-4 h-4" />
                      <span>Recommendations</span>
                    </h4>
                    <div className="space-y-2">
                      {prediction.outbreak_probability >= 0.7 && (
                        <div className="bg-red-50 p-3 rounded-lg border-l-4 border-red-500">
                          <div className="text-sm font-medium text-red-800">
                            Critical Actions Required:
                          </div>
                          <ul className="text-xs text-red-700 mt-1 space-y-1">
                            <li>• Deploy medical team immediately</li>
                            <li>• Set up emergency water purification</li>
                            <li>• Launch community awareness campaign</li>
                          </ul>
                        </div>
                      )}
                      {prediction.outbreak_probability >= 0.4 && prediction.outbreak_probability < 0.7 && (
                        <div className="bg-yellow-50 p-3 rounded-lg border-l-4 border-yellow-500">
                          <div className="text-sm font-medium text-yellow-800">
                            Preventive Measures:
                          </div>
                          <ul className="text-xs text-yellow-700 mt-1 space-y-1">
                            <li>• Increase health monitoring frequency</li>
                            <li>• Test water sources more regularly</li>
                            <li>• Distribute hygiene education materials</li>
                          </ul>
                        </div>
                      )}
                      {prediction.outbreak_probability < 0.4 && (
                        <div className="bg-green-50 p-3 rounded-lg border-l-4 border-green-500">
                          <div className="text-sm font-medium text-green-800 flex items-center space-x-1">
                            <CheckCircle className="w-4 h-4" />
                            <span>Situation Stable</span>
                          </div>
                          <div className="text-xs text-green-700 mt-1">
                            Continue routine monitoring and preventive measures
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Model Information */}
                <div className="mt-6 pt-4 border-t bg-gray-50 rounded-lg p-4">
                  <div className="text-xs text-gray-600">
                    <p className="mb-1">
                      <strong>Model Information:</strong> This prediction is generated using machine learning algorithms
                      that analyze historical health data, water quality parameters, seasonal patterns, and population density.
                    </p>
                    <p>
                      <strong>Last Updated:</strong> {new Date(prediction.prediction_date).toLocaleString('en-IN')}
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

export default Predictions;