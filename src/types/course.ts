export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: number;
  location: string;
  image_url: string;
  created_at?: string;
}