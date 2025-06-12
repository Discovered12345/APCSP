import React from 'react';
import { BookOpen, Brain, Home, User, LogOut, Sparkles, Zap, Monitor, Code, Clock, BarChart3 } from 'lucide-react';

interface User {
  id: string;
  email: string;
  name: string;
  profile?: {
    totalStudyTime?: number;
  };
}

interface HeaderProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
  onAuthClick: () => void;
  user: User | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  currentSection, 
  onSectionChange, 
  onAuthClick, 
  user, 
  onLogout 
}) => {
  const navItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: Home,
      color: 'text-blue-600',
      hoverColor: 'hover:text-blue-700',
      bgColor: 'bg-blue-100'
    },
    { 
      id: 'units', 
      label: 'Units', 
      icon: BookOpen,
      color: 'text-purple-600',
      hoverColor: 'hover:text-purple-700',
      bgColor: 'bg-purple-100'
    },
    { 
      id: 'practice-tools', 
      label: 'Practice Tools', 
      icon: Code,
      color: 'text-green-600',
      hoverColor: 'hover:text-green-700',
      bgColor: 'bg-green-100'
    },
    { 
      id: 'flashcards', 
      label: 'Flashcards', 
      icon: Brain,
      color: 'text-pink-600',
      hoverColor: 'hover:text-pink-700',
      bgColor: 'bg-pink-100'
    },
    ...(user ? [{
      id: 'history',
      label: 'History',
      icon: Clock,
      color: 'text-orange-600',
      hoverColor: 'hover:text-orange-700',
      bgColor: 'bg-orange-100'
    }] : [])
  ];

  const formatStudyTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  return (
    <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="relative">
              <Monitor className="h-8 w-8 text-blue-500 group-hover:animate-pulse transition-all duration-300" />
              <Code className="h-4 w-4 text-green-500 absolute -bottom-1 -right-1 animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent group-hover:from-green-600 group-hover:to-blue-600 transition-all duration-300">
                APCSP Practice
              </h1>
              <div className="text-xs text-gray-500 group-hover:text-gray-700 transition-colors">
                Master Computer Science
              </div>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="flex space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSectionChange(item.id)}
                  className={`relative flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 transform hover:scale-105 group ${
                    isActive
                      ? `${item.bgColor} ${item.color} shadow-lg scale-105`
                      : `text-gray-600 ${item.hoverColor} hover:bg-gray-100`
                  }`}
                >
                  <div className="relative">
                    <Icon className={`h-4 w-4 ${isActive ? 'animate-pulse' : 'group-hover:animate-bounce'} transition-all duration-300`} />
                  </div>
                  <span className="font-medium">{item.label}</span>
                  {isActive && (
                    <Zap className="h-3 w-3 text-yellow-500 animate-pulse" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3 group">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                    {user.name}
                  </p>
                  <div className="flex items-center space-x-2 text-xs text-gray-500 group-hover:text-gray-700 transition-colors">
                    <BarChart3 className="h-3 w-3" />
                    <span>{formatStudyTime(user.profile?.totalStudyTime || 0)} studied</span>
                  </div>
                </div>
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-sm font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                </div>
                <button
                  onClick={onLogout}
                  className="text-gray-400 hover:text-red-600 transition-all duration-300 hover:scale-110 p-2 rounded-lg hover:bg-red-50"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onAuthClick}
                className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group"
              >
                <User className="h-4 w-4 group-hover:animate-bounce" />
                <span className="font-medium">Sign In</span>
                <Sparkles className="h-4 w-4 animate-pulse" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;