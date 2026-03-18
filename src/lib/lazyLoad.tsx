import React, { Suspense, lazy, ComponentType } from 'react';
import Skeleton from '../components/ui/Skeleton';

// Lazy load component wrapper with error handling
export function lazyWithRetry<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>
) {
  return lazy(importFunc);
}

// Loading fallback component
export function LoadingFallback() {
  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl space-y-4">
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-24 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
      </div>
    </div>
  );
}

// Route lazy loader with better error handling
export function lazyRoute<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>
) {
  const Component = lazy(importFunc);
  
  return function LazyRoute(props: React.ComponentProps<T>) {
    return (
      <Suspense fallback={<LoadingFallback />}>
        <Component {...props} />
      </Suspense>
    );
  };
}

// Image lazy loader with intersection observer
export function LazyImage({ 
  src, 
  alt, 
  className 
}: { 
  src: string; 
  alt: string; 
  className?: string;
}) {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [isInView, setIsInView] = React.useState(false);
  const imgRef = React.useRef<HTMLImageElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '50px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <img
      ref={imgRef}
      src={isInView ? src : undefined}
      alt={alt}
      className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
      onLoad={() => setIsLoaded(true)}
      loading="lazy"
    />
  );
}

// Virtual list for large datasets
export function VirtualList<T>({
  items,
  renderItem,
  itemHeight = 100,
  overscan = 5,
}: {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  itemHeight?: number;
  overscan?: number;
}) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [visibleRange, setVisibleRange] = React.useState({ start: 0, end: 20 });

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const visibleHeight = container.clientHeight;
      
      const startIndex = Math.floor(scrollTop / itemHeight);
      const endIndex = startIndex + Math.ceil(visibleHeight / itemHeight);
      
      setVisibleRange({
        start: Math.max(0, startIndex - overscan),
        end: Math.min(items.length, endIndex + overscan),
      });
    };

    container.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation

    return () => container.removeEventListener('scroll', handleScroll);
  }, [items.length, itemHeight, overscan]);

  const visibleItems = items.slice(visibleRange.start, visibleRange.end);
  const totalHeight = items.length * itemHeight;
  const offsetY = visibleRange.start * itemHeight;

  return (
    <div 
      ref={containerRef} 
      style={{ height: '100%', overflow: 'auto' }}
      className="relative"
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div 
          style={{ 
            position: 'absolute', 
            top: offsetY, 
            left: 0, 
            right: 0 
          }}
        >
          {visibleItems.map((item, index) => 
            renderItem(item, visibleRange.start + index)
          )}
        </div>
      </div>
    </div>
  );
}

// Memoization helper for expensive calculations
export function useMemoizedCalculation<T, R>(
  compute: (data: T) => R,
  data: T
): R {
  return React.useMemo(() => compute(data), [compute, data]);
}

// Debounced value hook for search inputs
export function useDebounceValue<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
