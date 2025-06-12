import React, { useState, useEffect } from 'react';
import { BookOpen, Brain, Home, Code, AlertCircle, Loader2, Server } from 'lucide-react';
import Dashboard from './components/Dashboard';
import UnitsSection from './components/UnitsSection';
import Flashcards from './components/Flashcards';
import PracticeTools from './components/PracticeTools';
import UserHistory from './components/UserHistory';
import Header from './components/Header';
import AuthModal from './components/AuthModal';
import { AuthProvider, useAuth } from './contexts/AuthContext';

function AppContent() {
  const [currentSection, setCurrentSection] = useState('dashboard');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user, logout, isLoading, error } = useAuth();

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'dashboard':
        return <Dashboard onSectionChange={setCurrentSection} />;
      case 'units':
        return <UnitsSection />;
      case 'practice-tools':
        return <PracticeTools />;
      case 'flashcards':
        return <Flashcards />;
      case 'history':
        return <UserHistory />;
      default:
        return <Dashboard onSectionChange={setCurrentSection} />;
    }
  };

  // Show loading screen while initializing
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
              <Server className="h-10 w-10 text-white" />
            </div>
            <Loader2 className="h-8 w-8 text-blue-600 animate-spin absolute -top-2 -right-2" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Connecting to Server</h2>
          <p className="text-gray-600">Initializing your APCSP Practice Platform...</p>
        </div>
      </div>
    );
  }

  // Show server error screen if server is not available
  if (error && error.includes('Unable to connect to server')) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50 flex items-center justify-center p-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-red-200">
            <div className="mb-6">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="h-10 w-10 text-red-600" />
              </div>
              <h1 className="text-3xl font-bold text-red-600 mb-2">Server Connection Required</h1>
              <p className="text-lg text-gray-700">
                Unable to connect to the backend server. The server must be running to use this application.
              </p>
            </div>

            <div className="bg-red-50 rounded-lg p-6 mb-6 text-left">
              <h3 className="font-semibold text-red-800 mb-3">🚀 Server Setup Instructions:</h3>
              <ol className="space-y-2 text-red-700">
                <li className="flex items-start space-x-2">
                  <span className="font-bold text-red-600">1.</span>
                  <span>Create a <code className="bg-red-100 px-2 py-1 rounded text-sm">.env</code> file in the root directory:</span>
                </li>
              </ol>
              <div className="mt-3 bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-sm">
                DATABASE_URL=your_neon_connection_string_here<br/>
                JWT_SECRET=your_secure_jwt_secret_here<br/>
                FRONTEND_URL=http://localhost:5173
              </div>
              <ol start={2} className="space-y-2 text-red-700 mt-3">
                <li className="flex items-start space-x-2">
                  <span className="font-bold text-red-600">2.</span>
                  <span>Install dependencies: <code className="bg-red-100 px-2 py-1 rounded text-sm">npm install</code></span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="font-bold text-red-600">3.</span>
                  <span>Start the backend server: <code className="bg-red-100 px-2 py-1 rounded text-sm">npm run dev:server</code></span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="font-bold text-red-600">4.</span>
                  <span>In another terminal, start the frontend: <code className="bg-red-100 px-2 py-1 rounded text-sm">npm run dev</code></span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="font-bold text-red-600">5.</span>
                  <span>Or run both together: <code className="bg-red-100 px-2 py-1 rounded text-sm">npm run dev:full</code></span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header 
        currentSection={currentSection} 
        onSectionChange={setCurrentSection}
        onAuthClick={() => setShowAuthModal(true)}
        user={user}
        onLogout={logout}
      />
      <main className="container mx-auto px-4 py-6">
        {renderCurrentSection()}
      </main>
      
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)} 
      />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;