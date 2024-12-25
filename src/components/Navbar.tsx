import React, { useState } from 'react';
import { GlassWater } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './auth/AuthModal';
import UserDropdown from './auth/UserDropdown';

export default function Navbar() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <nav className="bg-zinc-900 text-white fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button 
            onClick={() => navigate('/')} 
            className="flex items-center space-x-2 hover:text-amber-500 transition-colors"
          >
            <GlassWater className="h-8 w-8 text-amber-500" />
            <span className="font-bold text-xl">La Grotta Academy</span>
          </button>

          <div className="flex items-center space-x-4">
            {user ? (
              <UserDropdown email={user.email || ''} />
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="text-sm bg-amber-500 text-white px-3 py-1 rounded hover:bg-amber-600"
              >
                Accedi
              </button>
            )}
          </div>
        </div>
      </div>

      {showAuthModal && !user && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="relative">
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <AuthModal />
          </div>
        </div>
      )}
    </nav>
  );
}