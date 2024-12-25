import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import CoursesSection from '../components/CoursesSection';
import RegistrationSection from '../components/RegistrationSection';

export default function SinglePage() {
  return (
    <div>
      <Hero />
      <Features />
      <section id="corsi">
        <CoursesSection />
      </section>
      <section id="registrazione">
        <RegistrationSection />
      </section>
    </div>
  );
}