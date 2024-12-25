import React, { useState } from 'react';

export default function Registration() {
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
    // Handle form submission
    console.log(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-8">Registrazione Corso</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
                  Nome
                </label>
                <input
                  type="text"
                  name="nome"
                  id="nome"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                  value={formData.nome}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="cognome" className="block text-sm font-medium text-gray-700">
                  Cognome
                </label>
                <input
                  type="text"
                  name="cognome"
                  id="cognome"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                  value={formData.cognome}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">
                Telefono
              </label>
              <input
                type="tel"
                name="telefono"
                id="telefono"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                value={formData.telefono}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="corso" className="block text-sm font-medium text-gray-700">
                Seleziona il Corso
              </label>
              <select
                name="corso"
                id="corso"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                value={formData.corso}
                onChange={handleChange}
              >
                <option value="">Seleziona un corso</option>
                <option value="base">Corso Base di Bartending</option>
                <option value="mixology">Masterclass Mixology Avanzata</option>
                <option value="flair">Flair Bartending</option>
              </select>
            </div>

            <div>
              <label htmlFor="messaggio" className="block text-sm font-medium text-gray-700">
                Messaggio (opzionale)
              </label>
              <textarea
                name="messaggio"
                id="messaggio"
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                value={formData.messaggio}
                onChange={handleChange}
              ></textarea>
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-amber-500 text-white py-3 px-4 rounded-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
              >
                Invia Registrazione
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}