import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import EnrollmentCard from './EnrollmentCard';
import { Database } from '../../types/supabase';

type Enrollment = {
  id: string;
  status: string;
  enrolled_at: string;
  completed_at: string | null;
  course: {
    title: string;
    description: string;
    duration: string;
    image_url: string;
  };
  certificates: {
    certificate_url: string;
  }[] | null;
};

export default function EnrolledCourses() {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEnrollments() {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('enrollments')
          .select(`
            id,
            status,
            enrolled_at,
            completed_at,
            course:courses(
              title,
              description,
              duration,
              image_url
            ),
            certificates(certificate_url)
          `)
          .eq('user_id', user.id);

        if (error) throw error;
        setEnrollments(data || []);
      } catch (error) {
        console.error('Error fetching enrollments:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchEnrollments();
  }, [user]);

  if (loading) {
    return <div>Caricamento corsi...</div>;
  }

  if (enrollments.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4">I Tuoi Corsi</h2>
        <p className="text-gray-600">Non sei ancora iscritto a nessun corso.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6">I Tuoi Corsi</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {enrollments.map((enrollment) => (
          <EnrollmentCard key={enrollment.id} enrollment={enrollment} />
        ))}
      </div>
    </div>
  );
}