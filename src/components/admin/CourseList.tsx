import React, { useState } from 'react';
import { Pencil, Trash2, Eye } from 'lucide-react';
import { useQuery } from '../../hooks/useQuery';
import { formatCurrency } from '../../utils/format';
import { supabase } from '../../lib/supabase';
import CourseDetails from './CourseDetails';
import CourseForm from './CourseForm';
import { Course } from '../../types/course';

export default function CourseList() {
  const { data: courses, loading, error, refetch } = useQuery<Course[]>('courses');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [deletingCourse, setDeletingCourse] = useState<string | null>(null);

  if (loading) return <div>Caricamento corsi...</div>;
  if (error) return <div>Errore nel caricamento dei corsi</div>;

  const handleEditSuccess = () => {
    setEditingCourse(null);
    refetch();
  };

  const handleDelete = async (courseId: string) => {
    if (!window.confirm('Sei sicuro di voler eliminare questo corso?')) {
      return;
    }

    try {
      setDeletingCourse(courseId);
      const { error } = await supabase
        .from('courses')
        .delete()
        .eq('id', courseId);

      if (error) throw error;
      refetch();
    } catch (error) {
      console.error('Error deleting course:', error);
      alert('Errore durante l\'eliminazione del corso');
    } finally {
      setDeletingCourse(null);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Corsi Esistenti</h2>
      <div className="grid gap-4">
        {courses?.map((course) => (
          <div key={course.id} className="bg-white p-4 rounded-lg shadow border border-gray-200">
            {editingCourse?.id === course.id ? (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-4">Modifica Corso</h3>
                <CourseForm 
                  mode="edit"
                  course={course}
                  onSuccess={handleEditSuccess}
                />
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img src={course.image_url} alt={course.title} className="w-16 h-16 object-cover rounded" />
                  <div>
                    <h3 className="font-semibold">{course.title}</h3>
                    <p className="text-sm text-gray-600">{formatCurrency(course.price)}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setSelectedCourse(course)}
                    className="p-2 text-gray-600 hover:bg-gray-50 rounded-full"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => setEditingCourse(course)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => handleDelete(course.id)}
                    disabled={deletingCourse === course.id}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full disabled:opacity-50"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedCourse && (
        <CourseDetails 
          course={selectedCourse} 
          onClose={() => setSelectedCourse(null)} 
        />
      )}
    </div>
  );
}