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
    <Card>
      <CardHeader>
        <CardTitle>Symptom Trends (Last 7 Days)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="diarrhea"
                stroke="#ef4444"
                strokeWidth={2}
                name="Diarrhea"
              />
              <Line
                type="monotone"
                dataKey="fever"
                stroke="#f97316"
                strokeWidth={2}
                name="Fever"
              />
              <Line
                type="monotone"
                dataKey="vomiting"
                stroke="#8b5cf6"
                strokeWidth={2}
                name="Vomiting"
              />
              <Line
                type="monotone"
                dataKey="dehydration"
                stroke="#06b6d4"
                strokeWidth={2}
                name="Dehydration"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendChart;