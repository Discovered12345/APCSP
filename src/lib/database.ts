// This file now acts as a wrapper around the API client
// All database operations are handled by the backend server

import { apiClient, type User } from './api';

// Legacy interface for compatibility
export interface DatabaseUser extends User {
  password_hash?: string;
  join_date: string;
  review_cards: number[];
}

class DatabaseWrapper {
  async initializeTables(): Promise<void> {
    // Database initialization is handled by the backend server
    // This method exists for compatibility but does nothing
    return Promise.resolve();
  }

  async createUser(email: string, name: string, passwordHash: string): Promise<{ user: DatabaseUser | null; error: string | null }> {
    // Note: passwordHash is ignored here as the API handles hashing
    const result = await apiClient.signup(email, name, passwordHash);
    
    if (result.user) {
      return {
        user: {
          ...result.user,
          password_hash: undefined, // Never expose password hash to frontend
          join_date: result.user.joinDate,
          review_cards: result.user.reviewCards
        },
        error: null
      };
    }
    
    return { user: null, error: result.error };
  }

  async getUserByEmail(email: string): Promise<{ user: DatabaseUser | null; error: string | null }> {
    // This method is not directly supported by the API for security reasons
    // Authentication should be done through login endpoint
    return { user: null, error: 'Method not supported. Use login instead.' };
  }

  async getUserById(id: string): Promise<{ user: DatabaseUser | null; error: string | null }> {
    const result = await apiClient.getUserProfile();
    
    if (result.user && result.user.id === id) {
      return {
        user: {
          ...result.user,
          password_hash: undefined,
          join_date: result.user.joinDate,
          review_cards: result.user.reviewCards
        },
        error: null
      };
    }
    
    return { user: null, error: result.error || 'User not found' };
  }

  async updateUserProgress(userId: string, progress: User['progress']): Promise<{ error: string | null }> {
    return await apiClient.updateUserProgress(progress);
  }

  async updateUserProfile(userId: string, profile: User['profile']): Promise<{ error: string | null }> {
    return await apiClient.updateUserProfile(profile);
  }

  async updateReviewCards(userId: string, reviewCards: number[]): Promise<{ error: string | null }> {
    return await apiClient.updateReviewCards(reviewCards);
  }

  async addUserHistory(userId: string, historyItem: User['history'][0]): Promise<{ error: string | null }> {
    return await apiClient.addUserHistory(historyItem);
  }
}

export const database = new DatabaseWrapper();

// Check if server is available instead of database configuration
export const isDatabaseConfigured = true; // Always true since we use API

// Health check function
export const checkServerConnection = async (): Promise<boolean> => {
  return await apiClient.healthCheck();
};