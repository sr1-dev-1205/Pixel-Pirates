import React, { useState } from 'react';
import { User, Bell, Shield, Database, Download, Save, Upload, Trash2 } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useLanguage } from '../contexts/LanguageContext';
import PageHeader from '../components/layout/PageHeader';
import toast from 'react-hot-toast';
import { useMockData } from '../hooks/useMockData';

const Settings: React.FC = () => {
    const { language, setLanguage, t } = useLanguage();
    const { exportData, importData, clearAllData } = useMockData();
    const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'security' | 'system'>('profile');
    const [settings, setSettings] = useState({
        emailNotifications: true,
        smsNotifications: false,
        pushNotifications: true,
        alertSounds: true,
        darkMode: false,
        autoSync: true,
        dataRetention: '1year',
    });
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleSettingChange = (key: string, value: boolean | string) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    const handleSave = () => {
        toast.success('Settings saved successfully');
    };

    const handleExportData = () => {
        exportData();
    };

    const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            importData(file);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const handleClearData = () => {
        clearAllData();
    };

    return (
        <div className="flex-1 overflow-auto">
            <div className="p-4 md:p-6 max-w-7xl mx-auto w-full">
                <PageHeader
                    title={t('settings')}
                    subtitle="Manage your account, preferences, and system configuration"
                />

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Settings Navigation */}
                    <Card className="lg:col-span-1 h-fit">
                        <CardContent className="p-4">
                            <nav className="space-y-1">
                                {[
                                    { id: 'profile', name: t('profile'), icon: User },
                                    { id: 'notifications', name: t('notifications'), icon: Bell },
                                    { id: 'security', name: 'Security', icon: Shield },
                                    { id: 'system', name: 'System', icon: Database },
                                ].map((tab) => {
                                    const Icon = tab.icon;
                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id as any)}
                                            className={`w-full flex items-center space-x-3 px-3 py-2 text-left rounded-lg transition-colors font-medium ${activeTab === tab.id
                                                    ? 'bg-blue-50 text-blue-700'
                                                    : 'text-gray-600 hover:bg-gray-50'
                                                }`}
                                        >
                                            <Icon className="w-5 h-5" />
                                            <span>{tab.name}</span>
                                        </button>
                                    );
                                })}
                            </nav>
                        </CardContent>
                    </Card>

                    {/* Settings Content */}
                    <Card className="lg:col-span-3">
                        <CardContent className="p-6">
                            {activeTab === 'profile' && (
                                <div className="space-y-6 animate-in fade-in duration-300">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-4">Profile Settings</h3>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Full Name
                                                </label>
                                                <input
                                                    type="text"
                                                    defaultValue="Dr. Anita Sharma"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Email Address
                                                </label>
                                                <input
                                                    type="email"
                                                    defaultValue="anita.sharma@health.gov.in"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Phone Number
                                                </label>
                                                <input
                                                    type="tel"
                                                    defaultValue="+91 98765 43210"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Department
                                                </label>
                                                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                                    <option>District Health Department</option>
                                                    <option>State Health Department</option>
                                                    <option>Public Health Laboratory</option>
                                                </select>
                                            </div>

                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Preferred Language
                                                </label>
                                                <div className="flex flex-col sm:flex-row gap-4 p-4 bg-gray-50 rounded-lg">
                                                    <label className="flex items-center cursor-pointer">
                                                        <input
                                                            type="radio"
                                                            name="language"
                                                            checked={language === 'en'}
                                                            onChange={() => setLanguage('en')}
                                                            className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                                        />
                                                        <span className="ml-2 text-gray-900 font-medium">English</span>
                                                    </label>
                                                    <label className="flex items-center cursor-pointer">
                                                        <input
                                                            type="radio"
                                                            name="language"
                                                            checked={language === 'as'}
                                                            onChange={() => setLanguage('as')}
                                                            className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                                        />
                                                        <span className="ml-2 text-gray-900 font-medium">অসমীয়া (Assamese)</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'notifications' && (
                                <div className="space-y-6 animate-in fade-in duration-300">
                                    <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-4">Notification Preferences</h3>

                                    <div className="space-y-4 max-w-2xl">
                                        <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                                            <div>
                                                <p className="font-medium text-gray-900">Email Notifications</p>
                                                <p className="text-sm text-gray-600">Receive alerts and updates via email</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={settings.emailNotifications}
                                                    onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                            </label>
                                        </div>

                                        <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                                            <div>
                                                <p className="font-medium text-gray-900">SMS Notifications</p>
                                                <p className="text-sm text-gray-600">Receive critical alerts via SMS</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={settings.smsNotifications}
                                                    onChange={(e) => handleSettingChange('smsNotifications', e.target.checked)}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                            </label>
                                        </div>

                                        <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                                            <div>
                                                <p className="font-medium text-gray-900">Push Notifications</p>
                                                <p className="text-sm text-gray-600">Browser notifications for real-time alerts</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={settings.pushNotifications}
                                                    onChange={(e) => handleSettingChange('pushNotifications', e.target.checked)}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'security' && (
                                <div className="space-y-6 animate-in fade-in duration-300">
                                    <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-4">Security Settings</h3>

                                    <div className="space-y-6 max-w-2xl">
                                        <div className="bg-white p-4 border rounded-lg">
                                            <h4 className="font-medium text-gray-900 mb-4">Change Password</h4>
                                            <div className="space-y-4">
                                                <input
                                                    type="password"
                                                    placeholder="Current Password"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                                <input
                                                    type="password"
                                                    placeholder="New Password"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                                <input
                                                    type="password"
                                                    placeholder="Confirm New Password"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                                <Button size="sm">Update Password</Button>
                                            </div>
                                        </div>

                                        <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
                                            <div>
                                                <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
                                                <p className="text-sm text-gray-600">Add an extra layer of security</p>
                                            </div>
                                            <Button variant="outline" size="sm">Enable 2FA</Button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'system' && (
                                <div className="space-y-6 animate-in fade-in duration-300">
                                    <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-4">System Settings</h3>

                                    <div className="space-y-4 max-w-2xl">
                                        <div className="flex items-center justify-between p-4 border rounded-lg">
                                            <div>
                                                <p className="font-medium text-gray-900">Auto-sync Data</p>
                                                <p className="text-sm text-gray-600">Sync data every 5 minutes when online</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={settings.autoSync}
                                                    onChange={(e) => handleSettingChange('autoSync', e.target.checked)}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                            </label>
                                        </div>

                                        <div className="p-4 border rounded-lg">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Data Retention Period
                                            </label>
                                            <select
                                                value={settings.dataRetention}
                                                onChange={(e) => handleSettingChange('dataRetention', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="6months">6 Months</option>
                                                <option value="1year">1 Year</option>
                                                <option value="2years">2 Years</option>
                                                <option value="5years">5 Years</option>
                                            </select>
                                        </div>

                                        <div className="p-4 bg-gray-50 rounded-lg">
                                            <h4 className="font-medium text-gray-900 mb-2">Data Management</h4>
                                            <p className="text-sm text-gray-600 mb-4">
                                                Export, import, or clear your data.
                                            </p>
                                            <div className="flex flex-col sm:flex-row gap-3">
                                                <Button 
                                                    variant="outline" 
                                                    size="sm"
                                                    onClick={handleExportData}
                                                >
                                                    <Download className="w-4 h-4 mr-2" />
                                                    Export Data
                                                </Button>
                                                <Button 
                                                    variant="outline" 
                                                    size="sm"
                                                    onClick={() => fileInputRef.current?.click()}
                                                >
                                                    <Upload className="w-4 h-4 mr-2" />
                                                    Import Data
                                                </Button>
                                                <input
                                                    ref={fileInputRef}
                                                    type="file"
                                                    accept=".json"
                                                    onChange={handleImportData}
                                                    className="hidden"
                                                />
                                            </div>
                                            <div className="mt-4 pt-4 border-t">
                                                <Button 
                                                    variant="danger" 
                                                    size="sm"
                                                    onClick={handleClearData}
                                                >
                                                    <Trash2 className="w-4 h-4 mr-2" />
                                                    Clear All Data
                                                </Button>
                                                <p className="text-xs text-red-600 mt-2">
                                                    Warning: This will delete all stored data permanently.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Action Bar */}
                            <div className="mt-8 pt-6 border-t flex justify-end">
                                <Button onClick={handleSave} className="w-full md:w-auto">
                                    <Save className="w-4 h-4 mr-2" />
                                    Save Changes
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Settings;
