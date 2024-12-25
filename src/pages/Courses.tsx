import React from 'react';
import CourseCard from '../components/CourseCard';

const courses = [
  {
    title: "Corso Base di Bartending",
    description: "Impara le basi del bartending, dalla preparazione dei cocktail classici alla gestione del bar.",
    date: "15 Maggio 2024",
    duration: "4 settimane",
    price: 799,
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
  },
  {
    title: "Masterclass Mixology Avanzata",
    description: "Tecniche avanzate di miscelazione e creazione di cocktail signature.",
    date: "1 Giugno 2024",
    duration: "2 settimane",
    price: 599,
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
  },
  {
    title: "Flair Bartending",
    description: "Impara l'arte dello show bartending e le tecniche di flair.",
    date: "20 Giugno 2024",
    duration: "3 settimane",
    price: 899,
    image: "https://images.unsplash.com/photo-1516997121675-4c2d1684aa3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
  }
];

export default function Courses() {
  return (
    <div className="bg-gray-100 min-h-screen py-12">
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
          {courses.map((course, index) => (
            <CourseCard key={index} {...course} />
          ))}
        </div>
      </div>
    </div>
  );
}