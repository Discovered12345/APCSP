import React from 'react';
import { Code, Wrench } from 'lucide-react';

const CodingPractice: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center py-20">
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 animate-pulse"></div>
          </div>
          <div className="relative z-10">
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <Code className="h-16 w-16 text-blue-600 animate-bounce" />
                <Wrench className="h-8 w-8 text-orange-500 absolute -bottom-2 -right-2 animate-spin" style={{ animationDuration: '3s' }} />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Coding Practice</h1>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 border border-blue-200">
              <h2 className="text-2xl font-semibold text-blue-900 mb-4">🚧 In Progress! 🚧</h2>
              <p className="text-blue-800 text-lg leading-relaxed">
                We're building an amazing coding practice environment with live code execution, 
                multiple programming languages, and interactive challenges. Stay tuned for an 
                incredible learning experience!
              </p>
              <div className="mt-6 flex items-center justify-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodingPractice;