import React from 'react';
import { Bot, Cog, Zap } from 'lucide-react';

const RobotQuestions: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center py-20">
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-40 h-40 bg-gradient-to-r from-orange-400 to-red-500 rounded-full opacity-20 animate-pulse"></div>
          </div>
          <div className="relative z-10">
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <Bot className="h-16 w-16 text-orange-600 animate-bounce" />
                <Cog className="h-6 w-6 text-gray-500 absolute -top-1 -right-1 animate-spin" />
                <Zap className="h-6 w-6 text-yellow-500 absolute -bottom-1 -left-1 animate-pulse" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Robot Simulation</h1>
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-8 border border-orange-200">
              <h2 className="text-2xl font-semibold text-orange-900 mb-4">🤖 In Progress! 🤖</h2>
              <p className="text-orange-800 text-lg leading-relaxed">
                Get ready for an immersive robot simulation experience! We're creating interactive 
                grid-based challenges with step-by-step animations, multiple difficulty levels, 
                and visual programming concepts that will make learning algorithms fun and engaging.
              </p>
              <div className="mt-6 flex items-center justify-center space-x-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RobotQuestions;