// API client for backend communication
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface User {
  id: number;
  email: string;
  name: string;
  profile: Record<string, any>;
  stats: {
    totalQuestions: number;
    correctAnswers: number;
    streak: number;
    unitsCompleted: string[];
  };
  progress: Record<string, any>;
  createdAt: string;
}

interface AuthResponse {
  token: string;
  user: User;
}

class APIClient {
  private token: string | null = null;

  constructor() {
    // Load token from sessionStorage on initialization
    this.token = sessionStorage.getItem('auth_token');
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return headers;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}/api${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        ...this.getHeaders(),
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Network error' }));
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }

    return response.json();
  }

  // Auth methods
  async signup(email: string, name: string, password: string): Promise<{ user: User | null; error: string | null }> {
    try {
      const response = await this.request<AuthResponse>('/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ email, name, password }),
      });

      this.token = response.token;
      sessionStorage.setItem('auth_token', this.token);
      
      return { user: response.user, error: null };
    } catch (error: any) {
      return { user: null, error: error.message };
    }
  }

  async login(email: string, password: string): Promise<{ user: User | null; error: string | null }> {
    try {
      const response = await this.request<AuthResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      this.token = response.token;
      sessionStorage.setItem('auth_token', this.token);
      
      return { user: response.user, error: null };
    } catch (error: any) {
      return { user: null, error: error.message };
    }
  }

  logout(): void {
    this.token = null;
    sessionStorage.removeItem('auth_token');
  }

  // User profile methods
  async getUserProfile(): Promise<{ user: User | null; error: string | null }> {
    if (!this.token) {
      return { user: null, error: 'Not authenticated' };
    }

    try {
      const user = await this.request<User>('/users/profile');
      return { user, error: null };
    } catch (error: any) {
      if (error.message.includes('401') || error.message.includes('403')) {
        this.logout(); // Clear invalid token
      }
      return { user: null, error: error.message };
    }
  }

  async updateUserProgress(progress: User['progress']): Promise<{ error: string | null }> {
    if (!this.token) {
      return { error: 'Not authenticated' };
    }

    try {
      await this.request('/users/progress', {
        method: 'PUT',
        body: JSON.stringify({ progress }),
      });
      return { error: null };
    } catch (error: any) {
      return { error: error.message };
    }
  }

  async updateUserProfile(profile: User['profile']): Promise<{ error: string | null }> {
    if (!this.token) {
      return { error: 'Not authenticated' };
    }

    try {
      await this.request('/users/profile', {
        method: 'PUT',
        body: JSON.stringify({ profile }),
      });
      return { error: null };
    } catch (error: any) {
      return { error: error.message };
    }
  }

  async updateUserStats(stats: User['stats']): Promise<{ error: string | null }> {
    if (!this.token) {
      return { error: 'Not authenticated' };
    }

    try {
      await this.request('/users/stats', {
        method: 'PUT',
        body: JSON.stringify({ stats }),
      });
      return { error: null };
    } catch (error: any) {
      return { error: error.message };
    }
  }

  // Health check
  async healthCheck(): Promise<boolean> {
    try {
      await this.request('/health');
      return true;
    } catch {
      return false;
    }
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.token;
  }
}

export const apiClient = new APIClient();
export type { User };

// Helper function to check server availability
export const isServerAvailable = async (): Promise<boolean> => {
  return await apiClient.healthCheck();
}; 