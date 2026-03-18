import React from 'react';
import { cn } from '../../lib/utils';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'circular' | 'rounded' | 'text';
}

const Skeleton: React.FC<SkeletonProps> = ({ 
  className, 
  variant = 'default',
  ...props 
}) => {
  return (
    <div
      className={cn(
        "animate-pulse",
        variant === 'circular' ? 'rounded-full' : 
        variant === 'rounded' ? 'rounded-lg' :
        variant === 'text' ? 'rounded-sm' : 'rounded-md',
        "bg-gradient-to-r from-gray-200/80 via-gray-300/80 to-gray-200/80",
        "bg-[length:200%_100%]",
        "animate-shimmer",
        className
      )}
      {...props}
    />
  );
};

// Pre-defined skeleton components for common use cases
export const SkeletonCard = () => (
  <div className="space-y-3">
    <Skeleton className="h-4 w-3/4" />
    <Skeleton className="h-20 w-full" />
    <div className="grid grid-cols-2 gap-2">
      <Skeleton className="h-16" />
      <Skeleton className="h-16" />
    </div>
  </div>
);

export const SkeletonTable = ({ rows = 5 }: { rows?: number }) => (
  <div className="space-y-2">
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="flex gap-4">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-3 w-2/3" />
        </div>
      </div>
    ))}
  </div>
);

export const SkeletonChart = () => (
  <div className="space-y-4">
    <Skeleton className="h-6 w-1/2" />
    <Skeleton className="h-64 w-full" />
  </div>
);

export default Skeleton;
