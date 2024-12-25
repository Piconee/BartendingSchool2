import React from 'react';
import { Calendar, Clock, Award } from 'lucide-react';

type EnrollmentCardProps = {
  enrollment: {
    status: string;
    enrolled_at: string;
    completed_at: string | null;
    course: {
      title: string;
      description: string;
      duration: string;
      image_url: string;
    };
    certificates: {
      certificate_url: string;
    }[] | null;
  };
};

export default function EnrollmentCard({ enrollment }: EnrollmentCardProps) {
  const statusColors = {
    enrolled: 'bg-blue-100 text-blue-800',
    in_progress: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-green-100 text-green-800',
    dropped: 'bg-red-100 text-red-800'
  };

  const statusText = {
    enrolled: 'Iscritto',
    in_progress: 'In Corso',
    completed: 'Completato',
    dropped: 'Abbandonato'
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
      <img
        src={enrollment.course.image_url}
        alt={enrollment.course.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold">{enrollment.course.title}</h3>
          <span className={`px-3 py-1 rounded-full text-sm ${statusColors[enrollment.status as keyof typeof statusColors]}`}>
            {statusText[enrollment.status as keyof typeof statusText]}
          </span>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center text-gray-600">
            <Calendar className="h-5 w-5 mr-2" />
            <span>Iscritto il: {new Date(enrollment.enrolled_at).toLocaleDateString()}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <Clock className="h-5 w-5 mr-2" />
            <span>{enrollment.course.duration}</span>
          </div>

          {enrollment.certificates && enrollment.certificates.length > 0 && (
            <div className="flex items-center text-gray-600">
              <Award className="h-5 w-5 mr-2" />
              <a
                href={enrollment.certificates[0].certificate_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-500 hover:text-amber-600"
              >
                Visualizza Certificato
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}