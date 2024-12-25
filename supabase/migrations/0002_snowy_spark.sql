/*
  # Add admin user flag and course location

  1. Changes
    - Add admin flag to auth.users
    - Add location field to courses table
    - Add RLS policies for admin users
*/

-- Add admin column to users
ALTER TABLE auth.users ADD COLUMN IF NOT EXISTS is_admin boolean DEFAULT false;

-- Add location to courses
ALTER TABLE courses ADD COLUMN IF NOT EXISTS location text;

-- Admin policies for courses
CREATE POLICY "Admin users can insert courses"
  ON courses FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.is_admin = true
    )
  );

CREATE POLICY "Admin users can update courses"
  ON courses FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.is_admin = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.is_admin = true
    )
  );

CREATE POLICY "Admin users can delete courses"
  ON courses FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.is_admin = true
    )
  );