import React, { useState, useEffect } from 'react';
import { RotateCcw, CheckCircle, XCircle, Shuffle, Brain, BookOpen, Star, Target, Zap, Plus, Eye, EyeOff, Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { flashcards, getFlashcardsByUnit, getFlashcardsBySubUnit, getFlashcardsByCategory, getFlashcardsByDifficulty } from '../data/flashcards';

const Flashcards: React.FC = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState('all');
  const [selectedSubUnit, setSelectedSubUnit] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [studyMode, setStudyMode] = useState<'review' | 'new' | 'difficult' | 'auto' | 'review-list'>('review');
  const [masteredCards, setMasteredCards] = useState<Set<number>>(new Set());
  const [reviewCards, setReviewCards] = useState<Set<number>>(new Set());
  const [sessionStats, setSessionStats] = useState({ correct: 0, incorrect: 0 });
  const [autoMode, setAutoMode] = useState(false);
  const [autoFlipInterval, setAutoFlipInterval] = useState(3000);
  const [autoNextInterval, setAutoNextInterval] = useState(2000);
  const [showReviewPage, setShowReviewPage] = useState(false);
  const [askedCards, setAskedCards] = useState<Set<number>>(new Set());
  
  const { user, updateProgress } = useAuth();

  // If user is not authenticated, show lock screen
  if (!user) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-20">
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full opacity-20 animate-pulse"></div>
            </div>
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-6">
                <Lock className="h-16 w-16 text-purple-600 animate-bounce" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Flashcards</h1>
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-8 border border-purple-200">
                <h2 className="text-2xl font-semibold text-purple-900 mb-4">🔒 Sign In Required</h2>
                <p className="text-purple-800 text-lg leading-relaxed">
                  Please sign in to access the comprehensive flashcard system with 500+ cards, 
                  spaced repetition learning, and personalized review tracking.
                </p>
                <div className="mt-6 flex items-center justify-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce"></div>
                  <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Get unique values for filters
  const units = ['all', ...Array.from(new Set(flashcards.map(card => card.unit)))];
  const subUnits = selectedUnit === 'all' 
    ? ['all', ...Array.from(new Set(flashcards.map(card => card.subUnit)))]
    : ['all', ...Array.from(new Set(flashcards.filter(card => card.unit === selectedUnit).map(card => card.subUnit)))];
  const categories = ['all', ...Array.from(new Set(flashcards.map(card => card.category)))];
  const difficulties = ['all', 'Easy', 'Medium', 'Hard'];

  // Filter flashcards based on selections and study mode
  const filteredCards = flashcards.filter(card => {
    const unitMatch = selectedUnit === 'all' || card.unit === selectedUnit;
    const subUnitMatch = selectedSubUnit === 'all' || card.subUnit === selectedSubUnit;
    const categoryMatch = selectedCategory === 'all' || card.category === selectedCategory;
    const difficultyMatch = selectedDifficulty === 'all' || card.difficulty === selectedDifficulty;
    
    if (studyMode === 'new') {
      return unitMatch && subUnitMatch && categoryMatch && difficultyMatch && !masteredCards.has(card.id) && !askedCards.has(card.id);
    } else if (studyMode === 'difficult') {
      return unitMatch && subUnitMatch && categoryMatch && difficultyMatch && card.difficulty === 'Hard';
    } else if (studyMode === 'review-list') {
      return unitMatch && subUnitMatch && categoryMatch && difficultyMatch && reviewCards.has(card.id);
    }
    
    return unitMatch && subUnitMatch && categoryMatch && difficultyMatch;
  });

  const currentFlashcard = filteredCards[currentCard];

  // Auto mode effect
  useEffect(() => {
    let flipTimeout: NodeJS.Timeout;
    let nextTimeout: NodeJS.Timeout;
    
    if (autoMode && !isFlipped) {
      flipTimeout = setTimeout(() => {
        setIsFlipped(true);
        nextTimeout = setTimeout(() => {
          nextCard();
        }, autoNextInterval);
      }, autoFlipInterval);
    }
    
    return () => {
      clearTimeout(flipTimeout);
      clearTimeout(nextTimeout);
    };
  }, [autoMode, currentCard, isFlipped, autoFlipInterval, autoNextInterval]);

  const nextCard = () => {
    if (currentFlashcard) {
      setAskedCards(prev => new Set(prev).add(currentFlashcard.id));
    }
    setCurrentCard((prev) => (prev + 1) % filteredCards.length);
    setIsFlipped(false);
  };

  const previousCard = () => {
    setCurrentCard((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
    setIsFlipped(false);
  };

  const shuffleCards = () => {
    setCurrentCard(Math.floor(Math.random() * filteredCards.length));
    setIsFlipped(false);
  };

  const markAsMastered = () => {
    if (!masteredCards.has(currentFlashcard.id)) {
      setMasteredCards(prev => new Set(prev).add(currentFlashcard.id));
      setSessionStats(prev => ({ ...prev, correct: prev.correct + 1 }));
      if (user) {
        updateProgress('flashcardsMastered', 1);
      }
    }
    // Remove from review list if it was there
    setReviewCards(prev => {
      const newSet = new Set(prev);
      newSet.delete(currentFlashcard.id);
      return newSet;
    });
    nextCard();
  };

  const markAsNeedsPractice = () => {
    setMasteredCards(prev => {
      const newSet = new Set(prev);
      newSet.delete(currentFlashcard.id);
      return newSet;
    });
    setSessionStats(prev => ({ ...prev, incorrect: prev.incorrect + 1 }));
    nextCard();
  };

  const addToReview = () => {
    setReviewCards(prev => new Set(prev).add(currentFlashcard.id));
  };

  const removeFromReview = () => {
    setReviewCards(prev => {
      const newSet = new Set(prev);
      newSet.delete(currentFlashcard.id);
      return newSet;
    });
  };

  const resetProgress = () => {
    setMasteredCards(new Set());
    setReviewCards(new Set());
    setSessionStats({ correct: 0, incorrect: 0 });
    setAskedCards(new Set());
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (showReviewPage) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Review Cards</h1>
          <p className="text-xl text-gray-600">
            Cards you've marked for review ({reviewCards.size} cards)
          </p>
          <button
            onClick={() => setShowReviewPage(false)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Flashcards
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from(reviewCards).map(cardId => {
            const card = flashcards.find(c => c.id === cardId);
            if (!card) return null;
            
            return (
              <div key={card.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(card.difficulty)}`}>
                    {card.difficulty}
                  </span>
                  <button
                    onClick={() => removeFromReview()}
                    className="text-red-600 hover:text-red-700"
                  >
                    <XCircle className="h-4 w-4" />
                  </button>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{card.term}</h3>
                <p className="text-sm text-gray-600 mb-2">{card.definition}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{card.unit} - {card.subUnit}</span>
                  <span>{card.category}</span>
                </div>
              </div>
            );
          })}
        </div>

        {reviewCards.size === 0 && (
          <div className="text-center py-12">
            <Brain className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No cards in review</h3>
            <p className="text-gray-500">Add cards to your review list while studying to come back to them later.</p>
          </div>
        )}
      </div>
    );
  }

  if (!currentFlashcard) {
    return (
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">No flashcards found</h1>
        <p className="text-gray-600">Try selecting different filters or study mode.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Flashcards</h1>
        <p className="text-xl text-gray-600">
          Master APCSP definitions and concepts with interactive flashcards
        </p>
      </div>

      {/* Session Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">Session</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{sessionStats.correct + sessionStats.incorrect}</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium text-gray-700">Correct</span>
          </div>
          <p className="text-2xl font-bold text-green-600">{sessionStats.correct}</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-2">
            <XCircle className="h-5 w-5 text-red-600" />
            <span className="text-sm font-medium text-gray-700">Incorrect</span>
          </div>
          <p className="text-2xl font-bold text-red-600">{sessionStats.incorrect}</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-2">
            <Star className="h-5 w-5 text-yellow-600" />
            <span className="text-sm font-medium text-gray-700">Mastered</span>
          </div>
          <p className="text-2xl font-bold text-yellow-600">{masteredCards.size}</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5 text-purple-600" />
            <span className="text-sm font-medium text-gray-700">Review</span>
          </div>
          <p className="text-2xl font-bold text-purple-600">{reviewCards.size}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Filters */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Filters & Study Mode</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Study Mode</label>
                <select
                  value={studyMode}
                  onChange={(e) => {
                    setStudyMode(e.target.value as any);
                    setCurrentCard(0);
                    setIsFlipped(false);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="review">Review All</option>
                  <option value="new">New Cards Only</option>
                  <option value="difficult">Difficult Cards</option>
                  <option value="auto">Auto Mode</option>
                  <option value="review-list">Review List</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                <select
                  value={selectedUnit}
                  onChange={(e) => {
                    setSelectedUnit(e.target.value);
                    setSelectedSubUnit('all');
                    setCurrentCard(0);
                    setIsFlipped(false);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {units.map(unit => (
                    <option key={unit} value={unit}>
                      {unit === 'all' ? 'All Units' : unit}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sub-Unit</label>
                <select
                  value={selectedSubUnit}
                  onChange={(e) => {
                    setSelectedSubUnit(e.target.value);
                    setCurrentCard(0);
                    setIsFlipped(false);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {subUnits.map(subUnit => (
                    <option key={subUnit} value={subUnit}>
                      {subUnit === 'all' ? 'All Sub-Units' : subUnit}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setCurrentCard(0);
                    setIsFlipped(false);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => {
                    setSelectedDifficulty(e.target.value);
                    setCurrentCard(0);
                    setIsFlipped(false);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {difficulties.map(difficulty => (
                    <option key={difficulty} value={difficulty}>
                      {difficulty === 'all' ? 'All Difficulties' : difficulty}
                    </option>
                  ))}
                </select>
              </div>

              {studyMode === 'auto' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Flip Time (seconds)</label>
                    <select
                      value={autoFlipInterval}
                      onChange={(e) => setAutoFlipInterval(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value={2000}>Fast (2s)</option>
                      <option value={3000}>Normal (3s)</option>
                      <option value={5000}>Slow (5s)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Next Time (seconds)</label>
                    <select
                      value={autoNextInterval}
                      onChange={(e) => setAutoNextInterval(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value={1000}>Fast (1s)</option>
                      <option value={2000}>Normal (2s)</option>
                      <option value={3000}>Slow (3s)</option>
                    </select>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Stats and Actions */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Actions</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>{currentCard + 1} of {filteredCards.length} cards</span>
                <span>{masteredCards.size} mastered</span>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={shuffleCards}
                  className="flex items-center space-x-1 px-3 py-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Shuffle className="h-4 w-4" />
                  <span>Shuffle</span>
                </button>
                
                <button
                  onClick={() => setAutoMode(!autoMode)}
                  className={`flex items-center space-x-1 px-3 py-1 rounded-lg transition-colors ${
                    autoMode 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Zap className="h-4 w-4" />
                  <span>{autoMode ? 'Stop Auto' : 'Auto Mode'}</span>
                </button>
                
                <button
                  onClick={() => setShowReviewPage(true)}
                  className="flex items-center space-x-1 px-3 py-1 text-purple-600 hover:text-purple-700 hover:bg-purple-100 rounded-lg transition-colors"
                >
                  <Eye className="h-4 w-4" />
                  <span>Review List ({reviewCards.size})</span>
                </button>
                
                <button
                  onClick={resetProgress}
                  className="flex items-center space-x-1 px-3 py-1 text-red-600 hover:text-red-700 hover:bg-red-100 rounded-lg transition-colors"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Reset</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Flashcard */}
      <div className="mb-8">
        <div
          className="relative w-full h-96 mx-auto cursor-pointer"
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div className={`absolute inset-0 w-full h-full transition-transform duration-600 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
            {/* Front */}
            <div className="absolute inset-0 w-full h-full backface-hidden">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 h-full flex flex-col justify-center items-center">
                <div className="text-center w-full">
                  <div className="flex items-center justify-center mb-4">
                    <Brain className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(currentFlashcard.difficulty)}`}>
                      {currentFlashcard.difficulty}
                    </span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                      {currentFlashcard.category}
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
                      {currentFlashcard.unit} - {currentFlashcard.subUnit}
                    </span>
                    {masteredCards.has(currentFlashcard.id) && (
                      <Star className="h-5 w-5 text-yellow-500" />
                    )}
                    {reviewCards.has(currentFlashcard.id) && (
                      <BookOpen className="h-5 w-5 text-purple-500" />
                    )}
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    {currentFlashcard.term}
                  </h2>
                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    {currentFlashcard.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-500">Click to reveal definition</p>
                </div>
              </div>
            </div>

            {/* Back */}
            <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
              <div className="bg-blue-50 rounded-xl shadow-lg border border-blue-200 p-8 h-full flex flex-col justify-center">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-4">
                    <BookOpen className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {currentFlashcard.term}
                  </h3>
                  <p className="text-gray-800 mb-6 leading-relaxed">
                    {currentFlashcard.definition}
                  </p>
                  {currentFlashcard.example && (
                    <div className="bg-white p-4 rounded-lg border border-blue-200">
                      <p className="text-sm text-gray-600 mb-1">Example:</p>
                      <p className="text-sm text-gray-800 italic">
                        {currentFlashcard.example}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation and Actions */}
      <div className="flex flex-col space-y-4">
        {/* Navigation */}
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={previousCard}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Previous
          </button>
          <button
            onClick={nextCard}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Next
          </button>
        </div>

        {/* Learning Actions */}
        {isFlipped && (
          <div className="flex flex-col items-center space-y-4">
            <div className="flex space-x-2">
              <button
                onClick={markAsNeedsPractice}
                className="flex items-center space-x-1 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
              >
                <XCircle className="h-4 w-4" />
                <span>Need Practice</span>
              </button>
              <button
                onClick={markAsMastered}
                className="flex items-center space-x-1 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
              >
                <CheckCircle className="h-4 w-4" />
                <span>Mastered</span>
              </button>
              <button
                onClick={reviewCards.has(currentFlashcard.id) ? removeFromReview : addToReview}
                className={`flex items-center space-x-1 px-4 py-2 rounded-lg transition-colors ${
                  reviewCards.has(currentFlashcard.id)
                    ? 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                    : 'bg-purple-50 text-purple-600 hover:bg-purple-100'
                }`}
              >
                <Plus className="h-4 w-4" />
                <span>{reviewCards.has(currentFlashcard.id) ? 'Remove from Review' : 'Add to Review'}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Progress Indicator */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Overall Progress</span>
          <span className="text-sm text-gray-500">
            {masteredCards.size}/{flashcards.length} cards mastered
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(masteredCards.size / flashcards.length) * 100}%` }}
          />
        </div>
      </div>

      <style jsx>{`
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};

export default Flashcards;