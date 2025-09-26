import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  className,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  children,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    primary: 'btn-modern',
    secondary: 'glass text-secondary-900 hover:bg-white/20 hover-lift',
    outline: 'btn-outline-modern',
    ghost: 'text-secondary-700 hover:bg-white/10 hover-glow rounded-xl',
    danger: 'bg-gradient-to-r from-red-500 to-pink-600 text-white hover:from-red-600 hover:to-pink-700 hover-lift shadow-lg',
  };

  const sizes = {
    sm: 'h-10 px-4 text-sm font-semibold',
    md: 'h-12 px-6 py-3 font-semibold',
    lg: 'h-14 px-8 text-lg font-bold',
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], 'transition-all duration-300', className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <div className="mr-3 loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      )}
      {!loading && (
        <svg className="mr-2 h-5 w-5 animate-spin opacity-0" fill="none" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;