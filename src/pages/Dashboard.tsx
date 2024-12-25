import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import EnrolledCourses from '../components/dashboard/EnrolledCourses';
import AvailableCourses from '../components/dashboard/AvailableCourses';
import AuthModal from '../components/auth/AuthModal';

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 pt-24 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold text-center mb-8">Accedi per visualizzare i tuoi corsi</h1>
          <AuthModal />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-24 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        
        <div className="space-y-12">
          <EnrolledCourses />
          <AvailableCourses />
        </div>
      </div>
    </div>
  );
}