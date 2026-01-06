import React, { useMemo } from 'react';
import { Lightbulb, AlertOctagon, Timer, ClipboardList, ArrowRight } from 'lucide-react';
import { Village, PredictionData, Alert } from '../../types';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Link } from 'react-router-dom';

interface HealthIntelligenceProps {
    villages: Village[];
    predictions: PredictionData[];
    alerts: Alert[];
}

const HealthIntelligenceSummary: React.FC<HealthIntelligenceProps> = ({
    villages,
    predictions,
    alerts,
}) => {
    // 1. Generate AI Insights
    const insights = useMemo(() => {
        const list: { type: 'critical' | 'warning' | 'info'; text: string }[] = [];

        // Count High Risk
        const highRiskCount = villages.filter(v => v.risk_level === 'high').length;
        if (highRiskCount > 0) {
            list.push({
                type: 'critical',
                text: `${highRiskCount} village${highRiskCount > 1 ? 's are' : ' is'} currently at HIGH risk of outbreak. Immediate intervention required.`
            });
        }

        // Analyze Drivers (simplified)
        const waterDriven = predictions.filter(p => p.risk_factors.water_quality_score > 0.7);
        if (waterDriven.length > 0) {
            const names = waterDriven.slice(0, 2).map(p => villages.find(v => v.id === p.village_id)?.name).join(', ');
            list.push({
                type: 'warning',
                text: `Water quality contamination is the primary risk driver for ${names}${waterDriven.length > 2 ? ' and others' : ''}.`
            });
        }

        // Seasonal
        if (predictions[0]?.risk_factors?.seasonal_score > 0.6) {
            list.push({
                type: 'info',
                text: 'Seasonal factors (Monsoon) are currently amplifying outbreak probabilities across the region.'
            });
        }

        return list;
    }, [villages, predictions]);

    // 2. Identify Silent Villages (> 2 days no update)
    const silentVillages = useMemo(() => {
        const now = new Date().getTime();
        const twoDays = 2 * 24 * 60 * 60 * 1000;

        return villages.filter(v => {
            const lastUpdate = new Date(v.last_updated).getTime();
            return (now - lastUpdate) > twoDays;
        });
    }, [villages]);

    // 3. Generate Action Queue
    const actionQueue = useMemo(() => {
        const actions: { id: string; priority: 'high' | 'medium'; text: string; link: string }[] = [];

        // High Risk Actions
        villages.filter(v => v.risk_level === 'high').forEach(v => {
            actions.push({
                id: `deploy-${v.id}`,
                priority: 'high',
                text: `Deploy containment team to ${v.name}`,
                link: `/villages`
            });
        });

        // Unacknowledged Alerts
        alerts.filter(a => !a.acknowledged && a.severity === 'critical').forEach(a => {
            actions.push({
                id: `alert-${a.id}`,
                priority: 'high',
                text: `Acknowledge critical alert: ${a.alert_type.replace('_', ' ')}`,
                link: `/alerts`
            });
        });

        // Silent Village Checks
        silentVillages.forEach(v => {
            actions.push({
                id: `check-${v.id}`,
                priority: 'medium',
                text: `Request status update from ${v.name} (Silent > 48h)`,
                link: `/villages`
            });
        });

        return actions.sort((a, b) => {
            if (a.priority === b.priority) return 0;
            return a.priority === 'high' ? -1 : 1;
        }).slice(0, 5);
    }, [villages, alerts, silentVillages]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

            {/* AI Insights Panel */}
            <Card className="lg:col-span-2 border-t-4 border-t-purple-600 shadow-sm">
                <CardHeader className="pb-2">
                    <CardTitle className="flex items-center space-x-2 text-purple-800">
                        <Lightbulb className="w-5 h-5" />
                        <span>Today's Health Intelligence</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {insights.map((insight, idx) => (
                            <div key={idx} className={`flex items-start space-x-3 p-3 rounded-lg ${insight.type === 'critical' ? 'bg-red-50 text-red-800' :
                                insight.type === 'warning' ? 'bg-orange-50 text-orange-800' :
                                    'bg-blue-50 text-blue-800'
                                }`}>
                                <div className="mt-0.5">
                                    {insight.type === 'critical' ? <AlertOctagon className="w-4 h-4" /> :
                                        insight.type === 'warning' ? <AlertOctagon className="w-4 h-4" /> :
                                            <Lightbulb className="w-4 h-4" />}
                                </div>
                                <p className="text-sm font-medium leading-relaxed">{insight.text}</p>
                            </div>
                        ))}
                        {insights.length === 0 && (
                            <p className="text-gray-500 italic">System stable. No critical anomalies detected today.</p>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Action Queue & Silent Villages - Stacked */}
            <div className="space-y-6">

                {/* Action Queue */}
                <Card className="border-t-4 border-t-blue-600 shadow-sm">
                    <CardHeader className="pb-2">
                        <CardTitle className="flex items-center space-x-2 text-blue-800">
                            <ClipboardList className="w-5 h-5" />
                            <span>Recommended Actions</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {actionQueue.map((action) => (
                                <Link
                                    key={action.id}
                                    to={action.link}
                                    className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md transition-colors group"
                                >
                                    <div className="flex items-center space-x-2">
                                        <div className={`w-2 h-2 rounded-full ${action.priority === 'high' ? 'bg-red-500 animate-pulse' : 'bg-yellow-500'}`} />
                                        <span className="text-sm text-gray-700 font-medium group-hover:text-blue-700">
                                            {action.text}
                                        </span>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            ))}
                            {actionQueue.length === 0 && (
                                <p className="text-sm text-gray-500">No pending actions.</p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Silent Villages */}
                {silentVillages.length > 0 && (
                    <Card className="border-t-4 border-t-gray-500 shadow-sm bg-gray-50/50">
                        <CardHeader className="pb-2">
                            <CardTitle className="flex items-center space-x-2 text-gray-700">
                                <Timer className="w-5 h-5" />
                                <span>Silent Villages (No Data &gt; 48h)</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                {silentVillages.map(v => (
                                    <div key={v.id} className="px-2 py-1 bg-white border border-gray-200 rounded text-xs font-medium text-gray-600">
                                        {v.name}
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

            </div>
        </div>
    );
};

export default HealthIntelligenceSummary;
