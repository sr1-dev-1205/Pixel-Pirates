import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    trend: 'up' | 'down';
  };
  icon: LucideIcon;
  color?: 'blue' | 'green' | 'red' | 'yellow';
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  icon: Icon,
  color = 'blue',
}) => {
  const colorClasses = {
    blue: 'text-blue-600 bg-blue-100',
    green: 'text-green-600 bg-green-100',
    red: 'text-red-600 bg-red-100',
    yellow: 'text-yellow-600 bg-yellow-100',
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
            {change && (
              <p className="text-sm mt-2">
                <span
                  className={
                    change.trend === 'up' ? 'text-red-600' : 'text-green-600'
                  }
                >
                  {change.trend === 'up' ? '+' : '-'}{Math.abs(change.value)}%
                </span>{' '}
                <span className="text-gray-500">vs last week</span>
              </p>
            )}
          </div>
          <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;