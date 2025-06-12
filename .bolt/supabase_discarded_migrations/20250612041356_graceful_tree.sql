/*
  # Update profiles table schema

  1. Schema Updates
    - Add missing columns to existing profiles table
    - Update column types and defaults as needed
    - Ensure compatibility with existing data

  2. Security
    - Enable RLS on profiles table
    - Add policies for authenticated users to manage their own data

  3. Performance
    - Add indexes for commonly queried columns
    - Add trigger for automatic updated_at handling
*/

-- First, let's add any missing columns to the existing profiles table
DO $$
BEGIN
  -- Add created_at column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'created_at'
  ) THEN
    ALTER TABLE profiles ADD COLUMN created_at timestamptz DEFAULT now();
  END IF;

  -- Add history column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'history'
  ) THEN
    ALTER TABLE profiles ADD COLUMN history jsonb[] DEFAULT '{}';
  END IF;

  -- Add profile column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'profile'
  ) THEN
    ALTER TABLE profiles ADD COLUMN profile jsonb DEFAULT '{
      "studyStreak": 0,
      "totalStudyTime": 0,
      "practiceToolsUsed": [],
      "savedCredentials": {}
    }'::jsonb;
  END IF;

  -- Update progress column default if needed
  BEGIN
    ALTER TABLE profiles ALTER COLUMN progress SET DEFAULT '{
      "unitsCompleted": 0,
      "codingProblems": 0,
      "flashcardsMastered": 0,
      "robotChallenges": 0
    }'::jsonb;
  EXCEPTION
    WHEN others THEN
      NULL; -- Column might already have the correct default
  END;

EXCEPTION
  WHEN undefined_table THEN
    -- If table doesn't exist, create it
    CREATE TABLE profiles (
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
END $$;

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist to avoid conflicts
DO $$
BEGIN
  DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
  DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
  DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
  DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
EXCEPTION
  WHEN undefined_object THEN
    NULL;
END $$;

-- Create policies
CREATE POLICY "Users can view own profile"
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

-- Create function to handle updated_at if it doesn't exist
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS profiles_updated_at ON profiles;
DROP TRIGGER IF EXISTS handle_profiles_updated_at ON profiles;

-- Create trigger for updated_at
CREATE TRIGGER handle_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

-- Create indexes for better performance if they don't exist
CREATE INDEX IF NOT EXISTS profiles_email_idx ON profiles(email);
CREATE INDEX IF NOT EXISTS profiles_join_date_idx ON profiles(join_date);
CREATE INDEX IF NOT EXISTS profiles_updated_at_idx ON profiles(updated_at);