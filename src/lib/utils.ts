import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatDateTime(date: string) {
  return new Date(date).toLocaleString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatTime(date: string) {
  return new Date(date).toLocaleString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function getRiskLevelColor(riskLevel: 'low' | 'medium' | 'high') {
  switch (riskLevel) {
    case 'low':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'high':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
}

export function getRiskLevelIcon(riskLevel: 'low' | 'medium' | 'high') {
  switch (riskLevel) {
    case 'low':
      return '🟢';
    case 'medium':
      return '🟡';
    case 'high':
      return '🔴';
    default:
      return '⚪';
  }
}

// Responsive breakpoints helpers
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

// Check if viewport is mobile
export function isMobile(width: number): boolean {
  return width < breakpoints.md;
}

// Check if viewport is tablet
export function isTablet(width: number): boolean {
  return width >= breakpoints.md && width < breakpoints.lg;
}

// Check if viewport is desktop
export function isDesktop(width: number): boolean {
  return width >= breakpoints.lg;
}

// Get responsive grid columns
export function getResponsiveGrid(width: number): string {
  if (width < breakpoints.sm) return 'grid-cols-1';
  if (width < breakpoints.md) return 'grid-cols-2';
  if (width < breakpoints.lg) return 'grid-cols-2 lg:grid-cols-3';
  return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
}

// Validate email
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate phone (Indian format)
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Format currency (INR)
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount);
}

// Format numbers with commas (Indian numbering system)
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-IN').format(num);
}

// Debounce function for search inputs
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Download file utility
export function downloadFile(data: any, filename: string, type: string = 'application/json') {
  const blob = new Blob([data], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Export to CSV
export function exportToCSV(data: any[], filename: string) {
  if (!data.length) return;
  
  const headers = Object.keys(data[0]);
  const csv = [
    headers.join(','),
    ...data.map(row =>
      headers.map(header => {
        const value = row[header];
        return typeof value === 'string' ? `"${value}"` : value;
      }).join(',')
    ),
  ].join('\n');
  
  downloadFile(csv, `${filename}.csv`, 'text/csv');
}