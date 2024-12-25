/*
  # Course Management Schema

  1. New Tables
    - `courses`
      - Stores course information
      - Fields: id, title, description, duration, price, image_url, created_at
    
    - `enrollments`
      - Tracks user course enrollments
      - Fields: id, user_id, course_id, status, enrolled_at, completed_at
    
    - `certificates`
      - Stores course completion certificates
      - Fields: id, enrollment_id, issued_at, certificate_url

  2. Security
    - Enable RLS on all tables
    - Policies for user access to their own enrollments and certificates
*/

-- Courses table
CREATE TABLE courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  duration text NOT NULL,
  price numeric NOT NULL,
  image_url text,
  created_at timestamptz DEFAULT now()
);

-- Enrollments table
CREATE TABLE enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE,
  status text NOT NULL CHECK (status IN ('enrolled', 'in_progress', 'completed', 'dropped')),
  enrolled_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  UNIQUE(user_id, course_id)
);

-- Certificates table
CREATE TABLE certificates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  enrollment_id uuid REFERENCES enrollments(id) ON DELETE CASCADE,
  issued_at timestamptz DEFAULT now(),
  certificate_url text NOT NULL
);

-- Enable Row Level Security
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

-- Courses policies
CREATE POLICY "Courses are viewable by everyone"
  ON courses FOR SELECT
  TO authenticated
  USING (true);

-- Enrollments policies
CREATE POLICY "Users can view their own enrollments"
  ON enrollments FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own enrollments"
  ON enrollments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Certificates policies
CREATE POLICY "Users can view their own certificates"
  ON certificates FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM enrollments
      WHERE enrollments.id = certificates.enrollment_id
      AND enrollments.user_id = auth.uid()
    )
  );