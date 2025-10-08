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
  Activity,
  Zap,
  ChevronRight,
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
      color: 'from-teal-500 to-cyan-500',
    },
    {
      name: t('villages'),
      href: '/villages',
      icon: MapPin,
      current: location.pathname === '/villages',
      color: 'from-blue-500 to-indigo-500',
    },
    {
      name: t('healthReports'),
      href: '/health-reports',
      icon: FileText,
      current: location.pathname === '/health-reports',
      color: 'from-emerald-500 to-green-500',
    },
    {
      name: t('waterQuality'),
      href: '/water-quality',
      icon: Droplets,
      current: location.pathname === '/water-quality',
      color: 'from-cyan-500 to-blue-500',
    },
    {
      name: t('alerts'),
      href: '/alerts',
      icon: AlertTriangle,
      current: location.pathname === '/alerts',
      color: 'from-red-500 to-pink-500',
    },
    {
      name: t('predictions'),
      href: '/predictions',
      icon: Brain,
      current: location.pathname === '/predictions',
      color: 'from-violet-500 to-purple-500',
    },
    {
      name: 'Resources',
      href: '/resources',
      icon: Package,
      current: location.pathname === '/resources',
      color: 'from-amber-500 to-orange-500',
    },
    {
      name: 'Mobile App',
      href: '/mobile',
      icon: Smartphone,
      current: location.pathname === '/mobile',
      color: 'from-pink-500 to-rose-500',
    },
  ];

  return (
    <div className="flex flex-col w-72 bg-white/60 backdrop-blur-xl border-r border-gray-200/50 animate-fade-in-left shadow-lg">
      <div className="p-6 border-b border-gray-200/50">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-500 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 relative overflow-hidden group">
            <Activity className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <h2 className="text-lg font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Health Dashboard</h2>
          <p className="text-xs text-gray-600 mt-1 font-medium">Smart Monitoring System</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        {navigation.map((item, index) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'group flex items-center px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-300 relative overflow-hidden',
                item.current
                  ? `bg-gradient-to-r ${item.color} text-white shadow-lg hover:shadow-xl transform scale-[1.02]`
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100/70 hover:shadow-md'
              )}
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              {item.current && (
                <>
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full"></div>
                </>
              )}

              <Icon
                className={cn(
                  'mr-3 h-5 w-5 flex-shrink-0 transition-all duration-300',
                  item.current
                    ? 'text-white'
                    : 'text-gray-500 group-hover:text-gray-700 group-hover:scale-110'
                )}
              />
              <span className="relative z-10 flex-1">{item.name}</span>

              {item.current && (
                <ChevronRight className="w-4 h-4 text-white animate-pulse" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200/50">
        <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-4 text-center border border-teal-200/50 hover:shadow-lg transition-all duration-300">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg animate-pulse">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-bold text-gray-900 mb-1 text-sm">System Status</h3>
          <p className="text-xs text-emerald-700 font-semibold mb-3">All Systems Online</p>
          <div className="flex justify-center space-x-1.5 mb-3">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600">Uptime</span>
            <span className="font-bold text-gray-900">99.9%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
