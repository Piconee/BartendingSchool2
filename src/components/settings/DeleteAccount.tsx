import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { User } from '@supabase/supabase-js';

interface DeleteAccountProps {
  user: User;
}

export default function DeleteAccount({ user }: DeleteAccountProps) {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      const { error: deleteError } = await supabase
        .from('enrollments')
        .delete()
        .eq('user_id', user.id);

      if (deleteError) throw deleteError;

      const { error: signOutError } = await supabase.auth.signOut();
      if (signOutError) throw signOutError;

      navigate('/');
    } catch (error) {
      console.error('Error deleting account:', error);
      alert('Si è verificato un errore durante l\'eliminazione dell\'account.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="border-t pt-6">
      <h3 className="text-lg font-semibold text-red-600 mb-2">Elimina Account</h3>
      <p className="text-gray-600 mb-4">
        Attenzione: l'eliminazione dell'account è permanente e non può essere annullata.
        Tutti i tuoi dati verranno eliminati definitivamente.
      </p>
      
      {!showConfirmation ? (
        <button
          onClick={() => setShowConfirmation(true)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Elimina Account
        </button>
      ) : (
        <div className="space-y-4">
          <p className="font-medium text-red-600">
            Sei sicuro di voler eliminare il tuo account?
          </p>
          <div className="space-x-4">
            <button
              onClick={handleDeleteAccount}
              disabled={isDeleting}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {isDeleting ? 'Eliminazione...' : 'Sì, elimina account'}
            </button>
            <button
              onClick={() => setShowConfirmation(false)}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Annulla
            </button>
          </div>
        </div>
      )}
    </div>
  );
}