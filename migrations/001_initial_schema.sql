-- Migration 001: Initial Schema
-- APCSP Practice Platform Database Schema for Neon
-- Updated for secure backend architecture

-- Create users table with proper schema
CREATE TABLE IF NOT EXISTS users (
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
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);
CREATE INDEX IF NOT EXISTS idx_users_updated_at ON users(updated_at);

-- Create a trigger function for updating the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Create a migration tracking table
CREATE TABLE IF NOT EXISTS migrations (
  id SERIAL PRIMARY KEY,
  filename VARCHAR(255) UNIQUE NOT NULL,
  executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Record this migration
INSERT INTO migrations (filename) VALUES ('001_initial_schema.sql') 
ON CONFLICT (filename) DO NOTHING; 