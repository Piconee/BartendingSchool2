/*
  # Add admin check function
  
  1. Changes
    - Add function to safely check if current user is admin
*/

CREATE OR REPLACE FUNCTION check_if_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM auth.users
    WHERE id = auth.uid()
    AND is_admin = true
  );
END;
$$;