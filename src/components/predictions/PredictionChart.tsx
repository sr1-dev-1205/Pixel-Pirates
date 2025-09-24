import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { PredictionData } from '../../types';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';

interface PredictionChartProps {
  predictions: PredictionData[];
}

const PredictionChart: React.FC<PredictionChartProps> = ({ predictions }) => {
  const processChartData = () => {
    if (predictions.length === 0) return [];

    // Use the first prediction data for the chart (can be enhanced to combine multiple villages)
    const prediction = predictions[0];
    
    return prediction.next_14_days.map((probability, index) => ({
      day: `Day ${index + 1}`,
      probability: Math.round(probability * 100),
      date: new Date(Date.now() + index * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
        month: 'short',
        day: 'numeric',
      }),
    }));
  };

  const chartData = processChartData();

  return (
    <Card>
      <CardHeader>
        <CardTitle>14-Day Outbreak Probability Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis 
                label={{ value: 'Probability (%)', angle: -90, position: 'insideLeft' }}
                domain={[0, 100]}
              />
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Outbreak Probability']}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="probability"
                stroke="#ef4444"
                strokeWidth={3}
                name="Outbreak Probability"
                dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
            <p className="text-sm font-medium text-red-700">Current Risk</p>
            <p className="text-2xl font-bold text-red-600">
              {predictions[0] ? Math.round(predictions[0].outbreak_probability * 100) : 0}%
            </p>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
            <p className="text-sm font-medium text-blue-700">Confidence</p>
            <p className="text-2xl font-bold text-blue-600">
              {predictions[0] ? Math.round(predictions[0].confidence_level * 100) : 0}%
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PredictionChart;