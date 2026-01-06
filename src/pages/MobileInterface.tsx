import React, { useState } from 'react';
import { Smartphone, Wifi, WifiOff, Upload, Camera, MessageCircle, Bell } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useMockData } from '../hooks/useMockData';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import PageHeader from '../components/layout/PageHeader';

const MobileInterface: React.FC = () => {
  const { language } = useLanguage();
  const { villages, addHealthReport } = useMockData();
  const [isOnline, setIsOnline] = useState(true);
  const [pendingReports, setPendingReports] = useState(2);

  // Development status message
  const developmentMessage = {
    en: "🚧 Our mobile app is currently under development. The interface shown below is a preview of the upcoming features. Stay tuned for the official release!",
    as: "🚧 আমাৰ মোবাইল এপ্প বৰ্তমান উন্নয়নাধীন। তলত দেখুওৱা ইন্টাৰফেচটো আগন্তুক বৈশিষ্ট্যসমূহৰ এক পূৰ্বদৰ্শন। আনুষ্ঠানিক মুক্তিৰ বাবে অপেক্ষা কৰক!"
  };

  const handleSubmitReport = () => {
    const mockReport = {
      village_id: villages[0]?.id || '1',
      reporter_id: 'asha_mobile_user',
      report_date: new Date().toISOString().split('T')[0],
      symptoms: {
        diarrhea: Math.floor(Math.random() * 10),
        fever: Math.floor(Math.random() * 15),
        vomiting: Math.floor(Math.random() * 8),
        dehydration: Math.floor(Math.random() * 5),
      },
      total_cases: Math.floor(Math.random() * 30) + 5,
      notes: 'Submitted via mobile app',
    };

    addHealthReport(mockReport);
    if (!isOnline) {
      setPendingReports(prev => prev + 1);
    }
  };

  const syncPendingReports = () => {
    setPendingReports(0);
    // Simulate sync success
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6">
        <PageHeader
          title="Mobile App Interface"
          subtitle="ASHA Worker mobile app simulation for field data collection"
        />

        {/* Development Status Banner */}
        <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="text-2xl">🚧</div>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-800 font-medium">
                Development Status
              </p>
              <p className="text-sm text-yellow-700 mt-1">
                {language === 'as' ? developmentMessage.as : developmentMessage.en}
              </p>
            </div>
          </div>
        </div>

        {/* Mobile App Mockup */}
        <div className="max-w-sm mx-auto">
          <Card className="bg-gray-900 p-4 rounded-3xl shadow-2xl">
            <div className="bg-white rounded-2xl overflow-hidden">
              {/* Status Bar */}
              <div className="bg-gray-100 px-4 py-2 flex justify-between items-center text-xs">
                <div className="flex items-center space-x-1">
                  <span>9:41</span>
                </div>
                <div className="flex items-center space-x-1">
                  {isOnline ? (
                    <Wifi className="w-3 h-3 text-green-600" />
                  ) : (
                    <WifiOff className="w-3 h-3 text-red-600" />
                  )}
                  <div className="w-6 h-3 bg-green-500 rounded-sm"></div>
                </div>
              </div>

              {/* App Header */}
              <div className="bg-blue-600 text-white p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-sm">HM</span>
                    </div>
                    <div>
                      <h2 className="font-semibold">Health Monitor</h2>
                      <p className="text-xs opacity-90">ASHA Worker App</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-white p-1"
                      onClick={() => setIsOnline(!isOnline)}
                    >
                      {isOnline ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
                    </Button>
                    <div className="relative">
                      <Bell className="w-4 h-4" />
                      {pendingReports > 0 && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
                          {pendingReports}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Connection Status */}
              <div className={`px-4 py-2 text-center text-sm ${isOnline ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'
                }`}>
                {isOnline ? (
                  <span>✓ Connected - Data syncing automatically</span>
                ) : (
                  <span>⚠ Offline - {pendingReports} reports pending sync</span>
                )}
              </div>

              {/* Main Content */}
              <div className="p-4 space-y-4">
                {/* Quick Actions */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={handleSubmitReport}
                      className="p-3 bg-blue-50 rounded-lg text-center hover:bg-blue-100 transition-colors"
                    >
                      <div className="text-2xl mb-1">📋</div>
                      <div className="text-xs font-medium text-blue-700">Health Report</div>
                    </button>
                    <button className="p-3 bg-green-50 rounded-lg text-center hover:bg-green-100 transition-colors">
                      <div className="text-2xl mb-1">💧</div>
                      <div className="text-xs font-medium text-green-700">Water Test</div>
                    </button>
                    <button className="p-3 bg-purple-50 rounded-lg text-center hover:bg-purple-100 transition-colors">
                      <Camera className="w-6 h-6 mx-auto mb-1 text-purple-600" />
                      <div className="text-xs font-medium text-purple-700">Photo Report</div>
                    </button>
                    <button className="p-3 bg-orange-50 rounded-lg text-center hover:bg-orange-100 transition-colors">
                      <MessageCircle className="w-6 h-6 mx-auto mb-1 text-orange-600" />
                      <div className="text-xs font-medium text-orange-700">AI Assistant</div>
                    </button>
                  </div>
                </div>

                {/* Language Toggle */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Language / ভাষা</h3>
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <button
                      className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${language === 'en'
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600'
                        }`}
                    >
                      English
                    </button>
                    <button
                      className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${language === 'as'
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600'
                        }`}
                    >
                      অসমীয়া
                    </button>
                  </div>
                </div>

                {/* Sync Status */}
                {!isOnline && pendingReports > 0 && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-yellow-800">
                          {pendingReports} reports pending
                        </p>
                        <p className="text-xs text-yellow-600">
                          Will sync when connection is restored
                        </p>
                      </div>
                      <Button
                        size="sm"
                        onClick={syncPendingReports}
                        disabled={!isOnline}
                        className="text-xs"
                      >
                        <Upload className="w-3 h-3 mr-1" />
                        Sync
                      </Button>
                    </div>
                  </div>
                )}

                {/* Recent Activity */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Recent Activity</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-xs font-medium">Health report submitted</p>
                        <p className="text-xs text-gray-500">2 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-xs font-medium">Water test completed</p>
                        <p className="text-xs text-gray-500">1 hour ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-xs font-medium">Alert received</p>
                        <p className="text-xs text-gray-500">3 hours ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Mobile Features Description */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <WifiOff className="w-5 h-5 text-orange-600" />
                <span>Offline-First Design</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Data can be collected without internet connection. Reports are stored locally
                and automatically synced when connectivity is restored.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageCircle className="w-5 h-5 text-blue-600" />
                <span>AI Chat Assistant</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Built-in AI assistant helps ASHA workers with health guidance,
                symptom assessment, and community education messaging.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Smartphone className="w-5 h-5 text-green-600" />
                <span>Simple Interface</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Icon-based navigation designed for users with varying literacy levels.
                Large buttons and clear visual indicators for easy use.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MobileInterface;