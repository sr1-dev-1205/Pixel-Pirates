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
  X
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useLayout } from '../../contexts/LayoutContext';
import { cn } from '../../lib/utils';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { t } = useLanguage();
  const { sidebarOpen, closeSidebar } = useLayout();

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
    <>
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-800 bg-opacity-50 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar Container */}
      <div className={cn(
        "bg-gray-50 border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out",
        // Desktop styles
        "md:w-64 md:static md:translate-x-0",
        // Mobile styles: fixed, full height, z-index above backdrop
        "fixed inset-y-0 left-0 z-50 w-64 transform",
        sidebarOpen ? "translate-x-0 shadow-xl" : "-translate-x-full"
      )}>
        {/* Mobile Header with Close Button */}
        <div className="flex items-center justify-between p-4 md:hidden border-b">
          <span className="font-semibold text-gray-700">Menu</span>
          <button onClick={closeSidebar}>
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => closeSidebar()} // Close sidebar on selection (mobile)
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
    </>
  );
};

export default Sidebar;