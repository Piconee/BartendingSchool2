interface Course {
  title: string;
  description: string;
  date: string;
  duration: string;
  price: number;
  image: string;
}

interface CourseOption {
  value: string;
  label: string;
}

export const courseData: Course[] = [
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

export const courseOptions: CourseOption[] = [
  { value: 'base', label: 'Corso Base di Bartending' },
  { value: 'mixology', label: 'Masterclass Mixology Avanzata' },
  { value: 'flair', label: 'Flair Bartending' }
];