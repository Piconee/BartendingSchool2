import React from 'react';
import { User } from '@supabase/supabase-js';

interface UserMenuProps {
  user: User;
}

export default function UserMenu({ user }: UserMenuProps) {
  return null; // Component no longer needed since we show user info in header
}