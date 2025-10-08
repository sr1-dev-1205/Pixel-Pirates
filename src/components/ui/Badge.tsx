import React from 'react';
import { cn } from '../../lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
}

const Badge: React.FC<BadgeProps> = ({ className, variant = 'default', ...props }) => {
  const variants = {
    default: 'bg-gradient-to-r from-secondary-100 to-secondary-200 text-secondary-800 border-secondary-200 shadow-sm',
    success: 'bg-gradient-to-r from-emerald-100 to-green-200 text-emerald-800 border-emerald-200 shadow-sm animate-pulse',
    warning: 'bg-gradient-to-r from-amber-100 to-yellow-200 text-amber-800 border-amber-200 shadow-sm animate-pulse',
    danger: 'bg-gradient-to-r from-red-100 to-pink-200 text-red-800 border-red-200 shadow-sm animate-pulse',
    info: 'bg-gradient-to-r from-blue-100 to-cyan-200 text-blue-800 border-blue-200 shadow-sm animate-pulse',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold transition-all duration-300 hover-scale',
        variants[variant],
        className
      )}
      {...props}
    />
  );
};

export default Badge;