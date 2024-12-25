import React, { useState } from 'react';
import { Calendar, Clock, Euro } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

type CourseEnrollCardProps = {
  course: {
    id: string;
    title: string;
    description: string;
    duration: string;
    price: number;
    image_url: string;
  };
};

export default function CourseEnrollCard({ course }: CourseEnrollCardProps) {
  const { user } = useAuth();
  const [enrolling, setEnrolling] = useState(false);

  const handleEnroll = async () => {
    if (!user) return;
    
    setEnrolling(true);
    try {
      const { error } = await supabase
        .from('enrollments')
        .insert({
          user_id: user.id,
          course_id: course.id,
          status: 'enrolled'
        });

      if (error) throw error;
      
      // Reload the page to refresh the course lists
      window.location.reload();
    } catch (error) {
      console.error('Error enrolling in course:', error);
      alert('Si è verificato un errore durante l\'iscrizione al corso.');
    } finally {
      setEnrolling(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
      <img
        src={course.image_url}
        alt={course.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold mb-4">{course.title}</h3>
        <p className="text-gray-600 mb-4">{course.description}</p>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-center text-gray-600">
            <Clock className="h-5 w-5 mr-2" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Euro className="h-5 w-5 mr-2" />
            <span>{course.price}€</span>
          </div>
        </div>

        <button
          onClick={handleEnroll}
          disabled={enrolling}
          className="w-full bg-amber-500 text-white py-2 px-4 rounded-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {enrolling ? 'Iscrizione in corso...' : 'Iscriviti al Corso'}
        </button>
      </div>
    </div>
  );
}