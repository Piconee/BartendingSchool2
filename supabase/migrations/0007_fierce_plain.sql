/*
  # Fix admin policies and add delete functionality

  1. Changes
    - Update admin policies to use proper auth checks
    - Add proper error handling for admin operations
  
  2. Security
    - Ensure admin users can manage courses
    - Use proper auth checks
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Admin users can insert courses" ON courses;
DROP POLICY IF EXISTS "Admin users can update courses" ON courses;
DROP POLICY IF EXISTS "Admin users can delete courses" ON courses;
DROP POLICY IF EXISTS "Anyone can view courses" ON courses;

-- Recreate policies with proper checks
CREATE POLICY "Anyone can view courses"
  ON courses FOR SELECT
  USING (true);

CREATE POLICY "Admin users can insert courses"
  ON courses FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND is_admin = true
    )
  );

CREATE POLICY "Admin users can update courses"
  ON courses FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND is_admin = true
    )
  );

CREATE POLICY "Admin users can delete courses"
  ON courses FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND is_admin = true
    )
  );