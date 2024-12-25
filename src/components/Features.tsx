import React from 'react';
import { Award, Users, Clock } from 'lucide-react';
import FeatureCard from './FeatureCard';

const features = [
  {
    icon: Award,
    title: "Certificazione Professionale",
    description: "Ottieni una certificazione riconosciuta nel settore della mixology"
  },
  {
    icon: Users,
    title: "Istruttori Esperti",
    description: "Impara dai migliori bartender professionisti del settore"
  },
  {
    icon: Clock,
    title: "Pratica Intensiva",
    description: "Oltre 70% del corso dedicato alla pratica dietro il bancone"
  }
];

export default function Features() {
  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Perché Scegliere La Grotta Academy?
          </h2>
        </div>
        <div className="mt-10">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}