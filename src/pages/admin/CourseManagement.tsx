import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useAdmin } from '../../hooks/useAdmin';
import CourseForm from '../../components/admin/CourseForm';
import CourseList from '../../components/admin/CourseList';

export default function CourseManagement() {
  const navigate = useNavigate();
  const { isAdmin, loading } = useAdmin();
  const [showForm, setShowForm] = useState(false);

  if (loading) {
    return <div>Caricamento...</div>;
  }

  if (!isAdmin) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Gestione Corsi</h1>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center space-x-2 bg-amber-500 text-white px-4 py-2 rounded-md hover:bg-amber-600"
            >
              <Plus className="w-5 h-5" />
              <span>Nuovo Corso</span>
            </button>
          </div>

          {showForm ? (
            <div className="mb-8">
              <CourseForm onSuccess={() => setShowForm(false)} />
            </div>
          ) : null}

          <CourseList />
        </div>
      </div>
    </div>
  );
}