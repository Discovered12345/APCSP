import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  progress: {
    unitsCompleted: number;
    codingProblems: number;
    flashcardsMastered: number;
    robotChallenges: number;
  };
  achievements: string[];
  joinDate: string;
  reviewCards: number[];
  profile: {
    avatar?: string;
    bio?: string;
    studyStreak: number;
    totalStudyTime: number; // in minutes
    practiceToolsUsed: string[];
    savedCredentials: {
      cmu?: { username: string; password: string };
      codingbat?: { username: string; password: string };
      exercism?: { username: string; password: string };
    };
  };
  history: {
    date: string;
    activity: string;
    duration: number; // in minutes
    type: 'units' | 'flashcards' | 'practice-tools';
  }[];
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  updateProgress: (section: string, increment: number) => void;
  addToReview: (cardId: number) => void;
  removeFromReview: (cardId: number) => void;
  updateProfile: (updates: Partial<User['profile']>) => void;
  addActivity: (activity: string, duration: number, type: 'units' | 'flashcards' | 'practice-tools') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Load user from localStorage for now
    const storedUser = localStorage.getItem('apcsp_user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        // Ensure all required fields exist with defaults
        const completeUser = {
          ...userData,
          progress: userData.progress || {
            unitsCompleted: 0,
            codingProblems: 0,
            flashcardsMastered: 0,
            robotChallenges: 0
          },
          achievements: userData.achievements || [],
          reviewCards: userData.reviewCards || [],
          profile: {
            studyStreak: 0,
            totalStudyTime: 0,
            practiceToolsUsed: [],
            savedCredentials: {},
            ...userData.profile
          },
          history: userData.history || []
        };
        setUser(completeUser);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('apcsp_user');
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const users = JSON.parse(localStorage.getItem('apcsp_users') || '[]');
    const existingUser = users.find((u: any) => u.email === email && u.password === password);
    
    if (existingUser) {
      const userData: User = {
        id: existingUser.id,
        email: existingUser.email,
        name: existingUser.name,
        progress: existingUser.progress || {
          unitsCompleted: 0,
          codingProblems: 0,
          flashcardsMastered: 0,
          robotChallenges: 0
        },
        achievements: existingUser.achievements || [],
        joinDate: existingUser.joinDate,
        reviewCards: existingUser.reviewCards || [],
        profile: {
          studyStreak: 0,
          totalStudyTime: 0,
          practiceToolsUsed: [],
          savedCredentials: {},
          ...existingUser.profile
        },
        history: existingUser.history || []
      };
      setUser(userData);
      localStorage.setItem('apcsp_user', JSON.stringify(userData));
      return true;
    }
    
    return false;
  };

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const users = JSON.parse(localStorage.getItem('apcsp_users') || '[]');
    const existingUser = users.find((u: any) => u.email === email);
    
    if (existingUser) {
      return false;
    }
    
    const newUser = {
      id: Date.now().toString(),
      email,
      password,
      name,
      progress: {
        unitsCompleted: 0,
        codingProblems: 0,
        flashcardsMastered: 0,
        robotChallenges: 0
      },
      achievements: [],
      joinDate: new Date().toISOString(),
      reviewCards: [],
      profile: {
        studyStreak: 0,
        totalStudyTime: 0,
        practiceToolsUsed: [],
        savedCredentials: {}
      },
      history: []
    };
    
    users.push(newUser);
    localStorage.setItem('apcsp_users', JSON.stringify(users));
    
    const userData: User = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      progress: newUser.progress,
      achievements: newUser.achievements,
      joinDate: newUser.joinDate,
      reviewCards: newUser.reviewCards,
      profile: newUser.profile,
      history: newUser.history
    };
    
    setUser(userData);
    localStorage.setItem('apcsp_user', JSON.stringify(userData));
    return true;
  };

  const logout = async () => {
    localStorage.removeItem('apcsp_user');
    setUser(null);
  };

  const updateProgress = async (section: string, increment: number) => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      progress: {
        ...user.progress,
        [section]: Math.max(0, user.progress[section as keyof typeof user.progress] + increment)
      }
    };
    
    setUser(updatedUser);
    localStorage.setItem('apcsp_user', JSON.stringify(updatedUser));
    
    const users = JSON.parse(localStorage.getItem('apcsp_users') || '[]');
    const userIndex = users.findIndex((u: any) => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], progress: updatedUser.progress };
      localStorage.setItem('apcsp_users', JSON.stringify(users));
    }
  };

  const addToReview = async (cardId: number) => {
    if (!user) return;
    
    const updatedReviewCards = [...user.reviewCards];
    if (!updatedReviewCards.includes(cardId)) {
      updatedReviewCards.push(cardId);
    }
    
    const updatedUser = { ...user, reviewCards: updatedReviewCards };
    setUser(updatedUser);
    localStorage.setItem('apcsp_user', JSON.stringify(updatedUser));
    
    const users = JSON.parse(localStorage.getItem('apcsp_users') || '[]');
    const userIndex = users.findIndex((u: any) => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], reviewCards: updatedReviewCards };
      localStorage.setItem('apcsp_users', JSON.stringify(users));
    }
  };

  const removeFromReview = async (cardId: number) => {
    if (!user) return;
    
    const updatedReviewCards = user.reviewCards.filter(id => id !== cardId);
    const updatedUser = { ...user, reviewCards: updatedReviewCards };
    setUser(updatedUser);
    localStorage.setItem('apcsp_user', JSON.stringify(updatedUser));
    
    const users = JSON.parse(localStorage.getItem('apcsp_users') || '[]');
    const userIndex = users.findIndex((u: any) => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], reviewCards: updatedReviewCards };
      localStorage.setItem('apcsp_users', JSON.stringify(users));
    }
  };

  const updateProfile = async (updates: Partial<User['profile']>) => {
    if (!user) return;
    
    const updatedProfile = { ...user.profile, ...updates };
    const updatedUser = { ...user, profile: updatedProfile };
    setUser(updatedUser);
    localStorage.setItem('apcsp_user', JSON.stringify(updatedUser));
    
    const users = JSON.parse(localStorage.getItem('apcsp_users') || '[]');
    const userIndex = users.findIndex((u: any) => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], profile: updatedProfile };
      localStorage.setItem('apcsp_users', JSON.stringify(users));
    }
  };

  const addActivity = async (activity: string, duration: number, type: 'units' | 'flashcards' | 'practice-tools') => {
    if (!user) return;
    
    const newActivity = {
      date: new Date().toISOString(),
      activity,
      duration,
      type
    };
    
    const updatedHistory = [newActivity, ...user.history].slice(0, 50); // Keep last 50 activities
    const updatedProfile = {
      ...user.profile,
      totalStudyTime: user.profile.totalStudyTime + duration
    };
    
    const updatedUser = { 
      ...user, 
      history: updatedHistory,
      profile: updatedProfile
    };
    setUser(updatedUser);
    localStorage.setItem('apcsp_user', JSON.stringify(updatedUser));
    
    const users = JSON.parse(localStorage.getItem('apcsp_users') || '[]');
    const userIndex = users.findIndex((u: any) => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex] = { 
        ...users[userIndex], 
        history: updatedHistory,
        profile: updatedProfile
      };
      localStorage.setItem('apcsp_users', JSON.stringify(users));
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      signup, 
      logout, 
      updateProgress, 
      addToReview, 
      removeFromReview,
      updateProfile,
      addActivity
    }}>
      {children}
    </AuthContext.Provider>
  );
};