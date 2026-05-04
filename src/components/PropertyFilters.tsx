import React, { useMemo } from 'react';
import { SlidersHorizontal, MapPin, Bed, Bath, Square, Euro, X, RotateCcw } from 'lucide-react';
import { Property } from '../types';

interface PropertyFiltersProps {
  properties: Property[];
  onFilterChange: (filtered: Property[]) => void;
}

export default function PropertyFilters({ properties, onFilterChange }: PropertyFiltersProps) {
  const [filters, setFilters] = React.useState({
    location: '',
    minPrice: '',
    maxPrice: '',
    minSqm: '',
    maxSqm: '',
    rooms: '',
    bathrooms: '',
  });

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  // Prevent background scrolling when drawer is open
  React.useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isDrawerOpen]);

  // Dynamically extract unique locations from the current properties
  const locations = useMemo(() => {
    const uniqueLocations = Array.from(new Set(properties.map(p => p.location)));
    return uniqueLocations.sort();
  }, [properties]);

  // Dynamically extract unique room counts
  const roomOptions = useMemo(() => {
    const uniqueRooms = Array.from(new Set(properties.map(p => p.rooms)));
    return uniqueRooms.sort((a, b) => a - b);
  }, [properties]);

  // Dynamically extract unique bathroom counts
  const bathroomOptions = useMemo(() => {
    const uniqueBathrooms = Array.from(new Set(properties.map(p => p.bathrooms || 1)));
    return uniqueBathrooms.sort((a, b) => a - b);
  }, [properties]);

  React.useEffect(() => {
    const filtered = properties.filter(p => {
      const matchLocation = !filters.location || p.location === filters.location;
      const matchMinPrice = !filters.minPrice || p.price >= Number(filters.minPrice);
      const matchMaxPrice = !filters.maxPrice || p.price <= Number(filters.maxPrice);
      const matchMinSqm = !filters.minSqm || p.sqm >= Number(filters.minSqm);
      const matchMaxSqm = !filters.maxSqm || p.sqm <= Number(filters.maxSqm);
      const matchRooms = !filters.rooms || p.rooms >= Number(filters.rooms);
      const matchBathrooms = !filters.bathrooms || (p.bathrooms || 1) >= Number(filters.bathrooms);

      return matchLocation && matchMinPrice && matchMaxPrice && matchMinSqm && matchMaxSqm && matchRooms && matchBathrooms;
    });
    onFilterChange(filtered);
  }, [filters, properties, onFilterChange]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const resetFilters = () => {
    setFilters({
      location: '',
      minPrice: '',
      maxPrice: '',
      minSqm: '',
      maxSqm: '',
      rooms: '',
      bathrooms: '',
    });
  };

  const activeFiltersCount = Object.values(filters).filter(v => v !== '').length;

  return (
    <div className="relative">
      {/* Desktop & Mobile Quick Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-surface-container p-4 md:p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-end">
          {/* Location Filter */}
          <div className="flex-1">
            <label className="block text-[10px] font-bold text-secondary mb-2 uppercase flex items-center gap-2">
              <MapPin className="w-3 h-3" /> Zona
            </label>
            <div className="relative">
              <select
                name="location"
                value={filters.location}
                onChange={handleInputChange}
                className="w-full bg-surface-container-low border-none rounded-xl py-3.5 px-4 focus:ring-2 focus:ring-primary text-sm appearance-none cursor-pointer pr-10"
              >
                <option value="">Todas las zonas</option>
                {locations.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-secondary">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </div>
            </div>
          </div>

          {/* Price Max Filter (Quick) */}
          <div className="flex-1">
            <label className="block text-[10px] font-bold text-secondary mb-2 uppercase flex items-center gap-2">
              <Euro className="w-3 h-3" /> Precio Máx.
            </label>
            <input
              type="number"
              name="maxPrice"
              placeholder="Cualquiera"
              value={filters.maxPrice}
              onChange={handleInputChange}
              className="w-full bg-surface-container-low border-none rounded-xl py-3.5 px-4 focus:ring-2 focus:ring-primary text-sm"
            />
          </div>

          {/* More Filters Button */}
          <div className="flex gap-2">
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="flex-1 md:flex-none bg-primary text-white px-6 py-3.5 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-primary-container transition-all shadow-md relative"
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span>Filtros</span>
              {activeFiltersCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-secondary text-white w-6 h-6 rounded-full text-[10px] flex items-center justify-center border-2 border-white">
                  {activeFiltersCount}
                </span>
              )}
            </button>
            
            {activeFiltersCount > 0 && (
              <button
                onClick={resetFilters}
                className="p-3.5 rounded-xl border border-surface-container-high text-secondary hover:text-primary hover:bg-surface-container-low transition-all"
                title="Limpiar filtros"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile & Desktop Advanced Filters Drawer */}
      {isDrawerOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] transition-opacity cursor-pointer"
            onClick={() => setIsDrawerOpen(false)}
          />
          
          {/* Drawer Content */}
          <div className="fixed bottom-0 left-0 right-0 md:top-0 md:left-auto md:w-[400px] bg-white z-[101] rounded-t-[32px] md:rounded-none shadow-2xl flex flex-col max-h-[90vh] md:max-h-screen animate-in slide-in-from-bottom md:slide-in-from-right duration-300">
            {/* Header */}
            <div className="p-6 border-b border-surface-container-high flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-primary">Filtros avanzados</h3>
                <p className="text-xs text-secondary">Ajusta tu búsqueda al detalle</p>
              </div>
              <button 
                onClick={() => setIsDrawerOpen(false)}
                className="p-2 rounded-full hover:bg-surface-container-low transition-colors"
              >
                <X className="w-6 h-6 text-primary" />
              </button>
            </div>

            {/* Body - Scrollable */}
            <div className="p-6 overflow-y-auto flex-grow space-y-8">
              {/* Rooms */}
              <div>
                <label className="block text-xs font-bold text-secondary mb-4 uppercase flex items-center gap-2">
                  <Bed className="w-4 h-4" /> Habitaciones mínimas
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {['', ...roomOptions].map((r) => (
                    <button
                      key={r.toString()}
                      onClick={() => setFilters(prev => ({ ...prev, rooms: r.toString() }))}
                      className={`py-3 rounded-xl font-bold text-sm transition-all border ${
                        filters.rooms === r.toString() 
                          ? 'bg-primary text-white border-primary shadow-lg' 
                          : 'bg-surface-container-low text-secondary border-transparent hover:border-primary/20'
                      }`}
                    >
                      {r === '' ? 'Cualq.' : `${r}+`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bathrooms */}
              <div>
                <label className="block text-xs font-bold text-secondary mb-4 uppercase flex items-center gap-2">
                  <Bath className="w-4 h-4" /> Baños mínimos
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {['', ...bathroomOptions].map((b) => (
                    <button
                      key={b.toString()}
                      onClick={() => setFilters(prev => ({ ...prev, bathrooms: b.toString() }))}
                      className={`py-3 rounded-xl font-bold text-sm transition-all border ${
                        filters.bathrooms === b.toString() 
                          ? 'bg-primary text-white border-primary shadow-lg' 
                          : 'bg-surface-container-low text-secondary border-transparent hover:border-primary/20'
                      }`}
                    >
                      {b === '' ? 'Cualq.' : `${b}+`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Surface Area */}
              <div>
                <label className="block text-xs font-bold text-secondary mb-4 uppercase flex items-center gap-2">
                  <Square className="w-4 h-4" /> Superficie (m²)
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] text-secondary mb-1 ml-1">Mínimo</p>
                    <input
                      type="number"
                      name="minSqm"
                      placeholder="0"
                      value={filters.minSqm}
                      onChange={handleInputChange}
                      className="w-full bg-surface-container-low border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary text-sm"
                    />
                  </div>
                  <div>
                    <p className="text-[10px] text-secondary mb-1 ml-1">Máximo</p>
                    <input
                      type="number"
                      name="maxSqm"
                      placeholder="Sin límite"
                      value={filters.maxSqm}
                      onChange={handleInputChange}
                      className="w-full bg-surface-container-low border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-xs font-bold text-secondary mb-4 uppercase flex items-center gap-2">
                  <Euro className="w-4 h-4" /> Rango de Precio
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] text-secondary mb-1 ml-1">Mínimo</p>
                    <input
                      type="number"
                      name="minPrice"
                      placeholder="0 €"
                      value={filters.minPrice}
                      onChange={handleInputChange}
                      className="w-full bg-surface-container-low border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary text-sm"
                    />
                  </div>
                  <div>
                    <p className="text-[10px] text-secondary mb-1 ml-1">Máximo</p>
                    <input
                      type="number"
                      name="maxPrice"
                      placeholder="Sin límite"
                      value={filters.maxPrice}
                      onChange={handleInputChange}
                      className="w-full bg-surface-container-low border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Footer - Fixed at bottom */}
            <div className="p-6 border-t border-surface-container-high bg-white flex gap-4">
              <button
                onClick={resetFilters}
                className="flex-1 py-4 text-sm font-bold text-secondary hover:text-primary transition-colors"
              >
                Limpiar todo
              </button>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="flex-[2] bg-primary text-white py-4 rounded-xl font-bold shadow-lg hover:bg-primary-container transition-all active:scale-95"
              >
                Aplicar filtros
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
