import React from 'react';

export default function Hero() {
  const scrollToRegistration = () => {
    const element = document.getElementById('registrazione');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="hero" className="relative h-[600px] pt-16">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1574096079513-d8259312b785?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          alt="Bartender"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Diventa un Bartender Professionista
        </h1>
        <p className="mt-6 text-xl text-white max-w-3xl">
          Impara l'arte del cocktail nel cuore di Bolzano. Corsi professionali tenuti da esperti del settore presso La Grotta.
        </p>
        <div className="mt-10">
          <button
            onClick={scrollToRegistration}
            className="inline-block bg-amber-500 px-8 py-3 text-lg font-medium text-white rounded-md hover:bg-amber-600"
          >
            Iscriviti Ora
          </button>
        </div>
      </div>
    </div>
  );
}