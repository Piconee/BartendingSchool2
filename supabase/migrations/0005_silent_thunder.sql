/*
  # Fix admin policies for courses

  1. Changes
    - Drop existing admin policies
    - Create new admin policies using auth.users() function
    - Add policy for viewing courses
  
  2. Security
    - Ensure admin users can manage courses
    - Allow all authenticated users to view courses
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Admin users can insert courses" ON courses;
DROP POLICY IF EXISTS "Admin users can update courses" ON courses;
DROP POLICY IF EXISTS "Admin users can delete courses" ON courses;
DROP POLICY IF EXISTS "Courses are viewable by everyone" ON courses;

-- Create new admin policies
CREATE POLICY "Admin users can manage courses"
  ON courses
  USING (
    auth.jwt() ->> 'email' IN (
      SELECT email FROM auth.users WHERE is_admin = true
    )
  )
  WITH CHECK (
    auth.jwt() ->> 'email' IN (
      SELECT email FROM auth.users WHERE is_admin = true
    )
  );

-- Allow all authenticated users to view courses
CREATE POLICY "Courses are viewable by everyone"
  ON courses FOR SELECT
  USING (true);