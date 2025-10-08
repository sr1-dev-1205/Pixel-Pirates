import React from 'react';
import { Globe, Bell, Settings, User, LogOut, CircleUser as UserCircle, Shield, Activity, Zap, Search } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import Button from '../ui/Button';
import SettingsModal from '../settings/SettingsModal';

const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [showProfileMenu, setShowProfileMenu] = React.useState(false);
  const [showSettings, setShowSettings] = React.useState(false);

  const notifications = [
    {
      id: 1,
      title: 'High Risk Alert',
      message: 'Majuli village shows increased outbreak probability',
      time: '5 minutes ago',
      type: 'alert',
      unread: true,
    },
    {
      id: 2,
      title: 'Resource Deployment',
      message: 'ORS packets successfully delivered to Kokrajhar',
      time: '1 hour ago',
      type: 'success',
      unread: true,
    },
    {
      id: 3,
      title: 'Water Quality Report',
      message: 'New contamination detected in Dibrugarh water source',
      time: '3 hours ago',
      type: 'warning',
      unread: false,
    },
  ];

  const handleLogout = () => {
    console.log('Logging out...');
  };

  return (
    <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 px-6 py-3 sticky top-0 z-50 animate-slide-in-top shadow-sm">
      <div className="flex items-center justify-between max-w-screen-2xl mx-auto">
        <div className="flex items-center space-x-6 animate-fade-in-left">
          <div className="flex items-center space-x-3">
            <div className="relative w-11 h-11 bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group">
              <Activity className="w-6 h-6 text-white group-hover:rotate-12 transition-transform duration-300" />
              <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full animate-pulse shadow-lg"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
                Aarogya Jal
              </h1>
              <p className="text-xs text-gray-600 font-medium">Smart Health & Water Monitoring</p>
            </div>
          </div>
        </div>

        <div className="flex-1 max-w-md mx-8 hidden lg:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search villages, reports, alerts..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100/50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
            />
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="hidden md:flex items-center space-x-1.5 bg-gray-100/70 rounded-xl p-1 animate-fade-in-right animate-delay-100">
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-300 ${
                language === 'en'
                  ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-md transform scale-105'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('as')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-300 ${
                language === 'as'
                  ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-md transform scale-105'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
              }`}
            >
              অসমীয়া
            </button>
          </div>

          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              className="p-2.5 relative rounded-xl bg-gray-100/70 hover:bg-gray-200/70 transition-all duration-300 animate-fade-in-right animate-delay-200"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="w-5 h-5 text-gray-700" />
              {notifications.filter(n => n.unread).length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full text-xs flex items-center justify-center text-white font-bold animate-pulse shadow-lg">
                  {notifications.filter(n => n.unread).length}
                </span>
              )}
              <span className="sr-only">Notifications</span>
            </Button>

            {showNotifications && (
              <div className="absolute right-0 mt-3 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 animate-scale-in overflow-hidden">
                <div className="p-4 bg-gradient-to-r from-teal-50 to-cyan-50 border-b border-gray-200">
                  <h3 className="font-bold text-base text-gray-900">Notifications</h3>
                  <p className="text-xs text-gray-600 mt-0.5">{notifications.filter(n => n.unread).length} unread</p>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-all duration-200 ${
                        notification.unread ? 'bg-teal-50/30' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          notification.type === 'alert' ? 'bg-red-500 animate-pulse' :
                          notification.type === 'success' ? 'bg-emerald-500' :
                          'bg-amber-500'
                        }`}></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">
                            {notification.title}
                          </p>
                          <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-1.5 font-medium">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 bg-gray-50 border-t border-gray-200">
                  <Button variant="ghost" size="sm" className="w-full text-center text-sm font-medium text-teal-600 hover:text-teal-700 hover:bg-teal-50 rounded-lg py-2">
                    View All Notifications
                  </Button>
                </div>
              </div>
            )}
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="p-2.5 rounded-xl bg-gray-100/70 hover:bg-gray-200/70 transition-all duration-300 animate-fade-in-right animate-delay-300"
            title="Settings"
            onClick={() => setShowSettings(true)}
          >
            <Settings className="w-5 h-5 text-gray-700" />
            <span className="sr-only">{t('settings')}</span>
          </Button>

          <div className="relative flex items-center space-x-2">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center space-x-2.5 hover:bg-gray-100/70 rounded-xl px-3 py-2 transition-all duration-300 animate-fade-in-right animate-delay-400"
            >
              <div className="w-9 h-9 bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-md">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="text-left hidden xl:block">
                <p className="text-sm font-bold text-gray-900">Dr. Anita Sharma</p>
                <p className="text-xs text-gray-600">Health Officer</p>
              </div>
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 top-full mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 animate-scale-in overflow-hidden">
                <div className="p-5 bg-gradient-to-r from-teal-50 to-cyan-50 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <User className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-900">Dr. Anita Sharma</p>
                      <p className="text-sm text-gray-600 truncate">anita.sharma@health.gov.in</p>
                      <div className="flex items-center space-x-1 mt-1">
                        <Shield className="w-3 h-3 text-emerald-600" />
                        <span className="text-xs text-emerald-700 font-semibold">District Health Officer</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-2">
                  <button className="w-full flex items-center space-x-3 px-4 py-2.5 text-left hover:bg-gray-50 rounded-xl transition-all duration-200">
                    <UserCircle className="w-5 h-5 text-gray-500" />
                    <span className="text-sm text-gray-700 font-medium">Profile Settings</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowSettings(true);
                      setShowProfileMenu(false);
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-2.5 text-left hover:bg-gray-50 rounded-xl transition-all duration-200"
                  >
                    <Settings className="w-5 h-5 text-gray-500" />
                    <span className="text-sm text-gray-700 font-medium">Account Settings</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-4 py-2.5 text-left hover:bg-gray-50 rounded-xl transition-all duration-200">
                    <Bell className="w-5 h-5 text-gray-500" />
                    <span className="text-sm text-gray-700 font-medium">Notifications</span>
                  </button>
                </div>

                <div className="p-2 border-t border-gray-200 bg-gray-50">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-4 py-2.5 text-left hover:bg-red-50 rounded-xl transition-all duration-200 text-red-600"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="text-sm font-medium">Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <SettingsModal
          isOpen={showSettings}
          onClose={() => setShowSettings(false)}
        />
      </div>
    </header>
  );
};

export default Header;
