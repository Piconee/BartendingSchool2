import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import CourseEnrollCard from './CourseEnrollCard';

type Course = {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: number;
  image_url: string;
};

export default function AvailableCourses() {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>([]);

  useEffect(() => {
    async function fetchData() {
      if (!user) return;

      try {
        // First, fetch user's enrollments
        const { data: enrollments, error: enrollmentsError } = await supabase
          .from('enrollments')
          .select('course_id')
          .eq('user_id', user.id);

        if (enrollmentsError) throw enrollmentsError;

        // Store enrolled course IDs
        const enrolledIds = enrollments?.map(e => e.course_id) || [];
        setEnrolledCourseIds(enrolledIds);

        // Then fetch all courses
        const { data: coursesData, error: coursesError } = await supabase
          .from('courses')
          .select('*');

        if (coursesError) throw coursesError;

        // Filter out enrolled courses
        const availableCourses = coursesData?.filter(
          course => !enrolledIds.includes(course.id)
        ) || [];

        setCourses(availableCourses);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [user]);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Corsi Disponibili</h2>
        <p className="text-gray-600">Caricamento corsi disponibili...</p>
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Corsi Disponibili</h2>
        <p className="text-gray-600">
          {enrolledCourseIds.length > 0 
            ? 'Sei iscritto a tutti i corsi disponibili!'
            : 'Non ci sono corsi disponibili al momento.'}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6">Corsi Disponibili</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <CourseEnrollCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}