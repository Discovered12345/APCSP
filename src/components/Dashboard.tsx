import React from 'react';
import { BookOpen, Brain, Target, Award, Clock, Star, Sparkles, Code, Monitor, Zap, TrendingUp } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface DashboardProps {
  onSectionChange: (section: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onSectionChange }) => {
  const { user } = useAuth();

  const stats = user ? [
    { label: 'Units Completed', value: `${user.progress.unitsCompleted}/130`, icon: BookOpen, color: 'text-blue-600', bgColor: 'bg-blue-100' },
    { label: 'Practice Tools Used', value: '8/12', icon: Code, color: 'text-green-600', bgColor: 'bg-green-100' },
    { label: 'Flashcards Mastered', value: `${user.progress.flashcardsMastered}/500`, icon: Brain, color: 'text-purple-600', bgColor: 'bg-purple-100' },
    { label: 'Study Streak', value: '7 days', icon: Target, color: 'text-orange-600', bgColor: 'bg-orange-100' },
  ] : [
    { label: 'Units Available', value: '130+', icon: BookOpen, color: 'text-blue-600', bgColor: 'bg-blue-100' },
    { label: 'Practice Tools', value: '12+', icon: Code, color: 'text-green-600', bgColor: 'bg-green-100' },
    { label: 'Flashcards', value: '500+', icon: Brain, color: 'text-purple-600', bgColor: 'bg-purple-100' },
    { label: 'Interactive Tools', value: '8+', icon: Target, color: 'text-orange-600', bgColor: 'bg-orange-100' },
  ];

  const sections = [
    {
      id: 'units',
      title: 'APCSP Units',
      description: 'Master all 5 units with comprehensive practice questions, detailed explanations, and progress tracking',
      icon: BookOpen,
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
      hoverColor: 'hover:from-blue-600 hover:to-blue-700',
      progress: user ? Math.round((user.progress.unitsCompleted / 130) * 100) : 0,
      features: ['130+ practice questions', 'Interactive quizzes', 'Progress tracking', 'Detailed explanations'],
      accent: 'blue',
      requiresAuth: true
    },
    {
      id: 'practice-tools',
      title: 'Practice Tools',
      description: 'Interactive tools for RGB/HEX conversion, ciphers, binary practice, logic gates, and cybersecurity',
      icon: Code,
      color: 'bg-gradient-to-br from-green-500 to-green-600',
      hoverColor: 'hover:from-green-600 hover:to-green-700',
      progress: 0,
      features: ['RGB/HEX converter', 'Cipher tools', 'Binary practice', 'Logic gate simulator', 'Cybersecurity scenarios'],
      accent: 'green',
      requiresAuth: false
    },
    {
      id: 'flashcards',
      title: 'Flashcards',
      description: 'Interactive flashcards covering all APCSP concepts with spaced repetition learning',
      icon: Brain,
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
      hoverColor: 'hover:from-purple-600 hover:to-purple-700',
      progress: user ? Math.round((user.progress.flashcardsMastered / 500) * 100) : 0,
      features: ['500+ flashcards', 'Spaced repetition', 'AI explanations', 'Review system'],
      accent: 'purple',
      requiresAuth: true
    }
  ];

  const achievements = [
    { name: 'First Steps', description: 'Complete your first unit', icon: Star, earned: true, color: 'text-yellow-600' },
    { name: 'Tool Master', description: 'Use 5 different practice tools', icon: Code, earned: true, color: 'text-green-600' },
    { name: 'Memory Master', description: 'Master 25 flashcards', icon: Brain, earned: false, color: 'text-purple-600' },
    { name: 'Binary Expert', description: 'Complete 10 binary conversions', icon: Monitor, earned: false, color: 'text-blue-600' },
    { name: 'Speed Demon', description: 'Solve a problem in under 30 seconds', icon: Zap, earned: false, color: 'text-yellow-600' },
    { name: 'Perfectionist', description: 'Get 100% on a unit test', icon: Target, earned: false, color: 'text-red-600' },
  ];

  return (
    <div className="space-y-8">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-green-200 rounded-full opacity-20 animate-float-delayed"></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-purple-200 rounded-full opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-18 h-18 bg-orange-200 rounded-full opacity-20 animate-float-delayed"></div>
      </div>

      {/* Welcome Section */}
      <div className="text-center py-12 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-green-50 to-purple-50 rounded-3xl opacity-50"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-center mb-6">
            <Monitor className="h-12 w-12 text-blue-500 mr-4" />
            <Code className="h-16 w-16 text-green-600" />
            <Brain className="h-10 w-10 text-purple-500 ml-4" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-green-600 to-purple-600 bg-clip-text text-transparent mb-4">
            {user ? `Welcome back, ${user.name}!` : 'Welcome to APCSP Practice'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {user 
              ? 'Continue your journey to master the AP Computer Science Principles exam with our comprehensive learning platform'
              : 'Master the AP Computer Science Principles exam with interactive tools, comprehensive practice, and engaging simulations'
            }
          </p>
          {!user && (
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl border border-blue-200 max-w-lg mx-auto transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center justify-center mb-2">
                <Star className="h-6 w-6 text-yellow-500 animate-spin" style={{ animationDuration: '3s' }} />
              </div>
              <p className="text-blue-800 font-medium">
                Sign in to track your progress and unlock personalized learning features!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Animated Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div 
              key={index} 
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.bgColor} p-3 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
                <TrendingUp className="h-5 w-5 text-green-500 animate-pulse" />
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {stat.value}
              </p>
              <p className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Interactive Practice Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {sections.map((section, index) => {
          const Icon = section.icon;
          const canAccess = !section.requiresAuth || user;
          
          return (
            <div
              key={section.id}
              onClick={() => canAccess && onSectionChange(section.id)}
              className={`bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 group transform hover:-translate-y-3 relative overflow-hidden ${
                canAccess ? 'cursor-pointer' : 'cursor-not-allowed opacity-75'
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Background Animation */}
              <div className={`absolute inset-0 bg-gradient-to-br from-${section.accent}-50 to-${section.accent}-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              {/* Auth Required Badge */}
              {section.requiresAuth && !user && (
                <div className="absolute top-4 right-4 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium animate-pulse">
                  Sign In Required
                </div>
              )}
              
              <div className="relative z-10">
                <div className="flex items-start space-x-6">
                  <div className={`${section.color} ${section.hoverColor} p-4 rounded-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {section.title}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed group-hover:text-gray-800 transition-colors">
                      {section.description}
                    </p>
                    
                    {/* Features Grid */}
                    <div className="grid grid-cols-1 gap-3 mb-6">
                      {section.features.map((feature, featureIndex) => (
                        <div 
                          key={featureIndex} 
                          className="flex items-center space-x-2 group-hover:translate-x-2 transition-transform duration-300"
                          style={{ transitionDelay: `${featureIndex * 0.1}s` }}
                        >
                          <div className={`w-2 h-2 bg-${section.accent}-500 rounded-full animate-pulse`}></div>
                          <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Progress Bar */}
                    {user && section.progress > 0 && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500 font-medium">Progress</span>
                          <span className="text-gray-700 font-bold">{section.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                          <div
                            className={`${section.color} h-3 rounded-full transition-all duration-1000 ease-out relative overflow-hidden`}
                            style={{ width: `${section.progress}%` }}
                          >
                            <div className="absolute inset-0 bg-white opacity-30 animate-shimmer"></div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Access Status */}
                    {!canAccess && (
                      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-sm text-yellow-800 font-medium">
                          🔒 Sign in to access this feature
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Achievements Section */}
      {user && (
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Award className="h-6 w-6 mr-3 text-yellow-500 animate-bounce" />
            Achievements
            <Sparkles className="h-5 w-5 ml-2 text-pink-500 animate-pulse" />
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div
                  key={index}
                  className={`p-6 rounded-xl border transition-all duration-300 transform hover:scale-105 cursor-pointer ${
                    achievement.earned
                      ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200 shadow-lg'
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-xl ${achievement.earned ? 'bg-yellow-100' : 'bg-gray-200'} transition-colors duration-300`}>
                      <Icon className={`h-6 w-6 ${achievement.earned ? achievement.color : 'text-gray-400'} ${achievement.earned ? 'animate-pulse' : ''}`} />
                    </div>
                    <div>
                      <h3 className={`font-bold ${achievement.earned ? 'text-yellow-900' : 'text-gray-600'} transition-colors`}>
                        {achievement.name}
                      </h3>
                      <p className={`text-sm ${achievement.earned ? 'text-yellow-700' : 'text-gray-500'} transition-colors`}>
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                  {achievement.earned && (
                    <div className="mt-3 flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 animate-spin" style={{ animationDuration: '3s' }} />
                      <span className="text-xs text-yellow-700 font-medium">Earned!</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Recent Activity */}
      {user && (
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Clock className="h-6 w-6 mr-3 text-gray-500 animate-pulse" />
            Recent Activity
          </h2>
          <div className="space-y-4">
            {[
              { action: 'Completed Unit 3: Algorithms and Programming', time: '2 hours ago', type: 'unit', color: 'blue' },
              { action: 'Used RGB/HEX converter tool', time: '4 hours ago', type: 'tool', color: 'green' },
              { action: 'Mastered 15 new flashcards on Data Structures', time: '1 day ago', type: 'flashcard', color: 'purple' },
              { action: 'Practiced binary conversions', time: '2 days ago', type: 'practice', color: 'orange' },
              { action: 'Earned "Tool Master" achievement', time: '3 days ago', type: 'achievement', color: 'yellow' },
            ].map((activity, index) => (
              <div 
                key={index} 
                className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300 transform hover:translate-x-2 cursor-pointer group"
              >
                <div className={`w-3 h-3 bg-${activity.color}-500 rounded-full animate-pulse group-hover:scale-150 transition-transform duration-300`}></div>
                <div className="flex-1">
                  <p className="text-gray-900 font-medium group-hover:text-blue-600 transition-colors">
                    {activity.action}
                  </p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;