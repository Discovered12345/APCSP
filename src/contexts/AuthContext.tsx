import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiClient, isServerAvailable, type User } from '../lib/api';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  updateProgress: (section: string, data: any) => void;
  updateStats: (stats: Partial<User['stats']>) => void;
  updateProfile: (updates: Partial<User['profile']>) => void;
  isLoading: boolean;
  error: string | null;
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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check server connection and try to restore user session
    const initializeAuth = async () => {
      try {
        // Check if server is available
        const serverAvailable = await isServerAvailable();
        
        if (!serverAvailable) {
          setError('Unable to connect to server. Please check your connection.');
          setIsLoading(false);
          return;
        }

        // Try to restore user session if token exists
        if (apiClient.isAuthenticated()) {
          const { user: currentUser, error: profileError } = await apiClient.getUserProfile();
          
          if (currentUser) {
            setUser(currentUser);
          } else if (profileError) {
            // Clear invalid token
            apiClient.logout();
            setError(null);
          }
        }
        
        setIsLoading(false);
      } catch (err: any) {
        setError(`Failed to initialize: ${err.message}`);
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const { user: loggedInUser, error: loginError } = await apiClient.login(email, password);
      
      if (loginError) {
        setError(loginError);
        return false;
      }

      if (!loggedInUser) {
        setError('Login failed');
        return false;
      }
      
      setUser(loggedInUser);
      return true;
    } catch (err: any) {
      setError(`Login failed: ${err.message}`);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const { user: newUser, error: signupError } = await apiClient.signup(email, name, password);
      
      if (signupError) {
        setError(signupError);
        return false;
      }

      if (!newUser) {
        setError('Signup failed');
        return false;
      }
      
      setUser(newUser);
      return true;
    } catch (err: any) {
      setError(`Signup failed: ${err.message}`);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    apiClient.logout();
    setUser(null);
    setError(null);
  };

  const updateProgress = async (section: string, data: any) => {
    if (!user) return;
    
    const newProgress = { ...user.progress, [section]: data };
    
    try {
      const { error } = await apiClient.updateUserProgress(newProgress);
      if (error) {
        setError(`Failed to update progress: ${error}`);
        return;
      }
      
      const updatedUser = { ...user, progress: newProgress };
      setUser(updatedUser);
    } catch (err: any) {
      setError(`Failed to update progress: ${err.message}`);
    }
  };

  const updateStats = async (statsUpdates: Partial<User['stats']>) => {
    if (!user) return;
    
    const newStats = { ...user.stats, ...statsUpdates };
    
    try {
      const { error } = await apiClient.updateUserStats(newStats);
      if (error) {
        setError(`Failed to update stats: ${error}`);
        return;
      }
      
      const updatedUser = { ...user, stats: newStats };
      setUser(updatedUser);
    } catch (err: any) {
      setError(`Failed to update stats: ${err.message}`);
    }
  };

  const updateProfile = async (updates: Partial<User['profile']>) => {
    if (!user) return;
    
    const updatedProfile = { ...user.profile, ...updates };
    
    try {
      const { error } = await apiClient.updateUserProfile(updatedProfile);
      if (error) {
        setError(`Failed to update profile: ${error}`);
        return;
      }
      
      const updatedUser = { ...user, profile: updatedProfile };
      setUser(updatedUser);
    } catch (err: any) {
      setError(`Failed to update profile: ${err.message}`);
    }
  };

  const contextValue: AuthContextType = {
    user,
    login,
    signup,
    logout,
    updateProgress,
    updateStats,
    updateProfile,
    isLoading,
    error,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};