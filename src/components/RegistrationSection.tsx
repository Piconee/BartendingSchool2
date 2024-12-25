import React, { useState } from 'react';
import FormField from './form/FormField';
import { courseOptions } from '../data/courses';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './auth/AuthModal';

export default function RegistrationSection() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    email: '',
    telefono: '',
    corso: '',
    messaggio: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="bg-white py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-8">Registrazione Corso</h2>
          
          {!user ? (
            <>
              <p className="text-center mb-8">Per registrarti a un corso, devi prima accedere o creare un account.</p>
              <AuthModal />
            </>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <FormField
                  label="Nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                />
                <FormField
                  label="Cognome"
                  name="cognome"
                  value={formData.cognome}
                  onChange={handleChange}
                  required
                />
              </div>

              <FormField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <FormField
                label="Telefono"
                name="telefono"
                type="tel"
                value={formData.telefono}
                onChange={handleChange}
                required
              />

              <FormField
                label="Seleziona il Corso"
                name="corso"
                type="select"
                value={formData.corso}
                onChange={handleChange}
                options={courseOptions}
                required
              />

              <FormField
                label="Messaggio (opzionale)"
                name="messaggio"
                type="textarea"
                value={formData.messaggio}
                onChange={handleChange}
                rows={4}
              />

              <div>
                <button
                  type="submit"
                  className="w-full bg-amber-500 text-white py-3 px-4 rounded-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                >
                  Invia Registrazione
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}