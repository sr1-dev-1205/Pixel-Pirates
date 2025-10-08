import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { LanguageProvider } from './contexts/LanguageContext';
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

function App() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-gray-50/50 via-white to-teal-50/30 flex flex-col relative overflow-hidden">
          <div className="particles-bg">
            <div className="particle" style={{ left: '10%', animationDelay: '0s', width: '4px', height: '4px' }}></div>
            <div className="particle" style={{ left: '20%', animationDelay: '2s', width: '6px', height: '6px' }}></div>
            <div className="particle" style={{ left: '30%', animationDelay: '4s', width: '3px', height: '3px' }}></div>
            <div className="particle" style={{ left: '40%', animationDelay: '6s', width: '5px', height: '5px' }}></div>
            <div className="particle" style={{ left: '50%', animationDelay: '8s', width: '4px', height: '4px' }}></div>
            <div className="particle" style={{ left: '60%', animationDelay: '10s', width: '7px', height: '7px' }}></div>
            <div className="particle" style={{ left: '70%', animationDelay: '12s', width: '3px', height: '3px' }}></div>
            <div className="particle" style={{ left: '80%', animationDelay: '14s', width: '5px', height: '5px' }}></div>
            <div className="particle" style={{ left: '90%', animationDelay: '16s', width: '4px', height: '4px' }}></div>
          </div>

          <Header />
          <div className="flex-1 flex overflow-hidden">
            <div className="hidden lg:block">
              <Sidebar />
            </div>

            {sidebarOpen && (
              <div className="lg:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setSidebarOpen(false)}>
                <div className="absolute left-0 top-0 bottom-0" onClick={(e) => e.stopPropagation()}>
                  <Sidebar />
                </div>
              </div>
            )}

            <main className="flex-1 overflow-hidden relative">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/villages" element={<Villages />} />
                <Route path="/health-reports" element={<HealthReports />} />
                <Route path="/water-quality" element={<WaterQuality />} />
                <Route path="/alerts" element={<Alerts />} />
                <Route path="/predictions" element={<Predictions />} />
                <Route path="/resources" element={<ResourcePlanning />} />
                <Route path="/mobile" element={<MobileInterface />} />
                <Route path="*" element={<Dashboard />} />
              </Routes>
            </main>
          </div>
          <Toaster
            position="top-right"
            toastOptions={{
              className: 'bg-white rounded-2xl shadow-2xl border border-gray-200',
              duration: 4000,
            }}
          />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;