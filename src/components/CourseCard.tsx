import React from 'react';
import { Calendar, Clock, MapPin, Euro } from 'lucide-react';

interface CourseCardProps {
  title: string;
  description: string;
  date: string;
  duration: string;
  price: number;
  image: string;
}

export default function CourseCard({ title, description, date, duration, price, image }: CourseCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="space-y-2">
          <div className="flex items-center text-gray-700">
            <Calendar className="h-5 w-5 mr-2" />
            <span>{date}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <Clock className="h-5 w-5 mr-2" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <MapPin className="h-5 w-5 mr-2" />
            <span>La Grotta, Bolzano</span>
          </div>
          <div className="flex items-center text-gray-700">
            <Euro className="h-5 w-5 mr-2" />
            <span>{price}€</span>
          </div>
        </div>
      </div>
    </div>
  );
}