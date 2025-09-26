import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { HealthReport } from '../../types';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';

interface TrendChartProps {
  healthReports: HealthReport[];
}

const TrendChart: React.FC<TrendChartProps> = ({ healthReports }) => {
  // Process data for the last 7 days
  const processChartData = () => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date.toISOString().split('T')[0];
    });

    return last7Days.map(date => {
      const dayReports = healthReports.filter(report => report.report_date === date);
      const totals = dayReports.reduce(
        (acc, report) => ({
          diarrhea: acc.diarrhea + report.symptoms.diarrhea,
          fever: acc.fever + report.symptoms.fever,
          vomiting: acc.vomiting + report.symptoms.vomiting,
          dehydration: acc.dehydration + report.symptoms.dehydration,
        }),
        { diarrhea: 0, fever: 0, vomiting: 0, dehydration: 0 }
      );

      return {
        date: new Date(date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
        ...totals,
      };
    });
  };

  const chartData = processChartData();

  return (
    <Card className="glass animate-fade-in-up">
      <CardHeader>
        <CardTitle className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <span>Advanced Symptom Analytics</span>
        </CardTitle>
        <p className="text-secondary-600 mt-2">Real-time trend analysis with predictive insights</p>
      </CardHeader>
      <CardContent>
        <div className="h-96 relative">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" />
              <XAxis 
                dataKey="date" 
                stroke="#64748b"
                fontSize={12}
                fontWeight={600}
              />
              <YAxis 
                stroke="#64748b"
                fontSize={12}
                fontWeight={600}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                }}
              />
              <Legend 
                wrapperStyle={{
                  paddingTop: '20px',
                  fontSize: '14px',
                  fontWeight: '600',
                }}
              />
              <Line
                type="monotone"
                dataKey="diarrhea"
                stroke="url(#redGradient)"
                strokeWidth={3}
                name="Diarrhea"
                dot={{ fill: '#ef4444', strokeWidth: 2, r: 5 }}
                activeDot={{ r: 7, stroke: '#ef4444', strokeWidth: 2 }}
              />
              <Line
                type="monotone"
                dataKey="fever"
                stroke="url(#orangeGradient)"
                strokeWidth={3}
                name="Fever"
                dot={{ fill: '#f97316', strokeWidth: 2, r: 5 }}
                activeDot={{ r: 7, stroke: '#f97316', strokeWidth: 2 }}
              />
              <Line
                type="monotone"
                dataKey="vomiting"
                stroke="url(#purpleGradient)"
                strokeWidth={3}
                name="Vomiting"
                dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 5 }}
                activeDot={{ r: 7, stroke: '#8b5cf6', strokeWidth: 2 }}
              />
              <Line
                type="monotone"
                dataKey="dehydration"
                stroke="url(#cyanGradient)"
                strokeWidth={3}
                name="Dehydration"
                dot={{ fill: '#06b6d4', strokeWidth: 2, r: 5 }}
                activeDot={{ r: 7, stroke: '#06b6d4', strokeWidth: 2 }}
              />
              <defs>
                <linearGradient id="redGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="100%" stopColor="#f87171" />
                </linearGradient>
                <linearGradient id="orangeGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#f97316" />
                  <stop offset="100%" stopColor="#fb923c" />
                </linearGradient>
                <linearGradient id="purpleGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#a78bfa" />
                </linearGradient>
                <linearGradient id="cyanGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#22d3ee" />
                </linearGradient>
              </defs>
            </LineChart>
          </ResponsiveContainer>
          <div className="absolute top-4 right-4 glass rounded-xl p-3">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-emerald-600">Live Data</span>
            </div>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 glass rounded-xl">
            <div className="text-2xl font-bold text-red-600 mb-1">
              {chartData.reduce((sum, day) => sum + day.diarrhea, 0)}
            </div>
            <div className="text-xs text-secondary-600 font-semibold">Total Diarrhea</div>
          </div>
          <div className="text-center p-4 glass rounded-xl">
            <div className="text-2xl font-bold text-orange-600 mb-1">
              {chartData.reduce((sum, day) => sum + day.fever, 0)}
            </div>
            <div className="text-xs text-secondary-600 font-semibold">Total Fever</div>
          </div>
          <div className="text-center p-4 glass rounded-xl">
            <div className="text-2xl font-bold text-purple-600 mb-1">
              {chartData.reduce((sum, day) => sum + day.vomiting, 0)}
            </div>
            <div className="text-xs text-secondary-600 font-semibold">Total Vomiting</div>
          </div>
          <div className="text-center p-4 glass rounded-xl">
            <div className="text-2xl font-bold text-cyan-600 mb-1">
              {chartData.reduce((sum, day) => sum + day.dehydration, 0)}
            </div>
            <div className="text-xs text-secondary-600 font-semibold">Total Dehydration</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendChart;