-- Migration 002: Update User Schema
-- Drop existing users table and recreate with new structure

-- Drop existing users table and recreate
DROP TABLE IF EXISTS users CASCADE;

-- Create users table with proper schema
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  profile JSONB DEFAULT '{
    "avatar": "",
    "bio": "",
    "preferences": {
      "theme": "light",
      "notifications": true
    }
  }',
  stats JSONB DEFAULT '{
    "totalQuestions": 0,
    "correctAnswers": 0,
    "streak": 0,
    "unitsCompleted": []
  }',
  progress JSONB DEFAULT '{
    "toolsUsed": 0,
    "recentActivities": [
      {
        "action": "Welcome to APCSP Practice! Start by exploring the units.",
        "time": "Just now",
        "type": "welcome",
        "color": "blue"
      }
    ],
    "unitsProgress": {},
    "flashcardsProgress": {}
  }',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_created_at ON users(created_at);
CREATE INDEX idx_users_updated_at ON users(updated_at);

-- Create the trigger for updated_at
CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column(); 