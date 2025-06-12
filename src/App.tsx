import React, { useState, useEffect } from 'react';
import { BookOpen, Brain, Home, Code } from 'lucide-react';
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
  const { user, logout } = useAuth();

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
      
      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} />
      )}
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