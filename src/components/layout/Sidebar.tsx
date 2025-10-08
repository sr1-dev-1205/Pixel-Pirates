import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  BarChart3,
  MapPin,
  FileText,
  Droplets,
  AlertTriangle,
  Brain,
  Package,
  Smartphone,
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { cn } from '../../lib/utils';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { t } = useLanguage();

  const navigation = [
    {
      name: t('dashboard'),
      href: '/',
      icon: BarChart3,
      current: location.pathname === '/',
    },
    {
      name: t('villages'),
      href: '/villages',
      icon: MapPin,
      current: location.pathname === '/villages',
    },
    {
      name: t('healthReports'),
      href: '/health-reports',
      icon: FileText,
      current: location.pathname === '/health-reports',
    },
    {
      name: t('waterQuality'),
      href: '/water-quality',
      icon: Droplets,
      current: location.pathname === '/water-quality',
    },
    {
      name: t('alerts'),
      href: '/alerts',
      icon: AlertTriangle,
      current: location.pathname === '/alerts',
    },
    {
      name: t('predictions'),
      href: '/predictions',
      icon: Brain,
      current: location.pathname === '/predictions',
    },
    {
      name: 'Resources',
      href: '/resources',
      icon: Package,
      current: location.pathname === '/resources',
    },
    {
      name: 'Mobile App',
      href: '/mobile',
      icon: Smartphone,
      current: location.pathname === '/mobile',
    },
  ];

  return (
    <div className="flex flex-col w-64 bg-gray-50 border-r border-gray-200">
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                item.current
                  ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              )}
            >
              <Icon
                className={cn(
                  'mr-3 h-5 w-5 flex-shrink-0',
                  item.current ? 'text-blue-700' : 'text-gray-400 group-hover:text-gray-500'
                )}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;