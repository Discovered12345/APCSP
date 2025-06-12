import React, { useState, useEffect } from 'react';
import { 
  Palette, 
  Shield, 
  Cpu, 
  Binary, 
  Key, 
  Code, 
  Monitor, 
  Zap, 
  Target, 
  Award,
  CheckCircle,
  XCircle,
  RotateCcw,
  Info,
  ExternalLink,
  BookOpen,
  Globe,
  FileText,
  Download
} from 'lucide-react';

const PracticeTools: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState('color-converter');
  const [currentView, setCurrentView] = useState<'info' | 'quiz'>('info');

  const tools = [
    {
      id: 'color-converter',
      title: 'Color Converter',
      description: 'Convert between RGB, HEX, and HSL color formats',
      icon: Palette,
      color: 'bg-gradient-to-br from-pink-500 to-purple-600',
      hoverColor: 'hover:from-pink-600 hover:to-purple-700'
    },
    {
      id: 'cryptography',
      title: 'Cryptography & Ciphers',
      description: 'Learn about encryption, decryption, and cipher techniques',
      icon: Key,
      color: 'bg-gradient-to-br from-blue-500 to-indigo-600',
      hoverColor: 'hover:from-blue-600 hover:to-indigo-700'
    },
    {
      id: 'binary-practice',
      title: 'Binary Practice',
      description: 'Master binary, decimal, and hexadecimal conversions',
      icon: Binary,
      color: 'bg-gradient-to-br from-green-500 to-emerald-600',
      hoverColor: 'hover:from-green-600 hover:to-emerald-700'
    },
    {
      id: 'logic-gates',
      title: 'Logic Gate Simulator',
      description: 'Explore digital logic gates and Boolean operations',
      icon: Cpu,
      color: 'bg-gradient-to-br from-orange-500 to-red-600',
      hoverColor: 'hover:from-orange-600 hover:to-red-700'
    },
    {
      id: 'cybersecurity',
      title: 'Cybersecurity Scenarios',
      description: 'Learn about digital security and safe computing practices',
      icon: Shield,
      color: 'bg-gradient-to-br from-teal-500 to-cyan-600',
      hoverColor: 'hover:from-teal-600 hover:to-cyan-700'
    },
    {
      id: 'python-resources',
      title: 'Python Resources',
      description: 'Essential Python programming resources and practice platforms',
      icon: Code,
      color: 'bg-gradient-to-br from-yellow-500 to-amber-600',
      hoverColor: 'hover:from-yellow-600 hover:to-amber-700'
    }
  ];

  const renderToolContent = () => {
    switch (selectedTool) {
      case 'color-converter':
        return <ColorConverter currentView={currentView} setCurrentView={setCurrentView} />;
      case 'cryptography':
        return <CryptographyTool />;
      case 'binary-practice':
        return <BinaryPractice />;
      case 'logic-gates':
        return <LogicGateSimulator />;
      case 'cybersecurity':
        return <CybersecurityScenarios />;
      case 'python-resources':
        return <PythonResources />;
      default:
        return <ColorConverter currentView={currentView} setCurrentView={setCurrentView} />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-green-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Practice Tools
        </h1>
        <p className="text-xl text-gray-600">
          Interactive tools to master APCSP concepts through hands-on practice
        </p>
      </div>

      {/* Tool Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => {
          const Icon = tool.icon;
          const isSelected = selectedTool === tool.id;
          
          return (
            <button
              key={tool.id}
              onClick={() => {
                setSelectedTool(tool.id);
                setCurrentView('info');
              }}
              className={`p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 text-left ${
                isSelected
                  ? 'border-blue-500 bg-blue-50 shadow-xl'
                  : 'border-gray-200 hover:border-blue-300 hover:shadow-lg'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className={`${tool.color} ${tool.hoverColor} p-3 rounded-xl shadow-lg transition-all duration-300 ${isSelected ? 'scale-110' : ''}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className={`font-bold text-lg mb-2 transition-colors ${isSelected ? 'text-blue-600' : 'text-gray-900'}`}>
                    {tool.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {tool.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Tool Content */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {renderToolContent()}
      </div>
    </div>
  );
};

// Color Converter Component
const ColorConverter: React.FC<{ currentView: 'info' | 'quiz'; setCurrentView: (view: 'info' | 'quiz') => void }> = ({ currentView, setCurrentView }) => {
  const [rgb, setRgb] = useState({ r: 255, g: 0, b: 0 });
  const [hex, setHex] = useState('#FF0000');
  const [hsl, setHsl] = useState({ h: 0, s: 100, l: 50 });
  
  // Quiz state
  const [quizScore, setQuizScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<any[]>([]);

  const generateQuizQuestion = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    
    const correctHex = `#${r.toString(16).padStart(2, '0').toUpperCase()}${g.toString(16).padStart(2, '0').toUpperCase()}${b.toString(16).padStart(2, '0').toUpperCase()}`;
    
    const options = [correctHex];
    while (options.length < 5) {
      const randomR = Math.floor(Math.random() * 256);
      const randomG = Math.floor(Math.random() * 256);
      const randomB = Math.floor(Math.random() * 256);
      const randomHex = `#${randomR.toString(16).padStart(2, '0').toUpperCase()}${randomG.toString(16).padStart(2, '0').toUpperCase()}${randomB.toString(16).padStart(2, '0').toUpperCase()}`;
      
      if (!options.includes(randomHex)) {
        options.push(randomHex);
      }
    }
    
    // Shuffle options
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    
    return {
      rgb: `RGB(${r}, ${g}, ${b})`,
      correctAnswer: correctHex,
      options,
      correctIndex: options.indexOf(correctHex)
    };
  };

  useEffect(() => {
    const questions = Array.from({ length: 10 }, () => generateQuizQuestion());
    setQuizQuestions(questions);
  }, []);

  const rgbToHex = (r: number, g: number, b: number) => {
    return `#${r.toString(16).padStart(2, '0').toUpperCase()}${g.toString(16).padStart(2, '0').toUpperCase()}${b.toString(16).padStart(2, '0').toUpperCase()}`;
  };

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const updateFromRgb = (newRgb: typeof rgb) => {
    setRgb(newRgb);
    setHex(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
    setHsl(rgbToHsl(newRgb.r, newRgb.g, newRgb.b));
  };

  const updateFromHex = (newHex: string) => {
    setHex(newHex);
    const rgbResult = hexToRgb(newHex);
    if (rgbResult) {
      setRgb(rgbResult);
      setHsl(rgbToHsl(rgbResult.r, rgbResult.g, rgbResult.b));
    }
  };

  const handleQuizAnswer = (answerIndex: number) => {
    if (showResult) return;
    
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    if (answerIndex === quizQuestions[currentQuestion]?.correctIndex) {
      setQuizScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setCurrentQuestion(0);
      setQuizScore(0);
    }
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setQuizScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    const questions = Array.from({ length: 10 }, () => generateQuizQuestion());
    setQuizQuestions(questions);
  };

  if (currentView === 'quiz') {
    const question = quizQuestions[currentQuestion];
    if (!question) return <div>Loading...</div>;

    return (
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => setCurrentView('info')}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to Converter
          </button>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Color Quiz</h2>
            <p className="text-gray-600">Question {currentQuestion + 1} of {quizQuestions.length}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-600">{quizScore}</div>
            <div className="text-sm text-gray-600">Score</div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 mb-8 text-center border border-blue-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Convert this RGB value to HEX:</h3>
            <div className="text-3xl font-mono font-bold text-blue-600 mb-4">
              {question.rgb}
            </div>
            <div 
              className="w-24 h-24 rounded-lg mx-auto border-4 border-white shadow-lg"
              style={{ backgroundColor: question.rgb.replace('RGB', 'rgb') }}
            ></div>
          </div>

          <div className="space-y-4 mb-8">
            {question.options.map((option: string, index: number) => (
              <button
                key={index}
                onClick={() => handleQuizAnswer(index)}
                disabled={showResult}
                className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                  showResult
                    ? index === question.correctIndex
                      ? 'border-green-500 bg-green-50 text-green-800'
                      : index === selectedAnswer && index !== question.correctIndex
                      ? 'border-red-500 bg-red-50 text-red-800'
                      : 'border-gray-200 bg-gray-50 text-gray-600'
                    : selectedAnswer === index
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div 
                    className="w-12 h-12 rounded-lg border-2 border-gray-300"
                    style={{ backgroundColor: option }}
                  ></div>
                  <span className="font-mono text-lg font-bold">{option}</span>
                  {showResult && index === question.correctIndex && (
                    <CheckCircle className="h-6 w-6 text-green-600 ml-auto" />
                  )}
                  {showResult && index === selectedAnswer && index !== question.correctIndex && (
                    <XCircle className="h-6 w-6 text-red-600 ml-auto" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {showResult && (
            <div className="text-center space-y-4">
              <div className={`text-lg font-medium ${selectedAnswer === question.correctIndex ? 'text-green-600' : 'text-blue-600'}`}>
                {selectedAnswer === question.correctIndex ? '🎉 Correct!' : '💪 Keep practicing!'}
              </div>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={nextQuestion}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
                >
                  {currentQuestion < quizQuestions.length - 1 ? 'Next Question' : 'Start Over'}
                </button>
                <button
                  onClick={resetQuiz}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center space-x-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Reset Quiz</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Color Converter</h2>
          <p className="text-gray-600 text-lg">Convert between RGB, HEX, and HSL color formats</p>
        </div>
        <button
          onClick={() => setCurrentView('quiz')}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
        >
          <Target className="h-5 w-5" />
          <span>Practice Quiz</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Color Preview */}
        <div className="space-y-6">
          <div className="text-center">
            <div 
              className="w-full h-64 rounded-2xl border-4 border-white shadow-xl mb-4"
              style={{ backgroundColor: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` }}
            ></div>
            <div className="text-2xl font-bold text-gray-900">Color Preview</div>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-6">
          {/* RGB Controls */}
          <div className="bg-red-50 rounded-xl p-6 border border-red-200">
            <h3 className="text-xl font-bold text-red-800 mb-4">RGB Values</h3>
            <div className="space-y-4">
              {(['r', 'g', 'b'] as const).map((channel) => (
                <div key={channel}>
                  <label className="block text-sm font-medium text-red-700 mb-2">
                    {channel.toUpperCase()}: {rgb[channel]}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="255"
                    value={rgb[channel]}
                    onChange={(e) => updateFromRgb({ ...rgb, [channel]: parseInt(e.target.value) })}
                    className="w-full h-2 bg-red-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-white rounded-lg border">
              <span className="font-mono text-lg">rgb({rgb.r}, {rgb.g}, {rgb.b})</span>
            </div>
          </div>

          {/* HEX Control */}
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
            <h3 className="text-xl font-bold text-blue-800 mb-4">HEX Value</h3>
            <input
              type="text"
              value={hex}
              onChange={(e) => updateFromHex(e.target.value)}
              className="w-full p-3 border border-blue-300 rounded-lg font-mono text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="#FF0000"
            />
          </div>

          {/* HSL Display */}
          <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
            <h3 className="text-xl font-bold text-purple-800 mb-4">HSL Values</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-sm text-purple-600 font-medium">Hue</div>
                <div className="text-2xl font-bold text-purple-800">{hsl.h}°</div>
              </div>
              <div>
                <div className="text-sm text-purple-600 font-medium">Saturation</div>
                <div className="text-2xl font-bold text-purple-800">{hsl.s}%</div>
              </div>
              <div>
                <div className="text-sm text-purple-600 font-medium">Lightness</div>
                <div className="text-2xl font-bold text-purple-800">{hsl.l}%</div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-white rounded-lg border">
              <span className="font-mono text-lg">hsl({hsl.h}, {hsl.s}%, {hsl.l}%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Information Section */}
      <div className="mt-12 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-2xl p-8 border border-blue-200">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            🎨 Color Theory & Digital Representation
          </h3>
          <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
            Understanding color representation is fundamental in computer science and digital design. 
            Colors are encoded using mathematical systems that computers can process and display.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-red-200">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                <span className="text-white font-bold text-xl">RGB</span>
              </div>
              <h4 className="text-2xl font-bold text-red-800">RGB Color Model</h4>
            </div>
            <div className="space-y-3 text-lg text-gray-700">
              <p><strong>Red, Green, Blue</strong> - Additive color model</p>
              <p><strong>Range:</strong> 0-255 for each channel</p>
              <p><strong>Total Colors:</strong> 16.7 million combinations</p>
              <p><strong>Usage:</strong> Digital displays, web design</p>
              <p><strong>Memory:</strong> 24 bits (8 bits per channel)</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-200">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                <span className="text-white font-bold text-xl">HEX</span>
              </div>
              <h4 className="text-2xl font-bold text-blue-800">Hexadecimal</h4>
            </div>
            <div className="space-y-3 text-lg text-gray-700">
              <p><strong>Base-16</strong> number system</p>
              <p><strong>Format:</strong> #RRGGBB</p>
              <p><strong>Digits:</strong> 0-9, A-F</p>
              <p><strong>Compact:</strong> 6 characters represent 24 bits</p>
              <p><strong>Web Standard:</strong> CSS and HTML</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-purple-200">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                <span className="text-white font-bold text-xl">HSL</span>
              </div>
              <h4 className="text-2xl font-bold text-purple-800">HSL Model</h4>
            </div>
            <div className="space-y-3 text-lg text-gray-700">
              <p><strong>Hue:</strong> Color wheel position (0-360°)</p>
              <p><strong>Saturation:</strong> Color intensity (0-100%)</p>
              <p><strong>Lightness:</strong> Brightness level (0-100%)</p>
              <p><strong>Intuitive:</strong> Matches human perception</p>
              <p><strong>Design:</strong> Easy color manipulation</p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 max-w-4xl mx-auto">
            <h4 className="text-2xl font-bold text-gray-800 mb-4">💡 Pro Tips for APCSP</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg text-gray-700">
              <div className="text-left space-y-2">
                <p><strong>Binary Connection:</strong> Each RGB channel uses 8 bits (1 byte)</p>
                <p><strong>Hexadecimal Math:</strong> FF = 255 in decimal = 11111111 in binary</p>
                <p><strong>Color Depth:</strong> 24-bit color = 2²⁴ = 16,777,216 colors</p>
              </div>
              <div className="text-left space-y-2">
                <p><strong>Web Standards:</strong> HEX is preferred for CSS styling</p>
                <p><strong>Accessibility:</strong> Consider contrast ratios for readability</p>
                <p><strong>Compression:</strong> Color reduction saves file size</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Cryptography Tool Component
const CryptographyTool: React.FC = () => {
  const [message, setMessage] = useState('HELLO WORLD');
  const [shift, setShift] = useState(3);
  const [encryptedMessage, setEncryptedMessage] = useState('');
  const [selectedCipher, setSelectedCipher] = useState('caesar');

  const caesarCipher = (text: string, shift: number) => {
    return text.split('').map(char => {
      if (char.match(/[A-Z]/)) {
        return String.fromCharCode(((char.charCodeAt(0) - 65 + shift) % 26) + 65);
      } else if (char.match(/[a-z]/)) {
        return String.fromCharCode(((char.charCodeAt(0) - 97 + shift) % 26) + 97);
      }
      return char;
    }).join('');
  };

  const atbashCipher = (text: string) => {
    return text.split('').map(char => {
      if (char.match(/[A-Z]/)) {
        return String.fromCharCode(90 - (char.charCodeAt(0) - 65));
      } else if (char.match(/[a-z]/)) {
        return String.fromCharCode(122 - (char.charCodeAt(0) - 97));
      }
      return char;
    }).join('');
  };

  useEffect(() => {
    if (selectedCipher === 'caesar') {
      setEncryptedMessage(caesarCipher(message, shift));
    } else if (selectedCipher === 'atbash') {
      setEncryptedMessage(atbashCipher(message));
    }
  }, [message, shift, selectedCipher]);

  return (
    <div className="p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Cryptography & Ciphers</h2>
        <p className="text-gray-600 text-lg">Explore encryption and decryption techniques</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Cipher Controls */}
        <div className="space-y-6">
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
            <h3 className="text-xl font-bold text-blue-800 mb-4">Cipher Selection</h3>
            <div className="space-y-3">
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  value="caesar"
                  checked={selectedCipher === 'caesar'}
                  onChange={(e) => setSelectedCipher(e.target.value)}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-lg font-medium">Caesar Cipher</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  value="atbash"
                  checked={selectedCipher === 'atbash'}
                  onChange={(e) => setSelectedCipher(e.target.value)}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-lg font-medium">Atbash Cipher</span>
              </label>
            </div>
          </div>

          <div className="bg-green-50 rounded-xl p-6 border border-green-200">
            <h3 className="text-xl font-bold text-green-800 mb-4">Message Input</h3>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value.toUpperCase())}
              className="w-full p-3 border border-green-300 rounded-lg font-mono text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              rows={3}
              placeholder="Enter your message..."
            />
          </div>

          {selectedCipher === 'caesar' && (
            <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
              <h3 className="text-xl font-bold text-purple-800 mb-4">Shift Value: {shift}</h3>
              <input
                type="range"
                min="1"
                max="25"
                value={shift}
                onChange={(e) => setShift(parseInt(e.target.value))}
                className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-sm text-purple-600 mt-2">
                <span>1</span>
                <span>25</span>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="space-y-6">
          <div className="bg-red-50 rounded-xl p-6 border border-red-200">
            <h3 className="text-xl font-bold text-red-800 mb-4">Encrypted Message</h3>
            <div className="p-4 bg-white rounded-lg border font-mono text-lg min-h-[100px] flex items-center">
              {encryptedMessage || 'Encrypted message will appear here...'}
            </div>
          </div>

          <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
            <h3 className="text-xl font-bold text-yellow-800 mb-4">Cipher Information</h3>
            {selectedCipher === 'caesar' ? (
              <div className="space-y-2 text-lg text-yellow-700">
                <p><strong>Type:</strong> Substitution Cipher</p>
                <p><strong>Method:</strong> Shift each letter by {shift} positions</p>
                <p><strong>Security:</strong> Very weak (only 25 possible keys)</p>
                <p><strong>History:</strong> Used by Julius Caesar</p>
              </div>
            ) : (
              <div className="space-y-2 text-lg text-yellow-700">
                <p><strong>Type:</strong> Substitution Cipher</p>
                <p><strong>Method:</strong> Replace A↔Z, B↔Y, C↔X, etc.</p>
                <p><strong>Security:</strong> Weak (monoalphabetic)</p>
                <p><strong>History:</strong> Ancient Hebrew cipher</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Enhanced Cryptography Facts */}
      <div className="mt-12 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-8 border border-blue-200">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            🔐 Cryptography in Computer Science
          </h3>
          <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
            Cryptography is essential for digital security, protecting everything from online banking 
            to private messages. Understanding encryption principles is crucial for cybersecurity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-200">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                <Key className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-blue-800">Symmetric Encryption</h4>
            </div>
            <div className="space-y-3 text-lg text-gray-700">
              <p><strong>Same Key:</strong> Encrypt and decrypt with one key</p>
              <p><strong>Fast:</strong> Efficient for large amounts of data</p>
              <p><strong>Examples:</strong> AES, DES, Caesar Cipher</p>
              <p><strong>Challenge:</strong> Secure key distribution</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-purple-200">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-purple-800">Asymmetric Encryption</h4>
            </div>
            <div className="space-y-3 text-lg text-gray-700">
              <p><strong>Key Pair:</strong> Public and private keys</p>
              <p><strong>Secure:</strong> No shared secret needed</p>
              <p><strong>Examples:</strong> RSA, ECC</p>
              <p><strong>Usage:</strong> Digital signatures, HTTPS</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-green-200">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-green-800">Hash Functions</h4>
            </div>
            <div className="space-y-3 text-lg text-gray-700">
              <p><strong>One-Way:</strong> Cannot be reversed</p>
              <p><strong>Fixed Size:</strong> Always same output length</p>
              <p><strong>Examples:</strong> SHA-256, MD5</p>
              <p><strong>Uses:</strong> Passwords, data integrity</p>
            </div>
          </div>
        </div>

        {/* Alphabet Reference */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 mb-8">
          <h4 className="text-2xl font-bold text-gray-800 mb-4 text-center">📝 Alphabet Reference</h4>
          <div className="grid grid-cols-13 gap-2 text-center">
            {Array.from({ length: 26 }, (_, i) => {
              const letter = String.fromCharCode(65 + i);
              const number = i + 1;
              return (
                <div key={i} className="bg-gray-50 rounded-lg p-2 border">
                  <div className="font-bold text-lg text-gray-800">{letter}</div>
                  <div className="text-sm text-gray-600">{number}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tesla STEM Puzzles PDF */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-orange-200">
          <div className="text-center">
            <h4 className="text-2xl font-bold text-orange-800 mb-4">📚 Additional Resources</h4>
            <div className="flex items-center justify-center space-x-4">
              <FileText className="h-8 w-8 text-orange-600" />
              <div className="text-left">
                <h5 className="text-xl font-bold text-orange-800">Tesla STEM Puzzles Book 2025</h5>
                <p className="text-lg text-orange-700">Computational Tesla Puzzles</p>
              </div>
              <a
                href="/cryptography/Computational Tesla Puzzles 2025.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center space-x-2"
              >
                <Download className="h-5 w-5" />
                <span>Download PDF</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Binary Practice Component
const BinaryPractice: React.FC = () => {
  const [decimal, setDecimal] = useState(42);
  const [binary, setBinary] = useState('101010');
  const [hex, setHex] = useState('2A');

  const decimalToBinary = (num: number) => {
    return num.toString(2);
  };

  const decimalToHex = (num: number) => {
    return num.toString(16).toUpperCase();
  };

  const binaryToDecimal = (bin: string) => {
    return parseInt(bin, 2);
  };

  const hexToDecimal = (hex: string) => {
    return parseInt(hex, 16);
  };

  const updateFromDecimal = (num: number) => {
    if (num >= 0 && num <= 255) {
      setDecimal(num);
      setBinary(decimalToBinary(num));
      setHex(decimalToHex(num));
    }
  };

  const updateFromBinary = (bin: string) => {
    if (/^[01]+$/.test(bin) && bin.length <= 8) {
      setBinary(bin);
      const dec = binaryToDecimal(bin);
      setDecimal(dec);
      setHex(decimalToHex(dec));
    }
  };

  const updateFromHex = (hexValue: string) => {
    if (/^[0-9A-Fa-f]+$/.test(hexValue) && hexValue.length <= 2) {
      setHex(hexValue.toUpperCase());
      const dec = hexToDecimal(hexValue);
      setDecimal(dec);
      setBinary(decimalToBinary(dec));
    }
  };

  return (
    <div className="p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Binary Practice</h2>
        <p className="text-gray-600 text-lg">Master number system conversions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Decimal */}
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
          <h3 className="text-xl font-bold text-blue-800 mb-4">Decimal (Base 10)</h3>
          <input
            type="number"
            min="0"
            max="255"
            value={decimal}
            onChange={(e) => updateFromDecimal(parseInt(e.target.value) || 0)}
            className="w-full p-3 border border-blue-300 rounded-lg text-2xl font-mono text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="mt-4 text-center">
            <div className="text-sm text-blue-600 font-medium">Range: 0-255</div>
            <div className="text-sm text-blue-600">Uses digits: 0-9</div>
          </div>
        </div>

        {/* Binary */}
        <div className="bg-green-50 rounded-xl p-6 border border-green-200">
          <h3 className="text-xl font-bold text-green-800 mb-4">Binary (Base 2)</h3>
          <input
            type="text"
            value={binary}
            onChange={(e) => updateFromBinary(e.target.value)}
            className="w-full p-3 border border-green-300 rounded-lg text-2xl font-mono text-center focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="10101010"
          />
          <div className="mt-4 text-center">
            <div className="text-sm text-green-600 font-medium">8 bits max</div>
            <div className="text-sm text-green-600">Uses digits: 0, 1</div>
          </div>
        </div>

        {/* Hexadecimal */}
        <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
          <h3 className="text-xl font-bold text-purple-800 mb-4">Hexadecimal (Base 16)</h3>
          <input
            type="text"
            value={hex}
            onChange={(e) => updateFromHex(e.target.value)}
            className="w-full p-3 border border-purple-300 rounded-lg text-2xl font-mono text-center focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="FF"
          />
          <div className="mt-4 text-center">
            <div className="text-sm text-purple-600 font-medium">2 digits max</div>
            <div className="text-sm text-purple-600">Uses: 0-9, A-F</div>
          </div>
        </div>
      </div>

      {/* Binary Breakdown */}
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Binary Breakdown</h3>
        <div className="grid grid-cols-8 gap-2">
          {Array.from({ length: 8 }, (_, i) => {
            const power = 7 - i;
            const value = Math.pow(2, power);
            const bit = binary.padStart(8, '0')[i] || '0';
            return (
              <div key={i} className="text-center">
                <div className="bg-white rounded-lg p-3 border-2 border-gray-300 mb-2">
                  <div className="text-sm text-gray-600">2^{power}</div>
                  <div className="text-lg font-bold text-gray-800">{value}</div>
                  <div className="text-2xl font-bold text-blue-600">{bit}</div>
                </div>
                <div className="text-sm text-gray-600">
                  {bit === '1' ? value : 0}
                </div>
              </div>
            );
          })}
        </div>
        <div className="text-center mt-4">
          <div className="text-lg text-gray-700">
            Sum: {binary.padStart(8, '0').split('').map((bit, i) => 
              bit === '1' ? Math.pow(2, 7 - i) : 0
            ).filter(val => val > 0).join(' + ')} = {decimal}
          </div>
        </div>
      </div>

      {/* Enhanced Information Section */}
      <div className="bg-gradient-to-r from-green-50 via-blue-50 to-purple-50 rounded-2xl p-8 border border-green-200">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-purple-600 bg-clip-text text-transparent mb-4">
            🔢 Number Systems in Computing
          </h3>
          <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
            Different number systems are fundamental to computer science. Binary is the language of computers, 
            while hexadecimal provides a compact way to represent binary data.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-200">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                <span className="text-white font-bold text-xl">10</span>
              </div>
              <h4 className="text-2xl font-bold text-blue-800">Decimal System</h4>
            </div>
            <div className="space-y-3 text-lg text-gray-700">
              <p><strong>Base:</strong> 10 (ten digits: 0-9)</p>
              <p><strong>Human-Friendly:</strong> Natural counting system</p>
              <p><strong>Place Values:</strong> Powers of 10</p>
              <p><strong>Example:</strong> 123 = 1×10² + 2×10¹ + 3×10⁰</p>
              <p><strong>Usage:</strong> Everyday mathematics</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-green-200">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h4 className="text-2xl font-bold text-green-800">Binary System</h4>
            </div>
            <div className="space-y-3 text-lg text-gray-700">
              <p><strong>Base:</strong> 2 (two digits: 0, 1)</p>
              <p><strong>Computer Language:</strong> On/Off, True/False</p>
              <p><strong>Place Values:</strong> Powers of 2</p>
              <p><strong>Example:</strong> 101 = 1×2² + 0×2¹ + 1×2⁰ = 5</p>
              <p><strong>Usage:</strong> All digital systems</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-purple-200">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                <span className="text-white font-bold text-xl">16</span>
              </div>
              <h4 className="text-2xl font-bold text-purple-800">Hexadecimal</h4>
            </div>
            <div className="space-y-3 text-lg text-gray-700">
              <p><strong>Base:</strong> 16 (digits: 0-9, A-F)</p>
              <p><strong>Compact:</strong> Represents 4 binary digits</p>
              <p><strong>Place Values:</strong> Powers of 16</p>
              <p><strong>Example:</strong> 2A = 2×16¹ + 10×16⁰ = 42</p>
              <p><strong>Usage:</strong> Memory addresses, colors</p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 max-w-4xl mx-auto">
            <h4 className="text-2xl font-bold text-gray-800 mb-4">💡 APCSP Key Concepts</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg text-gray-700">
              <div className="text-left space-y-2">
                <p><strong>Bit:</strong> Single binary digit (0 or 1)</p>
                <p><strong>Byte:</strong> 8 bits (can represent 0-255)</p>
                <p><strong>Overflow:</strong> When numbers exceed storage capacity</p>
              </div>
              <div className="text-left space-y-2">
                <p><strong>ASCII:</strong> Text encoding using 7-8 bits per character</p>
                <p><strong>RGB Colors:</strong> Each channel uses 8 bits (0-255)</p>
                <p><strong>IP Addresses:</strong> Four 8-bit numbers (IPv4)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Logic Gate Simulator Component
const LogicGateSimulator: React.FC = () => {
  const [inputA, setInputA] = useState(false);
  const [inputB, setInputB] = useState(false);
  const [selectedGate, setSelectedGate] = useState('AND');

  const gates = {
    AND: (a: boolean, b: boolean) => a && b,
    OR: (a: boolean, b: boolean) => a || b,
    NOT: (a: boolean) => !a,
    NAND: (a: boolean, b: boolean) => !(a && b),
    NOR: (a: boolean, b: boolean) => !(a || b),
    XOR: (a: boolean, b: boolean) => a !== b,
    XNOR: (a: boolean, b: boolean) => a === b
  };

  const getOutput = () => {
    if (selectedGate === 'NOT') {
      return gates[selectedGate](inputA);
    }
    return gates[selectedGate as keyof typeof gates](inputA, inputB);
  };

  const truthTable = () => {
    if (selectedGate === 'NOT') {
      return [
        { a: false, output: gates.NOT(false) },
        { a: true, output: gates.NOT(true) }
      ];
    }
    
    return [
      { a: false, b: false, output: gates[selectedGate as keyof typeof gates](false, false) },
      { a: false, b: true, output: gates[selectedGate as keyof typeof gates](false, true) },
      { a: true, b: false, output: gates[selectedGate as keyof typeof gates](true, false) },
      { a: true, b: true, output: gates[selectedGate as keyof typeof gates](true, true) }
    ];
  };

  return (
    <div className="p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Logic Gate Simulator</h2>
        <p className="text-gray-600 text-lg">Explore digital logic gates and Boolean operations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Simulator */}
        <div className="space-y-6">
          {/* Gate Selection */}
          <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
            <h3 className="text-xl font-bold text-orange-800 mb-4">Select Logic Gate</h3>
            <div className="grid grid-cols-2 gap-3">
              {Object.keys(gates).map((gate) => (
                <button
                  key={gate}
                  onClick={() => setSelectedGate(gate)}
                  className={`p-3 rounded-lg border-2 transition-all duration-300 font-medium ${
                    selectedGate === gate
                      ? 'border-orange-500 bg-orange-100 text-orange-800'
                      : 'border-gray-300 hover:border-orange-300 hover:bg-orange-50'
                  }`}
                >
                  {gate}
                </button>
              ))}
            </div>
          </div>

          {/* Inputs */}
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
            <h3 className="text-xl font-bold text-blue-800 mb-4">Inputs</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium">Input A:</span>
                <button
                  onClick={() => setInputA(!inputA)}
                  className={`w-16 h-8 rounded-full transition-all duration-300 ${
                    inputA ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-6 h-6 bg-white rounded-full transition-transform duration-300 ${
                    inputA ? 'translate-x-8' : 'translate-x-1'
                  }`}></div>
                </button>
                <span className={`text-lg font-bold ${inputA ? 'text-green-600' : 'text-red-600'}`}>
                  {inputA ? '1' : '0'}
                </span>
              </div>
              
              {selectedGate !== 'NOT' && (
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium">Input B:</span>
                  <button
                    onClick={() => setInputB(!inputB)}
                    className={`w-16 h-8 rounded-full transition-all duration-300 ${
                      inputB ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-6 h-6 bg-white rounded-full transition-transform duration-300 ${
                      inputB ? 'translate-x-8' : 'translate-x-1'
                    }`}></div>
                  </button>
                  <span className={`text-lg font-bold ${inputB ? 'text-green-600' : 'text-red-600'}`}>
                    {inputB ? '1' : '0'}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Output */}
          <div className="bg-green-50 rounded-xl p-6 border border-green-200">
            <h3 className="text-xl font-bold text-green-800 mb-4">Output</h3>
            <div className="text-center">
              <div className={`w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl font-bold text-white transition-all duration-300 ${
                getOutput() ? 'bg-green-500 animate-pulse' : 'bg-red-500'
              }`}>
                {getOutput() ? '1' : '0'}
              </div>
              <div className="text-lg font-medium text-gray-700">
                {selectedGate} Gate Output: <span className={`font-bold ${getOutput() ? 'text-green-600' : 'text-red-600'}`}>
                  {getOutput() ? 'TRUE' : 'FALSE'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Truth Table */}
        <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
          <h3 className="text-xl font-bold text-purple-800 mb-4">Truth Table - {selectedGate} Gate</h3>
          <div className="overflow-hidden rounded-lg border border-purple-300">
            <table className="w-full">
              <thead className="bg-purple-200">
                <tr>
                  <th className="p-3 text-left font-bold text-purple-800">A</th>
                  {selectedGate !== 'NOT' && <th className="p-3 text-left font-bold text-purple-800">B</th>}
                  <th className="p-3 text-left font-bold text-purple-800">Output</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {truthTable().map((row, index) => (
                  <tr key={index} className="border-t border-purple-200">
                    <td className="p-3 font-mono text-lg">{row.a ? '1' : '0'}</td>
                    {selectedGate !== 'NOT' && <td className="p-3 font-mono text-lg">{(row as any).b ? '1' : '0'}</td>}
                    <td className={`p-3 font-mono text-lg font-bold ${row.output ? 'text-green-600' : 'text-red-600'}`}>
                      {row.output ? '1' : '0'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Enhanced Information Section */}
      <div className="mt-12 bg-gradient-to-r from-orange-50 via-red-50 to-pink-50 rounded-2xl p-8 border border-orange-200">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
            ⚡ Digital Logic & Boolean Algebra
          </h3>
          <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
            Logic gates are the fundamental building blocks of digital circuits. They perform Boolean operations 
            that form the basis of all computer processing and decision-making.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-200">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                <span className="text-white font-bold text-lg">AND</span>
              </div>
              <h4 className="text-2xl font-bold text-blue-800">Basic Gates</h4>
            </div>
            <div className="space-y-3 text-lg text-gray-700">
              <p><strong>AND:</strong> Output true only if both inputs are true</p>
              <p><strong>OR:</strong> Output true if at least one input is true</p>
              <p><strong>NOT:</strong> Output opposite of input (inverter)</p>
              <p><strong>Foundation:</strong> All other gates built from these</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-purple-200">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                <span className="text-white font-bold text-lg">NAND</span>
              </div>
              <h4 className="text-2xl font-bold text-purple-800">Compound Gates</h4>
            </div>
            <div className="space-y-3 text-lg text-gray-700">
              <p><strong>NAND:</strong> NOT AND (opposite of AND)</p>
              <p><strong>NOR:</strong> NOT OR (opposite of OR)</p>
              <p><strong>XOR:</strong> Exclusive OR (different inputs)</p>
              <p><strong>Universal:</strong> NAND can create any logic function</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-green-200">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                <Cpu className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-green-800">Applications</h4>
            </div>
            <div className="space-y-3 text-lg text-gray-700">
              <p><strong>Processors:</strong> CPU arithmetic and logic units</p>
              <p><strong>Memory:</strong> Storage and retrieval systems</p>
              <p><strong>Control:</strong> Decision-making circuits</p>
              <p><strong>Programming:</strong> Boolean expressions in code</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 max-w-4xl mx-auto">
            <h4 className="text-2xl font-bold text-gray-800 mb-4">🔗 Boolean Algebra Laws</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg text-gray-700">
              <div className="text-left space-y-2">
                <p><strong>Identity:</strong> A AND 1 = A, A OR 0 = A</p>
                <p><strong>Null:</strong> A AND 0 = 0, A OR 1 = 1</p>
                <p><strong>Idempotent:</strong> A AND A = A, A OR A = A</p>
              </div>
              <div className="text-left space-y-2">
                <p><strong>Complement:</strong> A AND NOT A = 0</p>
                <p><strong>De Morgan's:</strong> NOT(A AND B) = NOT A OR NOT B</p>
                <p><strong>Distributive:</strong> A AND (B OR C) = (A AND B) OR (A AND C)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Citation */}
        <div className="mt-8 text-center">
          <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-200 max-w-2xl mx-auto">
            <p className="text-lg text-gray-700 mb-2">
              <strong>Reference:</strong> Truth Tables and Logic Gates
            </p>
            <a
              href="http://trashworldnews.com/files/digital_logic_design.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center space-x-2"
            >
              <ExternalLink className="h-4 w-4" />
              <span>Digital Logic Design PDF</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// Cybersecurity Scenarios Component
const CybersecurityScenarios: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState(0);

  const scenarios = [
    {
      title: "Phishing Email Detection",
      description: "Learn to identify suspicious emails and protect your personal information",
      content: "You receive an email claiming to be from your bank asking you to verify your account information by clicking a link.",
      question: "What should you do?",
      options: [
        "Click the link immediately to verify your account",
        "Reply with your account information",
        "Contact your bank directly using their official phone number",
        "Forward the email to friends to warn them"
      ],
      correct: 2,
      explanation: "Always contact your bank directly using official contact information. Legitimate banks never ask for sensitive information via email."
    },
    {
      title: "Password Security",
      description: "Understand the importance of strong, unique passwords",
      content: "You need to create a password for a new online account. You want something you can remember easily.",
      question: "Which password is the most secure?",
      options: [
        "password123",
        "MyDog'sName2023!",
        "Tr0ub4dor&3",
        "123456789"
      ],
      correct: 2,
      explanation: "Strong passwords use a mix of uppercase, lowercase, numbers, and symbols. Avoid personal information and common patterns."
    },
    {
      title: "Social Engineering",
      description: "Recognize manipulation tactics used by cybercriminals",
      content: "Someone calls claiming to be from IT support, saying they need your password to fix a security issue on your computer.",
      question: "How should you respond?",
      options: [
        "Give them your password since they're from IT",
        "Ask for their employee ID and verify with your IT department",
        "Hang up and ignore the call",
        "Give them a fake password to test them"
      ],
      correct: 1,
      explanation: "Always verify the identity of anyone requesting sensitive information. Legitimate IT staff have other ways to access systems."
    }
  ];

  const currentScenario = scenarios[selectedScenario];

  return (
    <div className="p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Cybersecurity Scenarios</h2>
        <p className="text-gray-600 text-lg">Learn to identify and respond to digital security threats</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Scenario Selection */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Security Scenarios</h3>
          {scenarios.map((scenario, index) => (
            <button
              key={index}
              onClick={() => setSelectedScenario(index)}
              className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                selectedScenario === index
                  ? 'border-teal-500 bg-teal-50 shadow-lg'
                  : 'border-gray-200 hover:border-teal-300 hover:bg-teal-50'
              }`}
            >
              <h4 className={`font-bold mb-2 ${selectedScenario === index ? 'text-teal-800' : 'text-gray-900'}`}>
                {scenario.title}
              </h4>
              <p className={`text-sm ${selectedScenario === index ? 'text-teal-700' : 'text-gray-600'}`}>
                {scenario.description}
              </p>
            </button>
          ))}
        </div>

        {/* Scenario Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-teal-50 rounded-xl p-6 border border-teal-200">
            <h3 className="text-2xl font-bold text-teal-800 mb-4">{currentScenario.title}</h3>
            <div className="bg-white rounded-lg p-4 border border-teal-200 mb-4">
              <p className="text-lg text-gray-800 leading-relaxed">{currentScenario.content}</p>
            </div>
            <h4 className="text-xl font-bold text-teal-800 mb-4">{currentScenario.question}</h4>
            <div className="space-y-3">
              {currentScenario.options.map((option, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                    index === currentScenario.correct
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-bold ${
                      index === currentScenario.correct
                        ? 'border-green-500 bg-green-500 text-white'
                        : 'border-gray-400 text-gray-600'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="text-lg">{option}</span>
                    {index === currentScenario.correct && (
                      <CheckCircle className="h-6 w-6 text-green-600 ml-auto" />
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h5 className="font-bold text-blue-800 mb-2">Explanation:</h5>
              <p className="text-blue-700 leading-relaxed">{currentScenario.explanation}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Security Guide */}
      <div className="mt-12 bg-gradient-to-r from-teal-50 via-cyan-50 to-blue-50 rounded-2xl p-8 border border-teal-200">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent mb-4">
            🛡️ Comprehensive Security Guide
          </h3>
          <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
            Cybersecurity is everyone's responsibility. Understanding common threats and best practices 
            helps protect your digital life and sensitive information.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-red-200">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-red-800">Common Threats</h4>
            </div>
            <div className="space-y-3 text-lg text-gray-700">
              <p><strong>Phishing:</strong> Fake emails/websites stealing credentials</p>
              <p><strong>Malware:</strong> Viruses, ransomware, spyware</p>
              <p><strong>Social Engineering:</strong> Psychological manipulation</p>
              <p><strong>Data Breaches:</strong> Unauthorized access to databases</p>
              <p><strong>Identity Theft:</strong> Stealing personal information</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-green-200">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                <Key className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-green-800">Password Security</h4>
            </div>
            <div className="space-y-3 text-lg text-gray-700">
              <p><strong>Length:</strong> At least 12 characters long</p>
              <p><strong>Complexity:</strong> Mix of letters, numbers, symbols</p>
              <p><strong>Uniqueness:</strong> Different password for each account</p>
              <p><strong>Manager:</strong> Use password management tools</p>
              <p><strong>2FA:</strong> Enable two-factor authentication</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-200">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-blue-800">Safe Browsing</h4>
            </div>
            <div className="space-y-3 text-lg text-gray-700">
              <p><strong>HTTPS:</strong> Look for secure connection indicators</p>
              <p><strong>Downloads:</strong> Only from trusted sources</p>
              <p><strong>Updates:</strong> Keep software and browsers current</p>
              <p><strong>Pop-ups:</strong> Avoid clicking suspicious ads</p>
              <p><strong>Public WiFi:</strong> Avoid sensitive activities</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-purple-200">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                <Monitor className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-purple-800">Device Security</h4>
            </div>
            <div className="space-y-3 text-lg text-gray-700">
              <p><strong>Lock Screens:</strong> Use PINs, passwords, or biometrics</p>
              <p><strong>Automatic Updates:</strong> Enable security patches</p>
              <p><strong>Antivirus:</strong> Install reputable security software</p>
              <p><strong>Backups:</strong> Regular data backups to secure locations</p>
              <p><strong>Remote Wipe:</strong> Enable for lost/stolen devices</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-orange-200">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                <Info className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-orange-800">Privacy Protection</h4>
            </div>
            <div className="space-y-3 text-lg text-gray-700">
              <p><strong>Social Media:</strong> Review privacy settings regularly</p>
              <p><strong>Personal Info:</strong> Limit sharing of sensitive data</p>
              <p><strong>Location Services:</strong> Disable when not needed</p>
              <p><strong>Cookies:</strong> Understand tracking and data collection</p>
              <p><strong>VPN:</strong> Use for additional privacy protection</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-teal-200">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-teal-800">Incident Response</h4>
            </div>
            <div className="space-y-3 text-lg text-gray-700">
              <p><strong>Suspicious Activity:</strong> Report to appropriate authorities</p>
              <p><strong>Compromised Accounts:</strong> Change passwords immediately</p>
              <p><strong>Malware Detection:</strong> Disconnect and scan systems</p>
              <p><strong>Data Breach:</strong> Monitor accounts and credit reports</p>
              <p><strong>Documentation:</strong> Keep records of security incidents</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 max-w-4xl mx-auto">
            <h4 className="text-2xl font-bold text-gray-800 mb-4">🎯 APCSP Security Concepts</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg text-gray-700">
              <div className="text-left space-y-2">
                <p><strong>Authentication:</strong> Verifying user identity</p>
                <p><strong>Authorization:</strong> Controlling access to resources</p>
                <p><strong>Encryption:</strong> Protecting data confidentiality</p>
                <p><strong>Digital Certificates:</strong> Verifying website authenticity</p>
              </div>
              <div className="text-left space-y-2">
                <p><strong>Firewalls:</strong> Network traffic filtering</p>
                <p><strong>Intrusion Detection:</strong> Monitoring for threats</p>
                <p><strong>Risk Assessment:</strong> Evaluating security vulnerabilities</p>
                <p><strong>Security Policies:</strong> Organizational guidelines</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Python Resources Component
const PythonResources: React.FC = () => {
  const resources = [
    {
      title: "CodeStepByStep",
      description: "Interactive Python practice problems with instant feedback",
      url: "https://codestepbystep.com/problem/list/python",
      icon: "/src/assets/python-icons/codestep.png",
      category: "Practice Problems",
      difficulty: "Beginner to Advanced",
      features: ["Step-by-step solutions", "Instant feedback", "Progress tracking", "Comprehensive problem set"]
    },
    {
      title: "CMU CS Academy",
      description: "Carnegie Mellon's interactive Python course with graphics",
      url: "https://academy.cs.cmu.edu/",
      icon: "/src/assets/python-icons/CMU.png",
      category: "Interactive Course",
      difficulty: "Beginner Friendly",
      features: ["Visual programming", "Interactive exercises", "Graphics and animations", "Structured curriculum"]
    },
    {
      title: "Exercism",
      description: "Code practice and mentorship platform with Python track",
      url: "https://exercism.org/tracks/python",
      icon: "/src/assets/python-icons/EXCERCISM.png",
      category: "Mentored Practice",
      difficulty: "All Levels",
      features: ["Mentor feedback", "Real-world problems", "Community support", "Skill progression"]
    },
    {
      title: "Python.org",
      description: "Official Python documentation and tutorials",
      url: "https://www.python.org/",
      icon: "/src/assets/python-icons/PYTHON.png",
      category: "Documentation",
      difficulty: "Reference",
      features: ["Official documentation", "Language reference", "Standard library", "Community resources"]
    }
  ];

  return (
    <div className="p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Python Resources</h2>
        <p className="text-gray-600 text-lg">Essential Python programming resources and practice platforms</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {resources.map((resource, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="flex items-start space-x-4 mb-4">
              <img 
                src={resource.icon} 
                alt={resource.title}
                className="w-16 h-16 rounded-lg object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/src/assets/python-icons/image.png';
                }}
              />
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{resource.title}</h3>
                <p className="text-gray-600 mb-2">{resource.description}</p>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-medium">
                    {resource.category}
                  </span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
                    {resource.difficulty}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <h4 className="font-bold text-gray-800 mb-2">Features:</h4>
              <ul className="space-y-1">
                {resource.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-2 text-gray-700">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <ExternalLink className="h-5 w-5" />
              <span>Visit {resource.title}</span>
            </a>
          </div>
        ))}
      </div>

      {/* Enhanced Information Section */}
      <div className="bg-gradient-to-r from-yellow-50 via-orange-50 to-red-50 rounded-2xl p-8 border border-yellow-200">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-4">
            🐍 Python Programming Mastery
          </h3>
          <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
            Python is one of the most popular programming languages for beginners and professionals alike. 
            Its simple syntax and powerful capabilities make it perfect for learning programming concepts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-200">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                <Code className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-blue-800">Core Concepts</h4>
            </div>
            <div className="space-y-3 text-lg text-gray-700">
              <p><strong>Variables & Data Types:</strong> Strings, integers, floats, booleans</p>
              <p><strong>Control Structures:</strong> If statements, loops, functions</p>
              <p><strong>Data Structures:</strong> Lists, dictionaries, tuples, sets</p>
              <p><strong>Object-Oriented:</strong> Classes, objects, inheritance</p>
              <p><strong>Error Handling:</strong> Try/except blocks, debugging</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-green-200">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-green-800">APCSP Applications</h4>
            </div>
            <div className="space-y-3 text-lg text-gray-700">
              <p><strong>Algorithms:</strong> Sorting, searching, recursion</p>
              <p><strong>Data Analysis:</strong> Processing and visualizing data</p>
              <p><strong>Simulations:</strong> Modeling real-world scenarios</p>
              <p><strong>Web Development:</strong> Creating interactive websites</p>
              <p><strong>Problem Solving:</strong> Breaking down complex problems</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-purple-200">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-purple-800">Best Practices</h4>
            </div>
            <div className="space-y-3 text-lg text-gray-700">
              <p><strong>Code Style:</strong> Follow PEP 8 conventions</p>
              <p><strong>Documentation:</strong> Write clear comments and docstrings</p>
              <p><strong>Testing:</strong> Write unit tests for your functions</p>
              <p><strong>Version Control:</strong> Use Git for project management</p>
              <p><strong>Libraries:</strong> Leverage existing modules and packages</p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 max-w-4xl mx-auto">
            <h4 className="text-2xl font-bold text-gray-800 mb-4">💡 Learning Path Recommendations</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg text-gray-700">
              <div className="text-left space-y-2">
                <p><strong>Beginners:</strong> Start with CMU CS Academy for visual learning</p>
                <p><strong>Practice:</strong> Use CodeStepByStep for structured problems</p>
                <p><strong>Mentorship:</strong> Join Exercism for community feedback</p>
              </div>
              <div className="text-left space-y-2">
                <p><strong>Reference:</strong> Keep Python.org documentation handy</p>
                <p><strong>Projects:</strong> Build real applications to apply concepts</p>
                <p><strong>Community:</strong> Participate in Python forums and groups</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticeTools;