/*
  # Add initial courses
  
  1. Changes
    - Insert initial courses into the courses table
*/

INSERT INTO courses (title, description, duration, price, location, image_url)
VALUES
  (
    'Corso Base di Bartending',
    'Impara le basi del bartending, dalla preparazione dei cocktail classici alla gestione del bar.',
    '4 settimane',
    799,
    'La Grotta, Bolzano',
    'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
  ),
  (
    'Masterclass Mixology Avanzata',
    'Tecniche avanzate di miscelazione e creazione di cocktail signature.',
    '2 settimane',
    599,
    'La Grotta, Bolzano',
    'https://images.unsplash.com/photo-1551024709-8f23befc6f87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
  ),
  (
    'Flair Bartending',
    'Impara l''arte dello show bartending e le tecniche di flair.',
    '3 settimane',
    899,
    'La Grotta, Bolzano',
    'https://images.unsplash.com/photo-1516997121675-4c2d1684aa3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
  );