import React from 'react';
import { Clock, TrendingUp, Award, Calendar, BarChart3, Target, Zap, BookOpen, Brain, Code } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const UserHistory: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto text-center py-20">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">History</h1>
        <p className="text-gray-600">Please sign in to view your study history.</p>
      </div>
    );
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return date.toLocaleDateString();
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'units': return BookOpen;
      case 'flashcards': return Brain;
      case 'practice-tools': return Code;
      default: return Target;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'units': return 'text-blue-600 bg-blue-100';
      case 'flashcards': return 'text-purple-600 bg-purple-100';
      case 'practice-tools': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const totalStudyTime = user.profile?.totalStudyTime || 0;
  const studyStreak = user.profile?.studyStreak || 0;
  const toolsUsed = user.profile?.practiceToolsUsed?.length || 0;
  const recentActivities = user.history?.slice(0, 10) || [];

  // Calculate weekly study time
  const weeklyTime = user.history?.filter(activity => {
    const activityDate = new Date(activity.date);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return activityDate >= weekAgo;
  }).reduce((total, activity) => total + activity.duration, 0) || 0;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-green-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Study History
        </h1>
        <p className="text-xl text-gray-600">
          Track your learning progress and study patterns
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-blue-100 p-3 rounded-xl">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600">Total Study Time</h3>
              <p className="text-2xl font-bold text-gray-900">{formatDuration(totalStudyTime)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-green-100 p-3 rounded-xl">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600">This Week</h3>
              <p className="text-2xl font-bold text-gray-900">{formatDuration(weeklyTime)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-orange-100 p-3 rounded-xl">
              <Zap className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600">Study Streak</h3>
              <p className="text-2xl font-bold text-gray-900">{studyStreak} days</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-purple-100 p-3 rounded-xl">
              <Target className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600">Tools Used</h3>
              <p className="text-2xl font-bold text-gray-900">{toolsUsed}/12</p>
            </div>
          </div>
        </div>
      </div>

      {/* Study Pattern Chart */}
      <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
        <div className="flex items-center space-x-3 mb-6">
          <BarChart3 className="h-6 w-6 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-900">Weekly Study Pattern</h2>
        </div>
        
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
            <div key={day} className="text-center">
              <div className="text-xs text-gray-500 mb-2">{day}</div>
              <div 
                className="bg-blue-200 rounded h-20 flex items-end justify-center"
                style={{ 
                  background: `linear-gradient(to top, #3B82F6 ${Math.random() * 100}%, #E5E7EB 0%)` 
                }}
              >
                <span className="text-xs text-white font-medium mb-1">
                  {Math.floor(Math.random() * 120)}m
                </span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center text-sm text-gray-600">
          Average daily study time: {formatDuration(Math.floor(totalStudyTime / 7))}
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
        <div className="flex items-center space-x-3 mb-6">
          <Calendar className="h-6 w-6 text-green-600" />
          <h2 className="text-xl font-bold text-gray-900">Recent Activities</h2>
        </div>

        {recentActivities.length > 0 ? (
          <div className="space-y-4">
            {recentActivities.map((activity, index) => {
              const Icon = getActivityIcon(activity.type);
              const colorClass = getActivityColor(activity.type);
              
              return (
                <div key={index} className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className={`p-2 rounded-lg ${colorClass}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{activity.activity}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>{formatDate(activity.date)}</span>
                      <span>•</span>
                      <span>{formatDuration(activity.duration)}</span>
                      <span>•</span>
                      <span className="capitalize">{activity.type.replace('-', ' ')}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">
                      +{formatDuration(activity.duration)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No activities yet</h3>
            <p className="text-gray-500">Start studying to see your activity history here!</p>
          </div>
        )}
      </div>

      {/* Tools Used */}
      <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
        <div className="flex items-center space-x-3 mb-6">
          <Award className="h-6 w-6 text-purple-600" />
          <h2 className="text-xl font-bold text-gray-900">Practice Tools Used</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            'RGB Converter', 'Cipher Practice', 'Binary Practice', 'Logic Gate Simulator',
            'Cybersecurity Game', 'Flashcards', 'Units Practice', 'Python Coding',
            'ASCII Reference', 'Syntax Guide', 'Exam Reference', 'Study Timer'
          ].map((tool, index) => {
            const isUsed = user.profile?.practiceToolsUsed?.includes(tool) || false;
            
            return (
              <div
                key={index}
                className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                  isUsed
                    ? 'border-green-500 bg-green-50 text-green-800'
                    : 'border-gray-200 bg-gray-50 text-gray-600'
                }`}
              >
                <div className="flex items-center space-x-3">
                  {isUsed ? (
                    <Award className="h-5 w-5 text-green-600" />
                  ) : (
                    <div className="w-5 h-5 border-2 border-gray-300 rounded"></div>
                  )}
                  <span className="font-medium">{tool}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            You've used <span className="font-bold text-purple-600">{toolsUsed}</span> out of 12 practice tools
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(toolsUsed / 12) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHistory;