import React from 'react';
import { Globe, Bell, User, Settings, LogOut, UserCircle, Shield } from 'lucide-react';
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
    // Add logout functionality here
    console.log('Logging out...');
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">HM</span>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                Aarogya Jal
              </h1>
              <p className="text-sm text-gray-500">Northeast India</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Language Toggle */}
          <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                language === 'en'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('as')}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                language === 'as'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              অসমীয়া
            </button>
          </div>

          <div className="relative">
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-2 relative"
              onClick={() => setShowNotifications(!showNotifications)}
            >
            <Bell className="w-5 h-5" />
              {notifications.filter(n => n.unread).length > 0 && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
                  {notifications.filter(n => n.unread).length}
                </span>
              )}
            <span className="sr-only">Notifications</span>
          </Button>
            
            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-50">
                <div className="p-4 border-b">
                  <h3 className="font-semibold text-gray-900">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
                        notification.unread ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          notification.type === 'alert' ? 'bg-red-500' :
                          notification.type === 'success' ? 'bg-green-500' :
                          'bg-yellow-500'
                        }`}></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {notification.title}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t">
                  <Button variant="ghost" size="sm" className="w-full text-center">
                    View All Notifications
                  </Button>
                </div>
              </div>
            )}
          </div>

          <Button 
            variant="ghost" 
            size="sm" 
            className="p-2" 
            title="Settings"
            onClick={() => setShowSettings(true)}
          >
            <Settings className="w-5 h-5" />
            <span className="sr-only">{t('settings')}</span>
          </Button>

          <div className="relative flex items-center space-x-2">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center space-x-2 hover:bg-gray-100 rounded-lg p-2 transition-colors"
            >
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-gray-600" />
            </div>
            <div className="text-sm">
              <p className="font-medium text-gray-900">Dr. Anita Sharma</p>
              <p className="text-gray-500">District Health Officer</p>
            </div>
            </button>

            {/* Profile Dropdown */}
            {showProfileMenu && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border z-50">
                <div className="p-4 border-b">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Dr. Anita Sharma</p>
                      <p className="text-sm text-gray-500">anita.sharma@health.gov.in</p>
                      <div className="flex items-center space-x-1 mt-1">
                        <Shield className="w-3 h-3 text-green-600" />
                        <span className="text-xs text-green-600">District Health Officer</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-2">
                  <button className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-gray-100 rounded-lg transition-colors">
                    <UserCircle className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">Profile Settings</span>
                  </button>
                  <button 
                    onClick={() => {
                      setShowSettings(true);
                      setShowProfileMenu(false);
                    }}
                    className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Settings className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">Account Settings</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-gray-100 rounded-lg transition-colors">
                    <Bell className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">Notification Preferences</span>
                  </button>
                </div>
                
                <div className="p-2 border-t">
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-red-50 rounded-lg transition-colors text-red-600"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm">Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Settings Modal */}
        <SettingsModal 
          isOpen={showSettings} 
          onClose={() => setShowSettings(false)} 
        />
      </div>
    </header>
  );
};

export default Header;