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
    <Card className="glass hover-lift hover-glow">
      <CardContent className="p-8">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-semibold text-secondary-600 mb-2">{title}</p>
            <p className="text-4xl font-bold gradient-text mb-2">{value}</p>
            {change && (
              <p className="text-sm">
                <span
                  className={
                    change.trend === 'up' ? 'text-red-600 font-bold' : 'text-green-600 font-bold'
                  }
                >
                  {change.trend === 'up' ? '+' : '-'}{Math.abs(change.value)}%
                </span>{' '}
                <span className="text-secondary-500 font-medium">vs last week</span>
              </p>
            )}
          </div>
          <div className={`p-4 rounded-2xl shadow-lg animate-float ${colorClasses[color]}`}>
            <Icon className="w-8 h-8 animate-pulse" />
          </div>
        </div>
        <div className="mt-4 progress-modern">
          <div 
            className="progress-fill-modern" 
            style={{ 
              width: typeof value === 'number' ? `${Math.min(100, (value / 100) * 100)}%` : '75%' 
            }}
          ></div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;