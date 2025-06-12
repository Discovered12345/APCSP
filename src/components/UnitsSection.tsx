import React, { useState } from 'react';
import { ChevronRight, CheckCircle, Circle, Book, Target, Award, Clock, Star, Sparkles, Trophy, Zap, Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const UnitsSection: React.FC = () => {
  const [selectedUnit, setSelectedUnit] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(new Set());
  
  const { user, updateProgress } = useAuth();

  // If user is not authenticated, show lock screen
  if (!user) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-20">
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 animate-pulse"></div>
            </div>
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-6">
                <Lock className="h-16 w-16 text-blue-600 animate-bounce" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Units Practice</h1>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 border border-blue-200">
                <h2 className="text-2xl font-semibold text-blue-900 mb-4">🔒 Sign In Required</h2>
                <p className="text-blue-800 text-lg leading-relaxed">
                  Please sign in to access the comprehensive APCSP units practice with 130+ questions, 
                  detailed explanations, and progress tracking across all 5 units.
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
  }

  const units = [
    {
      id: 1,
      title: 'Programming Basics',
      description: 'Learn about the creative development process, collaboration, and program design',
      subUnits: [
        '1.1 Program Function and Purpose',
        '1.2 Program Design and Development', 
        '1.3 Identifying and Correcting Errors'
      ],
      completed: user?.progress.unitsCompleted || 0,
      total: 30,
      color: 'bg-gradient-to-br from-pink-500 to-rose-600',
      hoverColor: 'hover:from-pink-600 hover:to-rose-700',
      icon: '🎨',
      questions: [
        {
          question: "Which of the following best describes the purpose of an iterative design process?",
          options: [
            "To complete a project as quickly as possible",
            "To refine and improve a solution through repeated cycles of testing and revision",
            "To avoid making any changes once development begins",
            "To ensure the final product matches the initial design exactly"
          ],
          correct: 1,
          explanation: "An iterative design process involves repeated cycles of prototyping, testing, and refining to improve the solution."
        },
        {
          question: "What is the primary benefit of collaboration in computing projects?",
          options: [
            "It reduces the amount of work each person has to do",
            "It ensures all team members have the same skills",
            "It combines diverse perspectives and expertise to create better solutions",
            "It eliminates the need for documentation"
          ],
          correct: 2,
          explanation: "Collaboration brings together different perspectives, skills, and expertise, leading to more innovative and robust solutions."
        }
      ]
    },
    {
      id: 2,
      title: 'Data',
      description: 'Understand binary numbers, data compression, and data analysis',
      subUnits: [
        '2.1 Binary Numbers',
        '2.2 Data Compression',
        '2.3 Extracting Information from Data',
        '2.4 Using Programs with Data'
      ],
      completed: user?.progress.unitsCompleted || 0,
      total: 35,
      color: 'bg-gradient-to-br from-blue-500 to-cyan-600',
      hoverColor: 'hover:from-blue-600 hover:to-cyan-700',
      icon: '📊',
      questions: [
        {
          question: "What is the decimal equivalent of the binary number 1011?",
          options: [
            "9",
            "10", 
            "11",
            "12"
          ],
          correct: 2,
          explanation: "1011 in binary = 1×8 + 0×4 + 1×2 + 1×1 = 8 + 0 + 2 + 1 = 11 in decimal."
        },
        {
          question: "Which of the following is an example of lossy compression?",
          options: [
            "ZIP file compression",
            "JPEG image compression",
            "Text file compression", 
            "Database compression"
          ],
          correct: 1,
          explanation: "JPEG compression is lossy because it permanently removes some image data to reduce file size."
        }
      ]
    },
    {
      id: 3,
      title: 'Algorithms and Programming',
      description: 'Master programming concepts, algorithms, and problem-solving',
      subUnits: [
        '3.1 Variables and Assignments',
        '3.2 Data Abstraction',
        '3.3 Mathematical Expressions',
        '3.4 Strings',
        '3.5 Boolean Expressions',
        '3.6 Conditionals',
        '3.7 Nested Conditionals',
        '3.8 Iteration',
        '3.9 Developing Algorithms',
        '3.10 Lists',
        '3.11 Binary Search',
        '3.12 Calling Procedures',
        '3.13 Developing Procedures',
        '3.14 Libraries',
        '3.15 Random Values',
        '3.16 Simulations',
        '3.17 Algorithmic Efficiency',
        '3.18 Undecidable Problems'
      ],
      completed: user?.progress.unitsCompleted || 0,
      total: 45,
      color: 'bg-gradient-to-br from-green-500 to-emerald-600',
      hoverColor: 'hover:from-green-600 hover:to-emerald-700',
      icon: '⚡',
      questions: [
        {
          question: "Which of the following best describes the purpose of an algorithm?",
          options: [
            "To store data in a computer",
            "To provide step-by-step instructions to solve a problem",
            "To create user interfaces",
            "To manage network connections"
          ],
          correct: 1,
          explanation: "An algorithm is a finite set of instructions that accomplishes a specific task."
        },
        {
          question: "What is the main advantage of using procedures in programming?",
          options: [
            "They make programs run faster",
            "They reduce memory usage",
            "They make code reusable and easier to understand",
            "They prevent errors from occurring"
          ],
          correct: 2,
          explanation: "Procedures promote code reusability and make programs easier to read and maintain."
        }
      ]
    },
    {
      id: 4,
      title: 'Computing Systems and Networks',
      description: 'Explore how computers work and communicate',
      subUnits: [
        '4.1 The Internet',
        '4.2 Fault Tolerance',
        '4.3 Parallel and Distributed Computing'
      ],
      completed: user?.progress.unitsCompleted || 0,
      total: 25,
      color: 'bg-gradient-to-br from-purple-500 to-violet-600',
      hoverColor: 'hover:from-purple-600 hover:to-violet-700',
      icon: '🌐',
      questions: [
        {
          question: "What is the primary purpose of the Internet Protocol (IP)?",
          options: [
            "To encrypt data for security",
            "To provide unique addresses for devices on a network",
            "To compress data for faster transmission",
            "To create user interfaces for web browsers"
          ],
          correct: 1,
          explanation: "IP provides unique addresses (IP addresses) that allow devices to be identified and communicate on a network."
        },
        {
          question: "Which of the following best describes parallel computing?",
          options: [
            "Running one program at a time",
            "Using multiple processors to solve a problem simultaneously",
            "Storing data in multiple locations",
            "Creating backup copies of programs"
          ],
          correct: 1,
          explanation: "Parallel computing uses multiple processors working simultaneously to solve problems faster."
        }
      ]
    },
    {
      id: 5,
      title: 'Impact of Computing',
      description: 'Understand the societal impacts of computing innovations',
      subUnits: [
        '5.1 Beneficial and Harmful Effects',
        '5.2 Digital Divide',
        '5.3 Computing Bias',
        '5.4 Crowdsourcing',
        '5.5 Legal and Ethical Concerns',
        '5.6 Safe Computing'
      ],
      completed: user?.progress.unitsCompleted || 0,
      total: 20,
      color: 'bg-gradient-to-br from-orange-500 to-red-600',
      hoverColor: 'hover:from-orange-600 hover:to-red-700',
      icon: '🌍',
      questions: [
        {
          question: "What is the digital divide?",
          options: [
            "The difference between analog and digital technology",
            "The gap between those who have access to technology and those who don't",
            "The separation between hardware and software",
            "The distinction between public and private networks"
          ],
          correct: 1,
          explanation: "The digital divide refers to the gap between people who have access to modern technology and those who don't."
        },
        {
          question: "Which of the following is an example of algorithmic bias?",
          options: [
            "A program that runs slowly on older computers",
            "A hiring algorithm that favors certain demographic groups",
            "A game that is difficult to play",
            "A website that loads slowly"
          ],
          correct: 1,
          explanation: "Algorithmic bias occurs when algorithms systematically favor or discriminate against certain groups of people."
        }
      ]
    }
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    
    const unit = units.find(u => u.id === selectedUnit);
    if (!unit) return;
    
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    const questionKey = `${selectedUnit}-${currentQuestion}`;
    if (answerIndex === unit.questions[currentQuestion].correct && !completedQuestions.has(questionKey)) {
      setCompletedQuestions(prev => new Set(prev).add(questionKey));
      if (user) {
        updateProgress('unitsCompleted', 1);
      }
    }
  };

  const nextQuestion = () => {
    const unit = units.find(u => u.id === selectedUnit);
    if (!unit) return;
    
    if (currentQuestion < unit.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setCurrentQuestion(0);
    }
    setSelectedAnswer(null);
    setShowResult(false);
  };

  if (selectedUnit) {
    const unit = units.find(u => u.id === selectedUnit);
    const question = unit?.questions[currentQuestion];
    const questionKey = `${selectedUnit}-${currentQuestion}`;
    const isQuestionCompleted = completedQuestions.has(questionKey);

    return (
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => setSelectedUnit(null)}
            className="text-blue-600 hover:text-blue-700 flex items-center space-x-2 mb-6 group transition-all duration-300 hover:translate-x-1"
          >
            <ChevronRight className="h-5 w-5 rotate-180 group-hover:scale-110 transition-transform" />
            <span className="font-medium">Back to Units</span>
          </button>
          
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 relative overflow-hidden">
            {/* Background Animation */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 opacity-50"></div>
            
            <div className="relative z-10">
              <div className="flex items-center space-x-6 mb-6">
                <div className={`${unit?.color} ${unit?.hoverColor} p-4 rounded-2xl shadow-lg transform hover:scale-110 transition-all duration-300`}>
                  <span className="text-3xl">{unit?.icon}</span>
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Unit {unit?.id}: {unit?.title}
                  </h1>
                  <p className="text-gray-600 text-lg">{unit?.description}</p>
                </div>
                {isQuestionCompleted && (
                  <div className="flex items-center space-x-2">
                    <Trophy className="h-8 w-8 text-yellow-500 animate-bounce" />
                    <Sparkles className="h-6 w-6 text-pink-500 animate-pulse" />
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Target className="h-5 w-5 text-blue-600" />
                    <div className="text-sm text-gray-600">
                      Progress: {unit?.completed}/{unit?.total} questions completed
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className={`${unit?.color} h-3 rounded-full transition-all duration-1000 ease-out relative`}
                      style={{ width: `${((unit?.completed || 0) / (unit?.total || 1)) * 100}%` }}
                    >
                      <div className="absolute inset-0 bg-white opacity-30 animate-pulse"></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Clock className="h-5 w-5 text-purple-600" />
                  <span className="text-sm text-gray-600">
                    Question {currentQuestion + 1} of {unit?.questions.length}
                  </span>
                  <Zap className="h-4 w-4 text-yellow-500 animate-pulse" />
                </div>
              </div>

              {/* Sub-Units */}
              <div className="mb-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                  <Book className="h-5 w-5 mr-2 text-blue-600" />
                  Sub-Units:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {unit?.subUnits.map((subUnit, index) => (
                    <div
                      key={index}
                      className="px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 rounded-xl border border-gray-200 hover:from-blue-50 hover:to-purple-50 hover:border-blue-200 transition-all duration-300 transform hover:scale-105 cursor-pointer group"
                    >
                      <div className="flex items-center space-x-2">
                        <Circle className="h-3 w-3 text-blue-500 group-hover:text-purple-500 transition-colors" />
                        <span className="text-sm font-medium group-hover:text-blue-700 transition-colors">
                          {subUnit}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Question Section */}
        <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-30"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <Award className="h-6 w-6 mr-3 text-blue-600 animate-pulse" />
                Practice Question
                {isQuestionCompleted && (
                  <div className="ml-3 flex items-center space-x-1">
                    <CheckCircle className="h-6 w-6 text-green-500 animate-bounce" />
                    <Star className="h-5 w-5 text-yellow-500 animate-spin" style={{ animationDuration: '3s' }} />
                  </div>
                )}
              </h2>
              <div className="flex items-center space-x-2 px-4 py-2 bg-blue-100 rounded-full">
                <span className="text-sm font-medium text-blue-800">
                  Question {currentQuestion + 1} of {unit?.questions.length}
                </span>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8 border border-blue-200">
              <p className="text-lg text-gray-800 leading-relaxed font-medium">
                {question?.question}
              </p>
            </div>
            
            <div className="space-y-4 mb-8">
              {question?.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                  className={`w-full text-left p-6 rounded-xl border-2 transition-all duration-300 transform hover:scale-[1.02] ${
                    showResult
                      ? index === question.correct
                        ? 'border-green-500 bg-gradient-to-r from-green-50 to-emerald-50 text-green-800 shadow-lg'
                        : index === selectedAnswer && index !== question.correct
                        ? 'border-red-500 bg-gradient-to-r from-red-50 to-pink-50 text-red-800 shadow-lg'
                        : 'border-gray-200 bg-gray-50 text-gray-600'
                      : selectedAnswer === index
                      ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-purple-50 shadow-lg'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                      showResult && index === question.correct
                        ? 'border-green-500 bg-green-500 text-white'
                        : showResult && index === selectedAnswer && index !== question.correct
                        ? 'border-red-500 bg-red-500 text-white'
                        : selectedAnswer === index
                        ? 'border-blue-500 bg-blue-500 text-white'
                        : 'border-gray-300 text-gray-600'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="font-medium">{option}</span>
                    {showResult && index === question.correct && (
                      <CheckCircle className="h-6 w-6 text-green-600 ml-auto animate-bounce" />
                    )}
                  </div>
                </button>
              ))}
            </div>
            
            {showResult && (
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
                <div className="flex items-center space-x-2 mb-4">
                  <Sparkles className="h-6 w-6 text-blue-600 animate-pulse" />
                  <h3 className="font-bold text-blue-900 text-lg">Explanation:</h3>
                </div>
                <p className="text-blue-800 mb-6 leading-relaxed">{question?.explanation}</p>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    {selectedAnswer === question?.correct ? (
                      <div className="flex items-center space-x-2 text-green-700">
                        <CheckCircle className="h-5 w-5 animate-bounce" />
                        <span className="font-medium">Excellent! You got it right! 🎉</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2 text-blue-700">
                        <Target className="h-5 w-5" />
                        <span>Keep practicing! You're learning and improving! 💪</span>
                      </div>
                    )}
                  </div>
                  
                  <button
                    onClick={nextQuestion}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
                  >
                    <span>{currentQuestion < (unit?.questions.length || 0) - 1 ? 'Next Question' : 'Start Over'}</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-float-delayed"></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-green-200 rounded-full opacity-20 animate-float"></div>
      </div>

      <div className="text-center mb-12 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-3xl opacity-50"></div>
        <div className="relative z-10 py-12">
          <div className="flex items-center justify-center mb-6">
            <Trophy className="h-12 w-12 text-yellow-500 animate-bounce mr-4" />
            <Book className="h-16 w-16 text-blue-600 animate-pulse" />
            <Sparkles className="h-10 w-10 text-pink-500 animate-spin ml-4" style={{ animationDuration: '3s' }} />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            APCSP Units
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Master all five units of the AP Computer Science Principles curriculum with interactive practice questions and comprehensive explanations
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {units.map((unit, index) => {
          const progressPercent = (unit.completed / unit.total) * 100;
          
          return (
            <div
              key={unit.id}
              onClick={() => setSelectedUnit(unit.id)}
              className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 cursor-pointer group transform hover:-translate-y-4 relative overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Background Animation */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className={`${unit.color} ${unit.hoverColor} p-4 rounded-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                    <span className="text-3xl">{unit.icon}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-700 group-hover:text-blue-600 transition-colors">
                      {unit.completed}/{unit.total}
                    </div>
                    <div className="text-sm text-gray-500">completed</div>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  Unit {unit.id}: {unit.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed group-hover:text-gray-800 transition-colors">
                  {unit.description}
                </p>
                
                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Progress</span>
                    <span className="text-sm font-bold text-gray-900">{Math.round(progressPercent)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className={`${unit.color} h-3 rounded-full transition-all duration-1000 ease-out relative`}
                      style={{ width: `${progressPercent}%` }}
                    >
                      <div className="absolute inset-0 bg-white opacity-30 animate-pulse"></div>
                    </div>
                  </div>
                </div>
                
                {/* Sub-Units Preview */}
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-gray-700 flex items-center">
                    <Zap className="h-4 w-4 mr-2 text-yellow-500 animate-pulse" />
                    Key Sub-Units:
                  </h4>
                  <div className="space-y-2">
                    {unit.subUnits.slice(0, 3).map((subUnit, subIndex) => (
                      <div
                        key={subIndex}
                        className="flex items-center space-x-2 group-hover:translate-x-2 transition-transform duration-300"
                        style={{ transitionDelay: `${subIndex * 0.1}s` }}
                      >
                        <Circle className="h-2 w-2 text-blue-500 animate-pulse" />
                        <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                          {subUnit}
                        </span>
                      </div>
                    ))}
                    {unit.subUnits.length > 3 && (
                      <div className="flex items-center space-x-2 text-sm text-gray-500 group-hover:text-blue-600 transition-colors">
                        <Sparkles className="h-3 w-3 animate-pulse" />
                        <span>+{unit.subUnits.length - 3} more sub-units</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default UnitsSection;