import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import CoursesSection from '../components/CoursesSection';

export default function Home() {
  return (
    <div>
      <Hero />
      <Features />
      <CoursesSection />
    </div>
  );
}