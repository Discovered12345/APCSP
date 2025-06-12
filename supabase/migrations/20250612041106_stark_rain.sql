/*
  # Create profiles table for user data

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `email` (text)
      - `name` (text)
      - `progress` (jsonb) - stores progress data for units, flashcards, etc.
      - `achievements` (text array) - list of earned achievements
      - `join_date` (timestamptz) - when user joined
      - `review_cards` (integer array) - flashcard IDs marked for review
      - `profile` (jsonb) - additional profile data like study streak, tools used
      - `history` (jsonb array) - activity history
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `profiles` table
    - Add policies for users to read/write their own data
*/

CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  name text NOT NULL,
  progress jsonb DEFAULT '{
    "unitsCompleted": 0,
    "codingProblems": 0,
    "flashcardsMastered": 0,
    "robotChallenges": 0
  }'::jsonb,
  achievements text[] DEFAULT '{}',
  join_date timestamptz DEFAULT now(),
  review_cards integer[] DEFAULT '{}',
  profile jsonb DEFAULT '{
    "studyStreak": 0,
    "totalStudyTime": 0,
    "practiceToolsUsed": [],
    "savedCredentials": {}
  }'::jsonb,
  history jsonb[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Create function to handle updated_at
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

-- Create index for better performance
CREATE INDEX IF NOT EXISTS profiles_email_idx ON profiles(email);
CREATE INDEX IF NOT EXISTS profiles_created_at_idx ON profiles(created_at);