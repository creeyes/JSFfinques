import React, { useState } from 'react';
import { Bed, Bath, ChevronRight, Warehouse, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
  key?: string | number;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  return (
    <Link to={`/propiedad/${property.id}`} className="bg-surface-container-lowest rounded-xl overflow-hidden group shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col">
      <div className="aspect-[16/10] overflow-hidden relative">
        <img
          src={property.images[currentImageIndex]}
          alt={property.title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        
        {/* Slider Controls */}
        {property.images.length > 1 && (
          <>
            <button 
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-1.5 rounded-full backdrop-blur-sm transition-all opacity-100 z-10 shadow-md"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-1.5 rounded-full backdrop-blur-sm transition-all opacity-100 z-10 shadow-md"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            
            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {property.images.map((_, idx) => (
                <div 
                  key={idx}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentImageIndex ? 'bg-white scale-125' : 'bg-white/50'}`}
                />
              ))}
            </div>
          </>
        )}

        {property.exclusive && (
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-primary">
            Exclusiva
          </div>
        )}
        {property.rented && (
          <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
            Alquilado
          </div>
        )}
        {property.type === 'Alquiler' && !property.rented && (
          <div className="absolute bottom-4 right-4 bg-primary text-on-primary px-4 py-2 rounded-lg font-bold text-lg">
            {property.price}€ / mes
          </div>
        )}
      </div>
      
      <div className="p-8 flex flex-col flex-grow">
        <div className="text-xs font-bold text-secondary uppercase tracking-widest mb-2">
          {property.location}
        </div>
        <h4 className="text-xl font-bold text-primary mb-4 leading-tight">
          {property.title}
        </h4>
        
        <div className="flex items-center gap-6 mb-6 text-on-surface-variant">
          <div className="flex items-center gap-2">
            <SquareFootage className="w-5 h-5" />
            <span className="text-sm font-medium">{property.sqm}m²</span>
          </div>
          <div className="flex items-center gap-2">
            <Bed className="w-5 h-5" />
            <span className="text-sm font-medium">{property.rooms}</span>
          </div>
          {property.bathrooms != null && (
            <div className="flex items-center gap-2">
              <Bath className="w-5 h-5" />
              <span className="text-sm font-medium">{property.bathrooms}</span>
            </div>
          )}
          {property.garage != null && (
            <div className="flex items-center gap-2">
              <Warehouse className="w-5 h-5" />
              <span className="text-sm font-medium">{property.garage}</span>
            </div>
          )}
        </div>
        
        <div className="mt-auto flex justify-between items-center pt-6 border-t border-surface-container-low">
          <div className="text-2xl font-bold text-primary">
            {property.type === 'Venta' ? `${property.price.toLocaleString()} €` : `${property.price} €/mes`}
          </div>
          <button className="text-primary hover:bg-primary/5 p-2 rounded-full transition-colors">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </Link>
  );
}

// Mock icons since lucide doesn't have SquareFootage exactly as named in some versions or I might need to use generic ones
function SquareFootage(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" />
      <path d="M4 15h16" />
      <path d="M4 11h16" />
      <path d="M4 7h16" />
    </svg>
  );
}
