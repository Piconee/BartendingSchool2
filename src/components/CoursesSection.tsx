import React from 'react';
import CourseCard from './CourseCard';
import { courseData } from '../data/courses';

export default function CoursesSection() {
  return (
    <div className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            I Nostri Corsi
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Scopri tutti i corsi disponibili presso La Grotta Academy
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {courseData.map((course, index) => (
            <CourseCard key={index} {...course} />
          ))}
        </div>
      </div>
    </div>
  );
}