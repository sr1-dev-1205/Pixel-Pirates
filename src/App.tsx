import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { LanguageProvider } from './contexts/LanguageContext';
import { LayoutProvider } from './contexts/LayoutContext';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './pages/Dashboard';
import Villages from './pages/Villages';
import HealthReports from './pages/HealthReports';
import WaterQuality from './pages/WaterQuality';
import Alerts from './pages/Alerts';
import Predictions from './pages/Predictions';
import ResourcePlanning from './pages/ResourcePlanning';
import MobileInterface from './pages/MobileInterface';
import Settings from './pages/Settings';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <LayoutProvider>
          <div className="min-h-screen bg-gray-50 flex flex-col overflow-x-hidden">
            <Header />
            <div className="flex-1 flex relative">
              <Sidebar />
              <main className="flex-1 min-w-0 w-full">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/villages" element={<Villages />} />
                  <Route path="/health-reports" element={<HealthReports />} />
                  <Route path="/water-quality" element={<WaterQuality />} />
                  <Route path="/alerts" element={<Alerts />} />
                  <Route path="/predictions" element={<Predictions />} />
                  <Route path="/resources" element={<ResourcePlanning />} />
                  <Route path="/mobile" element={<MobileInterface />} />
                  <Route path="/settings" element={<Settings />} />
                  {/* Add more routes as needed */}
                  <Route path="*" element={<Dashboard />} />
                </Routes>
              </main>
            </div>
            <Toaster position="top-right" />
          </div>
        </LayoutProvider>
      </Router>
    </LanguageProvider>
  );
}

export default App;