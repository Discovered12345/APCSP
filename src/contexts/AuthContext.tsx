import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

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
  isSupabaseEnabled: boolean;
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
    if (isSupabaseConfigured) {
      // Check for authenticated user
      supabase.auth.getUser().then(({ data: { user: authUser } }) => {
        if (authUser) {
          fetchUserProfile(authUser.id);
        }
      });

      // Listen for auth changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          await fetchUserProfile(session.user.id);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
      });

      return () => subscription.unsubscribe();
    } else {
      // Fallback to localStorage when Supabase is not configured
      const storedUser = localStorage.getItem('apcsp_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  const fetchUserProfile = async (userId: string) => {
    if (!isSupabaseConfigured) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      if (data) {
        // Ensure profile structure exists
        const userData = {
          ...data,
          profile: data.profile || {
            studyStreak: 0,
            totalStudyTime: 0,
            practiceToolsUsed: [],
            savedCredentials: {}
          },
          history: data.history || []
        };
        setUser(userData);
      } else {
        // No profile found, user might need to complete signup
        console.log('No profile found for user:', userId);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Login error:', error.message);
        return false;
      }

      if (data.user) {
        await fetchUserProfile(data.user.id);
        return true;
      }
    } else {
      // Fallback to localStorage
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const users = JSON.parse(localStorage.getItem('apcsp_users') || '[]');
      const existingUser = users.find((u: any) => u.email === email && u.password === password);
      
      if (existingUser) {
        const userData = {
          id: existingUser.id,
          email: existingUser.email,
          name: existingUser.name,
          progress: existingUser.progress,
          achievements: existingUser.achievements,
          joinDate: existingUser.joinDate,
          reviewCards: existingUser.reviewCards || [],
          profile: existingUser.profile || {
            studyStreak: 0,
            totalStudyTime: 0,
            practiceToolsUsed: [],
            savedCredentials: {}
          },
          history: existingUser.history || []
        };
        setUser(userData);
        localStorage.setItem('apcsp_user', JSON.stringify(userData));
        return true;
      }
    }
    
    return false;
  };

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.error('Signup error:', error.message);
        return false;
      }

      if (data.user) {
        // Create user profile
        const profile = {
          id: data.user.id,
          email,
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

        const { error: profileError } = await supabase
          .from('profiles')
          .insert([profile]);

        if (!profileError) {
          setUser(profile);
          return true;
        }
      }
    } else {
      // Fallback to localStorage
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
      
      const userData = {
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
    }
    
    return false;
  };

  const logout = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    } else {
      localStorage.removeItem('apcsp_user');
    }
    setUser(null);
  };

  const updateProgress = async (section: string, increment: number) => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      progress: {
        ...user.progress,
        [section]: user.progress[section as keyof typeof user.progress] + increment
      }
    };
    
    setUser(updatedUser);

    if (isSupabaseConfigured) {
      await supabase
        .from('profiles')
        .update({ progress: updatedUser.progress })
        .eq('id', user.id);
    } else {
      localStorage.setItem('apcsp_user', JSON.stringify(updatedUser));
      
      const users = JSON.parse(localStorage.getItem('apcsp_users') || '[]');
      const userIndex = users.findIndex((u: any) => u.id === user.id);
      if (userIndex !== -1) {
        users[userIndex].progress = updatedUser.progress;
        localStorage.setItem('apcsp_users', JSON.stringify(users));
      }
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

    if (isSupabaseConfigured) {
      await supabase
        .from('profiles')
        .update({ reviewCards: updatedReviewCards })
        .eq('id', user.id);
    
    } else {
      localStorage.setItem('apcsp_user', JSON.stringify(updatedUser));
    }
  };

  const removeFromReview = async (cardId: number) => {
    if (!user) return;
    
    const updatedReviewCards = user.reviewCards.filter(id => id !== cardId);
    const updatedUser = { ...user, reviewCards: updatedReviewCards };
    setUser(updatedUser);

    if (isSupabaseConfigured) {
      await supabase
        .from('profiles')
        .update({ reviewCards: updatedReviewCards })
        .eq('id', user.id);
    } else {
      localStorage.setItem('apcsp_user', JSON.stringify(updatedUser));
    }
  };

  const updateProfile = async (updates: Partial<User['profile']>) => {
    if (!user) return;
    
    const updatedProfile = { ...user.profile, ...updates };
    const updatedUser = { ...user, profile: updatedProfile };
    setUser(updatedUser);

    if (isSupabaseConfigured) {
      await supabase
        .from('profiles')
        .update({ profile: updatedProfile })
        .eq('id', user.id);
    } else {
      localStorage.setItem('apcsp_user', JSON.stringify(updatedUser));
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

    if (isSupabaseConfigured) {
      await supabase
        .from('profiles')
        .update({ 
          history: updatedHistory,
          profile: updatedProfile
        })
        .eq('id', user.id);
    } else {
      localStorage.setItem('apcsp_user', JSON.stringify(updatedUser));
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
      addActivity,
      isSupabaseEnabled: isSupabaseConfigured
    }}>
      {children}
    </AuthContext.Provider>
  );
};