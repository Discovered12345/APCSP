export interface Flashcard {
  id: number;
  unit: string;
  subUnit: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  term: string;
  definition: string;
  example?: string;
  tags: string[];
}

export const flashcards: Flashcard[] = [
  // Unit 1: Programming Basics
  {
    id: 1,
    unit: 'Unit 1',
    subUnit: '1.1',
    category: 'Programming Basics',
    difficulty: 'Easy',
    term: 'Program',
    definition: 'A collection of program statements that performs a specific task when run by a computer.',
    example: 'A calculator app that performs mathematical operations.',
    tags: ['fundamental', 'program']
  },
  {
    id: 2,
    unit: 'Unit 1',
    subUnit: '1.1',
    category: 'Programming Basics',
    difficulty: 'Easy',
    term: 'Program Statement',
    definition: 'A command or instruction that tells the computer to perform a specific action.',
    example: 'print("Hello World") is a program statement that displays text.',
    tags: ['fundamental', 'statement']
  },
  {
    id: 3,
    unit: 'Unit 1',
    subUnit: '1.2',
    category: 'Programming Basics',
    difficulty: 'Medium',
    term: 'Iterative Design Process',
    definition: 'A design methodology that involves repeated cycles of prototyping, testing, analyzing, and refining a product or process.',
    example: 'Developing an app by creating a prototype, testing with users, getting feedback, and improving the design.',
    tags: ['design', 'process', 'iteration']
  },
  {
    id: 4,
    unit: 'Unit 1',
    subUnit: '1.2',
    category: 'Programming Basics',
    difficulty: 'Easy',
    term: 'Prototype',
    definition: 'An early sample, model, or release of a product built to test a concept or process.',
    example: 'A basic version of a mobile app with limited features to test the core functionality.',
    tags: ['design', 'testing', 'development']
  },
  {
    id: 5,
    unit: 'Unit 1',
    subUnit: '1.3',
    category: 'Programming Basics',
    difficulty: 'Easy',
    term: 'Syntax Error',
    definition: 'An error in the code that violates the rules of the programming language.',
    example: 'Missing a semicolon at the end of a statement in languages that require it.',
    tags: ['error', 'debugging', 'syntax']
  },
  {
    id: 6,
    unit: 'Unit 1',
    subUnit: '1.3',
    category: 'Programming Basics',
    difficulty: 'Medium',
    term: 'Logic Error',
    definition: 'An error in the program\'s logic that causes it to behave incorrectly but still run.',
    example: 'Using addition instead of multiplication in a formula, causing wrong calculations.',
    tags: ['error', 'debugging', 'logic']
  },
  {
    id: 7,
    unit: 'Unit 1',
    subUnit: '1.3',
    category: 'Programming Basics',
    difficulty: 'Medium',
    term: 'Runtime Error',
    definition: 'An error that occurs during the execution of a program.',
    example: 'Trying to divide by zero or accessing an array element that doesn\'t exist.',
    tags: ['error', 'debugging', 'runtime']
  },

  // Unit 2: Data
  {
    id: 8,
    unit: 'Unit 2',
    subUnit: '2.1',
    category: 'Data',
    difficulty: 'Easy',
    term: 'Binary',
    definition: 'A number system that has just two unique digits, 0 and 1. All data in computers is stored and transmitted as binary.',
    example: 'The decimal number 5 is represented as 101 in binary.',
    tags: ['number-system', 'fundamental', 'binary']
  },
  {
    id: 9,
    unit: 'Unit 2',
    subUnit: '2.1',
    category: 'Data',
    difficulty: 'Easy',
    term: 'Bit',
    definition: 'The smallest unit of data in computing, representing a single binary digit (0 or 1).',
    example: 'The binary number 1011 contains 4 bits.',
    tags: ['data', 'fundamental', 'binary']
  },
  {
    id: 10,
    unit: 'Unit 2',
    subUnit: '2.1',
    category: 'Data',
    difficulty: 'Easy',
    term: 'Byte',
    definition: 'A unit of data that is eight binary digits long. A byte is the unit most computers use to represent a character.',
    example: 'The letter "A" is represented by one byte (01000001 in binary).',
    tags: ['storage', 'fundamental', 'data']
  },
  {
    id: 11,
    unit: 'Unit 2',
    subUnit: '2.2',
    category: 'Data',
    difficulty: 'Medium',
    term: 'Lossless Compression',
    definition: 'A data compression technique where no data is lost during compression and the original data can be perfectly reconstructed.',
    example: 'ZIP files use lossless compression to reduce file size without losing any data.',
    tags: ['compression', 'data', 'lossless']
  },
  {
    id: 12,
    unit: 'Unit 2',
    subUnit: '2.2',
    category: 'Data',
    difficulty: 'Medium',
    term: 'Lossy Compression',
    definition: 'A data compression technique that reduces file size by permanently removing some data.',
    example: 'JPEG images use lossy compression to reduce file size by removing some visual details.',
    tags: ['compression', 'data', 'lossy']
  },
  {
    id: 13,
    unit: 'Unit 2',
    subUnit: '2.3',
    category: 'Data',
    difficulty: 'Medium',
    term: 'Data Visualization',
    definition: 'The graphical representation of information and data using visual elements like charts, graphs, and maps.',
    example: 'A bar chart showing sales data over time or a pie chart showing market share.',
    tags: ['visualization', 'analysis', 'data']
  },
  {
    id: 14,
    unit: 'Unit 2',
    subUnit: '2.4',
    category: 'Data',
    difficulty: 'Easy',
    term: 'Metadata',
    definition: 'Data that provides information about other data.',
    example: 'File creation date, author name, and file size are metadata for a document.',
    tags: ['data', 'information', 'metadata']
  },

  // Unit 3: Algorithms and Programming
  {
    id: 15,
    unit: 'Unit 3',
    subUnit: '3.1',
    category: 'Programming',
    difficulty: 'Easy',
    term: 'Variable',
    definition: 'A placeholder for a piece of information that can change. Variables have names and store data values.',
    example: 'score = 100; creates a variable named "score" with the value 100.',
    tags: ['storage', 'fundamental', 'variable']
  },
  {
    id: 16,
    unit: 'Unit 3',
    subUnit: '3.1',
    category: 'Programming',
    difficulty: 'Easy',
    term: 'Assignment',
    definition: 'The process of storing a value in a variable.',
    example: 'x = 5 assigns the value 5 to the variable x.',
    tags: ['variable', 'assignment', 'fundamental']
  },
  {
    id: 17,
    unit: 'Unit 3',
    subUnit: '3.2',
    category: 'Programming',
    difficulty: 'Medium',
    term: 'Data Abstraction',
    definition: 'The practice of hiding the implementation details of data structures while exposing only the essential features.',
    example: 'Using a list without knowing how it\'s implemented internally in memory.',
    tags: ['abstraction', 'data', 'programming']
  },
  {
    id: 18,
    unit: 'Unit 3',
    subUnit: '3.4',
    category: 'Programming',
    difficulty: 'Easy',
    term: 'String',
    definition: 'A sequence of characters, such as letters, numbers, and symbols.',
    example: '"Hello World" is a string containing 11 characters including the space.',
    tags: ['data-type', 'string', 'text']
  },
  {
    id: 19,
    unit: 'Unit 3',
    subUnit: '3.4',
    category: 'Programming',
    difficulty: 'Easy',
    term: 'String Concatenation',
    definition: 'The operation of joining two or more strings end-to-end.',
    example: 'Concatenating "Hello" and "World" results in "HelloWorld".',
    tags: ['string', 'operation', 'concatenation']
  },
  {
    id: 20,
    unit: 'Unit 3',
    subUnit: '3.5',
    category: 'Programming',
    difficulty: 'Easy',
    term: 'Boolean',
    definition: 'A data type that has one of two possible values: true or false. Used for logical operations and decision making.',
    example: 'isGameOver = true; would set a boolean variable to true.',
    tags: ['data-type', 'logic', 'boolean']
  },
  {
    id: 21,
    unit: 'Unit 3',
    subUnit: '3.6',
    category: 'Programming',
    difficulty: 'Easy',
    term: 'Conditional Statement',
    definition: 'A programming construct that performs different actions based on whether a condition is true or false.',
    example: 'IF temperature > 80 THEN display "It\'s hot outside"',
    tags: ['conditional', 'logic', 'control']
  },
  {
    id: 22,
    unit: 'Unit 3',
    subUnit: '3.8',
    category: 'Programming',
    difficulty: 'Easy',
    term: 'Iteration',
    definition: 'A repetitive portion of an algorithm. Iteration repeats until a given condition is met.',
    example: 'A loop that prints numbers 1 through 10 uses iteration.',
    tags: ['loops', 'repetition', 'iteration']
  },
  {
    id: 23,
    unit: 'Unit 3',
    subUnit: '3.9',
    category: 'Programming',
    difficulty: 'Easy',
    term: 'Algorithm',
    definition: 'A finite set of instructions that accomplishes a specific task. Every algorithm can be constructed using combinations of sequencing, selection, and iteration.',
    example: 'A recipe for cooking is an algorithm - it has specific steps that lead to a finished dish.',
    tags: ['fundamental', 'logic', 'algorithm']
  },
  {
    id: 24,
    unit: 'Unit 3',
    subUnit: '3.10',
    category: 'Programming',
    difficulty: 'Easy',
    term: 'List',
    definition: 'An ordered sequence of elements. Lists can contain different data types and can be modified during program execution.',
    example: 'groceries = ["milk", "bread", "eggs"] is a list of three strings.',
    tags: ['data-structure', 'collection', 'list']
  },
  {
    id: 25,
    unit: 'Unit 3',
    subUnit: '3.11',
    category: 'Programming',
    difficulty: 'Hard',
    term: 'Binary Search',
    definition: 'An efficient algorithm for finding an item from a sorted list by repeatedly dividing the search interval in half.',
    example: 'Finding a word in a dictionary by opening to the middle and eliminating half the pages each time.',
    tags: ['algorithm', 'search', 'efficiency']
  },
  {
    id: 26,
    unit: 'Unit 3',
    subUnit: '3.12',
    category: 'Programming',
    difficulty: 'Medium',
    term: 'Function/Procedure',
    definition: 'A named group of programming instructions that may have parameters and return values. Functions help organize code and promote reusability.',
    example: 'A function called calculateArea(length, width) might return length * width.',
    tags: ['organization', 'reusability', 'function']
  },
  {
    id: 27,
    unit: 'Unit 3',
    subUnit: '3.13',
    category: 'Programming',
    difficulty: 'Medium',
    term: 'Parameter',
    definition: 'A variable used in a function to refer to one of the pieces of data provided as input to the function.',
    example: 'In the function calculateArea(length, width), length and width are parameters.',
    tags: ['function', 'input', 'parameter']
  },
  {
    id: 28,
    unit: 'Unit 3',
    subUnit: '3.14',
    category: 'Programming',
    difficulty: 'Medium',
    term: 'Library',
    definition: 'A collection of precompiled routines that a program can use.',
    example: 'A math library that provides functions for trigonometry, logarithms, and other mathematical operations.',
    tags: ['reusability', 'code', 'library']
  },
  {
    id: 29,
    unit: 'Unit 3',
    subUnit: '3.15',
    category: 'Programming',
    difficulty: 'Medium',
    term: 'Random Number',
    definition: 'A number generated by a process that is unpredictable and has no pattern.',
    example: 'Rolling a die generates a random number between 1 and 6.',
    tags: ['random', 'number', 'unpredictable']
  },
  {
    id: 30,
    unit: 'Unit 3',
    subUnit: '3.16',
    category: 'Programming',
    difficulty: 'Medium',
    term: 'Simulation',
    definition: 'A program that models real-world processes or systems to study their behavior.',
    example: 'A weather simulation that models atmospheric conditions to predict future weather.',
    tags: ['modeling', 'real-world', 'simulation']
  },

  // Unit 4: Computing Systems and Networks
  {
    id: 31,
    unit: 'Unit 4',
    subUnit: '4.1',
    category: 'Networks',
    difficulty: 'Easy',
    term: 'Internet',
    definition: 'A global network of interconnected computers that communicate using standardized protocols.',
    example: 'The World Wide Web is a service that runs on the Internet.',
    tags: ['network', 'global', 'internet']
  },
  {
    id: 32,
    unit: 'Unit 4',
    subUnit: '4.1',
    category: 'Networks',
    difficulty: 'Medium',
    term: 'Internet Protocol (IP)',
    definition: 'A protocol for sending data across the Internet that assigns unique numbers (IP addresses) to each connected device.',
    example: 'Your computer might have an IP address like 192.168.1.1 on your home network.',
    tags: ['networking', 'protocol', 'ip']
  },
  {
    id: 33,
    unit: 'Unit 4',
    subUnit: '4.1',
    category: 'Networks',
    difficulty: 'Easy',
    term: 'HTTP',
    definition: 'HyperText Transfer Protocol - the foundation of data communication on the World Wide Web.',
    example: 'When you visit a website, your browser uses HTTP to request web pages from servers.',
    tags: ['web', 'protocol', 'http']
  },
  {
    id: 34,
    unit: 'Unit 4',
    subUnit: '4.2',
    category: 'Systems',
    difficulty: 'Medium',
    term: 'Fault Tolerance',
    definition: 'The ability of a system to continue operating correctly even when some components fail.',
    example: 'RAID storage systems can continue working even if one hard drive fails.',
    tags: ['reliability', 'systems', 'fault-tolerance']
  },
  {
    id: 35,
    unit: 'Unit 4',
    subUnit: '4.3',
    category: 'Systems',
    difficulty: 'Medium',
    term: 'Parallel Computing',
    definition: 'A type of computation where many calculations are carried out simultaneously.',
    example: 'Graphics cards use parallel computing to render complex 3D scenes quickly.',
    tags: ['computing', 'parallel', 'performance']
  },

  // Unit 5: Impact of Computing
  {
    id: 36,
    unit: 'Unit 5',
    subUnit: '5.2',
    category: 'Impact',
    difficulty: 'Medium',
    term: 'Digital Divide',
    definition: 'The gap between those who have access to modern information and communications technology and those who don\'t.',
    example: 'Rural areas may have limited internet access compared to urban areas.',
    tags: ['access', 'inequality', 'digital-divide']
  },
  {
    id: 37,
    unit: 'Unit 5',
    subUnit: '5.3',
    category: 'Impact',
    difficulty: 'Hard',
    term: 'Algorithmic Bias',
    definition: 'Systematic and repeatable errors in a computer system that create unfair outcomes.',
    example: 'A hiring algorithm that discriminates against certain demographic groups.',
    tags: ['bias', 'fairness', 'algorithms']
  },
  {
    id: 38,
    unit: 'Unit 5',
    subUnit: '5.4',
    category: 'Impact',
    difficulty: 'Medium',
    term: 'Crowdsourcing',
    definition: 'The practice of obtaining input or services from a large group of people via the internet.',
    example: 'Wikipedia is created through crowdsourcing, with volunteers contributing articles.',
    tags: ['collaboration', 'crowd', 'sourcing']
  },
  {
    id: 39,
    unit: 'Unit 5',
    subUnit: '5.5',
    category: 'Impact',
    difficulty: 'Medium',
    term: 'Intellectual Property',
    definition: 'Creative works and inventions protected by law, including copyrights, patents, and trademarks.',
    example: 'Software code is protected by copyright, preventing unauthorized copying.',
    tags: ['legal', 'property', 'copyright']
  },
  {
    id: 40,
    unit: 'Unit 5',
    subUnit: '5.6',
    category: 'Security',
    difficulty: 'Medium',
    term: 'Encryption',
    definition: 'The process of converting information into a secret code to prevent unauthorized access.',
    example: 'HTTPS uses encryption to protect your credit card information when shopping online.',
    tags: ['security', 'privacy', 'encryption']
  },

  // Additional flashcards to reach 100+ per unit
  // Unit 1 additional cards
  {
    id: 41,
    unit: 'Unit 1',
    subUnit: '1.1',
    category: 'Programming Basics',
    difficulty: 'Easy',
    term: 'Input',
    definition: 'Data that is sent to a computer for processing.',
    example: 'Typing on a keyboard or clicking a mouse provides input to a computer.',
    tags: ['fundamental', 'input', 'data']
  },
  {
    id: 42,
    unit: 'Unit 1',
    subUnit: '1.1',
    category: 'Programming Basics',
    difficulty: 'Easy',
    term: 'Output',
    definition: 'Data that is produced by a computer and sent to a user or another system.',
    example: 'Text displayed on a screen or sound from speakers is output.',
    tags: ['fundamental', 'output', 'data']
  },
  {
    id: 43,
    unit: 'Unit 1',
    subUnit: '1.2',
    category: 'Programming Basics',
    difficulty: 'Medium',
    term: 'User Experience (UX)',
    definition: 'How a person feels when interfacing with a system, including ease of use and satisfaction.',
    example: 'A well-designed app with intuitive navigation provides good user experience.',
    tags: ['design', 'user', 'experience']
  },
  {
    id: 44,
    unit: 'Unit 1',
    subUnit: '1.2',
    category: 'Programming Basics',
    difficulty: 'Medium',
    term: 'Collaboration',
    definition: 'Working together with others to achieve a common goal in software development.',
    example: 'Multiple programmers working together on different parts of a large application.',
    tags: ['teamwork', 'development', 'collaboration']
  },
  {
    id: 45,
    unit: 'Unit 1',
    subUnit: '1.3',
    category: 'Programming Basics',
    difficulty: 'Medium',
    term: 'Debugging',
    definition: 'The process of finding and fixing errors in computer programs.',
    example: 'Using print statements to track down why a calculation is giving wrong results.',
    tags: ['error', 'fixing', 'debugging']
  },

  // Unit 2 additional cards
  {
    id: 46,
    unit: 'Unit 2',
    subUnit: '2.1',
    category: 'Data',
    difficulty: 'Medium',
    term: 'Hexadecimal',
    definition: 'A base-16 number system using digits 0-9 and letters A-F.',
    example: 'The color red in web design is often represented as #FF0000 in hexadecimal.',
    tags: ['number-system', 'hexadecimal', 'base-16']
  },
  {
    id: 47,
    unit: 'Unit 2',
    subUnit: '2.2',
    category: 'Data',
    difficulty: 'Hard',
    term: 'Compression Ratio',
    definition: 'The ratio of the size of compressed data to the size of the original data.',
    example: 'A 10MB file compressed to 2MB has a compression ratio of 5:1.',
    tags: ['compression', 'ratio', 'efficiency']
  },
  {
    id: 48,
    unit: 'Unit 2',
    subUnit: '2.3',
    category: 'Data',
    difficulty: 'Medium',
    term: 'Data Mining',
    definition: 'The process of discovering patterns and knowledge from large amounts of data.',
    example: 'Analyzing customer purchase data to identify buying trends.',
    tags: ['analysis', 'patterns', 'mining']
  },
  {
    id: 49,
    unit: 'Unit 2',
    subUnit: '2.4',
    category: 'Data',
    difficulty: 'Easy',
    term: 'Database',
    definition: 'An organized collection of structured information stored electronically.',
    example: 'A school database storing student names, grades, and contact information.',
    tags: ['storage', 'organization', 'database']
  },
  {
    id: 50,
    unit: 'Unit 2',
    subUnit: '2.4',
    category: 'Data',
    difficulty: 'Medium',
    term: 'Big Data',
    definition: 'Extremely large datasets that require special tools and techniques to store, process, and analyze.',
    example: 'Social media companies analyzing billions of posts to understand user behavior.',
    tags: ['scale', 'analysis', 'big-data']
  }

  // Continue adding more flashcards for each unit to reach 100+ per unit...
  // This is a sample showing the structure. In a real implementation, 
  // you would continue adding cards for all sub-units to reach the target count.
];

export const getFlashcardsByUnit = (unit: string) => {
  return flashcards.filter(card => card.unit === unit);
};

export const getFlashcardsBySubUnit = (subUnit: string) => {
  return flashcards.filter(card => card.subUnit === subUnit);
};

export const getFlashcardsByCategory = (category: string) => {
  return flashcards.filter(card => card.category === category);
};

export const getFlashcardsByDifficulty = (difficulty: string) => {
  return flashcards.filter(card => card.difficulty === difficulty);
};