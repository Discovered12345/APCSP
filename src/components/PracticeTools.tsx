import React, { useState, useEffect } from 'react';
import { 
  Palette, Shield, Binary, Zap, Code, 
  ChevronRight, Trophy, Target, RotateCcw, 
  BookOpen, Play, Info, CheckCircle, XCircle,
  Eye, EyeOff, Download, ExternalLink, Lightbulb,
  AlertTriangle, Lock, Wifi, Globe, Server, Bug
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const PracticeTools: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState('color-converter');
  const [activeTab, setActiveTab] = useState<'info' | 'practice'>('info');
  const { user, addActivity, updateProfile } = useAuth();

  // Color Converter State
  const [rgbValues, setRgbValues] = useState({ r: 128, g: 64, b: 192 });
  const [colorQuizScore, setColorQuizScore] = useState(0);
  const [currentColorQuestion, setCurrentColorQuestion] = useState(0);
  const [colorQuestions, setColorQuestions] = useState<any[]>([]);
  const [selectedColorAnswer, setSelectedColorAnswer] = useState<number | null>(null);
  const [showColorResult, setShowColorResult] = useState(false);

  // Cryptography State
  const [cipherType, setCipherType] = useState<'caesar' | 'vigenere'>('caesar');
  const [cryptoText, setCryptoText] = useState('');
  const [cryptoShift, setCryptoShift] = useState(3);
  const [cryptoKey, setCryptoKey] = useState('KEY');
  const [cryptoResult, setCryptoResult] = useState('');
  const [cryptoMode, setCryptoMode] = useState<'encode' | 'decode'>('encode');
  const [cryptoQuizScore, setCryptoQuizScore] = useState(0);
  const [currentCryptoQuestion, setCurrentCryptoQuestion] = useState(0);
  const [cryptoQuestions, setCryptoQuestions] = useState<any[]>([]);
  const [cryptoAnswer, setCryptoAnswer] = useState('');
  const [showCryptoResult, setShowCryptoResult] = useState(false);

  // Binary State
  const [binaryInput, setBinaryInput] = useState('');
  const [binaryResult, setBinaryResult] = useState('');
  const [binaryMode, setBinaryMode] = useState<'toBinary' | 'toDecimal'>('toBinary');
  const [binaryQuizScore, setBinaryQuizScore] = useState(0);
  const [currentBinaryQuestion, setCurrentBinaryQuestion] = useState(0);
  const [binaryQuestions, setBinaryQuestions] = useState<any[]>([]);
  const [binaryAnswer, setBinaryAnswer] = useState('');
  const [showBinaryResult, setShowBinaryResult] = useState(false);

  // Logic Gate State
  const [selectedGate, setSelectedGate] = useState<'AND' | 'OR' | 'NOT' | 'NAND' | 'NOR'>('AND');
  const [gateInputA, setGateInputA] = useState(false);
  const [gateInputB, setGateInputB] = useState(false);
  const [logicQuizScore, setLogicQuizScore] = useState(0);
  const [currentLogicQuestion, setCurrentLogicQuestion] = useState(0);
  const [logicQuestions, setLogicQuestions] = useState<any[]>([]);
  const [selectedLogicAnswer, setSelectedLogicAnswer] = useState<boolean | null>(null);
  const [showLogicResult, setShowLogicResult] = useState(false);

  // Cybersecurity State
  const [cyberQuizScore, setCyberQuizScore] = useState(0);
  const [currentCyberQuestion, setCurrentCyberQuestion] = useState(0);
  const [cyberQuestions, setCyberQuestions] = useState<any[]>([]);
  const [selectedCyberAnswer, setSelectedCyberAnswer] = useState<string | null>(null);
  const [showCyberResult, setShowCyberResult] = useState(false);

  // Initialize quiz questions
  useEffect(() => {
    generateColorQuestions();
    generateCryptoQuestions();
    generateBinaryQuestions();
    generateLogicQuestions();
    generateCyberQuestions();
  }, []);

  // Track tool usage
  useEffect(() => {
    if (user && selectedTool) {
      const toolNames = {
        'color-converter': 'RGB Converter',
        'cryptography': 'Cipher Practice',
        'binary-practice': 'Binary Practice',
        'logic-gates': 'Logic Gate Simulator',
        'cybersecurity': 'Cybersecurity Game'
      };
      
      const toolName = toolNames[selectedTool as keyof typeof toolNames];
      if (toolName && user.profile?.practiceToolsUsed && !user.profile.practiceToolsUsed.includes(toolName)) {
        updateProfile({
          practiceToolsUsed: [...(user.profile.practiceToolsUsed || []), toolName]
        });
      }
    }
  }, [selectedTool, user, updateProfile]);

  const generateColorQuestions = () => {
    const questions = [];
    for (let i = 0; i < 10; i++) {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      const correct = `rgb(${r}, ${g}, ${b})`;
      
      const options = [correct];
      while (options.length < 5) {
        const wrongR = Math.floor(Math.random() * 256);
        const wrongG = Math.floor(Math.random() * 256);
        const wrongB = Math.floor(Math.random() * 256);
        const wrong = `rgb(${wrongR}, ${wrongG}, ${wrongB})`;
        if (!options.includes(wrong)) {
          options.push(wrong);
        }
      }
      
      questions.push({
        color: `rgb(${r}, ${g}, ${b})`,
        options: options.sort(() => Math.random() - 0.5),
        correct: correct
      });
    }
    setColorQuestions(questions);
  };

  const generateCryptoQuestions = () => {
    const questions = [];
    const texts = ['HELLO', 'WORLD', 'COMPUTER', 'SCIENCE', 'PYTHON', 'CODING', 'ALGORITHM', 'DATA'];
    
    for (let i = 0; i < 10; i++) {
      const text = texts[Math.floor(Math.random() * texts.length)];
      const isVigenere = Math.random() > 0.5;
      const shift = Math.floor(Math.random() * 25) + 1;
      const key = ['KEY', 'CODE', 'SECRET', 'CIPHER'][Math.floor(Math.random() * 4)];
      const mode = Math.random() > 0.5 ? 'encode' : 'decode';
      
      let result;
      if (isVigenere) {
        result = mode === 'encode' ? vigenereEncode(text, key) : vigenereDecode(text, key);
      } else {
        result = mode === 'encode' ? caesarEncode(text, shift) : caesarDecode(text, shift);
      }
      
      questions.push({
        type: isVigenere ? 'vigenere' : 'caesar',
        text: mode === 'encode' ? text : result,
        shift: isVigenere ? null : shift,
        key: isVigenere ? key : null,
        mode,
        correct: mode === 'encode' ? result : text
      });
    }
    setCryptoQuestions(questions);
  };

  const generateBinaryQuestions = () => {
    const questions = [];
    for (let i = 0; i < 10; i++) {
      const isDecimalToBinary = Math.random() > 0.5;
      if (isDecimalToBinary) {
        const decimal = Math.floor(Math.random() * 255) + 1;
        questions.push({
          type: 'decimal-to-binary',
          question: decimal.toString(),
          correct: decimal.toString(2)
        });
      } else {
        const decimal = Math.floor(Math.random() * 255) + 1;
        const binary = decimal.toString(2);
        questions.push({
          type: 'binary-to-decimal',
          question: binary,
          correct: decimal.toString()
        });
      }
    }
    setBinaryQuestions(questions);
  };

  const generateLogicQuestions = () => {
    const questions = [];
    const gates = ['AND', 'OR', 'NOT', 'NAND', 'NOR'];
    
    for (let i = 0; i < 15; i++) {
      const gate = gates[Math.floor(Math.random() * gates.length)];
      const inputA = Math.random() > 0.5;
      const inputB = gate === 'NOT' ? false : Math.random() > 0.5;
      
      let output;
      switch (gate) {
        case 'AND': output = inputA && inputB; break;
        case 'OR': output = inputA || inputB; break;
        case 'NOT': output = !inputA; break;
        case 'NAND': output = !(inputA && inputB); break;
        case 'NOR': output = !(inputA || inputB); break;
        default: output = false;
      }
      
      questions.push({
        gate,
        inputA,
        inputB: gate === 'NOT' ? null : inputB,
        correct: output
      });
    }
    setLogicQuestions(questions);
  };

  const generateCyberQuestions = () => {
    const scenarios = [
      {
        scenario: "You receive an email from 'PayPal' asking you to click a link to verify your account. The email address is 'paypal-security@gmail.com'.",
        correct: "Phishing",
        explanation: "This is phishing - the email address is suspicious (PayPal wouldn't use Gmail) and asks you to click a link to 'verify' your account."
      },
      {
        scenario: "A website suddenly becomes very slow and then completely unavailable. The server logs show millions of requests from different IP addresses.",
        correct: "DDoS Attack",
        explanation: "This is a DDoS attack - multiple sources are flooding the server with requests to make it unavailable."
      },
      {
        scenario: "You download a free game from a suspicious website. Later, you notice your computer is running slowly and pop-up ads keep appearing.",
        correct: "Malware",
        explanation: "This is malware (specifically adware) - the free game contained malicious software that's now affecting your computer."
      },
      {
        scenario: "All your files are encrypted and you see a message demanding $500 in Bitcoin to decrypt them.",
        correct: "Ransomware",
        explanation: "This is ransomware - malicious software that encrypts files and demands payment for decryption."
      },
      {
        scenario: "Someone tries to log into your account with passwords like '123456', 'password', 'qwerty123' repeatedly.",
        correct: "Brute Force Attack",
        explanation: "This is a brute force attack - systematically trying common passwords to gain access."
      },
      {
        scenario: "You're using public WiFi at a coffee shop. Someone intercepts your login credentials when you access your email.",
        correct: "Man-in-the-Middle Attack",
        explanation: "This is a MITM attack - the attacker intercepted communication between you and the email server."
      },
      {
        scenario: "You type 'facebook.com' but are redirected to a fake site that looks identical to Facebook.",
        correct: "DNS Spoofing",
        explanation: "This is DNS spoofing - the DNS lookup was tampered with to redirect you to a fake website."
      },
      {
        scenario: "Your friend calls you to catch up and asks about your weekend plans.",
        correct: "Not an Attack",
        explanation: "This is normal social interaction, not a cybersecurity attack."
      },
      {
        scenario: "You receive a software update notification from your operating system.",
        correct: "Not an Attack",
        explanation: "Legitimate software updates are normal and important for security."
      },
      {
        scenario: "A program secretly records everything you type on your keyboard, including passwords.",
        correct: "Malware",
        explanation: "This is malware, specifically a keylogger - software that records keystrokes to steal sensitive information."
      }
    ];

    const shuffled = scenarios.sort(() => Math.random() - 0.5).slice(0, 10);
    const options = ["Phishing", "DDoS Attack", "Malware", "Ransomware", "Brute Force Attack", "Man-in-the-Middle Attack", "DNS Spoofing", "Not an Attack"];
    
    setCyberQuestions(shuffled.map(q => ({ ...q, options })));
  };

  // Cipher functions
  const caesarEncode = (text: string, shift: number) => {
    return text.split('').map(char => {
      if (char.match(/[A-Z]/)) {
        return String.fromCharCode(((char.charCodeAt(0) - 65 + shift) % 26) + 65);
      }
      return char;
    }).join('');
  };

  const caesarDecode = (text: string, shift: number) => {
    return caesarEncode(text, 26 - shift);
  };

  const vigenereEncode = (text: string, key: string) => {
    let result = '';
    let keyIndex = 0;
    
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (char.match(/[A-Z]/)) {
        const shift = key[keyIndex % key.length].charCodeAt(0) - 65;
        result += String.fromCharCode(((char.charCodeAt(0) - 65 + shift) % 26) + 65);
        keyIndex++;
      } else {
        result += char;
      }
    }
    return result;
  };

  const vigenereDecode = (text: string, key: string) => {
    let result = '';
    let keyIndex = 0;
    
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (char.match(/[A-Z]/)) {
        const shift = key[keyIndex % key.length].charCodeAt(0) - 65;
        result += String.fromCharCode(((char.charCodeAt(0) - 65 - shift + 26) % 26) + 65);
        keyIndex++;
      } else {
        result += char;
      }
    }
    return result;
  };

  // Logic gate calculation
  const calculateGateOutput = (gate: string, inputA: boolean, inputB: boolean) => {
    switch (gate) {
      case 'AND': return inputA && inputB;
      case 'OR': return inputA || inputB;
      case 'NOT': return !inputA;
      case 'NAND': return !(inputA && inputB);
      case 'NOR': return !(inputA || inputB);
      default: return false;
    }
  };

  // Quiz handlers
  const handleColorAnswer = (selectedOption: string) => {
    if (showColorResult) return;
    
    const question = colorQuestions[currentColorQuestion];
    const isCorrect = selectedOption === question.correct;
    
    setSelectedColorAnswer(colorQuestions[currentColorQuestion].options.indexOf(selectedOption));
    setShowColorResult(true);
    
    if (isCorrect) {
      setColorQuizScore(prev => prev + 1);
    }

    if (user) {
      addActivity(`Color Converter Quiz - Question ${currentColorQuestion + 1}`, 2, 'practice-tools');
    }
  };

  const nextColorQuestion = () => {
    if (currentColorQuestion < colorQuestions.length - 1) {
      setCurrentColorQuestion(prev => prev + 1);
    } else {
      setCurrentColorQuestion(0);
    }
    setSelectedColorAnswer(null);
    setShowColorResult(false);
  };

  const handleCryptoSubmit = () => {
    if (showCryptoResult) return;
    
    const question = cryptoQuestions[currentCryptoQuestion];
    const isCorrect = cryptoAnswer.toUpperCase() === question.correct.toUpperCase();
    
    setShowCryptoResult(true);
    
    if (isCorrect) {
      setCryptoQuizScore(prev => prev + 1);
    }

    if (user) {
      addActivity(`Cryptography Quiz - Question ${currentCryptoQuestion + 1}`, 3, 'practice-tools');
    }
  };

  const nextCryptoQuestion = () => {
    if (currentCryptoQuestion < cryptoQuestions.length - 1) {
      setCurrentCryptoQuestion(prev => prev + 1);
    } else {
      setCurrentCryptoQuestion(0);
    }
    setCryptoAnswer('');
    setShowCryptoResult(false);
  };

  const handleBinarySubmit = () => {
    if (showBinaryResult) return;
    
    const question = binaryQuestions[currentBinaryQuestion];
    const isCorrect = binaryAnswer === question.correct;
    
    setShowBinaryResult(true);
    
    if (isCorrect) {
      setBinaryQuizScore(prev => prev + 1);
    }

    if (user) {
      addActivity(`Binary Practice Quiz - Question ${currentBinaryQuestion + 1}`, 2, 'practice-tools');
    }
  };

  const nextBinaryQuestion = () => {
    if (currentBinaryQuestion < binaryQuestions.length - 1) {
      setCurrentBinaryQuestion(prev => prev + 1);
    } else {
      setCurrentBinaryQuestion(0);
    }
    setBinaryAnswer('');
    setShowBinaryResult(false);
  };

  const handleLogicAnswer = (answer: boolean) => {
    if (showLogicResult) return;
    
    const question = logicQuestions[currentLogicQuestion];
    const isCorrect = answer === question.correct;
    
    setSelectedLogicAnswer(answer);
    setShowLogicResult(true);
    
    if (isCorrect) {
      setLogicQuizScore(prev => prev + 1);
    }

    if (user) {
      addActivity(`Logic Gate Quiz - Question ${currentLogicQuestion + 1}`, 2, 'practice-tools');
    }
  };

  const nextLogicQuestion = () => {
    if (currentLogicQuestion < logicQuestions.length - 1) {
      setCurrentLogicQuestion(prev => prev + 1);
    } else {
      setCurrentLogicQuestion(0);
    }
    setSelectedLogicAnswer(null);
    setShowLogicResult(false);
  };

  const handleCyberAnswer = (answer: string) => {
    if (showCyberResult) return;
    
    const question = cyberQuestions[currentCyberQuestion];
    const isCorrect = answer === question.correct;
    
    setSelectedCyberAnswer(answer);
    setShowCyberResult(true);
    
    if (isCorrect) {
      setCyberQuizScore(prev => prev + 1);
    }

    if (user) {
      addActivity(`Cybersecurity Quiz - Question ${currentCyberQuestion + 1}`, 3, 'practice-tools');
    }
  };

  const nextCyberQuestion = () => {
    if (currentCyberQuestion < cyberQuestions.length - 1) {
      setCurrentCyberQuestion(prev => prev + 1);
    } else {
      setCurrentCyberQuestion(0);
    }
    setSelectedCyberAnswer(null);
    setShowCyberResult(false);
  };

  const resetQuiz = (type: string) => {
    switch (type) {
      case 'color':
        setColorQuizScore(0);
        setCurrentColorQuestion(0);
        setSelectedColorAnswer(null);
        setShowColorResult(false);
        generateColorQuestions();
        break;
      case 'crypto':
        setCryptoQuizScore(0);
        setCurrentCryptoQuestion(0);
        setCryptoAnswer('');
        setShowCryptoResult(false);
        generateCryptoQuestions();
        break;
      case 'binary':
        setBinaryQuizScore(0);
        setCurrentBinaryQuestion(0);
        setBinaryAnswer('');
        setShowBinaryResult(false);
        generateBinaryQuestions();
        break;
      case 'logic':
        setLogicQuizScore(0);
        setCurrentLogicQuestion(0);
        setSelectedLogicAnswer(null);
        setShowLogicResult(false);
        generateLogicQuestions();
        break;
      case 'cyber':
        setCyberQuizScore(0);
        setCurrentCyberQuestion(0);
        setSelectedCyberAnswer(null);
        setShowCyberResult(false);
        generateCyberQuestions();
        break;
    }
  };

  const tools = [
    {
      id: 'color-converter',
      title: 'RGB/HEX Converter',
      description: 'Convert between RGB and HEX color values with interactive practice',
      icon: Palette,
      color: 'bg-gradient-to-br from-pink-500 to-rose-600',
      hoverColor: 'hover:from-pink-600 hover:to-rose-700'
    },
    {
      id: 'cryptography',
      title: 'Cryptography & Ciphers',
      description: 'Learn Caesar and Vigenère ciphers with encoding/decoding practice',
      icon: Shield,
      color: 'bg-gradient-to-br from-blue-500 to-indigo-600',
      hoverColor: 'hover:from-blue-600 hover:to-indigo-700'
    },
    {
      id: 'binary-practice',
      title: 'Binary Practice',
      description: 'Master binary-decimal conversion with step-by-step guidance',
      icon: Binary,
      color: 'bg-gradient-to-br from-green-500 to-emerald-600',
      hoverColor: 'hover:from-green-600 hover:to-emerald-700'
    },
    {
      id: 'logic-gates',
      title: 'Logic Gate Simulator',
      description: 'Explore digital logic with interactive AND, OR, NOT, NAND, NOR gates',
      icon: Zap,
      color: 'bg-gradient-to-br from-purple-500 to-violet-600',
      hoverColor: 'hover:from-purple-600 hover:to-violet-700'
    },
    {
      id: 'cybersecurity',
      title: 'Cybersecurity Scenarios',
      description: 'Learn to identify and defend against common cyber threats',
      icon: Lock,
      color: 'bg-gradient-to-br from-orange-500 to-red-600',
      hoverColor: 'hover:from-orange-600 hover:to-red-700'
    },
    {
      id: 'python-resources',
      title: 'Python Resources',
      description: 'Comprehensive collection of Python learning platforms and tools',
      icon: Code,
      color: 'bg-gradient-to-br from-yellow-500 to-orange-600',
      hoverColor: 'hover:from-yellow-600 hover:to-orange-700'
    }
  ];

  const renderColorConverter = () => (
    <div className="space-y-8">
      {activeTab === 'info' ? (
        <div className="space-y-8">
          <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-8 border border-pink-200">
            <h3 className="text-2xl font-bold text-pink-900 mb-6 flex items-center">
              <Palette className="h-7 w-7 mr-3" />
              RGB & HEX Color Systems
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-semibold text-pink-800 mb-4">RGB (Red, Green, Blue)</h4>
                <p className="text-lg text-pink-700 mb-4 leading-relaxed">
                  RGB is an additive color model where colors are created by combining red, green, and blue light. 
                  Each component ranges from 0 to 255, giving us 16.7 million possible colors.
                </p>
                <div className="bg-white p-4 rounded-lg border border-pink-200">
                  <p className="text-lg font-medium text-gray-800">Example: rgb(255, 0, 128)</p>
                  <p className="text-pink-600">Maximum red, no green, half blue = Hot pink</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-xl font-semibold text-pink-800 mb-4">HEX (Hexadecimal)</h4>
                <p className="text-lg text-pink-700 mb-4 leading-relaxed">
                  HEX uses base-16 notation with digits 0-9 and letters A-F. Each color component is represented 
                  by two hexadecimal digits, making it compact for web development.
                </p>
                <div className="bg-white p-4 rounded-lg border border-pink-200">
                  <p className="text-lg font-medium text-gray-800">Example: #FF0080</p>
                  <p className="text-pink-600">FF=255 red, 00=0 green, 80=128 blue</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Interactive Color Converter</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-3">Red (0-255)</label>
                  <input
                    type="range"
                    min="0"
                    max="255"
                    value={rgbValues.r}
                    onChange={(e) => setRgbValues(prev => ({ ...prev, r: parseInt(e.target.value) }))}
                    className="w-full h-3 bg-red-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="text-lg font-bold text-red-600 mt-2">{rgbValues.r}</div>
                </div>
                
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-3">Green (0-255)</label>
                  <input
                    type="range"
                    min="0"
                    max="255"
                    value={rgbValues.g}
                    onChange={(e) => setRgbValues(prev => ({ ...prev, g: parseInt(e.target.value) }))}
                    className="w-full h-3 bg-green-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="text-lg font-bold text-green-600 mt-2">{rgbValues.g}</div>
                </div>
                
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-3">Blue (0-255)</label>
                  <input
                    type="range"
                    min="0"
                    max="255"
                    value={rgbValues.b}
                    onChange={(e) => setRgbValues(prev => ({ ...prev, b: parseInt(e.target.value) }))}
                    className="w-full h-3 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="text-lg font-bold text-blue-600 mt-2">{rgbValues.b}</div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div 
                  className="w-full h-48 rounded-2xl border-4 border-gray-200 shadow-lg"
                  style={{ backgroundColor: `rgb(${rgbValues.r}, ${rgbValues.g}, ${rgbValues.b})` }}
                />
                
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-lg font-medium text-gray-700">RGB Value:</p>
                    <p className="text-xl font-bold text-gray-900">rgb({rgbValues.r}, {rgbValues.g}, {rgbValues.b})</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-lg font-medium text-gray-700">HEX Value:</p>
                    <p className="text-xl font-bold text-gray-900">
                      #{rgbValues.r.toString(16).padStart(2, '0').toUpperCase()}
                      {rgbValues.g.toString(16).padStart(2, '0').toUpperCase()}
                      {rgbValues.b.toString(16).padStart(2, '0').toUpperCase()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-8 border border-pink-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-pink-900 flex items-center">
                <Trophy className="h-7 w-7 mr-3" />
                Color Recognition Quiz
              </h3>
              <div className="flex items-center space-x-4">
                <div className="text-lg font-bold text-pink-800">
                  Score: {colorQuizScore}/{colorQuestions.length}
                </div>
                <button
                  onClick={() => resetQuiz('color')}
                  className="flex items-center space-x-2 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Reset</span>
                </button>
              </div>
            </div>
            
            {colorQuestions.length > 0 && (
              <div className="space-y-6">
                <div className="text-center">
                  <p className="text-lg text-pink-800 mb-4">
                    Question {currentColorQuestion + 1} of {colorQuestions.length}
                  </p>
                  <p className="text-xl font-semibold text-pink-900 mb-6">
                    What is the RGB value for this color?
                  </p>
                  
                  <div 
                    className="w-48 h-48 mx-auto rounded-2xl border-4 border-pink-300 shadow-lg mb-8"
                    style={{ backgroundColor: colorQuestions[currentColorQuestion].color }}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {colorQuestions[currentColorQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleColorAnswer(option)}
                      disabled={showColorResult}
                      className={`p-4 rounded-lg border-2 transition-all duration-300 text-lg font-medium ${
                        showColorResult
                          ? option === colorQuestions[currentColorQuestion].correct
                            ? 'border-green-500 bg-green-50 text-green-800'
                            : selectedColorAnswer === index
                            ? 'border-red-500 bg-red-50 text-red-800'
                            : 'border-gray-200 bg-gray-50 text-gray-600'
                          : 'border-pink-200 hover:border-pink-400 hover:bg-pink-50 text-pink-800'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                
                {showColorResult && (
                  <div className="text-center">
                    <div className={`text-xl font-bold mb-4 ${
                      colorQuestions[currentColorQuestion].options[selectedColorAnswer || 0] === colorQuestions[currentColorQuestion].correct
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}>
                      {colorQuestions[currentColorQuestion].options[selectedColorAnswer || 0] === colorQuestions[currentColorQuestion].correct
                        ? '🎉 Correct!'
                        : `❌ Incorrect. The answer was ${colorQuestions[currentColorQuestion].correct}`
                      }
                    </div>
                    <button
                      onClick={nextColorQuestion}
                      className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors font-medium"
                    >
                      Next Question
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  const renderCryptography = () => (
    <div className="space-y-8">
      {activeTab === 'info' ? (
        <div className="space-y-8">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
            <h3 className="text-2xl font-bold text-blue-900 mb-6 flex items-center">
              <Shield className="h-7 w-7 mr-3" />
              Cryptography & Cipher Systems
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-semibold text-blue-800 mb-4">Caesar Cipher</h4>
                  <p className="text-lg text-blue-700 mb-4 leading-relaxed">
                    A substitution cipher where each letter is shifted by a fixed number of positions in the alphabet. 
                    Named after Julius Caesar who used it for military communications.
                  </p>
                  <div className="bg-white p-4 rounded-lg border border-blue-200">
                    <p className="text-lg font-medium text-gray-800">Example (Shift 3):</p>
                    <p className="text-blue-600">HELLO → KHOOR</p>
                    <p className="text-sm text-gray-600 mt-2">H+3=K, E+3=H, L+3=O, L+3=O, O+3=R</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-xl font-semibold text-blue-800 mb-4">Vigenère Cipher</h4>
                  <p className="text-lg text-blue-700 mb-4 leading-relaxed">
                    A polyalphabetic cipher using a keyword to determine different shifts for each letter. 
                    Much more secure than Caesar cipher due to varying shifts.
                  </p>
                  <div className="bg-white p-4 rounded-lg border border-blue-200">
                    <p className="text-lg font-medium text-gray-800">Example (Key: "KEY"):</p>
                    <p className="text-blue-600">HELLO → RIJVS</p>
                    <p className="text-sm text-gray-600 mt-2">H+K=R, E+E=I, L+Y=J, L+K=V, O+E=S</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg border border-blue-200">
                  <h4 className="text-xl font-semibold text-gray-800 mb-4">🔐 Cryptography Facts</h4>
                  <ul className="space-y-3 text-lg text-gray-700">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      Modern encryption protects online banking and shopping
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      AES-256 encryption would take billions of years to crack
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      Quantum computers may break current encryption methods
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      HTTPS uses encryption to secure web communications
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white p-6 rounded-lg border border-blue-200">
                  <h4 className="text-xl font-semibold text-gray-800 mb-4">📚 Alphabet Reference</h4>
                  <div className="grid grid-cols-13 gap-1 text-center text-sm font-mono">
                    {Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ').map((letter, index) => (
                      <div key={letter} className="bg-blue-100 p-1 rounded">
                        <div className="font-bold text-blue-800">{letter}</div>
                        <div className="text-blue-600">{index}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Interactive Cipher Tool</h3>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-4">
                  <label className="text-lg font-medium text-gray-700">Cipher Type:</label>
                  <select
                    value={cipherType}
                    onChange={(e) => setCipherType(e.target.value as 'caesar' | 'vigenere')}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                  >
                    <option value="caesar">Caesar Cipher</option>
                    <option value="vigenere">Vigenère Cipher</option>
                  </select>
                </div>
                
                <div className="flex items-center space-x-4">
                  <label className="text-lg font-medium text-gray-700">Mode:</label>
                  <select
                    value={cryptoMode}
                    onChange={(e) => setCryptoMode(e.target.value as 'encode' | 'decode')}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                  >
                    <option value="encode">Encode</option>
                    <option value="decode">Decode</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">
                      {cryptoMode === 'encode' ? 'Plain Text' : 'Cipher Text'}
                    </label>
                    <textarea
                      value={cryptoText}
                      onChange={(e) => setCryptoText(e.target.value.toUpperCase())}
                      className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg font-mono"
                      placeholder="Enter text here..."
                    />
                  </div>
                  
                  {cipherType === 'caesar' ? (
                    <div>
                      <label className="block text-lg font-medium text-gray-700 mb-2">Shift Value</label>
                      <input
                        type="number"
                        min="1"
                        max="25"
                        value={cryptoShift}
                        onChange={(e) => setCryptoShift(parseInt(e.target.value) || 1)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                      />
                    </div>
                  ) : (
                    <div>
                      <label className="block text-lg font-medium text-gray-700 mb-2">Key</label>
                      <input
                        type="text"
                        value={cryptoKey}
                        onChange={(e) => setCryptoKey(e.target.value.toUpperCase().replace(/[^A-Z]/g, ''))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg font-mono"
                        placeholder="Enter key..."
                      />
                    </div>
                  )}
                  
                  <button
                    onClick={() => {
                      if (cipherType === 'caesar') {
                        setCryptoResult(cryptoMode === 'encode' 
                          ? caesarEncode(cryptoText, cryptoShift)
                          : caesarDecode(cryptoText, cryptoShift)
                        );
                      } else {
                        setCryptoResult(cryptoMode === 'encode'
                          ? vigenereEncode(cryptoText, cryptoKey)
                          : vigenereDecode(cryptoText, cryptoKey)
                        );
                      }
                    }}
                    className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium"
                  >
                    {cryptoMode === 'encode' ? 'Encode' : 'Decode'}
                  </button>
                </div>
                
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-2">
                    {cryptoMode === 'encode' ? 'Cipher Text' : 'Plain Text'}
                  </label>
                  <div className="w-full h-32 px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-lg font-mono overflow-auto">
                    {cryptoResult || 'Result will appear here...'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Additional Resources</h3>
              <Download className="h-6 w-6 text-blue-600" />
            </div>
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h4 className="text-xl font-semibold text-blue-800 mb-3">📖 Tesla STEM Puzzles Book 2025</h4>
              <p className="text-lg text-blue-700 mb-4">
                Computational Tesla Puzzles - Advanced cryptography and computational thinking challenges
              </p>
              <a
                href="/cryptography/Computational Tesla Puzzles 2025.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium"
              >
                <Download className="h-5 w-5" />
                <span>Download PDF</span>
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-blue-900 flex items-center">
                <Trophy className="h-7 w-7 mr-3" />
                Cryptography Challenge
              </h3>
              <div className="flex items-center space-x-4">
                <div className="text-lg font-bold text-blue-800">
                  Score: {cryptoQuizScore}/{cryptoQuestions.length}
                </div>
                <button
                  onClick={() => resetQuiz('crypto')}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Reset</span>
                </button>
              </div>
            </div>
            
            {cryptoQuestions.length > 0 && (
              <div className="space-y-6">
                <div className="text-center">
                  <p className="text-lg text-blue-800 mb-4">
                    Question {currentCryptoQuestion + 1} of {cryptoQuestions.length}
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg border border-blue-200">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-lg font-medium text-gray-700">Cipher Type:</p>
                        <p className="text-xl font-bold text-blue-600 capitalize">
                          {cryptoQuestions[currentCryptoQuestion].type}
                        </p>
                      </div>
                      <div>
                        <p className="text-lg font-medium text-gray-700">Mode:</p>
                        <p className="text-xl font-bold text-blue-600 capitalize">
                          {cryptoQuestions[currentCryptoQuestion].mode}
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-lg font-medium text-gray-700">
                        {cryptoQuestions[currentCryptoQuestion].mode === 'encode' ? 'Plain Text:' : 'Cipher Text:'}
                      </p>
                      <p className="text-2xl font-bold text-gray-900 font-mono bg-gray-50 p-4 rounded-lg">
                        {cryptoQuestions[currentCryptoQuestion].text}
                      </p>
                    </div>
                    
                    {cryptoQuestions[currentCryptoQuestion].type === 'caesar' ? (
                      <div>
                        <p className="text-lg font-medium text-gray-700">Shift:</p>
                        <p className="text-xl font-bold text-blue-600">
                          {cryptoQuestions[currentCryptoQuestion].shift}
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-lg font-medium text-gray-700">Key:</p>
                        <p className="text-xl font-bold text-blue-600 font-mono">
                          {cryptoQuestions[currentCryptoQuestion].key}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <label className="block text-lg font-medium text-gray-700">
                    Your Answer:
                  </label>
                  <input
                    type="text"
                    value={cryptoAnswer}
                    onChange={(e) => setCryptoAnswer(e.target.value.toUpperCase())}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xl font-mono"
                    placeholder="Enter your answer..."
                    disabled={showCryptoResult}
                  />
                  
                  {!showCryptoResult && (
                    <button
                      onClick={handleCryptoSubmit}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg"
                    >
                      Submit Answer
                    </button>
                  )}
                </div>
                
                {showCryptoResult && (
                  <div className="text-center space-y-4">
                    <div className={`text-xl font-bold ${
                      cryptoAnswer.toUpperCase() === cryptoQuestions[currentCryptoQuestion].correct.toUpperCase()
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}>
                      {cryptoAnswer.toUpperCase() === cryptoQuestions[currentCryptoQuestion].correct.toUpperCase()
                        ? '🎉 Correct!'
                        : `❌ Incorrect. The answer was: ${cryptoQuestions[currentCryptoQuestion].correct}`
                      }
                    </div>
                    <button
                      onClick={nextCryptoQuestion}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      Next Question
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  const renderBinaryPractice = () => (
    <div className="space-y-8">
      {activeTab === 'info' ? (
        <div className="space-y-8">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200">
            <h3 className="text-2xl font-bold text-green-900 mb-6 flex items-center">
              <Binary className="h-7 w-7 mr-3" />
              Binary Number System
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-semibold text-green-800 mb-4">What is Binary?</h4>
                  <p className="text-lg text-green-700 mb-4 leading-relaxed">
                    Binary is a base-2 number system using only 0s and 1s. It's the fundamental language of computers, 
                    where each digit represents a power of 2.
                  </p>
                  <div className="bg-white p-4 rounded-lg border border-green-200">
                    <p className="text-lg font-medium text-gray-800">Example: 1011₂</p>
                    <p className="text-green-600">= 1×8 + 0×4 + 1×2 + 1×1 = 11₁₀</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-xl font-semibold text-green-800 mb-4">Powers of 2</h4>
                  <div className="bg-white p-4 rounded-lg border border-green-200">
                    <div className="grid grid-cols-4 gap-2 text-center text-sm">
                      {[128, 64, 32, 16, 8, 4, 2, 1].map((power, index) => (
                        <div key={power} className="bg-green-100 p-2 rounded">
                          <div className="font-bold text-green-800">2^{7-index}</div>
                          <div className="text-green-600">{power}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg border border-green-200">
                  <h4 className="text-xl font-semibold text-gray-800 mb-4">🔢 Binary Facts</h4>
                  <ul className="space-y-3 text-lg text-gray-700">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      All computer data is stored in binary format
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      8 bits = 1 byte (can represent 0-255)
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      Binary is used in digital circuits and logic gates
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      ASCII uses 7-8 bits to represent characters
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white p-6 rounded-lg border border-green-200">
                  <h4 className="text-xl font-semibold text-gray-800 mb-4">Conversion Steps</h4>
                  <div className="space-y-3 text-lg text-gray-700">
                    <div>
                      <p className="font-semibold text-green-800">Decimal to Binary:</p>
                      <p>Divide by 2, keep remainders</p>
                    </div>
                    <div>
                      <p className="font-semibold text-green-800">Binary to Decimal:</p>
                      <p>Multiply each digit by its power of 2</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Interactive Binary Converter</h3>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-6">
                <label className="text-lg font-medium text-gray-700">Conversion Mode:</label>
                <select
                  value={binaryMode}
                  onChange={(e) => setBinaryMode(e.target.value as 'toBinary' | 'toDecimal')}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-lg"
                >
                  <option value="toBinary">Decimal to Binary</option>
                  <option value="toDecimal">Binary to Decimal</option>
                </select>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-2">
                    {binaryMode === 'toBinary' ? 'Decimal Number' : 'Binary Number'}
                  </label>
                  <input
                    type="text"
                    value={binaryInput}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (binaryMode === 'toBinary') {
                        if (/^\d*$/.test(value)) setBinaryInput(value);
                      } else {
                        if (/^[01]*$/.test(value)) setBinaryInput(value);
                      }
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-xl font-mono"
                    placeholder={binaryMode === 'toBinary' ? 'Enter decimal number...' : 'Enter binary number...'}
                  />
                  
                  <button
                    onClick={() => {
                      if (binaryInput) {
                        if (binaryMode === 'toBinary') {
                          setBinaryResult(parseInt(binaryInput).toString(2));
                        } else {
                          setBinaryResult(parseInt(binaryInput, 2).toString());
                        }
                      }
                    }}
                    className="w-full mt-4 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-lg font-medium"
                  >
                    Convert
                  </button>
                </div>
                
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-2">
                    {binaryMode === 'toBinary' ? 'Binary Result' : 'Decimal Result'}
                  </label>
                  <div className="w-full h-16 px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-xl font-mono flex items-center">
                    {binaryResult || 'Result will appear here...'}
                  </div>
                  
                  {binaryResult && binaryMode === 'toBinary' && (
                    <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-lg font-medium text-green-800 mb-2">Step-by-step:</p>
                      <div className="space-y-1 text-green-700">
                        {parseInt(binaryInput).toString(2).split('').map((bit, index) => {
                          const power = parseInt(binaryInput).toString(2).length - 1 - index;
                          const value = parseInt(bit) * Math.pow(2, power);
                          return (
                            <div key={index} className="text-sm">
                              {bit} × 2^{power} = {value}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-green-900 flex items-center">
                <Trophy className="h-7 w-7 mr-3" />
                Binary Conversion Challenge
              </h3>
              <div className="flex items-center space-x-4">
                <div className="text-lg font-bold text-green-800">
                  Score: {binaryQuizScore}/{binaryQuestions.length}
                </div>
                <button
                  onClick={() => resetQuiz('binary')}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Reset</span>
                </button>
              </div>
            </div>
            
            {binaryQuestions.length > 0 && (
              <div className="space-y-6">
                <div className="text-center">
                  <p className="text-lg text-green-800 mb-4">
                    Question {currentBinaryQuestion + 1} of {binaryQuestions.length}
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg border border-green-200">
                  <div className="text-center space-y-4">
                    <p className="text-xl font-semibold text-gray-900">
                      Convert {binaryQuestions[currentBinaryQuestion].type === 'decimal-to-binary' ? 'decimal to binary' : 'binary to decimal'}:
                    </p>
                    <div className="text-3xl font-bold text-green-600 font-mono bg-green-50 p-6 rounded-lg">
                      {binaryQuestions[currentBinaryQuestion].question}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <label className="block text-lg font-medium text-gray-700">
                    Your Answer:
                  </label>
                  <input
                    type="text"
                    value={binaryAnswer}
                    onChange={(e) => {
                      const value = e.target.value;
                      const question = binaryQuestions[currentBinaryQuestion];
                      if (question.type === 'decimal-to-binary') {
                        if (/^[01]*$/.test(value)) setBinaryAnswer(value);
                      } else {
                        if (/^\d*$/.test(value)) setBinaryAnswer(value);
                      }
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-xl font-mono"
                    placeholder="Enter your answer..."
                    disabled={showBinaryResult}
                  />
                  
                  {!showBinaryResult && (
                    <button
                      onClick={handleBinarySubmit}
                      className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-lg"
                    >
                      Submit Answer
                    </button>
                  )}
                </div>
                
                {showBinaryResult && (
                  <div className="text-center space-y-4">
                    <div className={`text-xl font-bold ${
                      binaryAnswer === binaryQuestions[currentBinaryQuestion].correct
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}>
                      {binaryAnswer === binaryQuestions[currentBinaryQuestion].correct
                        ? '🎉 Correct!'
                        : `❌ Incorrect. The answer was: ${binaryQuestions[currentBinaryQuestion].correct}`
                      }
                    </div>
                    <button
                      onClick={nextBinaryQuestion}
                      className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                    >
                      Next Question
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  const renderLogicGates = () => (
    <div className="space-y-8">
      {activeTab === 'info' ? (
        <div className="space-y-8">
          <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-2xl p-8 border border-purple-200">
            <h3 className="text-2xl font-bold text-purple-900 mb-6 flex items-center">
              <Zap className="h-7 w-7 mr-3" />
              Digital Logic Gates
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-semibold text-purple-800 mb-4">What are Logic Gates?</h4>
                  <p className="text-lg text-purple-700 mb-4 leading-relaxed">
                    Logic gates are the fundamental building blocks of digital circuits. They perform basic logical 
                    operations on binary inputs (0 or 1) to produce binary outputs.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border border-purple-200">
                    <h5 className="text-lg font-semibold text-gray-800 mb-2">AND Gate</h5>
                    <p className="text-purple-700">Output is 1 only when ALL inputs are 1</p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-purple-200">
                    <h5 className="text-lg font-semibold text-gray-800 mb-2">OR Gate</h5>
                    <p className="text-purple-700">Output is 1 when ANY input is 1</p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-purple-200">
                    <h5 className="text-lg font-semibold text-gray-800 mb-2">NOT Gate</h5>
                    <p className="text-purple-700">Output is the opposite of the input</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg border border-purple-200">
                  <h4 className="text-xl font-semibold text-gray-800 mb-4">⚡ Logic Gate Facts</h4>
                  <ul className="space-y-3 text-lg text-gray-700">
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">•</span>
                      Logic gates are implemented using transistors
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">•</span>
                      Modern CPUs contain billions of logic gates
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">•</span>
                      NAND gates can implement any logical function
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">•</span>
                      Logic gates operate at incredible speeds (GHz)
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-purple-200">
                  <h5 className="text-lg font-semibold text-gray-800 mb-2">NAND Gate</h5>
                  <p className="text-purple-700">NOT AND - Output is 0 only when ALL inputs are 1</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-purple-200">
                  <h5 className="text-lg font-semibold text-gray-800 mb-2">NOR Gate</h5>
                  <p className="text-purple-700">NOT OR - Output is 1 only when ALL inputs are 0</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Interactive Logic Gate Simulator</h3>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-6">
                <label className="text-lg font-medium text-gray-700">Gate Type:</label>
                <select
                  value={selectedGate}
                  onChange={(e) => setSelectedGate(e.target.value as any)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"
                >
                  <option value="AND">AND</option>
                  <option value="OR">OR</option>
                  <option value="NOT">NOT</option>
                  <option value="NAND">NAND</option>
                  <option value="NOR">NOR</option>
                </select>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <label className="text-lg font-medium text-gray-700 w-20">Input A:</label>
                      <button
                        onClick={() => setGateInputA(!gateInputA)}
                        className={`px-6 py-3 rounded-lg font-bold text-lg transition-colors ${
                          gateInputA 
                            ? 'bg-green-500 text-white' 
                            : 'bg-red-500 text-white'
                        }`}
                      >
                        {gateInputA ? '1 (TRUE)' : '0 (FALSE)'}
                      </button>
                    </div>
                    
                    {selectedGate !== 'NOT' && (
                      <div className="flex items-center space-x-4">
                        <label className="text-lg font-medium text-gray-700 w-20">Input B:</label>
                        <button
                          onClick={() => setGateInputB(!gateInputB)}
                          className={`px-6 py-3 rounded-lg font-bold text-lg transition-colors ${
                            gateInputB 
                              ? 'bg-green-500 text-white' 
                              : 'bg-red-500 text-white'
                          }`}
                        >
                          {gateInputB ? '1 (TRUE)' : '0 (FALSE)'}
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                    <h4 className="text-xl font-semibold text-purple-800 mb-4">Gate Operation</h4>
                    <div className="text-lg text-purple-700">
                      <p className="mb-2">
                        <span className="font-bold">{selectedGate}</span> gate with inputs:
                      </p>
                      <p className="font-mono">
                        A = {gateInputA ? '1' : '0'}
                        {selectedGate !== 'NOT' && `, B = ${gateInputB ? '1' : '0'}`}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <h4 className="text-xl font-semibold text-gray-800 mb-4">Output</h4>
                    <div className={`w-32 h-32 rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-lg ${
                      calculateGateOutput(selectedGate, gateInputA, gateInputB)
                        ? 'bg-green-500'
                        : 'bg-red-500'
                    }`}>
                      {calculateGateOutput(selectedGate, gateInputA, gateInputB) ? '1' : '0'}
                    </div>
                    <p className="text-lg font-medium text-gray-700 mt-4">
                      {calculateGateOutput(selectedGate, gateInputA, gateInputB) ? 'TRUE' : 'FALSE'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Truth Tables</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {['AND', 'OR', 'NOT', 'NAND', 'NOR'].map(gate => (
                <div key={gate} className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                  <h4 className="text-xl font-semibold text-purple-800 mb-4 text-center">{gate} Gate</h4>
                  <div className="space-y-2">
                    {gate === 'NOT' ? (
                      <>
                        <div className="grid grid-cols-2 gap-2 text-center font-bold text-purple-700 border-b border-purple-300 pb-2">
                          <div>A</div>
                          <div>Output</div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-center">
                          <div>0</div>
                          <div className="font-bold text-green-600">1</div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-center">
                          <div>1</div>
                          <div className="font-bold text-red-600">0</div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="grid grid-cols-3 gap-2 text-center font-bold text-purple-700 border-b border-purple-300 pb-2">
                          <div>A</div>
                          <div>B</div>
                          <div>Output</div>
                        </div>
                        {[
                          [false, false],
                          [false, true],
                          [true, false],
                          [true, true]
                        ].map(([a, b], index) => {
                          const output = calculateGateOutput(gate, a, b);
                          return (
                            <div key={index} className="grid grid-cols-3 gap-2 text-center">
                              <div>{a ? '1' : '0'}</div>
                              <div>{b ? '1' : '0'}</div>
                              <div className={`font-bold ${output ? 'text-green-600' : 'text-red-600'}`}>
                                {output ? '1' : '0'}
                              </div>
                            </div>
                          );
                        })}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Additional Resources</h3>
              <ExternalLink className="h-6 w-6 text-purple-600" />
            </div>
            <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
              <h4 className="text-xl font-semibold text-purple-800 mb-3">📚 Digital Logic Design Reference</h4>
              <p className="text-lg text-purple-700 mb-4">
                Comprehensive guide to digital logic design and truth tables
              </p>
              <a
                href="http://trashworldnews.com/files/digital_logic_design.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-lg font-medium"
              >
                <ExternalLink className="h-5 w-5" />
                <span>View Reference</span>
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-2xl p-8 border border-purple-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-purple-900 flex items-center">
                <Trophy className="h-7 w-7 mr-3" />
                Logic Gate Challenge
              </h3>
              <div className="flex items-center space-x-4">
                <div className="text-lg font-bold text-purple-800">
                  Score: {logicQuizScore}/{logicQuestions.length}
                </div>
                <button
                  onClick={() => resetQuiz('logic')}
                  className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Reset</span>
                </button>
              </div>
            </div>
            
            {logicQuestions.length > 0 && (
              <div className="space-y-6">
                <div className="text-center">
                  <p className="text-lg text-purple-800 mb-4">
                    Question {currentLogicQuestion + 1} of {logicQuestions.length}
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg border border-purple-200">
                  <div className="text-center space-y-4">
                    <p className="text-xl font-semibold text-gray-900">
                      What is the output of this {logicQuestions[currentLogicQuestion].gate} gate?
                    </p>
                    <div className="space-y-2">
                      <div className="text-2xl font-bold text-purple-600">
                        Input A: {logicQuestions[currentLogicQuestion].inputA ? '1' : '0'}
                      </div>
                      {logicQuestions[currentLogicQuestion].inputB !== null && (
                        <div className="text-2xl font-bold text-purple-600">
                          Input B: {logicQuestions[currentLogicQuestion].inputB ? '1' : '0'}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center space-x-6">
                  <button
                    onClick={() => handleLogicAnswer(true)}
                    disabled={showLogicResult}
                    className={`px-8 py-4 rounded-lg font-bold text-xl transition-all duration-300 ${
                      showLogicResult
                        ? logicQuestions[currentLogicQuestion].correct === true
                          ? 'bg-green-500 text-white'
                          : selectedLogicAnswer === true
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-200 text-gray-600'
                        : 'bg-green-500 text-white hover:bg-green-600'
                    }`}
                  >
                    1 (TRUE)
                  </button>
                  
                  <button
                    onClick={() => handleLogicAnswer(false)}
                    disabled={showLogicResult}
                    className={`px-8 py-4 rounded-lg font-bold text-xl transition-all duration-300 ${
                      showLogicResult
                        ? logicQuestions[currentLogicQuestion].correct === false
                          ? 'bg-green-500 text-white'
                          : selectedLogicAnswer === false
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-200 text-gray-600'
                        : 'bg-red-500 text-white hover:bg-red-600'
                    }`}
                  >
                    0 (FALSE)
                  </button>
                </div>
                
                {showLogicResult && (
                  <div className="text-center space-y-4">
                    <div className={`text-xl font-bold ${
                      selectedLogicAnswer === logicQuestions[currentLogicQuestion].correct
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}>
                      {selectedLogicAnswer === logicQuestions[currentLogicQuestion].correct
                        ? '🎉 Correct!'
                        : `❌ Incorrect. The answer was: ${logicQuestions[currentLogicQuestion].correct ? '1 (TRUE)' : '0 (FALSE)'}`
                      }
                    </div>
                    <button
                      onClick={nextLogicQuestion}
                      className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                    >
                      Next Question
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  const renderCybersecurity = () => (
    <div className="space-y-8">
      {activeTab === 'info' ? (
        <div className="space-y-8">
          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8 border border-orange-200">
            <h3 className="text-2xl font-bold text-orange-900 mb-6 flex items-center">
              <Shield className="h-7 w-7 mr-3" />
              Cybersecurity Threats & Defense
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg border border-orange-200">
                  <div className="flex items-center mb-4">
                    <AlertTriangle className="h-6 w-6 text-red-600 mr-3" />
                    <h4 className="text-xl font-semibold text-red-800">Phishing</h4>
                  </div>
                  <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                    A social engineering attack where hackers trick people into giving away personal information 
                    like passwords or credit card numbers.
                  </p>
                  <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <p className="text-red-800 font-medium">Example:</p>
                    <p className="text-red-700">Fake email: "Your account is locked. Click here to reset your password."</p>
                  </div>
                  <div className="mt-4">
                    <p className="text-lg font-semibold text-green-800 mb-2">Defense:</p>
                    <ul className="text-green-700 space-y-1">
                      <li>• Don't click suspicious links</li>
                      <li>• Check sender's email address</li>
                      <li>• Look for URL errors</li>
                      <li>• Use two-factor authentication</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg border border-orange-200">
                  <div className="flex items-center mb-4">
                    <Server className="h-6 w-6 text-blue-600 mr-3" />
                    <h4 className="text-xl font-semibold text-blue-800">DDoS Attack</h4>
                  </div>
                  <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                    Distributed Denial of Service - floods a website with fake traffic to make it crash 
                    and become unavailable to real users.
                  </p>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <p className="text-blue-800 font-medium">Example:</p>
                    <p className="text-blue-700">Hacker takes down school website during finals week.</p>
                  </div>
                  <div className="mt-4">
                    <p className="text-lg font-semibold text-green-800 mb-2">Defense:</p>
                    <ul className="text-green-700 space-y-1">
                      <li>• Use firewalls and traffic filters</li>
                      <li>• Load balancing and rate limiting</li>
                      <li>• Monitor traffic for unusual spikes</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg border border-orange-200">
                  <div className="flex items-center mb-4">
                    <Bug className="h-6 w-6 text-purple-600 mr-3" />
                    <h4 className="text-xl font-semibold text-purple-800">Malware</h4>
                  </div>
                  <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                    Malicious software designed to harm or exploit devices, networks, or users. 
                    Includes viruses, trojans, spyware, and keyloggers.
                  </p>
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <p className="text-purple-800 font-medium">Example:</p>
                    <p className="text-purple-700">Free screen recorder that secretly steals saved passwords.</p>
                  </div>
                  <div className="mt-4">
                    <p className="text-lg font-semibold text-green-800 mb-2">Defense:</p>
                    <ul className="text-green-700 space-y-1">
                      <li>• Don't download from unknown sources</li>
                      <li>• Keep antivirus software active</li>
                      <li>• Scan files before opening</li>
                      <li>• Keep system updated</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg border border-orange-200">
                  <div className="flex items-center mb-4">
                    <Lock className="h-6 w-6 text-yellow-600 mr-3" />
                    <h4 className="text-xl font-semibold text-yellow-800">Ransomware</h4>
                  </div>
                  <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                    Malware that encrypts your files and demands payment (ransom) to unlock them. 
                    Often spreads through email attachments.
                  </p>
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <p className="text-yellow-800 font-medium">Example:</p>
                    <p className="text-yellow-700">WannaCry attack in 2017 hit hospitals and schools worldwide.</p>
                  </div>
                  <div className="mt-4">
                    <p className="text-lg font-semibold text-green-800 mb-2">Defense:</p>
                    <ul className="text-green-700 space-y-1">
                      <li>• Regularly back up your data</li>
                      <li>• Keep software updated</li>
                      <li>• Don't open suspicious emails</li>
                      <li>• Use endpoint protection</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg border border-orange-200">
                  <div className="flex items-center mb-4">
                    <Target className="h-6 w-6 text-indigo-600 mr-3" />
                    <h4 className="text-xl font-semibold text-indigo-800">Brute Force Attack</h4>
                  </div>
                  <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                    Systematically trying many password combinations to guess the correct one. 
                    Like a robot trying every key on a lock.
                  </p>
                  <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                    <p className="text-indigo-800 font-medium">Example:</p>
                    <p className="text-indigo-700">Tool tries "123456", "password", "qwerty123" on your account.</p>
                  </div>
                  <div className="mt-4">
                    <p className="text-lg font-semibold text-green-800 mb-2">Defense:</p>
                    <ul className="text-green-700 space-y-1">
                      <li>• Use strong passwords</li>
                      <li>• Enable account lockouts</li>
                      <li>• Use multi-factor authentication</li>
                      <li>• Monitor login attempts</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg border border-orange-200">
                  <div className="flex items-center mb-4">
                    <Wifi className="h-6 w-6 text-teal-600 mr-3" />
                    <h4 className="text-xl font-semibold text-teal-800">Man-in-the-Middle (MITM)</h4>
                  </div>
                  <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                    Attacker secretly intercepts communication between two parties to steal or 
                    modify information being transmitted.
                  </p>
                  <div className="bg-teal-50 p-4 rounded-lg border border-teal-200">
                    <p className="text-teal-800 font-medium">Example:</p>
                    <p className="text-teal-700">Hacker intercepts your email login on public WiFi at Starbucks.</p>
                  </div>
                  <div className="mt-4">
                    <p className="text-lg font-semibold text-green-800 mb-2">Defense:</p>
                    <ul className="text-green-700 space-y-1">
                      <li>• Use HTTPS websites (lock icon)</li>
                      <li>• Avoid public WiFi for sensitive tasks</li>
                      <li>• Use a VPN</li>
                      <li>• Check for certificate warnings</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg border border-orange-200">
                  <div className="flex items-center mb-4">
                    <Globe className="h-6 w-6 text-pink-600 mr-3" />
                    <h4 className="text-xl font-semibold text-pink-800">DNS Spoofing</h4>
                  </div>
                  <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                    DNS Cache Poisoning - tricks your computer into visiting a fake website 
                    instead of the real one by tampering with DNS records.
                  </p>
                  <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
                    <p className="text-pink-800 font-medium">Example:</p>
                    <p className="text-pink-700">You type "bank.com" but are redirected to a fake banking site.</p>
                  </div>
                  <div className="mt-4">
                    <p className="text-lg font-semibold text-green-800 mb-2">Defense:</p>
                    <ul className="text-green-700 space-y-1">
                      <li>• Use secure DNS providers</li>
                      <li>• Clear DNS cache regularly</li>
                      <li>• Watch for HTTPS warnings</li>
                      <li>• Verify website certificates</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg border border-orange-200">
                  <h4 className="text-xl font-semibold text-gray-800 mb-4">🛡️ Security Best Practices</h4>
                  <ul className="space-y-3 text-lg text-gray-700">
                    <li className="flex items-start">
                      <span className="text-orange-600 mr-2">•</span>
                      Use unique, strong passwords for each account
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-600 mr-2">•</span>
                      Enable two-factor authentication everywhere
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-600 mr-2">•</span>
                      Keep software and systems updated
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-600 mr-2">•</span>
                      Be skeptical of unsolicited communications
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-600 mr-2">•</span>
                      Regular backups of important data
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8 border border-orange-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-orange-900 flex items-center">
                <Trophy className="h-7 w-7 mr-3" />
                Cybersecurity Scenario Challenge
              </h3>
              <div className="flex items-center space-x-4">
                <div className="text-lg font-bold text-orange-800">
                  Score: {cyberQuizScore}/{cyberQuestions.length}
                </div>
                <button
                  onClick={() => resetQuiz('cyber')}
                  className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Reset</span>
                </button>
              </div>
            </div>
            
            {cyberQuestions.length > 0 && (
              <div className="space-y-6">
                <div className="text-center">
                  <p className="text-lg text-orange-800 mb-4">
                    Question {currentCyberQuestion + 1} of {cyberQuestions.length}
                  </p>
                  <p className="text-xl font-semibold text-orange-900 mb-6">
                    What type of cybersecurity threat is this scenario?
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg border border-orange-200">
                  <div className="text-lg text-gray-800 leading-relaxed">
                    {cyberQuestions[currentCyberQuestion].scenario}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {cyberQuestions[currentCyberQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleCyberAnswer(option)}
                      disabled={showCyberResult}
                      className={`p-4 rounded-lg border-2 transition-all duration-300 text-lg font-medium ${
                        showCyberResult
                          ? option === cyberQuestions[currentCyberQuestion].correct
                            ? 'border-green-500 bg-green-50 text-green-800'
                            : selectedCyberAnswer === option
                            ? 'border-red-500 bg-red-50 text-red-800'
                            : 'border-gray-200 bg-gray-50 text-gray-600'
                          : 'border-orange-200 hover:border-orange-400 hover:bg-orange-50 text-orange-800'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                
                {showCyberResult && (
                  <div className="space-y-4">
                    <div className={`text-xl font-bold text-center ${
                      selectedCyberAnswer === cyberQuestions[currentCyberQuestion].correct
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}>
                      {selectedCyberAnswer === cyberQuestions[currentCyberQuestion].correct
                        ? '🎉 Correct!'
                        : `❌ Incorrect. The answer was: ${cyberQuestions[currentCyberQuestion].correct}`
                      }
                    </div>
                    
                    <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                      <h4 className="text-lg font-semibold text-blue-800 mb-2">Explanation:</h4>
                      <p className="text-blue-700 leading-relaxed">
                        {cyberQuestions[currentCyberQuestion].explanation}
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <button
                        onClick={nextCyberQuestion}
                        className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
                      >
                        Next Question
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  const renderPythonResources = () => (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-8 border border-yellow-200">
        <h3 className="text-2xl font-bold text-yellow-900 mb-6 flex items-center">
          <Code className="h-7 w-7 mr-3" />
          Python Learning Resources
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg border border-yellow-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <img src="/src/assets/python-icons/CMU.png" alt="CMU" className="w-12 h-12 mr-3" />
              <h4 className="text-xl font-semibold text-gray-800">CMU CS Academy</h4>
            </div>
            <p className="text-lg text-gray-700 mb-4">
              Interactive Python course with graphics and animations. Perfect for visual learners.
            </p>
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-yellow-700">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                Interactive graphics programming
              </div>
              <div className="flex items-center text-yellow-700">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                Step-by-step tutorials
              </div>
              <div className="flex items-center text-yellow-700">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                Immediate feedback
              </div>
            </div>
            <a
              href="https://academy.cs.cmu.edu/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              <span>Visit CMU CS Academy</span>
            </a>
          </div>

          <div className="bg-white p-6 rounded-lg border border-yellow-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <img src="/src/assets/python-icons/codestep.png" alt="CodeStepByStep" className="w-12 h-12 mr-3" />
              <h4 className="text-xl font-semibold text-gray-800">CodeStepByStep</h4>
            </div>
            <p className="text-lg text-gray-700 mb-4">
              Practice coding problems with automatic grading and detailed solutions.
            </p>
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-yellow-700">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                Hundreds of practice problems
              </div>
              <div className="flex items-center text-yellow-700">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                Automatic grading system
              </div>
              <div className="flex items-center text-yellow-700">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                Detailed explanations
              </div>
            </div>
            <a
              href="https://codestepbystep.com/problem/list/python"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              <span>Practice Problems</span>
            </a>
          </div>

          <div className="bg-white p-6 rounded-lg border border-yellow-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <img src="/src/assets/python-icons/EXCERCISM.png" alt="Exercism" className="w-12 h-12 mr-3" />
              <h4 className="text-xl font-semibold text-gray-800">Exercism</h4>
            </div>
            <p className="text-lg text-gray-700 mb-4">
              Free coding practice with mentorship. Get personalized feedback on your code.
            </p>
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-yellow-700">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                Personal mentorship
              </div>
              <div className="flex items-center text-yellow-700">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                Real-world exercises
              </div>
              <div className="flex items-center text-yellow-700">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                Community discussions
              </div>
            </div>
            <a
              href="https://exercism.org/tracks/python"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              <span>Start Exercism</span>
            </a>
          </div>

          <div className="bg-white p-6 rounded-lg border border-yellow-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <img src="/src/assets/python-icons/image.png" alt="CodingBat" className="w-12 h-12 mr-3" />
              <h4 className="text-xl font-semibold text-gray-800">CodingBat</h4>
            </div>
            <p className="text-lg text-gray-700 mb-4">
              Build coding skill with practice problems in Python. Great for beginners.
            </p>
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-yellow-700">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                Beginner-friendly problems
              </div>
              <div className="flex items-center text-yellow-700">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                Instant feedback
              </div>
              <div className="flex items-center text-yellow-700">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                Progressive difficulty
              </div>
            </div>
            <a
              href="https://codingbat.com/python"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              <span>Practice on CodingBat</span>
            </a>
          </div>

          <div className="bg-white p-6 rounded-lg border border-yellow-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <img src="/src/assets/python-icons/PYTHON.png" alt="PracticePython" className="w-12 h-12 mr-3" />
              <h4 className="text-xl font-semibold text-gray-800">PracticePython</h4>
            </div>
            <p className="text-lg text-gray-700 mb-4">
              Weekly Python exercises with solutions. Perfect for consistent practice.
            </p>
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-yellow-700">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                Weekly new exercises
              </div>
              <div className="flex items-center text-yellow-700">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                Detailed solutions provided
              </div>
              <div className="flex items-center text-yellow-700">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                Beginner to intermediate
              </div>
            </div>
            <a
              href="https://www.practicepython.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              <span>Practice Python</span>
            </a>
          </div>

          <div className="bg-white p-6 rounded-lg border border-yellow-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <Code className="w-12 h-12 mr-3 text-yellow-600" />
              <h4 className="text-xl font-semibold text-gray-800">Python.org Tutorial</h4>
            </div>
            <p className="text-lg text-gray-700 mb-4">
              Official Python tutorial covering all the fundamentals. Comprehensive and authoritative.
            </p>
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-yellow-700">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                Official documentation
              </div>
              <div className="flex items-center text-yellow-700">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                Complete language coverage
              </div>
              <div className="flex items-center text-yellow-700">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                Always up-to-date
              </div>
            </div>
            <a
              href="https://docs.python.org/3/tutorial/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              <span>Official Tutorial</span>
            </a>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <Lightbulb className="h-8 w-8 text-yellow-500 animate-pulse mr-3" />
            <h3 className="text-2xl font-bold text-gray-900">Keep Learning!</h3>
            <Lightbulb className="h-8 w-8 text-yellow-500 animate-pulse ml-3" />
          </div>
          <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
            Keep challenging yourself — Python is one of the most powerful and beginner-friendly languages out there. 
            Every problem you solve builds your confidence and creativity. Stick with it, and you'll be amazed at what you can create.
          </p>
        </div>
      </div>
    </div>
  );

  const renderCurrentTool = () => {
    switch (selectedTool) {
      case 'color-converter':
        return renderColorConverter();
      case 'cryptography':
        return renderCryptography();
      case 'binary-practice':
        return renderBinaryPractice();
      case 'logic-gates':
        return renderLogicGates();
      case 'cybersecurity':
        return renderCybersecurity();
      case 'python-resources':
        return renderPythonResources();
      default:
        return renderColorConverter();
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-pink-200 rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-blue-200 rounded-full opacity-20 animate-float-delayed"></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-green-200 rounded-full opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-18 h-18 bg-purple-200 rounded-full opacity-20 animate-float-delayed"></div>
      </div>

      <div className="text-center mb-12 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-50 via-blue-50 to-green-50 rounded-3xl opacity-50"></div>
        <div className="relative z-10 py-12">
          <div className="flex items-center justify-center mb-6">
            <Code className="h-12 w-12 text-blue-500 animate-bounce mr-4" />
            <Zap className="h-16 w-16 text-green-600 animate-pulse" />
            <Shield className="h-10 w-10 text-purple-500 animate-spin ml-4" style={{ animationDuration: '3s' }} />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-600 via-blue-600 to-green-600 bg-clip-text text-transparent mb-4">
            Practice Tools
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Master essential computer science concepts with interactive tools, comprehensive practice, and engaging simulations
          </p>
        </div>
      </div>

      {/* Tool Selection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {tools.map((tool, index) => {
          const Icon = tool.icon;
          const isSelected = selectedTool === tool.id;
          
          return (
            <div
              key={tool.id}
              onClick={() => setSelectedTool(tool.id)}
              className={`bg-white rounded-2xl p-8 shadow-lg border cursor-pointer transition-all duration-500 transform hover:-translate-y-3 relative overflow-hidden ${
                isSelected 
                  ? 'border-blue-500 shadow-2xl scale-105' 
                  : 'border-gray-100 hover:shadow-2xl'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Background Animation */}
              <div className={`absolute inset-0 opacity-0 transition-opacity duration-500 ${
                isSelected ? 'opacity-100' : 'group-hover:opacity-100'
              }`}>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"></div>
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className={`${tool.color} ${tool.hoverColor} p-4 rounded-2xl transition-all duration-500 shadow-lg ${
                    isSelected ? 'scale-110 rotate-6' : 'hover:scale-110 hover:rotate-6'
                  }`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  {isSelected && (
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="h-6 w-6 text-green-500 animate-bounce" />
                      <span className="text-sm font-medium text-green-600">Selected</span>
                    </div>
                  )}
                </div>
                
                <h3 className={`text-2xl font-bold mb-3 transition-colors ${
                  isSelected ? 'text-blue-600' : 'text-gray-900 hover:text-blue-600'
                }`}>
                  {tool.title}
                </h3>
                <p className={`leading-relaxed transition-colors ${
                  isSelected ? 'text-gray-800' : 'text-gray-600 hover:text-gray-800'
                }`}>
                  {tool.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Tool Content */}
      {selectedTool && selectedTool !== 'python-resources' && (
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <button
              onClick={() => setActiveTab('info')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === 'info'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <Info className="h-5 w-5" />
              <span>Information & Examples</span>
            </button>
            <button
              onClick={() => setActiveTab('practice')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === 'practice'
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
              }`}
            >
              <Play className="h-5 w-5" />
              <span>Practice Quiz</span>
            </button>
          </div>
        </div>
      )}

      {/* Tool Content */}
      <div className="relative">
        {renderCurrentTool()}
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

export default PracticeTools;