import React from 'react';
import { X, MapPin, Clock, Euro } from 'lucide-react';
import { formatCurrency } from '../../utils/format';
import { Course } from '../../types/course';

interface CourseDetailsProps {
  course: Course;
  onClose: () => void;
}

export default function CourseDetails({ course, onClose }: CourseDetailsProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <img 
            src={course.image_url} 
            alt={course.title} 
            className="w-full h-64 object-cover rounded-t-lg"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">{course.title}</h2>
          <p className="text-gray-600 mb-6">{course.description}</p>

          <div className="space-y-4">
            <div className="flex items-center text-gray-700">
              <Clock className="w-5 h-5 mr-2" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <MapPin className="w-5 h-5 mr-2" />
              <span>{course.location}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <Euro className="w-5 h-5 mr-2" />
              <span>{formatCurrency(course.price)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}