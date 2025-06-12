import React, { useState } from 'react';
import { 
  Palette, Binary, Shield, Zap, Code, Monitor, 
  ChevronRight, CheckCircle, XCircle, RotateCcw, 
  Play, Settings, BookOpen, Target, Award,
  ExternalLink, Lightbulb, Brain, Eye, EyeOff,
  AlertTriangle, Lock, Wifi, Database, Globe,
  ArrowRight, Star, Trophy, Sparkles
} from 'lucide-react';

const PracticeTools: React.FC = () => {
  const [activeTab, setActiveTab] = useState('rgb');
  const [rgbMode, setRgbMode] = useState<'practice' | 'converter'>('practice');
  const [binaryMode, setBinaryMode] = useState<'practice' | 'converter'>('practice');
  const [cipherMode, setCipherMode] = useState<'practice' | 'encoder'>('practice');
  const [logicMode, setLogicMode] = useState<'practice' | 'simulator'>('practice');
  const [cybersecurityMode, setCybersecurityMode] = useState<'practice' | 'guide'>('practice');

  // RGB Practice State
  const [rgbQuestion, setRgbQuestion] = useState({ r: 255, g: 0, b: 0 });
  const [rgbAnswer, setRgbAnswer] = useState('');
  const [rgbScore, setRgbScore] = useState(0);
  const [rgbTotal, setRgbTotal] = useState(0);
  const [rgbShowResult, setRgbShowResult] = useState(false);
  const [rgbCorrect, setRgbCorrect] = useState(false);

  // RGB Converter State
  const [rgbR, setRgbR] = useState(255);
  const [rgbG, setRgbG] = useState(128);
  const [rgbB, setRgbB] = useState(0);
  const [hexInput, setHexInput] = useState('#FF8000');

  // Binary Practice State
  const [binaryQuestion, setBinaryQuestion] = useState({ type: 'decimal-to-binary', value: 42 });
  const [binaryAnswer, setBinaryAnswer] = useState('');
  const [binaryScore, setBinaryScore] = useState(0);
  const [binaryTotal, setBinaryTotal] = useState(0);
  const [binaryShowResult, setBinaryShowResult] = useState(false);
  const [binaryCorrect, setBinaryCorrect] = useState(false);

  // Binary Converter State
  const [decimalInput, setDecimalInput] = useState(42);
  const [binaryInput, setBinaryInput] = useState('101010');

  // Cipher Practice State
  const [cipherQuestion, setCipherQuestion] = useState({ text: 'KHOOR', shift: 3, original: 'HELLO' });
  const [cipherAnswer, setCipherAnswer] = useState('');
  const [cipherScore, setCipherScore] = useState(0);
  const [cipherTotal, setCipherTotal] = useState(0);
  const [cipherShowResult, setCipherShowResult] = useState(false);
  const [cipherCorrect, setCipherCorrect] = useState(false);

  // Cipher Encoder State
  const [plainText, setPlainText] = useState('HELLO WORLD');
  const [cipherShift, setCipherShift] = useState(3);

  // Logic Gates Practice State
  const [logicQuestion, setLogicQuestion] = useState({ gate: 'AND', inputs: [true, false], output: false });
  const [logicAnswer, setLogicAnswer] = useState<boolean | null>(null);
  const [logicScore, setLogicScore] = useState(0);
  const [logicTotal, setLogicTotal] = useState(0);
  const [logicShowResult, setLogicShowResult] = useState(false);
  const [logicCorrect, setLogicCorrect] = useState(false);

  // Logic Simulator State
  const [gateType, setGateType] = useState('AND');
  const [input1, setInput1] = useState(false);
  const [input2, setInput2] = useState(false);

  // Cybersecurity Practice State
  const [cybersecurityQuestion, setCybersecurityQuestion] = useState({
    scenario: "You receive an email claiming to be from your bank asking you to click a link to verify your account information due to suspicious activity.",
    options: ["Phishing", "DDoS Attack", "Malware", "Not an attack"],
    correct: 0,
    explanation: "This is a classic phishing attack. Banks never ask for account verification through email links."
  });
  const [cybersecurityAnswer, setCybersecurityAnswer] = useState<number | null>(null);
  const [cybersecurityScore, setCybersecurityScore] = useState(0);
  const [cybersecurityTotal, setCybersecurityTotal] = useState(0);
  const [cybersecurityShowResult, setCybersecurityShowResult] = useState(false);
  const [cybersecurityCorrect, setCybersecurityCorrect] = useState(false);

  // Helper Functions
  const generateRgbQuestion = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    setRgbQuestion({ r, g, b });
    setRgbAnswer('');
    setRgbShowResult(false);
  };

  const handleRgbAnswer = () => {
    const correctHex = `#${rgbQuestion.r.toString(16).padStart(2, '0')}${rgbQuestion.g.toString(16).padStart(2, '0')}${rgbQuestion.b.toString(16).padStart(2, '0')}`.toUpperCase();
    const userHex = rgbAnswer.toUpperCase();
    const isCorrect = userHex === correctHex;
    
    setRgbCorrect(isCorrect);
    setRgbShowResult(true);
    setRgbTotal(prev => prev + 1);
    if (isCorrect) {
      setRgbScore(prev => prev + 1);
    }
  };

  const generateBinaryQuestion = () => {
    const type = Math.random() > 0.5 ? 'decimal-to-binary' : 'binary-to-decimal';
    if (type === 'decimal-to-binary') {
      const value = Math.floor(Math.random() * 256);
      setBinaryQuestion({ type, value });
    } else {
      const value = Math.floor(Math.random() * 256);
      setBinaryQuestion({ type, value: parseInt(value.toString(2), 2) });
    }
    setBinaryAnswer('');
    setBinaryShowResult(false);
  };

  const handleBinaryAnswer = () => {
    let correctAnswer = '';
    if (binaryQuestion.type === 'decimal-to-binary') {
      correctAnswer = binaryQuestion.value.toString(2);
    } else {
      correctAnswer = parseInt(binaryQuestion.value.toString(2), 2).toString();
    }
    
    const isCorrect = binaryAnswer === correctAnswer;
    setBinaryCorrect(isCorrect);
    setBinaryShowResult(true);
    setBinaryTotal(prev => prev + 1);
    if (isCorrect) {
      setBinaryScore(prev => prev + 1);
    }
  };

  const generateCipherQuestion = () => {
    const words = ['HELLO', 'WORLD', 'COMPUTER', 'SCIENCE', 'PYTHON', 'CODING', 'ALGORITHM', 'DATA'];
    const original = words[Math.floor(Math.random() * words.length)];
    const shift = Math.floor(Math.random() * 25) + 1;
    const encrypted = caesarCipher(original, shift);
    setCipherQuestion({ text: encrypted, shift, original });
    setCipherAnswer('');
    setCipherShowResult(false);
  };

  const caesarCipher = (text: string, shift: number) => {
    return text.split('').map(char => {
      if (char.match(/[A-Z]/)) {
        return String.fromCharCode(((char.charCodeAt(0) - 65 + shift) % 26) + 65);
      }
      return char;
    }).join('');
  };

  const handleCipherAnswer = () => {
    const isCorrect = cipherAnswer.toUpperCase() === cipherQuestion.original;
    setCipherCorrect(isCorrect);
    setCipherShowResult(true);
    setCipherTotal(prev => prev + 1);
    if (isCorrect) {
      setCipherScore(prev => prev + 1);
    }
  };

  const generateLogicQuestion = () => {
    const gates = ['AND', 'OR', 'NOT', 'NAND', 'NOR', 'XOR'];
    const gate = gates[Math.floor(Math.random() * gates.length)];
    const input1 = Math.random() > 0.5;
    const input2 = Math.random() > 0.5;
    let output = false;
    
    switch (gate) {
      case 'AND': output = input1 && input2; break;
      case 'OR': output = input1 || input2; break;
      case 'NOT': output = !input1; break;
      case 'NAND': output = !(input1 && input2); break;
      case 'NOR': output = !(input1 || input2); break;
      case 'XOR': output = input1 !== input2; break;
    }
    
    setLogicQuestion({ gate, inputs: [input1, input2], output });
    setLogicAnswer(null);
    setLogicShowResult(false);
  };

  const handleLogicAnswer = (answer: boolean) => {
    setLogicAnswer(answer);
    const isCorrect = answer === logicQuestion.output;
    setLogicCorrect(isCorrect);
    setLogicShowResult(true);
    setLogicTotal(prev => prev + 1);
    if (isCorrect) {
      setLogicScore(prev => prev + 1);
    }
  };

  const generateCybersecurityQuestion = () => {
    const scenarios = [
      {
        scenario: "You receive an email claiming to be from your bank asking you to click a link to verify your account information due to suspicious activity.",
        options: ["Phishing", "DDoS Attack", "Malware", "Not an attack"],
        correct: 0,
        explanation: "This is a classic phishing attack. Banks never ask for account verification through email links."
      },
      {
        scenario: "A website you're trying to visit is extremely slow and eventually times out. Other websites work fine.",
        options: ["Phishing", "DDoS Attack", "Malware", "Network Issue"],
        correct: 1,
        explanation: "This could be a DDoS attack overwhelming the website's servers with traffic."
      },
      {
        scenario: "Your computer starts running very slowly and you notice unknown programs running in the background.",
        options: ["Phishing", "DDoS Attack", "Malware", "Normal Operation"],
        correct: 2,
        explanation: "Unknown programs running and slow performance are common signs of malware infection."
      }
    ];
    
    const question = scenarios[Math.floor(Math.random() * scenarios.length)];
    setCybersecurityQuestion(question);
    setCybersecurityAnswer(null);
    setCybersecurityShowResult(false);
  };

  const handleCybersecurityAnswer = (answer: number) => {
    setCybersecurityAnswer(answer);
    const isCorrect = answer === cybersecurityQuestion.correct;
    setCybersecurityCorrect(isCorrect);
    setCybersecurityShowResult(true);
    setCybersecurityTotal(prev => prev + 1);
    if (isCorrect) {
      setCybersecurityScore(prev => prev + 1);
    }
  };

  const calculateGateOutput = (gate: string, input1: boolean, input2: boolean) => {
    switch (gate) {
      case 'AND': return input1 && input2;
      case 'OR': return input1 || input2;
      case 'NOT': return !input1;
      case 'NAND': return !(input1 && input2);
      case 'NOR': return !(input1 || input2);
      case 'XOR': return input1 !== input2;
      default: return false;
    }
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`.toUpperCase();
  };

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const decimalToBinary = (decimal: number) => {
    return decimal.toString(2);
  };

  const binaryToDecimal = (binary: string) => {
    return parseInt(binary, 2);
  };

  const tabs = [
    { id: 'rgb', label: 'RGB Colors', icon: Palette, color: 'from-pink-500 to-rose-600' },
    { id: 'binary', label: 'Binary Numbers', icon: Binary, color: 'from-blue-500 to-cyan-600' },
    { id: 'cipher', label: 'Cryptography', icon: Shield, color: 'from-purple-500 to-violet-600' },
    { id: 'logic', label: 'Logic Gates', icon: Zap, color: 'from-green-500 to-emerald-600' },
    { id: 'cybersecurity', label: 'Cybersecurity', icon: Lock, color: 'from-red-500 to-orange-600' },
    { id: 'python', label: 'Python Resources', icon: Code, color: 'from-yellow-500 to-amber-600' }
  ];

  const pythonResources = [
    {
      name: 'CMU CS Academy',
      url: 'https://academy.cs.cmu.edu/',
      description: 'Interactive Python programming course from Carnegie Mellon University',
      level: 'Beginner to Advanced',
      icon: '🏛️',
      features: ['Interactive exercises', 'Immediate feedback', 'Comprehensive curriculum']
    },
    {
      name: 'Practice Python',
      url: 'https://www.practicepython.org/',
      description: 'Over 40 beginner Python exercises with solutions',
      level: 'Beginner',
      icon: '🐍',
      features: ['Beginner-friendly', 'Detailed solutions', 'Progressive difficulty']
    },
    {
      name: 'Exercism',
      url: 'https://exercism.org/tracks/python',
      description: 'Code practice and mentorship for Python programming',
      level: 'Beginner to Advanced',
      icon: '💪',
      features: ['Mentor feedback', 'Community discussions', 'Real-world problems']
    },
    {
      name: 'CodingBat',
      url: 'https://codingbat.com/python',
      description: 'Python coding practice problems with immediate feedback',
      level: 'Beginner to Intermediate',
      icon: '🦇',
      features: ['Instant feedback', 'Progressive exercises', 'Logic building']
    },
    {
      name: 'Python.org Tutorial',
      url: 'https://docs.python.org/3/tutorial/',
      description: 'Official Python tutorial covering all language fundamentals',
      level: 'Beginner to Intermediate',
      icon: '📚',
      features: ['Official documentation', 'Comprehensive coverage', 'Best practices']
    },
    {
      name: 'Replit',
      url: 'https://replit.com/languages/python3',
      description: 'Online Python IDE for coding practice and projects',
      level: 'All Levels',
      icon: '💻',
      features: ['Online IDE', 'Collaborative coding', 'Instant execution']
    }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          Practice Tools
        </h1>
        <p className="text-xl text-gray-600">
          Interactive tools to master computer science concepts
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                activeTab === tab.id
                  ? `bg-gradient-to-r ${tab.color} text-white shadow-lg`
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* RGB Colors Tool */}
      {activeTab === 'rgb' && (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-pink-500 to-rose-600 p-6 text-white">
            <div className="flex items-center space-x-3">
              <Palette className="h-8 w-8" />
              <div>
                <h2 className="text-2xl font-bold">RGB Color Practice</h2>
                <p className="text-pink-100">Master RGB to HEX color conversions</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Mode Toggle */}
            <div className="flex justify-center mb-6">
              <div className="bg-gray-100 rounded-lg p-1 flex">
                <button
                  onClick={() => setRgbMode('practice')}
                  className={`px-4 py-2 rounded-md font-medium transition-all ${
                    rgbMode === 'practice'
                      ? 'bg-pink-500 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Practice Quiz
                </button>
                <button
                  onClick={() => setRgbMode('converter')}
                  className={`px-4 py-2 rounded-md font-medium transition-all ${
                    rgbMode === 'converter'
                      ? 'bg-pink-500 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Color Converter
                </button>
              </div>
            </div>

            {rgbMode === 'practice' ? (
              <div className="space-y-6">
                {/* Score */}
                <div className="flex justify-center space-x-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-pink-600">{rgbScore}</div>
                    <div className="text-sm text-gray-600">Correct</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-600">{rgbTotal}</div>
                    <div className="text-sm text-gray-600">Total</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {rgbTotal > 0 ? Math.round((rgbScore / rgbTotal) * 100) : 0}%
                    </div>
                    <div className="text-sm text-gray-600">Accuracy</div>
                  </div>
                </div>

                {/* Question */}
                <div className="text-center">
                  <div className="mb-4">
                    <div
                      className="w-32 h-32 mx-auto rounded-xl shadow-lg border-4 border-white"
                      style={{ backgroundColor: `rgb(${rgbQuestion.r}, ${rgbQuestion.g}, ${rgbQuestion.b})` }}
                    ></div>
                  </div>
                  <p className="text-lg font-medium text-gray-900 mb-2">
                    Convert RGB({rgbQuestion.r}, {rgbQuestion.g}, {rgbQuestion.b}) to HEX:
                  </p>
                  <input
                    type="text"
                    value={rgbAnswer}
                    onChange={(e) => setRgbAnswer(e.target.value)}
                    placeholder="#RRGGBB"
                    className="px-4 py-2 border border-gray-300 rounded-lg text-center font-mono text-lg"
                    disabled={rgbShowResult}
                  />
                </div>

                {/* Result */}
                {rgbShowResult && (
                  <div className={`p-4 rounded-lg ${rgbCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      {rgbCorrect ? (
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      ) : (
                        <XCircle className="h-6 w-6 text-red-600" />
                      )}
                      <span className={`font-medium ${rgbCorrect ? 'text-green-800' : 'text-red-800'}`}>
                        {rgbCorrect ? 'Correct!' : 'Incorrect'}
                      </span>
                    </div>
                    {!rgbCorrect && (
                      <p className="text-center text-red-700">
                        The correct answer is: {rgbToHex(rgbQuestion.r, rgbQuestion.g, rgbQuestion.b)}
                      </p>
                    )}
                  </div>
                )}

                {/* Actions */}
                <div className="flex justify-center space-x-4">
                  {!rgbShowResult ? (
                    <button
                      onClick={handleRgbAnswer}
                      disabled={!rgbAnswer}
                      className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Submit Answer
                    </button>
                  ) : (
                    <button
                      onClick={generateRgbQuestion}
                      className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg font-medium"
                    >
                      Next Question
                    </button>
                  )}
                  <button
                    onClick={generateRgbQuestion}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium"
                  >
                    <RotateCcw className="h-4 w-4 mr-2 inline" />
                    New Question
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* RGB Sliders */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Red: {rgbR}</label>
                    <input
                      type="range"
                      min="0"
                      max="255"
                      value={rgbR}
                      onChange={(e) => setRgbR(parseInt(e.target.value))}
                      className="w-full h-2 bg-red-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Green: {rgbG}</label>
                    <input
                      type="range"
                      min="0"
                      max="255"
                      value={rgbG}
                      onChange={(e) => setRgbG(parseInt(e.target.value))}
                      className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Blue: {rgbB}</label>
                    <input
                      type="range"
                      min="0"
                      max="255"
                      value={rgbB}
                      onChange={(e) => setRgbB(parseInt(e.target.value))}
                      className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>

                {/* Color Preview */}
                <div className="text-center">
                  <div
                    className="w-48 h-48 mx-auto rounded-xl shadow-lg border-4 border-white"
                    style={{ backgroundColor: `rgb(${rgbR}, ${rgbG}, ${rgbB})` }}
                  ></div>
                  <div className="mt-4 space-y-2">
                    <p className="text-lg font-mono">RGB({rgbR}, {rgbG}, {rgbB})</p>
                    <p className="text-lg font-mono">{rgbToHex(rgbR, rgbG, rgbB)}</p>
                  </div>
                </div>

                {/* HEX Input */}
                <div className="text-center">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Or enter HEX color:</label>
                  <input
                    type="text"
                    value={hexInput}
                    onChange={(e) => {
                      setHexInput(e.target.value);
                      const rgb = hexToRgb(e.target.value);
                      if (rgb) {
                        setRgbR(rgb.r);
                        setRgbG(rgb.g);
                        setRgbB(rgb.b);
                      }
                    }}
                    placeholder="#RRGGBB"
                    className="px-4 py-2 border border-gray-300 rounded-lg text-center font-mono"
                  />
                </div>

                {/* Quick Facts */}
                <div className="bg-pink-50 rounded-lg p-4">
                  <h3 className="font-bold text-pink-900 mb-2 flex items-center">
                    <Lightbulb className="h-5 w-5 mr-2" />
                    RGB Color Facts
                  </h3>
                  <ul className="text-sm text-pink-800 space-y-1">
                    <li>• RGB stands for Red, Green, Blue</li>
                    <li>• Each color channel ranges from 0-255 (8 bits)</li>
                    <li>• RGB(0,0,0) is black, RGB(255,255,255) is white</li>
                    <li>• HEX colors use base-16 notation (0-9, A-F)</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Binary Numbers Tool */}
      {activeTab === 'binary' && (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-600 p-6 text-white">
            <div className="flex items-center space-x-3">
              <Binary className="h-8 w-8" />
              <div>
                <h2 className="text-2xl font-bold">Binary Number Practice</h2>
                <p className="text-blue-100">Master binary to decimal conversions</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Mode Toggle */}
            <div className="flex justify-center mb-6">
              <div className="bg-gray-100 rounded-lg p-1 flex">
                <button
                  onClick={() => setBinaryMode('practice')}
                  className={`px-4 py-2 rounded-md font-medium transition-all ${
                    binaryMode === 'practice'
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Practice Quiz
                </button>
                <button
                  onClick={() => setBinaryMode('converter')}
                  className={`px-4 py-2 rounded-md font-medium transition-all ${
                    binaryMode === 'converter'
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Number Converter
                </button>
              </div>
            </div>

            {binaryMode === 'practice' ? (
              <div className="space-y-6">
                {/* Score */}
                <div className="flex justify-center space-x-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{binaryScore}</div>
                    <div className="text-sm text-gray-600">Correct</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-600">{binaryTotal}</div>
                    <div className="text-sm text-gray-600">Total</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cyan-600">
                      {binaryTotal > 0 ? Math.round((binaryScore / binaryTotal) * 100) : 0}%
                    </div>
                    <div className="text-sm text-gray-600">Accuracy</div>
                  </div>
                </div>

                {/* Question */}
                <div className="text-center">
                  <p className="text-lg font-medium text-gray-900 mb-4">
                    {binaryQuestion.type === 'decimal-to-binary' 
                      ? `Convert decimal ${binaryQuestion.value} to binary:`
                      : `Convert binary ${binaryQuestion.value.toString(2)} to decimal:`
                    }
                  </p>
                  <input
                    type="text"
                    value={binaryAnswer}
                    onChange={(e) => setBinaryAnswer(e.target.value)}
                    placeholder={binaryQuestion.type === 'decimal-to-binary' ? 'Binary (e.g., 101010)' : 'Decimal (e.g., 42)'}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-center font-mono text-lg"
                    disabled={binaryShowResult}
                  />
                </div>

                {/* Result */}
                {binaryShowResult && (
                  <div className={`p-4 rounded-lg ${binaryCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      {binaryCorrect ? (
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      ) : (
                        <XCircle className="h-6 w-6 text-red-600" />
                      )}
                      <span className={`font-medium ${binaryCorrect ? 'text-green-800' : 'text-red-800'}`}>
                        {binaryCorrect ? 'Correct!' : 'Incorrect'}
                      </span>
                    </div>
                    {!binaryCorrect && (
                      <p className="text-center text-red-700">
                        The correct answer is: {
                          binaryQuestion.type === 'decimal-to-binary' 
                            ? binaryQuestion.value.toString(2)
                            : parseInt(binaryQuestion.value.toString(2), 2).toString()
                        }
                      </p>
                    )}
                  </div>
                )}

                {/* Actions */}
                <div className="flex justify-center space-x-4">
                  {!binaryShowResult ? (
                    <button
                      onClick={handleBinaryAnswer}
                      disabled={!binaryAnswer}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Submit Answer
                    </button>
                  ) : (
                    <button
                      onClick={generateBinaryQuestion}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium"
                    >
                      Next Question
                    </button>
                  )}
                  <button
                    onClick={generateBinaryQuestion}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium"
                  >
                    <RotateCcw className="h-4 w-4 mr-2 inline" />
                    New Question
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Decimal to Binary */}
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="font-bold text-blue-900 mb-4">Decimal to Binary</h3>
                  <div className="flex items-center space-x-4">
                    <input
                      type="number"
                      value={decimalInput}
                      onChange={(e) => setDecimalInput(parseInt(e.target.value) || 0)}
                      className="px-4 py-2 border border-gray-300 rounded-lg font-mono"
                      placeholder="Enter decimal"
                    />
                    <ArrowRight className="h-5 w-5 text-blue-600" />
                    <div className="px-4 py-2 bg-white border border-gray-300 rounded-lg font-mono">
                      {decimalToBinary(decimalInput)}
                    </div>
                  </div>
                </div>

                {/* Binary to Decimal */}
                <div className="bg-cyan-50 rounded-lg p-6">
                  <h3 className="font-bold text-cyan-900 mb-4">Binary to Decimal</h3>
                  <div className="flex items-center space-x-4">
                    <input
                      type="text"
                      value={binaryInput}
                      onChange={(e) => setBinaryInput(e.target.value.replace(/[^01]/g, ''))}
                      className="px-4 py-2 border border-gray-300 rounded-lg font-mono"
                      placeholder="Enter binary"
                    />
                    <ArrowRight className="h-5 w-5 text-cyan-600" />
                    <div className="px-4 py-2 bg-white border border-gray-300 rounded-lg font-mono">
                      {binaryInput ? binaryToDecimal(binaryInput) : 0}
                    </div>
                  </div>
                </div>

                {/* Powers of 2 Reference */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                    <BookOpen className="h-5 w-5 mr-2" />
                    Powers of 2 Reference
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    {[1, 2, 4, 8, 16, 32, 64, 128].map((power, index) => (
                      <div key={power} className="bg-white p-3 rounded border">
                        <div className="font-mono text-blue-600">2^{index} = {power}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Facts */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-bold text-blue-900 mb-2 flex items-center">
                    <Lightbulb className="h-5 w-5 mr-2" />
                    Binary Number Facts
                  </h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Binary uses only 0s and 1s (base-2)</li>
                    <li>• Each position represents a power of 2</li>
                    <li>• Computers store all data in binary</li>
                    <li>• 8 bits = 1 byte (can represent 0-255)</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Cryptography Tool */}
      {activeTab === 'cipher' && (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-500 to-violet-600 p-6 text-white">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8" />
              <div>
                <h2 className="text-2xl font-bold">Cryptography & Ciphers</h2>
                <p className="text-purple-100">Learn encryption and decryption techniques</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Mode Toggle */}
            <div className="flex justify-center mb-6">
              <div className="bg-gray-100 rounded-lg p-1 flex">
                <button
                  onClick={() => setCipherMode('practice')}
                  className={`px-4 py-2 rounded-md font-medium transition-all ${
                    cipherMode === 'practice'
                      ? 'bg-purple-500 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Decode Challenge
                </button>
                <button
                  onClick={() => setCipherMode('encoder')}
                  className={`px-4 py-2 rounded-md font-medium transition-all ${
                    cipherMode === 'encoder'
                      ? 'bg-purple-500 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Cipher Encoder
                </button>
              </div>
            </div>

            {cipherMode === 'practice' ? (
              <div className="space-y-6">
                {/* Score */}
                <div className="flex justify-center space-x-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{cipherScore}</div>
                    <div className="text-sm text-gray-600">Correct</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-600">{cipherTotal}</div>
                    <div className="text-sm text-gray-600">Total</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-violet-600">
                      {cipherTotal > 0 ? Math.round((cipherScore / cipherTotal) * 100) : 0}%
                    </div>
                    <div className="text-sm text-gray-600">Accuracy</div>
                  </div>
                </div>

                {/* Question */}
                <div className="text-center">
                  <div className="bg-purple-50 rounded-lg p-6 mb-4">
                    <p className="text-lg font-medium text-gray-900 mb-2">
                      Decode this Caesar cipher (shift: {cipherQuestion.shift}):
                    </p>
                    <div className="text-2xl font-mono font-bold text-purple-600 bg-white p-4 rounded border">
                      {cipherQuestion.text}
                    </div>
                  </div>
                  <input
                    type="text"
                    value={cipherAnswer}
                    onChange={(e) => setCipherAnswer(e.target.value)}
                    placeholder="Enter decoded message"
                    className="px-4 py-2 border border-gray-300 rounded-lg text-center font-mono text-lg"
                    disabled={cipherShowResult}
                  />
                </div>

                {/* Result */}
                {cipherShowResult && (
                  <div className={`p-4 rounded-lg ${cipherCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      {cipherCorrect ? (
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      ) : (
                        <XCircle className="h-6 w-6 text-red-600" />
                      )}
                      <span className={`font-medium ${cipherCorrect ? 'text-green-800' : 'text-red-800'}`}>
                        {cipherCorrect ? 'Correct!' : 'Incorrect'}
                      </span>
                    </div>
                    {!cipherCorrect && (
                      <p className="text-center text-red-700">
                        The correct answer is: {cipherQuestion.original}
                      </p>
                    )}
                  </div>
                )}

                {/* Actions */}
                <div className="flex justify-center space-x-4">
                  {!cipherShowResult ? (
                    <button
                      onClick={handleCipherAnswer}
                      disabled={!cipherAnswer}
                      className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Submit Answer
                    </button>
                  ) : (
                    <button
                      onClick={generateCipherQuestion}
                      className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg font-medium"
                    >
                      Next Challenge
                    </button>
                  )}
                  <button
                    onClick={generateCipherQuestion}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium"
                  >
                    <RotateCcw className="h-4 w-4 mr-2 inline" />
                    New Challenge
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Caesar Cipher Encoder */}
                <div className="bg-purple-50 rounded-lg p-6">
                  <h3 className="font-bold text-purple-900 mb-4">Caesar Cipher Encoder</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Plain Text:</label>
                      <input
                        type="text"
                        value={plainText}
                        onChange={(e) => setPlainText(e.target.value.toUpperCase())}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg font-mono"
                        placeholder="Enter text to encrypt"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Shift: {cipherShift}</label>
                      <input
                        type="range"
                        min="1"
                        max="25"
                        value={cipherShift}
                        onChange={(e) => setCipherShift(parseInt(e.target.value))}
                        className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Encrypted Text:</label>
                      <div className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg font-mono text-purple-600 font-bold">
                        {caesarCipher(plainText, cipherShift)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Alphabet Reference */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Alphabet Reference</h3>
                  <div className="grid grid-cols-13 gap-1 text-xs font-mono">
                    {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter, index) => (
                      <div key={letter} className="text-center p-2 bg-white rounded border">
                        <div className="font-bold">{letter}</div>
                        <div className="text-gray-500">{index}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Crypto Facts */}
                <div className="bg-purple-50 rounded-lg p-4">
                  <h3 className="font-bold text-purple-900 mb-2 flex items-center">
                    <Lightbulb className="h-5 w-5 mr-2" />
                    Cryptography Facts
                  </h3>
                  <ul className="text-sm text-purple-800 space-y-1">
                    <li>• Caesar cipher shifts each letter by a fixed amount</li>
                    <li>• Named after Julius Caesar who used it for military messages</li>
                    <li>• Modern encryption uses much more complex algorithms</li>
                    <li>• ROT13 is a Caesar cipher with shift of 13</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Logic Gates Tool */}
      {activeTab === 'logic' && (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white">
            <div className="flex items-center space-x-3">
              <Zap className="h-8 w-8" />
              <div>
                <h2 className="text-2xl font-bold">Logic Gates</h2>
                <p className="text-green-100">Master Boolean logic and digital circuits</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Mode Toggle */}
            <div className="flex justify-center mb-6">
              <div className="bg-gray-100 rounded-lg p-1 flex">
                <button
                  onClick={() => setLogicMode('practice')}
                  className={`px-4 py-2 rounded-md font-medium transition-all ${
                    logicMode === 'practice'
                      ? 'bg-green-500 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Logic Quiz
                </button>
                <button
                  onClick={() => setLogicMode('simulator')}
                  className={`px-4 py-2 rounded-md font-medium transition-all ${
                    logicMode === 'simulator'
                      ? 'bg-green-500 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Gate Simulator
                </button>
              </div>
            </div>

            {logicMode === 'practice' ? (
              <div className="space-y-6">
                {/* Score */}
                <div className="flex justify-center space-x-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{logicScore}</div>
                    <div className="text-sm text-gray-600">Correct</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-600">{logicTotal}</div>
                    <div className="text-sm text-gray-600">Total</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-600">
                      {logicTotal > 0 ? Math.round((logicScore / logicTotal) * 100) : 0}%
                    </div>
                    <div className="text-sm text-gray-600">Accuracy</div>
                  </div>
                </div>

                {/* Question */}
                <div className="text-center">
                  <div className="bg-green-50 rounded-lg p-6 mb-4">
                    <p className="text-lg font-medium text-gray-900 mb-4">
                      What is the output of this {logicQuestion.gate} gate?
                    </p>
                    <div className="flex items-center justify-center space-x-4">
                      <div className={`px-4 py-2 rounded font-mono font-bold ${logicQuestion.inputs[0] ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                        {logicQuestion.inputs[0] ? 'TRUE' : 'FALSE'}
                      </div>
                      <div className="px-4 py-2 bg-gray-200 text-gray-800 font-bold rounded">
                        {logicQuestion.gate}
                      </div>
                      {logicQuestion.gate !== 'NOT' && (
                        <div className={`px-4 py-2 rounded font-mono font-bold ${logicQuestion.inputs[1] ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                          {logicQuestion.inputs[1] ? 'TRUE' : 'FALSE'}
                        </div>
                      )}
                      <ArrowRight className="h-6 w-6 text-gray-600" />
                      <div className="px-4 py-2 bg-gray-100 text-gray-600 font-bold rounded">
                        ?
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={() => handleLogicAnswer(true)}
                      disabled={logicShowResult}
                      className={`px-8 py-3 rounded-lg font-medium transition-all ${
                        logicAnswer === true
                          ? 'bg-green-500 text-white'
                          : 'bg-green-100 text-green-800 hover:bg-green-200'
                      } disabled:opacity-50`}
                    >
                      TRUE
                    </button>
                    <button
                      onClick={() => handleLogicAnswer(false)}
                      disabled={logicShowResult}
                      className={`px-8 py-3 rounded-lg font-medium transition-all ${
                        logicAnswer === false
                          ? 'bg-red-500 text-white'
                          : 'bg-red-100 text-red-800 hover:bg-red-200'
                      } disabled:opacity-50`}
                    >
                      FALSE
                    </button>
                  </div>
                </div>

                {/* Result */}
                {logicShowResult && (
                  <div className={`p-4 rounded-lg ${logicCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      {logicCorrect ? (
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      ) : (
                        <XCircle className="h-6 w-6 text-red-600" />
                      )}
                      <span className={`font-medium ${logicCorrect ? 'text-green-800' : 'text-red-800'}`}>
                        {logicCorrect ? 'Correct!' : 'Incorrect'}
                      </span>
                    </div>
                    {!logicCorrect && (
                      <p className="text-center text-red-700">
                        The correct answer is: {logicQuestion.output ? 'TRUE' : 'FALSE'}
                      </p>
                    )}
                  </div>
                )}

                {/* Actions */}
                <div className="flex justify-center space-x-4">
                  {logicShowResult && (
                    <button
                      onClick={generateLogicQuestion}
                      className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium"
                    >
                      Next Question
                    </button>
                  )}
                  <button
                    onClick={generateLogicQuestion}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium"
                  >
                    <RotateCcw className="h-4 w-4 mr-2 inline" />
                    New Question
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Gate Simulator */}
                <div className="bg-green-50 rounded-lg p-6">
                  <h3 className="font-bold text-green-900 mb-4">Interactive Gate Simulator</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Gate Type:</label>
                      <select
                        value={gateType}
                        onChange={(e) => setGateType(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg"
                      >
                        <option value="AND">AND</option>
                        <option value="OR">OR</option>
                        <option value="NOT">NOT</option>
                        <option value="NAND">NAND</option>
                        <option value="NOR">NOR</option>
                        <option value="XOR">XOR</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center justify-center space-x-4">
                      <div className="text-center">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Input 1:</label>
                        <button
                          onClick={() => setInput1(!input1)}
                          className={`px-6 py-3 rounded-lg font-medium transition-all ${
                            input1 ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                          }`}
                        >
                          {input1 ? 'TRUE' : 'FALSE'}
                        </button>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-800 mb-2">{gateType}</div>
                        <div className="px-4 py-2 bg-gray-200 rounded-lg">
                          GATE
                        </div>
                      </div>
                      
                      {gateType !== 'NOT' && (
                        <div className="text-center">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Input 2:</label>
                          <button
                            onClick={() => setInput2(!input2)}
                            className={`px-6 py-3 rounded-lg font-medium transition-all ${
                              input2 ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                            }`}
                          >
                            {input2 ? 'TRUE' : 'FALSE'}
                          </button>
                        </div>
                      )}
                      
                      <ArrowRight className="h-8 w-8 text-gray-600" />
                      
                      <div className="text-center">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Output:</label>
                        <div className={`px-6 py-3 rounded-lg font-medium ${
                          calculateGateOutput(gateType, input1, input2) ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                        }`}>
                          {calculateGateOutput(gateType, input1, input2) ? 'TRUE' : 'FALSE'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Truth Tables */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Truth Tables Reference</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {['AND', 'OR', 'NOT', 'NAND', 'NOR', 'XOR'].map(gate => (
                      <div key={gate} className="bg-white p-4 rounded border">
                        <h4 className="font-bold text-center mb-2">{gate}</h4>
                        <table className="w-full text-xs">
                          <thead>
                            <tr className="border-b">
                              {gate !== 'NOT' && <th className="p-1">A</th>}
                              {gate !== 'NOT' && <th className="p-1">B</th>}
                              {gate === 'NOT' && <th className="p-1">A</th>}
                              <th className="p-1">Out</th>
                            </tr>
                          </thead>
                          <tbody>
                            {gate === 'NOT' ? (
                              <>
                                <tr><td className="p-1 text-center">0</td><td className="p-1 text-center">1</td></tr>
                                <tr><td className="p-1 text-center">1</td><td className="p-1 text-center">0</td></tr>
                              </>
                            ) : (
                              <>
                                <tr><td className="p-1 text-center">0</td><td className="p-1 text-center">0</td><td className="p-1 text-center">{calculateGateOutput(gate, false, false) ? '1' : '0'}</td></tr>
                                <tr><td className="p-1 text-center">0</td><td className="p-1 text-center">1</td><td className="p-1 text-center">{calculateGateOutput(gate, false, true) ? '1' : '0'}</td></tr>
                                <tr><td className="p-1 text-center">1</td><td className="p-1 text-center">0</td><td className="p-1 text-center">{calculateGateOutput(gate, true, false) ? '1' : '0'}</td></tr>
                                <tr><td className="p-1 text-center">1</td><td className="p-1 text-center">1</td><td className="p-1 text-center">{calculateGateOutput(gate, true, true) ? '1' : '0'}</td></tr>
                              </>
                            )}
                          </tbody>
                        </table>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Logic Facts */}
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="font-bold text-green-900 mb-2 flex items-center">
                    <Lightbulb className="h-5 w-5 mr-2" />
                    Boolean Logic Facts
                  </h3>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• Logic gates are the building blocks of digital circuits</li>
                    <li>• AND gate outputs true only when all inputs are true</li>
                    <li>• OR gate outputs true when at least one input is true</li>
                    <li>• NOT gate inverts the input (true becomes false)</li>
                    <li>• NAND and NOR are "universal gates" - can build any circuit</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Cybersecurity Tool */}
      {activeTab === 'cybersecurity' && (
        <div className="bg-gray-900 rounded-2xl shadow-xl border border-red-500 overflow-hidden">
          {/* Terminal-style Header */}
          <div className="bg-red-600 p-4 text-white">
            <div className="flex items-center space-x-3">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-6 w-6 animate-pulse" />
                <span className="font-mono text-lg font-bold">SECURITY ALERT SYSTEM</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 text-green-400 p-6 font-mono">
            {/* Mode Toggle */}
            <div className="flex justify-center mb-6">
              <div className="bg-gray-800 rounded-lg p-1 flex border border-green-500">
                <button
                  onClick={() => setCybersecurityMode('practice')}
                  className={`px-4 py-2 rounded-md font-medium transition-all ${
                    cybersecurityMode === 'practice'
                      ? 'bg-red-600 text-white shadow-md'
                      : 'text-green-400 hover:text-white'
                  }`}
                >
                  THREAT DETECTION
                </button>
                <button
                  onClick={() => setCybersecurityMode('guide')}
                  className={`px-4 py-2 rounded-md font-medium transition-all ${
                    cybersecurityMode === 'guide'
                      ? 'bg-red-600 text-white shadow-md'
                      : 'text-green-400 hover:text-white'
                  }`}
                >
                  SECURITY GUIDE
                </button>
              </div>
            </div>

            {cybersecurityMode === 'practice' ? (
              <div className="space-y-6">
                {/* Terminal Stats */}
                <div className="bg-gray-800 border border-green-500 rounded p-4">
                  <div className="text-center text-green-400 mb-2">
                    === THREAT ANALYSIS DASHBOARD ===
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-green-400">{cybersecurityScore}</div>
                      <div className="text-xs text-gray-400">THREATS IDENTIFIED</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-yellow-400">{cybersecurityTotal}</div>
                      <div className="text-xs text-gray-400">TOTAL INCIDENTS</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-red-400">
                        {cybersecurityTotal > 0 ? Math.round((cybersecurityScore / cybersecurityTotal) * 100) : 0}%
                      </div>
                      <div className="text-xs text-gray-400">ACCURACY RATE</div>
                    </div>
                  </div>
                </div>

                {/* Incident Report */}
                <div className="bg-gray-800 border border-red-500 rounded p-6">
                  <div className="text-red-400 text-center mb-4 font-bold">
                    ⚠️ SECURITY INCIDENT REPORT ⚠️
                  </div>
                  <div className="bg-black border border-gray-600 rounded p-4 mb-4">
                    <div className="text-yellow-400 mb-2">INCIDENT DESCRIPTION:</div>
                    <div className="text-white leading-relaxed">
                      {cybersecurityQuestion.scenario}
                    </div>
                  </div>
                  
                  <div className="text-green-400 mb-3">THREAT CLASSIFICATION:</div>
                  <div className="grid grid-cols-2 gap-2">
                    {cybersecurityQuestion.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleCybersecurityAnswer(index)}
                        disabled={cybersecurityShowResult}
                        className={`p-3 border rounded transition-all font-medium ${
                          cybersecurityAnswer === index
                            ? 'bg-red-600 text-white border-red-400'
                            : 'bg-gray-700 text-green-400 border-green-500 hover:bg-gray-600'
                        } disabled:opacity-50`}
                      >
                        [{String.fromCharCode(65 + index)}] {option}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Analysis Result */}
                {cybersecurityShowResult && (
                  <div className={`border rounded p-4 ${
                    cybersecurityCorrect 
                      ? 'bg-green-900 border-green-500' 
                      : 'bg-red-900 border-red-500'
                  }`}>
                    <div className="text-center mb-3">
                      <div className={`text-xl font-bold ${
                        cybersecurityCorrect ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {cybersecurityCorrect ? '✓ THREAT IDENTIFIED' : '✗ MISCLASSIFICATION'}
                      </div>
                    </div>
                    <div className="bg-black border border-gray-600 rounded p-3">
                      <div className="text-yellow-400 mb-1">ANALYSIS:</div>
                      <div className="text-white text-sm">
                        {cybersecurityQuestion.explanation}
                      </div>
                    </div>
                  </div>
                )}

                {/* Terminal Actions */}
                <div className="flex justify-center space-x-4">
                  {cybersecurityShowResult && (
                    <button
                      onClick={generateCybersecurityQuestion}
                      className="bg-green-600 hover:bg-green-700 text-black px-6 py-2 rounded font-bold transition-all"
                    >
                      NEXT INCIDENT
                    </button>
                  )}
                  <button
                    onClick={generateCybersecurityQuestion}
                    className="bg-yellow-600 hover:bg-yellow-700 text-black px-6 py-2 rounded font-bold transition-all"
                  >
                    NEW SCENARIO
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Security Guide */}
                <div className="bg-gray-800 border border-blue-500 rounded p-6">
                  <div className="text-blue-400 text-center mb-4 font-bold">
                    🛡️ CYBERSECURITY KNOWLEDGE BASE 🛡️
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-black border border-gray-600 rounded p-4">
                      <div className="text-red-400 font-bold mb-2">COMMON THREATS:</div>
                      <ul className="text-white text-sm space-y-1">
                        <li>• PHISHING: Fraudulent emails to steal credentials</li>
                        <li>• MALWARE: Malicious software that damages systems</li>
                        <li>• DDoS: Overwhelming servers with traffic</li>
                        <li>• RANSOMWARE: Encrypts files for money</li>
                        <li>• SOCIAL ENGINEERING: Manipulating people for info</li>
                      </ul>
                    </div>

                    <div className="bg-black border border-gray-600 rounded p-4">
                      <div className="text-green-400 font-bold mb-2">PROTECTION METHODS:</div>
                      <ul className="text-white text-sm space-y-1">
                        <li>• Use strong, unique passwords</li>
                        <li>• Enable two-factor authentication</li>
                        <li>• Keep software updated</li>
                        <li>• Be cautious with email links</li>
                        <li>• Regular data backups</li>
                        <li>• Use reputable antivirus software</li>
                      </ul>
                    </div>

                    <div className="bg-black border border-gray-600 rounded p-4">
                      <div className="text-yellow-400 font-bold mb-2">WARNING SIGNS:</div>
                      <ul className="text-white text-sm space-y-1">
                        <li>• Unexpected system slowdowns</li>
                        <li>• Unknown programs running</li>
                        <li>• Suspicious email attachments</li>
                        <li>• Requests for personal information</li>
                        <li>• Pop-up warnings about viruses</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Best Practices */}
                <div className="bg-gray-800 border border-green-500 rounded p-4">
                  <div className="text-green-400 font-bold mb-3 text-center">
                    SECURITY BEST PRACTICES
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="bg-black border border-gray-600 rounded p-3">
                      <div className="text-blue-400 font-bold mb-2">PASSWORD SECURITY:</div>
                      <ul className="text-white space-y-1">
                        <li>• 12+ characters minimum</li>
                        <li>• Mix of letters, numbers, symbols</li>
                        <li>• Unique for each account</li>
                        <li>• Use password managers</li>
                      </ul>
                    </div>
                    <div className="bg-black border border-gray-600 rounded p-3">
                      <div className="text-purple-400 font-bold mb-2">EMAIL SAFETY:</div>
                      <ul className="text-white space-y-1">
                        <li>• Verify sender identity</li>
                        <li>• Don't click suspicious links</li>
                        <li>• Check URLs carefully</li>
                        <li>• Report phishing attempts</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Python Resources */}
      {activeTab === 'python' && (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-yellow-500 to-amber-600 p-6 text-white">
            <div className="flex items-center space-x-3">
              <Code className="h-8 w-8" />
              <div>
                <h2 className="text-2xl font-bold">Python Learning Resources</h2>
                <p className="text-yellow-100">Curated platforms for Python programming practice</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Learning Path */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Target className="h-6 w-6 mr-2 text-yellow-600" />
                Recommended Learning Path
              </h3>
              <div className="flex items-center justify-center space-x-4 mb-6">
                <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-medium">
                  Beginner
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400" />
                <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg font-medium">
                  Intermediate
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400" />
                <div className="bg-red-100 text-red-800 px-4 py-2 rounded-lg font-medium">
                  Advanced
                </div>
              </div>
            </div>

            {/* Resources Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pythonResources.map((resource, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="text-4xl">{resource.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{resource.name}</h3>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        resource.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                        resource.level === 'Beginner to Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        resource.level === 'Beginner to Advanced' ? 'bg-blue-100 text-blue-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {resource.level}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {resource.description}
                  </p>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm">Features:</h4>
                    <ul className="space-y-1">
                      {resource.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-2 text-sm text-gray-600">
                          <Star className="h-3 w-3 text-yellow-500" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
                  >
                    <span>Visit Platform</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              ))}
            </div>

            {/* Pro Tips */}
            <div className="mt-8 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-6 border border-yellow-200">
              <h3 className="font-bold text-yellow-900 mb-4 flex items-center">
                <Trophy className="h-6 w-6 mr-2" />
                Pro Tips for Learning Python
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ul className="space-y-2 text-sm text-yellow-800">
                  <li className="flex items-start space-x-2">
                    <Sparkles className="h-4 w-4 mt-0.5 text-yellow-600" />
                    <span>Start with basic syntax and gradually build complexity</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Sparkles className="h-4 w-4 mt-0.5 text-yellow-600" />
                    <span>Practice coding every day, even if just for 15 minutes</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Sparkles className="h-4 w-4 mt-0.5 text-yellow-600" />
                    <span>Work on real projects to apply what you learn</span>
                  </li>
                </ul>
                <ul className="space-y-2 text-sm text-yellow-800">
                  <li className="flex items-start space-x-2">
                    <Sparkles className="h-4 w-4 mt-0.5 text-yellow-600" />
                    <span>Join Python communities and forums for help</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Sparkles className="h-4 w-4 mt-0.5 text-yellow-600" />
                    <span>Read other people's code to learn different approaches</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Sparkles className="h-4 w-4 mt-0.5 text-yellow-600" />
                    <span>Don't be afraid to make mistakes - they're part of learning!</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Initialize questions on component mount */}
      {React.useEffect(() => {
        generateRgbQuestion();
        generateBinaryQuestion();
        generateCipherQuestion();
        generateLogicQuestion();
        generateCybersecurityQuestion();
      }, [])}
    </div>
  );
};

export default PracticeTools;