export interface Property {
  id: string;
  title: string;
  type: 'Alquiler' | 'Venta';
  location: string;
  price: number;
  priceUnit?: string;
  sqm: number;
  rooms: number;
  bathrooms?: number;
  garage?: number;
  images: string[];
  exclusive?: boolean;
  rented?: boolean;
  featured?: boolean;
  description: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  image: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  content?: string;
}
