import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { propertiesApi } from '../lib/api';
import { toProperty } from '../lib/mappers';
import PropertyCard from '../components/PropertyCard';
import PropertyFilters from '../components/PropertyFilters';
import { Property } from '../types';

const PAGE_SIZE = 10;

function pageNumbers(current: number, total: number): (number | '...')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | '...')[] = [1];
  if (current > 3) pages.push('...');
  for (let p = Math.max(2, current - 1); p <= Math.min(total - 1, current + 1); p++) pages.push(p);
  if (current < total - 2) pages.push('...');
  pages.push(total);
  return pages;
}

export default function Rent() {
  const [rentalProperties, setRentalProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [filterKey, setFilterKey] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    propertiesApi.list({ type: 'Alquiler' })
      .then(res => {
        const rental = res.results.map(toProperty);
        setRentalProperties(rental);
        setFilteredProperties(rental);
      })
      .catch(() => {});
  }, []);

  useEffect(() => { setPage(1); }, [filteredProperties]);

  const totalPages = Math.ceil(filteredProperties.length / PAGE_SIZE);
  const paged = filteredProperties.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function changePage(p: number) {
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <main className="pt-32 pb-24">
      <header className="max-w-7xl mx-auto px-6 md:px-8 mb-8 md:mb-12">
        <div className="flex flex-col gap-2">
          <span className="text-primary font-bold tracking-widest text-[10px] md:text-xs uppercase">Descubre tu nuevo hogar</span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-primary tracking-tight">Propiedades en Alquiler</h1>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-6 md:px-8 mb-12 md:mb-16">
        <PropertyFilters
          key={filterKey}
          properties={rentalProperties}
          onFilterChange={setFilteredProperties}
        />
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {paged.length > 0 ? (
            paged.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <p className="text-xl text-secondary">No se han encontrado propiedades con estos filtros.</p>
              <button
                onClick={() => { setFilteredProperties(rentalProperties); setFilterKey(k => k + 1); }}
                className="mt-4 text-primary font-bold hover:underline"
              >
                Limpiar todos los filtros
              </button>
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="mt-12 md:mt-16 flex items-center justify-center gap-1">
            <button
              disabled={page === 1}
              onClick={() => changePage(page - 1)}
              className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-secondary hover:bg-surface-container-high disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Anterior
            </button>

            {pageNumbers(page, totalPages).map((p, i) =>
              p === '...'
                ? <span key={`e${i}`} className="px-2 text-secondary select-none">…</span>
                : <button
                    key={p}
                    onClick={() => changePage(p as number)}
                    className={`w-9 h-9 rounded-lg text-sm font-bold transition-colors ${p === page ? 'bg-primary text-on-primary' : 'text-secondary hover:bg-surface-container-high'}`}
                  >
                    {p}
                  </button>
            )}

            <button
              disabled={page === totalPages}
              onClick={() => changePage(page + 1)}
              className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-secondary hover:bg-surface-container-high disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              Siguiente <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
