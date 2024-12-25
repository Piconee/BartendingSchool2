import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import FormField from '../form/FormField';
import { Course } from '../../types/course';

interface CourseFormProps {
  onSuccess: () => void;
  course?: Course;
  mode?: 'create' | 'edit';
}

export default function CourseForm({ onSuccess, course, mode = 'create' }: CourseFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: course?.title || '',
    description: course?.description || '',
    duration: course?.duration || '',
    price: course?.price?.toString() || '',
    location: course?.location || '',
    image_url: course?.image_url || ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        ...formData,
        price: parseFloat(formData.price)
      };

      let error;
      
      if (mode === 'edit' && course) {
        ({ error } = await supabase
          .from('courses')
          .update(data)
          .eq('id', course.id));
      } else {
        ({ error } = await supabase
          .from('courses')
          .insert([data]));
      }

      if (error) throw error;
      
      onSuccess();
    } catch (error) {
      console.error('Error saving course:', error);
      alert('Errore durante il salvataggio del corso');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormField
        label="Titolo del Corso"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <FormField
        label="Descrizione"
        name="description"
        type="textarea"
        value={formData.description}
        onChange={handleChange}
        required
      />

      <FormField
        label="Durata"
        name="duration"
        value={formData.duration}
        onChange={handleChange}
        required
      />

      <FormField
        label="Prezzo (€)"
        name="price"
        type="number"
        value={formData.price}
        onChange={handleChange}
        required
      />

      <FormField
        label="Località"
        name="location"
        value={formData.location}
        onChange={handleChange}
        required
      />

      <FormField
        label="URL Immagine"
        name="image_url"
        value={formData.image_url}
        onChange={handleChange}
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-amber-500 text-white py-2 px-4 rounded-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-50"
      >
        {loading ? 'Salvataggio in corso...' : mode === 'edit' ? 'Aggiorna Corso' : 'Crea Corso'}
      </button>
    </form>
  );
}