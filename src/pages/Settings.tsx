import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import DeleteAccount from '../components/settings/DeleteAccount';

export default function Settings() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Impostazioni Account</h2>
        
        <div className="space-y-6">
          <DeleteAccount user={user} />
        </div>
      </div>
    </div>
  );
}