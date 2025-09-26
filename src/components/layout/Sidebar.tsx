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
    <div className="flex flex-col w-72 glass border-r border-white/20 animate-fade-in-left backdrop-blur-lg">
      <div className="p-6 border-b border-white/10">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-xl animate-float">
            <Activity className="w-8 h-8 text-white animate-pulse" />
          </div>
          <h2 className="text-lg font-bold gradient-text">Health Dashboard</h2>
          <p className="text-sm text-secondary-500 mt-1">Smart Monitoring System</p>
        </div>
      </div>
      <nav className="flex-1 px-6 py-8 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'group flex items-center px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-300 hover-lift relative overflow-hidden',
                item.current
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                  : 'text-secondary-600 hover:text-secondary-900 hover:bg-white/10 hover:shadow-md'
              )}
            >
              {item.current && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-20 animate-pulse"></div>
              )}
              <Icon
                className={cn(
                  'mr-4 h-6 w-6 flex-shrink-0 transition-all duration-300',
                  item.current ? 'text-white animate-bounce' : 'text-secondary-400 group-hover:text-secondary-600 group-hover:scale-110'
                )}
              />
              <span className="relative z-10">{item.name}</span>
              {item.current && (
                <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
              )}
            </Link>
          );
        })}
      </nav>
      
      <div className="p-6 border-t border-white/10">
        <div className="glass rounded-xl p-4 text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-3 animate-pulse">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-bold text-secondary-900 mb-1">System Status</h3>
          <p className="text-xs text-emerald-600 font-semibold">All Systems Online</p>
          <div className="mt-3 flex justify-center space-x-1">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse animate-delay-100"></div>
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse animate-delay-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;