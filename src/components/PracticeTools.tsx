import React, { useState, useEffect } from 'react';
import { 
  Palette, Shield, Binary, Zap, Code, 
  ChevronRight, CheckCircle, XCircle, RotateCcw, 
  Trophy, Target, Star, Sparkles, Eye, Brain,
  Download, ExternalLink, Book, Play, Info,
  Award, Lightbulb, ArrowRight, Clock, TrendingUp
} from 'lucide-react';

const PracticeTools: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState('color-converter');
  const [activeView, setActiveView] = useState<'info' | 'practice'>('info');

  // Color Converter State
  const [red, setRed] = useState(255);
  const [green, setGreen] = useState(0);
  const [blue, setBlue] = useState(0);
  const [colorQuizScore, setColorQuizScore] = useState(0);
  const [currentColorQuestion, setCurrentColorQuestion] = useState(0);
  const [colorQuizAnswered, setColorQuizAnswered] = useState(false);
  const [colorQuestions, setColorQuestions] = useState<any[]>([]);

  // Cryptography State
  const [cipherText, setCipherText] = useState('');
  const [cipherShift, setCipherShift] = useState(3);
  const [cipherResult, setCipherResult] = useState('');
  const [cipherMode, setCipherMode] = useState<'encode' | 'decode'>('encode');
  const [cryptoQuizScore, setCryptoQuizScore] = useState(0);
  const [currentCryptoQuestion, setCurrentCryptoQuestion] = useState(0);
  const [cryptoQuizAnswered, setCryptoQuizAnswered] = useState(false);
  const [cryptoUserAnswer, setCryptoUserAnswer] = useState('');

  // Binary State
  const [binaryInput, setBinaryInput] = useState('');
  const [binaryResult, setBinaryResult] = useState('');
  const [binaryMode, setBinaryMode] = useState<'toBinary' | 'toDecimal'>('toBinary');
  const [binaryQuizScore, setBinaryQuizScore] = useState(0);
  const [currentBinaryQuestion, setCurrentBinaryQuestion] = useState(0);
  const [binaryQuizAnswered, setBinaryQuizAnswered] = useState(false);
  const [binaryUserAnswer, setBinaryUserAnswer] = useState('');

  // Logic Gate State
  const [gateType, setGateType] = useState<'AND' | 'OR' | 'NOT' | 'NAND' | 'NOR'>('AND');
  const [inputA, setInputA] = useState(false);
  const [inputB, setInputB] = useState(false);
  const [logicQuizScore, setLogicQuizScore] = useState(0);
  const [currentLogicQuestion, setCurrentLogicQuestion] = useState(0);
  const [logicQuizAnswered, setLogicQuizAnswered] = useState(false);

  // Cybersecurity State
  const [cyberQuizScore, setCyberQuizScore] = useState(0);
  const [currentCyberQuestion, setCurrentCyberQuestion] = useState(0);
  const [cyberQuizAnswered, setCyberQuizAnswered] = useState(false);

  // Generate color quiz questions
  const generateColorQuestions = () => {
    const questions = [];
    for (let i = 0; i < 10; i++) {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      const correctHex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`.toUpperCase();
      
      const options = [correctHex];
      while (options.length < 5) {
        const wrongR = Math.floor(Math.random() * 256);
        const wrongG = Math.floor(Math.random() * 256);
        const wrongB = Math.floor(Math.random() * 256);
        const wrongHex = `#${wrongR.toString(16).padStart(2, '0')}${wrongG.toString(16).padStart(2, '0')}${wrongB.toString(16).padStart(2, '0')}`.toUpperCase();
        if (!options.includes(wrongHex)) {
          options.push(wrongHex);
        }
      }
      
      questions.push({
        color: `rgb(${r}, ${g}, ${b})`,
        rgb: { r, g, b },
        correct: correctHex,
        options: options.sort(() => Math.random() - 0.5)
      });
    }
    return questions;
  };

  useEffect(() => {
    setColorQuestions(generateColorQuestions());
  }, []);

  // Crypto quiz questions
  const cryptoQuestions = [
    { type: 'Caesar Cipher', text: 'HELLO', shift: 3, mode: 'encode', answer: 'KHOOR' },
    { type: 'Caesar Cipher', text: 'ZRUOG', shift: 3, mode: 'decode', answer: 'WORLD' },
    { type: 'Caesar Cipher', text: 'FRPSXWHU', shift: 3, mode: 'decode', answer: 'COMPUTER' },
    { type: 'Caesar Cipher', text: 'PYTHON', shift: 5, mode: 'encode', answer: 'UDYMTS' },
    { type: 'Caesar Cipher', text: 'MJQQT', shift: 5, mode: 'decode', answer: 'HELLO' },
    { type: 'Caesar Cipher', text: 'SECURITY', shift: 7, mode: 'encode', answer: 'ZLJBYPAF' },
    { type: 'Caesar Cipher', text: 'JVTLYPUN', shift: 7, mode: 'decode', answer: 'COMPUTER' },
    { type: 'Caesar Cipher', text: 'DATA', shift: 4, mode: 'encode', answer: 'HEXE' },
    { type: 'Caesar Cipher', text: 'QSKLKQO', shift: 2, mode: 'decode', answer: 'PROGRAM' },
    { type: 'Caesar Cipher', text: 'ALGORITHM', shift: 1, mode: 'encode', answer: 'BMHPSJUIN' }
  ];

  // Binary quiz questions
  const binaryQuestions = [
    { number: 5, binary: '101', mode: 'toBinary' },
    { number: 10, binary: '1010', mode: 'toBinary' },
    { number: 15, binary: '1111', mode: 'toBinary' },
    { number: 8, binary: '1000', mode: 'toBinary' },
    { number: 7, binary: '111', mode: 'toBinary' },
    { number: 12, binary: '1100', mode: 'toBinary' },
    { number: 3, binary: '11', mode: 'toBinary' },
    { number: 20, binary: '10100', mode: 'toBinary' },
    { number: 25, binary: '11001', mode: 'toBinary' },
    { number: 31, binary: '11111', mode: 'toBinary' }
  ];

  // Logic gate quiz questions
  const logicQuestions = [
    { gate: 'AND', inputA: true, inputB: true, output: true },
    { gate: 'AND', inputA: true, inputB: false, output: false },
    { gate: 'OR', inputA: false, inputB: true, output: true },
    { gate: 'OR', inputA: false, inputB: false, output: false },
    { gate: 'NOT', inputA: true, inputB: null, output: false },
    { gate: 'NOT', inputA: false, inputB: null, output: true },
    { gate: 'NAND', inputA: true, inputB: true, output: false },
    { gate: 'NAND', inputA: false, inputB: true, output: true },
    { gate: 'NOR', inputA: false, inputB: false, output: true },
    { gate: 'NOR', inputA: true, inputB: false, output: false }
  ];

  // Cybersecurity quiz questions
  const cyberQuestions = [
    {
      scenario: "You receive an email claiming to be from your bank asking you to click a link and verify your account details.",
      options: ["Phishing Attack", "Malware", "DDoS Attack", "Not an Attack", "Social Engineering"],
      correct: 0
    },
    {
      scenario: "A website suddenly becomes very slow and unresponsive due to an overwhelming amount of traffic from multiple sources.",
      options: ["Phishing Attack", "DDoS Attack", "Virus", "Not an Attack", "Data Breach"],
      correct: 1
    },
    {
      scenario: "You download a file that secretly installs software to monitor your keystrokes.",
      options: ["Spyware/Keylogger", "Phishing", "DDoS", "Not an Attack", "Firewall"],
      correct: 0
    },
    {
      scenario: "Your computer automatically updates its antivirus definitions.",
      options: ["Malware", "Virus", "Trojan", "Not an Attack", "Phishing"],
      correct: 3
    },
    {
      scenario: "Someone calls pretending to be IT support and asks for your password.",
      options: ["Social Engineering", "Malware", "DDoS", "Not an Attack", "Encryption"],
      correct: 0
    },
    {
      scenario: "A program appears to be a game but actually deletes files when run.",
      options: ["Trojan Horse", "Phishing", "DDoS", "Not an Attack", "Firewall"],
      correct: 0
    },
    {
      scenario: "You use HTTPS to browse a shopping website.",
      options: ["Attack", "Virus", "Malware", "Not an Attack", "Phishing"],
      correct: 3
    },
    {
      scenario: "A pop-up claims your computer is infected and asks you to download 'antivirus' software.",
      options: ["Scareware/Fake Antivirus", "Legitimate Warning", "DDoS", "Not an Attack", "Encryption"],
      correct: 0
    },
    {
      scenario: "Your personal information is stolen from a company's database due to poor security.",
      options: ["Data Breach", "Phishing", "DDoS", "Not an Attack", "Social Engineering"],
      correct: 0
    },
    {
      scenario: "You enable two-factor authentication on your accounts.",
      options: ["Attack", "Virus", "Malware", "Not an Attack", "Phishing"],
      correct: 3
    }
  ];

  // Utility functions
  const rgbToHex = (r: number, g: number, b: number) => {
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`.toUpperCase();
  };

  const caesarCipher = (text: string, shift: number, decode: boolean = false) => {
    const actualShift = decode ? -shift : shift;
    return text.split('').map(char => {
      if (char.match(/[A-Z]/)) {
        return String.fromCharCode(((char.charCodeAt(0) - 65 + actualShift + 26) % 26) + 65);
      }
      return char;
    }).join('');
  };

  const calculateLogicGate = (gate: string, a: boolean, b: boolean) => {
    switch (gate) {
      case 'AND': return a && b;
      case 'OR': return a || b;
      case 'NOT': return !a;
      case 'NAND': return !(a && b);
      case 'NOR': return !(a || b);
      default: return false;
    }
  };

  const convertBinary = () => {
    if (binaryMode === 'toBinary') {
      const decimal = parseInt(binaryInput);
      if (!isNaN(decimal)) {
        setBinaryResult(decimal.toString(2));
      }
    } else {
      const binary = binaryInput;
      if (/^[01]+$/.test(binary)) {
        setBinaryResult(parseInt(binary, 2).toString());
      }
    }
  };

  const applyCipher = () => {
    const result = caesarCipher(cipherText.toUpperCase(), cipherShift, cipherMode === 'decode');
    setCipherResult(result);
  };

  const tools = [
    {
      id: 'color-converter',
      title: 'RGB/HEX Converter',
      icon: Palette,
      color: 'bg-gradient-to-br from-pink-500 to-rose-600',
      description: 'Convert between RGB and HEX color values'
    },
    {
      id: 'cryptography',
      title: 'Cryptography & Ciphers',
      icon: Shield,
      color: 'bg-gradient-to-br from-blue-500 to-indigo-600',
      description: 'Learn about encryption and practice cipher techniques'
    },
    {
      id: 'binary-practice',
      title: 'Binary Practice',
      icon: Binary,
      color: 'bg-gradient-to-br from-green-500 to-emerald-600',
      description: 'Practice converting between binary and decimal'
    },
    {
      id: 'logic-gates',
      title: 'Logic Gate Simulator',
      icon: Zap,
      color: 'bg-gradient-to-br from-yellow-500 to-orange-600',
      description: 'Simulate and understand Boolean logic gates'
    },
    {
      id: 'cybersecurity',
      title: 'Cybersecurity Scenarios',
      icon: Shield,
      color: 'bg-gradient-to-br from-purple-500 to-violet-600',
      description: 'Learn to identify security threats and attacks'
    },
    {
      id: 'python-resources',
      title: 'Python Resources',
      icon: Code,
      color: 'bg-gradient-to-br from-blue-600 to-cyan-600',
      description: 'Comprehensive Python learning resources'
    }
  ];

  const renderColorConverter = () => (
    <div className="space-y-8">
      {activeView === 'info' ? (
        <div className="space-y-6">
          {/* Color Display */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Palette className="h-6 w-6 mr-3 text-pink-600" />
              Color Converter
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">Red (0-255)</label>
                    <input
                      type="range"
                      min="0"
                      max="255"
                      value={red}
                      onChange={(e) => setRed(parseInt(e.target.value))}
                      className="w-full h-3 bg-red-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="text-center text-lg font-bold text-gray-900 mt-2">{red}</div>
                  </div>
                  
                  <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">Green (0-255)</label>
                    <input
                      type="range"
                      min="0"
                      max="255"
                      value={green}
                      onChange={(e) => setGreen(parseInt(e.target.value))}
                      className="w-full h-3 bg-green-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="text-center text-lg font-bold text-gray-900 mt-2">{green}</div>
                  </div>
                  
                  <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">Blue (0-255)</label>
                    <input
                      type="range"
                      min="0"
                      max="255"
                      value={blue}
                      onChange={(e) => setBlue(parseInt(e.target.value))}
                      className="w-full h-3 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="text-center text-lg font-bold text-gray-900 mt-2">{blue}</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div 
                  className="w-full h-48 rounded-xl border-4 border-gray-200 shadow-lg"
                  style={{ backgroundColor: `rgb(${red}, ${green}, ${blue})` }}
                ></div>
                
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <div className="text-lg font-medium text-gray-700 mb-2">RGB Value:</div>
                    <div className="text-xl font-bold text-gray-900">rgb({red}, {green}, {blue})</div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <div className="text-lg font-medium text-gray-700 mb-2">HEX Value:</div>
                    <div className="text-xl font-bold text-gray-900">{rgbToHex(red, green, blue)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Information Section */}
          <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-8 border border-pink-200">
            <h3 className="text-2xl font-bold text-pink-900 mb-6 flex items-center">
              <Info className="h-6 w-6 mr-3" />
              Understanding Color Models
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-pink-800">RGB Color Model</h4>
                <div className="space-y-3 text-lg text-pink-700">
                  <p><strong>Red, Green, Blue:</strong> Each component ranges from 0-255</p>
                  <p><strong>Additive Color:</strong> Colors are created by adding light</p>
                  <p><strong>Digital Displays:</strong> Used in monitors, phones, TVs</p>
                  <p><strong>Total Colors:</strong> 256³ = 16,777,216 possible colors</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-pink-800">HEX Color Model</h4>
                <div className="space-y-3 text-lg text-pink-700">
                  <p><strong>Hexadecimal:</strong> Base-16 number system (0-9, A-F)</p>
                  <p><strong>Format:</strong> #RRGGBB (6 characters)</p>
                  <p><strong>Web Standard:</strong> Used in HTML, CSS, web design</p>
                  <p><strong>Compact:</strong> Shorter representation than RGB</p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-6 bg-white rounded-xl border border-pink-200">
              <h4 className="text-xl font-bold text-pink-800 mb-4">APCSP Connection</h4>
              <div className="text-lg text-pink-700 space-y-2">
                <p>• <strong>Binary Representation:</strong> Each RGB value is stored as 8 bits (1 byte)</p>
                <p>• <strong>Data Abstraction:</strong> HEX provides a human-readable format for binary color data</p>
                <p>• <strong>Number Systems:</strong> Demonstrates conversion between decimal and hexadecimal</p>
                <p>• <strong>Digital Representation:</strong> How computers store and display visual information</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900 flex items-center">
              <Brain className="h-6 w-6 mr-3 text-pink-600" />
              Color Recognition Quiz
            </h3>
            <div className="flex items-center space-x-4">
              <div className="bg-pink-100 px-4 py-2 rounded-lg">
                <span className="text-lg font-bold text-pink-800">Score: {colorQuizScore}</span>
              </div>
              <button
                onClick={() => {
                  setColorQuizScore(0);
                  setCurrentColorQuestion(0);
                  setColorQuizAnswered(false);
                  setColorQuestions(generateColorQuestions());
                }}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {colorQuestions.length > 0 && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-lg font-medium text-gray-700 mb-4">
                  Question {currentColorQuestion + 1} of {colorQuestions.length}
                </div>
                <div className="text-xl font-bold text-gray-900 mb-6">
                  What is the RGB value for this color?
                </div>
                
                <div 
                  className="w-48 h-48 mx-auto rounded-xl border-4 border-gray-200 shadow-lg mb-6"
                  style={{ backgroundColor: colorQuestions[currentColorQuestion]?.color }}
                ></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {colorQuestions[currentColorQuestion]?.options.map((option: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (!colorQuizAnswered) {
                        setColorQuizAnswered(true);
                        if (option === colorQuestions[currentColorQuestion].correct) {
                          setColorQuizScore(prev => prev + 1);
                        }
                      }
                    }}
                    disabled={colorQuizAnswered}
                    className={`p-4 rounded-xl border-2 text-lg font-medium transition-all ${
                      colorQuizAnswered
                        ? option === colorQuestions[currentColorQuestion].correct
                          ? 'border-green-500 bg-green-100 text-green-800'
                          : 'border-gray-300 bg-gray-100 text-gray-600'
                        : 'border-gray-300 hover:border-pink-500 hover:bg-pink-50'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {colorQuizAnswered && (
                <div className="text-center">
                  <button
                    onClick={() => {
                      if (currentColorQuestion < colorQuestions.length - 1) {
                        setCurrentColorQuestion(prev => prev + 1);
                        setColorQuizAnswered(false);
                      } else {
                        setCurrentColorQuestion(0);
                        setColorQuizAnswered(false);
                        setColorQuestions(generateColorQuestions());
                      }
                    }}
                    className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg text-lg font-medium"
                  >
                    {currentColorQuestion < colorQuestions.length - 1 ? 'Next Question' : 'Start Over'}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );

  const renderCryptography = () => (
    <div className="space-y-8">
      {activeView === 'info' ? (
        <div className="space-y-6">
          {/* Cipher Tool */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Shield className="h-6 w-6 mr-3 text-blue-600" />
              Caesar Cipher Tool
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-2">Mode</label>
                  <select
                    value={cipherMode}
                    onChange={(e) => setCipherMode(e.target.value as 'encode' | 'decode')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg"
                  >
                    <option value="encode">Encode</option>
                    <option value="decode">Decode</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-2">Shift Value</label>
                  <input
                    type="number"
                    min="1"
                    max="25"
                    value={cipherShift}
                    onChange={(e) => setCipherShift(parseInt(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg"
                  />
                </div>
                
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-2">Input Text</label>
                  <textarea
                    value={cipherText}
                    onChange={(e) => setCipherText(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg h-32"
                    placeholder="Enter text to encode/decode..."
                  />
                </div>
                
                <button
                  onClick={applyCipher}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-medium"
                >
                  Apply Cipher
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-2">Result</label>
                  <div className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-lg h-32 overflow-auto">
                    {cipherResult}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Information Section */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
            <h3 className="text-2xl font-bold text-blue-900 mb-6 flex items-center">
              <Info className="h-6 w-6 mr-3" />
              Cryptography Fundamentals
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-blue-800">Caesar Cipher</h4>
                <div className="space-y-3 text-lg text-blue-700">
                  <p><strong>Substitution Cipher:</strong> Each letter is shifted by a fixed number</p>
                  <p><strong>Historical:</strong> Used by Julius Caesar for military communications</p>
                  <p><strong>Simple but Weak:</strong> Easy to break with frequency analysis</p>
                  <p><strong>Educational Value:</strong> Demonstrates basic encryption concepts</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-blue-800">Modern Cryptography</h4>
                <div className="space-y-3 text-lg text-blue-700">
                  <p><strong>Symmetric:</strong> Same key for encryption and decryption</p>
                  <p><strong>Asymmetric:</strong> Public and private key pairs</p>
                  <p><strong>Hash Functions:</strong> One-way mathematical functions</p>
                  <p><strong>Digital Signatures:</strong> Verify authenticity and integrity</p>
                </div>
              </div>
            </div>

            {/* Alphabet Reference */}
            <div className="bg-white rounded-xl p-6 border border-blue-200 mb-6">
              <h4 className="text-xl font-bold text-blue-800 mb-4">Alphabet Reference</h4>
              <div className="grid grid-cols-13 gap-2 text-center text-lg font-medium">
                {Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ').map((letter, index) => (
                  <div key={letter} className="space-y-1">
                    <div className="text-blue-900 font-bold">{letter}</div>
                    <div className="text-blue-600 text-sm">{index}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 bg-white rounded-xl border border-blue-200">
              <h4 className="text-xl font-bold text-blue-800 mb-4">APCSP Connection</h4>
              <div className="text-lg text-blue-700 space-y-2">
                <p>• <strong>Data Security:</strong> Understanding how information is protected</p>
                <p>• <strong>Algorithms:</strong> Encryption as a systematic process</p>
                <p>• <strong>Mathematical Operations:</strong> Modular arithmetic in ciphers</p>
                <p>• <strong>Digital Privacy:</strong> Importance of secure communication</p>
              </div>
            </div>
          </div>

          {/* Tesla Puzzles PDF */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-200">
            <h3 className="text-2xl font-bold text-purple-900 mb-4 flex items-center">
              <Download className="h-6 w-6 mr-3" />
              Additional Resources
            </h3>
            <div className="bg-white rounded-xl p-6 border border-purple-200">
              <h4 className="text-xl font-bold text-purple-800 mb-3">Tesla STEM Puzzles Book 2025</h4>
              <p className="text-lg text-purple-700 mb-4">
                Computational Tesla Puzzles - Advanced cryptography and computational thinking challenges
              </p>
              <a
                href="/cryptography/Computational Tesla Puzzles 2025.pdf"
                download
                className="inline-flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition-colors"
              >
                <Download className="h-5 w-5" />
                <span>Download PDF</span>
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900 flex items-center">
              <Brain className="h-6 w-6 mr-3 text-blue-600" />
              Cryptography Quiz
            </h3>
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 px-4 py-2 rounded-lg">
                <span className="text-lg font-bold text-blue-800">Score: {cryptoQuizScore}</span>
              </div>
              <button
                onClick={() => {
                  setCryptoQuizScore(0);
                  setCurrentCryptoQuestion(0);
                  setCryptoQuizAnswered(false);
                  setCryptoUserAnswer('');
                }}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="text-center">
              <div className="text-lg font-medium text-gray-700 mb-4">
                Question {currentCryptoQuestion + 1} of {cryptoQuestions.length}
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
                <div><strong>Cipher Type:</strong> {cryptoQuestions[currentCryptoQuestion].type}</div>
                <div><strong>Mode:</strong> {cryptoQuestions[currentCryptoQuestion].mode}</div>
                <div><strong>Text:</strong> {cryptoQuestions[currentCryptoQuestion].text}</div>
                <div><strong>Shift:</strong> {cryptoQuestions[currentCryptoQuestion].shift}</div>
              </div>
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Your Answer:
              </label>
              <input
                type="text"
                value={cryptoUserAnswer}
                onChange={(e) => setCryptoUserAnswer(e.target.value.toUpperCase())}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg"
                placeholder="Enter your answer..."
                disabled={cryptoQuizAnswered}
              />
            </div>

            <div className="text-center">
              <button
                onClick={() => {
                  if (!cryptoQuizAnswered) {
                    setCryptoQuizAnswered(true);
                    if (cryptoUserAnswer === cryptoQuestions[currentCryptoQuestion].answer) {
                      setCryptoQuizScore(prev => prev + 1);
                    }
                  } else {
                    if (currentCryptoQuestion < cryptoQuestions.length - 1) {
                      setCurrentCryptoQuestion(prev => prev + 1);
                    } else {
                      setCurrentCryptoQuestion(0);
                    }
                    setCryptoQuizAnswered(false);
                    setCryptoUserAnswer('');
                  }
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-medium"
              >
                {!cryptoQuizAnswered ? 'Check Answer' : 
                 currentCryptoQuestion < cryptoQuestions.length - 1 ? 'Next Question' : 'Start Over'}
              </button>
            </div>

            {cryptoQuizAnswered && (
              <div className={`text-center p-4 rounded-lg ${
                cryptoUserAnswer === cryptoQuestions[currentCryptoQuestion].answer
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                <div className="text-lg font-medium">
                  {cryptoUserAnswer === cryptoQuestions[currentCryptoQuestion].answer
                    ? '✓ Correct!'
                    : `✗ Incorrect. The answer is: ${cryptoQuestions[currentCryptoQuestion].answer}`
                  }
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  const renderBinaryPractice = () => (
    <div className="space-y-8">
      {activeView === 'info' ? (
        <div className="space-y-6">
          {/* Binary Converter */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Binary className="h-6 w-6 mr-3 text-green-600" />
              Binary Converter
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-2">Conversion Mode</label>
                  <select
                    value={binaryMode}
                    onChange={(e) => setBinaryMode(e.target.value as 'toBinary' | 'toDecimal')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg"
                  >
                    <option value="toBinary">Decimal to Binary</option>
                    <option value="toDecimal">Binary to Decimal</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-2">
                    {binaryMode === 'toBinary' ? 'Decimal Number' : 'Binary Number'}
                  </label>
                  <input
                    type="text"
                    value={binaryInput}
                    onChange={(e) => setBinaryInput(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg"
                    placeholder={binaryMode === 'toBinary' ? 'Enter decimal number...' : 'Enter binary number...'}
                  />
                </div>
                
                <button
                  onClick={convertBinary}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg text-lg font-medium"
                >
                  Convert
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-2">Result</label>
                  <div className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-lg h-20 flex items-center">
                    <span className="text-2xl font-bold text-green-600">{binaryResult}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Information Section */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200">
            <h3 className="text-2xl font-bold text-green-900 mb-6 flex items-center">
              <Info className="h-6 w-6 mr-3" />
              Binary Number System
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-green-800">Binary Basics</h4>
                <div className="space-y-3 text-lg text-green-700">
                  <p><strong>Base-2 System:</strong> Only uses digits 0 and 1</p>
                  <p><strong>Place Values:</strong> Powers of 2 (1, 2, 4, 8, 16, 32...)</p>
                  <p><strong>Computer Language:</strong> How computers store all data</p>
                  <p><strong>Digital Foundation:</strong> Basis of all digital technology</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-green-800">Conversion Examples</h4>
                <div className="space-y-3 text-lg text-green-700">
                  <p><strong>5 in binary:</strong> 101 (4 + 0 + 1)</p>
                  <p><strong>10 in binary:</strong> 1010 (8 + 0 + 2 + 0)</p>
                  <p><strong>1111 in decimal:</strong> 15 (8 + 4 + 2 + 1)</p>
                  <p><strong>1000 in decimal:</strong> 8 (8 + 0 + 0 + 0)</p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-6 bg-white rounded-xl border border-green-200">
              <h4 className="text-xl font-bold text-green-800 mb-4">APCSP Connection</h4>
              <div className="text-lg text-green-700 space-y-2">
                <p>• <strong>Data Representation:</strong> How computers store numbers, text, images</p>
                <p>• <strong>Abstraction:</strong> Binary as the lowest level of computer data</p>
                <p>• <strong>Algorithms:</strong> Conversion algorithms between number systems</p>
                <p>• <strong>Digital Systems:</strong> Foundation of all computing operations</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900 flex items-center">
              <Brain className="h-6 w-6 mr-3 text-green-600" />
              Binary Conversion Quiz
            </h3>
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 px-4 py-2 rounded-lg">
                <span className="text-lg font-bold text-green-800">Score: {binaryQuizScore}</span>
              </div>
              <button
                onClick={() => {
                  setBinaryQuizScore(0);
                  setCurrentBinaryQuestion(0);
                  setBinaryQuizAnswered(false);
                  setBinaryUserAnswer('');
                }}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="text-center">
              <div className="text-lg font-medium text-gray-700 mb-4">
                Question {currentBinaryQuestion + 1} of {binaryQuestions.length}
              </div>
            </div>

            <div className="bg-green-50 rounded-xl p-6 border border-green-200 text-center">
              <div className="text-xl font-bold text-green-900 mb-4">
                Convert {Math.random() > 0.5 ? 'decimal to binary' : 'binary to decimal'}:
              </div>
              <div className="text-3xl font-bold text-green-800">
                {Math.random() > 0.5 ? binaryQuestions[currentBinaryQuestion].number : binaryQuestions[currentBinaryQuestion].binary}
              </div>
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Your Answer:
              </label>
              <input
                type="text"
                value={binaryUserAnswer}
                onChange={(e) => setBinaryUserAnswer(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg"
                placeholder="Enter your answer..."
                disabled={binaryQuizAnswered}
              />
            </div>

            <div className="text-center">
              <button
                onClick={() => {
                  if (!binaryQuizAnswered) {
                    setBinaryQuizAnswered(true);
                    const currentQ = binaryQuestions[currentBinaryQuestion];
                    const isCorrect = Math.random() > 0.5 
                      ? binaryUserAnswer === currentQ.binary
                      : binaryUserAnswer === currentQ.number.toString();
                    if (isCorrect) {
                      setBinaryQuizScore(prev => prev + 1);
                    }
                  } else {
                    if (currentBinaryQuestion < binaryQuestions.length - 1) {
                      setCurrentBinaryQuestion(prev => prev + 1);
                    } else {
                      setCurrentBinaryQuestion(0);
                    }
                    setBinaryQuizAnswered(false);
                    setBinaryUserAnswer('');
                  }
                }}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-lg font-medium"
              >
                {!binaryQuizAnswered ? 'Check Answer' : 
                 currentBinaryQuestion < binaryQuestions.length - 1 ? 'Next Question' : 'Start Over'}
              </button>
            </div>

            {binaryQuizAnswered && (
              <div className="text-center p-4 rounded-lg bg-blue-100 text-blue-800">
                <div className="text-lg font-medium">
                  Answer checked! Continue to next question.
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  const renderLogicGates = () => (
    <div className="space-y-8">
      {activeView === 'info' ? (
        <div className="space-y-6">
          {/* Logic Gate Simulator */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Zap className="h-6 w-6 mr-3 text-yellow-600" />
              Logic Gate Simulator
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-2">Gate Type</label>
                  <select
                    value={gateType}
                    onChange={(e) => setGateType(e.target.value as any)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg"
                  >
                    <option value="AND">AND</option>
                    <option value="OR">OR</option>
                    <option value="NOT">NOT</option>
                    <option value="NAND">NAND</option>
                    <option value="NOR">NOR</option>
                  </select>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <label className="text-lg font-medium text-gray-700 w-24">Input A:</label>
                    <button
                      onClick={() => setInputA(!inputA)}
                      className={`px-6 py-3 rounded-lg text-lg font-medium ${
                        inputA ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-700'
                      }`}
                    >
                      {inputA ? 'TRUE' : 'FALSE'}
                    </button>
                  </div>
                  
                  {gateType !== 'NOT' && (
                    <div className="flex items-center space-x-4">
                      <label className="text-lg font-medium text-gray-700 w-24">Input B:</label>
                      <button
                        onClick={() => setInputB(!inputB)}
                        className={`px-6 py-3 rounded-lg text-lg font-medium ${
                          inputB ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-700'
                        }`}
                      >
                        {inputB ? 'TRUE' : 'FALSE'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-lg font-medium text-gray-700 mb-4">Output</div>
                  <div className={`text-4xl font-bold p-6 rounded-xl ${
                    calculateLogicGate(gateType, inputA, inputB) 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {calculateLogicGate(gateType, inputA, inputB) ? 'TRUE' : 'FALSE'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Information Section */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 border border-yellow-200">
            <h3 className="text-2xl font-bold text-yellow-900 mb-6 flex items-center">
              <Info className="h-6 w-6 mr-3" />
              Logic Gates & Boolean Algebra
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-yellow-800">Basic Gates</h4>
                <div className="space-y-3 text-lg text-yellow-700">
                  <p><strong>AND:</strong> Output true only if both inputs are true</p>
                  <p><strong>OR:</strong> Output true if at least one input is true</p>
                  <p><strong>NOT:</strong> Output opposite of input</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-yellow-800">Compound Gates</h4>
                <div className="space-y-3 text-lg text-yellow-700">
                  <p><strong>NAND:</strong> NOT AND - opposite of AND gate</p>
                  <p><strong>NOR:</strong> NOT OR - opposite of OR gate</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-yellow-800">Applications</h4>
                <div className="space-y-3 text-lg text-yellow-700">
                  <p><strong>Computer Processors:</strong> Billions of logic gates</p>
                  <p><strong>Digital Circuits:</strong> Building blocks of electronics</p>
                  <p><strong>Programming:</strong> Boolean logic in conditionals</p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-6 bg-white rounded-xl border border-yellow-200">
              <h4 className="text-xl font-bold text-yellow-800 mb-4">APCSP Connection</h4>
              <div className="text-lg text-yellow-700 space-y-2">
                <p>• <strong>Boolean Expressions:</strong> Fundamental to programming logic</p>
                <p>• <strong>Conditional Statements:</strong> IF/THEN logic in programs</p>
                <p>• <strong>Computer Architecture:</strong> How processors make decisions</p>
                <p>• <strong>Algorithm Design:</strong> Logical thinking and problem solving</p>
              </div>
            </div>
          </div>

          {/* Citation */}
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <ExternalLink className="h-6 w-6 mr-3" />
              Additional Resources
            </h3>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h4 className="text-xl font-bold text-gray-800 mb-3">Digital Logic Design Reference</h4>
              <p className="text-lg text-gray-700 mb-4">
                Comprehensive guide to digital logic design and truth tables
              </p>
              <a
                href="http://trashworldnews.com/files/digital_logic_design.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition-colors"
              >
                <ExternalLink className="h-5 w-5" />
                <span>View Resource</span>
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900 flex items-center">
              <Brain className="h-6 w-6 mr-3 text-yellow-600" />
              Logic Gates Quiz
            </h3>
            <div className="flex items-center space-x-4">
              <div className="bg-yellow-100 px-4 py-2 rounded-lg">
                <span className="text-lg font-bold text-yellow-800">Score: {logicQuizScore}</span>
              </div>
              <button
                onClick={() => {
                  setLogicQuizScore(0);
                  setCurrentLogicQuestion(0);
                  setLogicQuizAnswered(false);
                }}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="text-center">
              <div className="text-lg font-medium text-gray-700 mb-4">
                Question {currentLogicQuestion + 1} of {logicQuestions.length}
              </div>
            </div>

            <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
              <div className="text-center space-y-4">
                <div className="text-xl font-bold text-yellow-900">
                  {logicQuestions[currentLogicQuestion].gate} Gate
                </div>
                <div className="text-lg text-yellow-800">
                  Input A: {logicQuestions[currentLogicQuestion].inputA ? 'TRUE' : 'FALSE'}
                  {logicQuestions[currentLogicQuestion].inputB !== null && (
                    <span> | Input B: {logicQuestions[currentLogicQuestion].inputB ? 'TRUE' : 'FALSE'}</span>
                  )}
                </div>
                <div className="text-lg font-medium text-yellow-800">
                  What is the output?
                </div>
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <button
                onClick={() => {
                  if (!logicQuizAnswered) {
                    setLogicQuizAnswered(true);
                    if (logicQuestions[currentLogicQuestion].output === true) {
                      setLogicQuizScore(prev => prev + 1);
                    }
                  }
                }}
                disabled={logicQuizAnswered}
                className={`px-8 py-4 rounded-lg text-lg font-medium ${
                  logicQuizAnswered
                    ? logicQuestions[currentLogicQuestion].output === true
                      ? 'bg-green-100 text-green-800 border-2 border-green-500'
                      : 'bg-gray-100 text-gray-600'
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                TRUE
              </button>
              <button
                onClick={() => {
                  if (!logicQuizAnswered) {
                    setLogicQuizAnswered(true);
                    if (logicQuestions[currentLogicQuestion].output === false) {
                      setLogicQuizScore(prev => prev + 1);
                    }
                  }
                }}
                disabled={logicQuizAnswered}
                className={`px-8 py-4 rounded-lg text-lg font-medium ${
                  logicQuizAnswered
                    ? logicQuestions[currentLogicQuestion].output === false
                      ? 'bg-green-100 text-green-800 border-2 border-green-500'
                      : 'bg-gray-100 text-gray-600'
                    : 'bg-red-600 hover:bg-red-700 text-white'
                }`}
              >
                FALSE
              </button>
            </div>

            {logicQuizAnswered && (
              <div className="text-center">
                <button
                  onClick={() => {
                    if (currentLogicQuestion < logicQuestions.length - 1) {
                      setCurrentLogicQuestion(prev => prev + 1);
                    } else {
                      setCurrentLogicQuestion(0);
                    }
                    setLogicQuizAnswered(false);
                  }}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg text-lg font-medium"
                >
                  {currentLogicQuestion < logicQuestions.length - 1 ? 'Next Question' : 'Start Over'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  const renderCybersecurity = () => (
    <div className="space-y-8">
      {activeView === 'info' ? (
        <div className="space-y-6">
          {/* Security Guide */}
          <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-8 border border-purple-200">
            <h3 className="text-2xl font-bold text-purple-900 mb-6 flex items-center">
              <Shield className="h-6 w-6 mr-3" />
              Comprehensive Security Guide
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Common Threats */}
              <div className="bg-white rounded-xl p-6 border border-red-200">
                <h4 className="text-xl font-bold text-red-800 mb-4 flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Common Threats
                </h4>
                <div className="space-y-3 text-lg text-red-700">
                  <p><strong>Phishing:</strong> Fake emails/websites stealing credentials</p>
                  <p><strong>Malware:</strong> Malicious software (viruses, trojans, spyware)</p>
                  <p><strong>DDoS:</strong> Overwhelming servers with traffic</p>
                  <p><strong>Social Engineering:</strong> Manipulating people for information</p>
                  <p><strong>Data Breaches:</strong> Unauthorized access to databases</p>
                </div>
              </div>

              {/* Password Security */}
              <div className="bg-white rounded-xl p-6 border border-blue-200">
                <h4 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Password Security
                </h4>
                <div className="space-y-3 text-lg text-blue-700">
                  <p><strong>Strong Passwords:</strong> 12+ characters, mixed case, numbers, symbols</p>
                  <p><strong>Unique Passwords:</strong> Different password for each account</p>
                  <p><strong>Password Managers:</strong> Tools to generate and store passwords</p>
                  <p><strong>Two-Factor Auth:</strong> Additional security layer beyond passwords</p>
                  <p><strong>Regular Updates:</strong> Change passwords periodically</p>
                </div>
              </div>

              {/* Safe Browsing */}
              <div className="bg-white rounded-xl p-6 border border-green-200">
                <h4 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Safe Browsing
                </h4>
                <div className="space-y-3 text-lg text-green-700">
                  <p><strong>HTTPS:</strong> Look for secure connections (lock icon)</p>
                  <p><strong>Verify URLs:</strong> Check for suspicious domain names</p>
                  <p><strong>Avoid Pop-ups:</strong> Don't click suspicious advertisements</p>
                  <p><strong>Download Sources:</strong> Only from trusted websites</p>
                  <p><strong>Browser Updates:</strong> Keep browsers current with security patches</p>
                </div>
              </div>

              {/* Device Security */}
              <div className="bg-white rounded-xl p-6 border border-orange-200">
                <h4 className="text-xl font-bold text-orange-800 mb-4 flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Device Security
                </h4>
                <div className="space-y-3 text-lg text-orange-700">
                  <p><strong>Screen Locks:</strong> PINs, passwords, biometrics</p>
                  <p><strong>Software Updates:</strong> Install security patches promptly</p>
                  <p><strong>Antivirus:</strong> Real-time protection against malware</p>
                  <p><strong>Firewalls:</strong> Block unauthorized network access</p>
                  <p><strong>Encryption:</strong> Protect data if device is stolen</p>
                </div>
              </div>

              {/* Privacy Protection */}
              <div className="bg-white rounded-xl p-6 border border-pink-200">
                <h4 className="text-xl font-bold text-pink-800 mb-4 flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Privacy Protection
                </h4>
                <div className="space-y-3 text-lg text-pink-700">
                  <p><strong>Social Media:</strong> Limit personal information sharing</p>
                  <p><strong>Privacy Settings:</strong> Review and adjust app permissions</p>
                  <p><strong>Public WiFi:</strong> Avoid sensitive activities on open networks</p>
                  <p><strong>Data Minimization:</strong> Share only necessary information</p>
                  <p><strong>Regular Audits:</strong> Review what data companies have</p>
                </div>
              </div>

              {/* Incident Response */}
              <div className="bg-white rounded-xl p-6 border border-purple-200">
                <h4 className="text-xl font-bold text-purple-800 mb-4 flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Incident Response
                </h4>
                <div className="space-y-3 text-lg text-purple-700">
                  <p><strong>Immediate Action:</strong> Disconnect from network if compromised</p>
                  <p><strong>Change Passwords:</strong> Update all potentially affected accounts</p>
                  <p><strong>Scan Systems:</strong> Run full antivirus and malware scans</p>
                  <p><strong>Report Incidents:</strong> Notify relevant authorities/organizations</p>
                  <p><strong>Learn & Improve:</strong> Analyze what happened and prevent recurrence</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-white rounded-xl border border-purple-200">
              <h4 className="text-xl font-bold text-purple-800 mb-4">APCSP Connection</h4>
              <div className="text-lg text-purple-700 space-y-2">
                <p>• <strong>Digital Citizenship:</strong> Responsible and ethical technology use</p>
                <p>• <strong>Data Privacy:</strong> Understanding how personal information is collected and used</p>
                <p>• <strong>Computing Impacts:</strong> Both beneficial and harmful effects of technology</p>
                <p>• <strong>Legal & Ethical Issues:</strong> Laws and ethics surrounding cybersecurity</p>
                <p>• <strong>System Reliability:</strong> How security measures protect computing systems</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900 flex items-center">
              <Brain className="h-6 w-6 mr-3 text-purple-600" />
              Cybersecurity Scenarios Quiz
            </h3>
            <div className="flex items-center space-x-4">
              <div className="bg-purple-100 px-4 py-2 rounded-lg">
                <span className="text-lg font-bold text-purple-800">Score: {cyberQuizScore}</span>
              </div>
              <button
                onClick={() => {
                  setCyberQuizScore(0);
                  setCurrentCyberQuestion(0);
                  setCyberQuizAnswered(false);
                }}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="text-center">
              <div className="text-lg font-medium text-gray-700 mb-4">
                Question {currentCyberQuestion + 1} of {cyberQuestions.length}
              </div>
            </div>

            <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
              <h4 className="text-xl font-bold text-purple-900 mb-4">Scenario:</h4>
              <p className="text-lg text-purple-800 leading-relaxed">
                {cyberQuestions[currentCyberQuestion].scenario}
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-lg font-medium text-gray-700">What type of security issue is this?</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {cyberQuestions[currentCyberQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (!cyberQuizAnswered) {
                        setCyberQuizAnswered(true);
                        if (index === cyberQuestions[currentCyberQuestion].correct) {
                          setCyberQuizScore(prev => prev + 1);
                        }
                      }
                    }}
                    disabled={cyberQuizAnswered}
                    className={`p-4 rounded-lg border-2 text-lg font-medium transition-all ${
                      cyberQuizAnswered
                        ? index === cyberQuestions[currentCyberQuestion].correct
                          ? 'border-green-500 bg-green-100 text-green-800'
                          : 'border-gray-300 bg-gray-100 text-gray-600'
                        : 'border-gray-300 hover:border-purple-500 hover:bg-purple-50'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {cyberQuizAnswered && (
              <div className="text-center">
                <button
                  onClick={() => {
                    if (currentCyberQuestion < cyberQuestions.length - 1) {
                      setCurrentCyberQuestion(prev => prev + 1);
                    } else {
                      setCurrentCyberQuestion(0);
                    }
                    setCyberQuizAnswered(false);
                  }}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg text-lg font-medium"
                >
                  {currentCyberQuestion < cyberQuestions.length - 1 ? 'Next Question' : 'Start Over'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  const renderPythonResources = () => (
    <div className="space-y-8">
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-200">
        <h3 className="text-2xl font-bold text-blue-900 mb-6 flex items-center">
          <Code className="h-6 w-6 mr-3" />
          Python Learning Resources
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* CMU CS Academy */}
          <div className="bg-white rounded-xl p-6 border border-blue-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-3 mb-4">
              <img src="/src/assets/python-icons/CMU.png" alt="CMU" className="w-12 h-12 rounded-lg" />
              <div>
                <h4 className="text-xl font-bold text-blue-800">CMU CS Academy</h4>
                <p className="text-blue-600">Beginner Friendly</p>
              </div>
            </div>
            <div className="space-y-3 text-lg text-blue-700 mb-4">
              <p>• Interactive Python lessons</p>
              <p>• Visual programming environment</p>
              <p>• Step-by-step tutorials</p>
              <p>• Graphics and animations</p>
            </div>
            <a
              href="https://academy.cs.cmu.edu/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              <span>Visit Site</span>
            </a>
          </div>

          {/* CodeStepByStep */}
          <div className="bg-white rounded-xl p-6 border border-green-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-3 mb-4">
              <img src="/src/assets/python-icons/codestep.png" alt="CodeStepByStep" className="w-12 h-12 rounded-lg" />
              <div>
                <h4 className="text-xl font-bold text-green-800">CodeStepByStep</h4>
                <p className="text-green-600">Practice Problems</p>
              </div>
            </div>
            <div className="space-y-3 text-lg text-green-700 mb-4">
              <p>• Hundreds of practice problems</p>
              <p>• Automatic grading system</p>
              <p>• Progressive difficulty levels</p>
              <p>• Detailed explanations</p>
            </div>
            <a
              href="https://codestepbystep.com/problem/list/python"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              <span>Practice Now</span>
            </a>
          </div>

          {/* CodingBat */}
          <div className="bg-white rounded-xl p-6 border border-orange-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-3 mb-4">
              <img src="/src/assets/python-icons/image.png" alt="CodingBat" className="w-12 h-12 rounded-lg" />
              <div>
                <h4 className="text-xl font-bold text-orange-800">CodingBat</h4>
                <p className="text-orange-600">Logic Building</p>
              </div>
            </div>
            <div className="space-y-3 text-lg text-orange-700 mb-4">
              <p>• Logic and reasoning problems</p>
              <p>• Immediate feedback</p>
              <p>• String and list exercises</p>
              <p>• AP CS preparation</p>
            </div>
            <a
              href="https://codingbat.com/python"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              <span>Start Coding</span>
            </a>
          </div>

          {/* Exercism */}
          <div className="bg-white rounded-xl p-6 border border-purple-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-3 mb-4">
              <img src="/src/assets/python-icons/EXCERCISM.png" alt="Exercism" className="w-12 h-12 rounded-lg" />
              <div>
                <h4 className="text-xl font-bold text-purple-800">Exercism</h4>
                <p className="text-purple-600">Mentored Learning</p>
              </div>
            </div>
            <div className="space-y-3 text-lg text-purple-700 mb-4">
              <p>• Free coding exercises</p>
              <p>• Human mentorship</p>
              <p>• Community discussions</p>
              <p>• Real-world projects</p>
            </div>
            <a
              href="https://exercism.org/tracks/python"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              <span>Join Track</span>
            </a>
          </div>

          {/* PracticePython */}
          <div className="bg-white rounded-xl p-6 border border-red-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-3 mb-4">
              <img src="/src/assets/python-icons/PYTHON.png" alt="PracticePython" className="w-12 h-12 rounded-lg" />
              <div>
                <h4 className="text-xl font-bold text-red-800">PracticePython</h4>
                <p className="text-red-600">Skill Building</p>
              </div>
            </div>
            <div className="space-y-3 text-lg text-red-700 mb-4">
              <p>• Beginner to advanced exercises</p>
              <p>• Solutions and explanations</p>
              <p>• No registration required</p>
              <p>• Self-paced learning</p>
            </div>
            <a
              href="https://www.practicepython.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              <span>Practice</span>
            </a>
          </div>

          {/* Python.org Tutorial */}
          <div className="bg-white rounded-xl p-6 border border-yellow-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-3 mb-4">
              <Code className="w-12 h-12 p-2 bg-yellow-100 text-yellow-600 rounded-lg" />
              <div>
                <h4 className="text-xl font-bold text-yellow-800">Python.org</h4>
                <p className="text-yellow-600">Official Documentation</p>
              </div>
            </div>
            <div className="space-y-3 text-lg text-yellow-700 mb-4">
              <p>• Official Python tutorial</p>
              <p>• Comprehensive documentation</p>
              <p>• Language reference</p>
              <p>• Standard library guide</p>
            </div>
            <a
              href="https://docs.python.org/3/tutorial/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              <span>Learn</span>
            </a>
          </div>
        </div>

        <div className="mt-8 p-6 bg-white rounded-xl border border-blue-200">
          <h4 className="text-xl font-bold text-blue-800 mb-4">APCSP Python Applications</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg text-blue-700">
            <div className="space-y-2">
              <p>• <strong>Data Analysis:</strong> Processing and visualizing datasets</p>
              <p>• <strong>Algorithm Implementation:</strong> Sorting, searching, and optimization</p>
              <p>• <strong>Simulation:</strong> Modeling real-world systems and processes</p>
            </div>
            <div className="space-y-2">
              <p>• <strong>Web Development:</strong> Creating interactive web applications</p>
              <p>• <strong>Automation:</strong> Scripting repetitive tasks and workflows</p>
              <p>• <strong>Machine Learning:</strong> Basic AI and pattern recognition</p>
            </div>
          </div>
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
          return (
            <button
              key={tool.id}
              onClick={() => {
                setSelectedTool(tool.id);
                setActiveView('info');
              }}
              className={`p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
                selectedTool === tool.id
                  ? 'border-blue-500 bg-blue-50 shadow-lg'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
              }`}
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className={`${tool.color} p-3 rounded-xl`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{tool.title}</h3>
              </div>
              <p className="text-gray-600 text-left">{tool.description}</p>
            </button>
          );
        })}
      </div>

      {/* View Toggle */}
      {selectedTool !== 'python-resources' && (
        <div className="flex justify-center">
          <div className="bg-white rounded-xl p-2 shadow-lg border border-gray-200">
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveView('info')}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  activeView === 'info'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Info className="h-4 w-4" />
                  <span>Information & Examples</span>
                </div>
              </button>
              <button
                onClick={() => setActiveView('practice')}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  activeView === 'practice'
                    ? 'bg-green-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Brain className="h-4 w-4" />
                  <span>Practice Quiz</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Current Tool Content */}
      {renderCurrentTool()}
    </div>
  );
};

export default PracticeTools;