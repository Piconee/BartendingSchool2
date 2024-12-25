/*
  # Fix admin policies with proper auth checks

  1. Changes
    - Drop existing policies
    - Create new admin policies using proper auth checks
    - Add separate policies for each operation
  
  2. Security
    - Ensure admin users can manage courses
    - Allow all users to view courses
    - Use proper auth checks for admin status
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Admin users can manage courses" ON courses;
DROP POLICY IF EXISTS "Courses are viewable by everyone" ON courses;

-- Create separate policies for each operation
CREATE POLICY "Anyone can view courses"
  ON courses FOR SELECT
  USING (true);

CREATE POLICY "Admin users can insert courses"
  ON courses FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.is_admin = true
    )
  );

CREATE POLICY "Admin users can update courses"
  ON courses FOR UPDATE
  USING (
    EXISTS (
      SELECT 1
      FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.is_admin = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.is_admin = true
    )
  );

CREATE POLICY "Admin users can delete courses"
  ON courses FOR DELETE
  USING (
    EXISTS (
      SELECT 1
      FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.is_admin = true
    )
  );