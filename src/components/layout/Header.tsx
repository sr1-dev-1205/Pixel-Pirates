{ Globe, Bell, a ddac:neiacx f-pac" , xt t-bd a Y  -a3bgw ims    Noci h(i(   P -uaitr: iomrt
  o(
"-o(iah-aa<y,l n bl-2iLi>  < =to --mt,se R(t hu l toxnio  User, Settings, LogOut, CircleUser as UserCircle, Shield, Activity, Zap } from 'lucide-react';
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
    <header className="bg-white/95 backdrop-blur-md border-b border-gray-200/50 px-6 py-4 sticky top-0 z-40 animate-slide-in-top shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 animate-fade-in-left">
          <div className="flex items-center space-x-3">
            <div className="relative w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg hover-scale group">
              <Activity className="w-5 h-5 text-white animate-pulse" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-bounce"></div>
            <div>
              <h1 className="text-2xl font-bold gradient-text-hero">
                Aarogya Jal
              </h1>
              <p className="text-sm text-secondary-500 font-medium">Smart Health Monitoring • Northeast India</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Language Toggle */}
          <div className="flex items-center space-x-2 glass rounded-xl p-1 animate-fade-in-right animate-delay-200">
            <button
              onClick={() => setLanguage('en')}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ${
                language === 'en'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                  : 'text-secondary-600 hover:text-secondary-900 hover:bg-white/50'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('as')}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ${
                language === 'as'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                  : 'text-secondary-600 hover:text-secondary-900 hover:bg-white/50'
              }`}
            >
              অসমীয়া
            </button>
          </div>

          <div className="relative">
            <Button 
              variant="ghost"
              size="sm" 
              className="p-3 relative hover-glow rounded-xl glass animate-fade-in-right animate-delay-300"
              onClick={() => setShowNotifications(!showNotifications)}
            >
            <Bell className="w-5 h-5 icon-pulse" />
              {notifications.filter(n => n.unread).length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full text-xs flex items-center justify-center text-white font-bold animate-bounce shadow-lg">
                  {notifications.filter(n => n.unread).length}
                </span>
              )}
            <span className="sr-only">Notifications</span>
          </Button>
            
            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-3 w-96 glass rounded-2xl shadow-2xl border border-white/20 z-50 animate-scale-in">
                <div className="p-6 border-b border-white/10">
                  <h3 className="font-bold text-lg gradient-text">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto custom-scrollbar">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-white/5 hover:bg-white/10 cursor-pointer transition-all duration-300 ${
                        notification.unread ? 'bg-gradient-to-r from-blue-50/50 to-purple-50/50' : ''
                      } hover-lift`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-3 h-3 rounded-full mt-2 animate-pulse shadow-lg ${
                          notification.type === 'alert' ? 'bg-gradient-to-r from-red-500 to-pink-500' :
                          notification.type === 'success' ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                          'bg-gradient-to-r from-yellow-500 to-orange-500'
                        }`}></div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-secondary-900">
                            {notification.title}
                          </p>
                          <p className="text-sm text-secondary-600 mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-secondary-500 mt-2 font-medium">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-white/10">
                  <Button variant="ghost" size="sm" className="w-full text-center hover-glow rounded-xl">
                    View All Notifications
                  </Button>
                </div>
              </div>
            )}
          </div>

          <Button 
            variant="ghost" 
            size="sm" 
            className="p-3 hover-glow rounded-xl glass animate-fade-in-right animate-delay-400" 
            title="Settings"
            onClick={() => setShowSettings(true)}
          >
            <Settings className="w-5 h-5 icon-float" />
            <span className="sr-only">{t('settings')}</span>
          </Button>

          <div className="relative flex items-center space-x-2">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center space-x-3 hover:bg-white/10 rounded-xl p-3 transition-all duration-300 hover-glow animate-fade-in-right animate-delay-500"
            >
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg animate-float">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="text-sm">
              <p className="font-bold text-secondary-900">Dr. Anita Sharma</p>
              <p className="text-secondary-500 font-medium">District Health Officer</p>
            </div>
            </button>

            {/* Profile Dropdown */}
            {showProfileMenu && (
              <div className="absolute right-0 top-full mt-3 w-72 glass rounded-2xl shadow-2xl border border-white/20 z-50 animate-scale-in">
                <div className="p-6 border-b border-white/10">
                  <div className="flex items-center space-x-3">
                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg animate-float">
                      <User className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-secondary-900">Dr. Anita Sharma</p>
                      <p className="text-sm text-secondary-500">anita.sharma@health.gov.in</p>
                      <div className="flex items-center space-x-1 mt-1">
                        <Shield className="w-3 h-3 text-emerald-500 animate-pulse" />
                        <span className="text-xs text-emerald-600 font-semibold">District Health Officer</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-2">
                  <button className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-white/10 rounded-xl transition-all duration-300 hover-lift">
                    <UserCircle className="w-5 h-5 text-secondary-500" />
                    <span className="text-sm text-secondary-700 font-medium">Profile Settings</span>
                  </button>
                  <button 
                    onClick={() => {
                      setShowSettings(true);
                      setShowProfileMenu(false);
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-white/10 rounded-xl transition-all duration-300 hover-lift"
                  >
                    <Settings className="w-5 h-5 text-secondary-500" />
                    <span className="text-sm text-secondary-700 font-medium">Account Settings</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-white/10 rounded-xl transition-all duration-300 hover-lift">
                    <Bell className="w-5 h-5 text-secondary-500" />
                    <span className="text-sm text-secondary-700 font-medium">Notification Preferences</span>
                  </button>
                </div>
                
                <div className="p-2 border-t border-white/10">
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-red-50/50 rounded-xl transition-all duration-300 text-red-600 hover-lift"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="text-sm font-medium">Sign Out</span>
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