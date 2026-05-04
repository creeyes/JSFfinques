import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';
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

export default function Buy() {
  const navigate = useNavigate();
  const [saleProperties, setSaleProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [filterKey, setFilterKey] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    propertiesApi.list({ type: 'Venta' })
      .then(res => {
        const sale = res.results.map(toProperty);
        setSaleProperties(sale);
        setFilteredProperties(sale);
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
      <section className="max-w-7xl mx-auto px-8 mb-20">
        <div className="max-w-3xl">
          <p className="text-primary font-bold uppercase tracking-widest text-xs mb-4">Propiedades Exclusivas</p>
          <h1 className="text-5xl md:text-6xl font-extrabold text-primary mb-6 leading-tight">
            Viviendas en Venta - Tu próximo hogar empieza aquí
          </h1>
          <p className="text-secondary text-lg leading-relaxed max-w-2xl">
            Descubra una selección curada de residencias de alto standing en Martorell y alrededores.
            En JSF Finques, transformamos la búsqueda de su hogar en una experiencia de autoridad y confianza.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-8 mb-20 md:mb-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:h-[700px]">
          <div className="md:col-span-8 relative overflow-hidden rounded-lg group h-[400px] md:h-auto">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA83lyHOND84_WaksSYA1kIYDL4xqhPhiTZO91XHSxLvhfVdFS-yKkHp8qaHr4KdDKeV2KhqZAq5tQfHu6edjagTqVvnvJXuqmAzqpJFAOK6Gift2_3cm4kGiVSWLvKTFodS7IIDTOlJHdYbTJ7H8L3opnNJnv10e8epckMwfchC-BxOXiR1ozaqIPOdDtOCkxBtKgqlJVp55E7vUZfWAXfxku_B1CutX5qV10dFm-8BF6HpgFZCVASJtwfevJtidReoO8e3GYIlek"
              alt="Premium"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 text-white">
              <span className="bg-primary px-3 py-1 text-[10px] md:text-xs font-bold uppercase rounded-sm mb-3 md:mb-4 inline-block">Novedad</span>
              <h2 className="text-2xl md:text-3xl font-bold mb-1">Ático Premium en Centro Martorell</h2>
              <p className="text-white/80 text-sm md:text-base">4 Hab. · 3 Baños · 185 m²</p>
            </div>
          </div>
          <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-1 gap-6">
            <div className="relative overflow-hidden rounded-lg group h-[200px] md:h-auto">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCTQLzpm8z9wvs1lY28lfjYE1z_RqkMHWBax7lLDQvS7HtqH0lWNTEN1JKAAn3rcTIT6da-LB2VBwT0pZoDZ6ZHxm6EA5UJOPJqqR2B6SGxfRjdmwkArkqzvIwTW2NXvUX5pNwVciqlxqYwf6ACl8fpsxnUM_1-NwidJeLZUIEjV6r4FvfXCpR2Ujl70gN9MfFs1OMV0XAQL4dA6c0w3Bvn4Tfahmi9Q97qKmazLWCwkX1jyccg8zpkGxvpNND8QErY7G_Fe-9tX34"
                alt="Kitchen"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="relative overflow-hidden rounded-lg group h-[200px] md:h-auto">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIJewWM_1z148wGU1ZwTnt56rqKg_K0ggqd9W1Sv69i9o5eih4m8MMl5Mim8RFQQ7FTjqYjuAy91l5Qfuhyaod2eK2Yu7RmXeeqeff5_OG8fkeyZFI-AJh7mogi9IvXOz7fK0IwA7HZK5KUS-Wj10GJx0D4M17wJmEApmdhDMzTxrTTnOwhxF-qtVxCqXojlvTkGb21uk8Iu3bu_kYByENx93vWxUffozWNG2EqSN76ggeG0hLa5RlQR0-Vt5ZbX3IoA07dQwn7pg"
                alt="Living room"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface-container-low py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="mb-12 md:mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-primary mb-2">Catálogo de Propiedades</h3>
            <p className="text-secondary text-sm md:text-base mb-8">Explore nuestra selección exclusiva bajo la autoridad de AICAT 8394.</p>

            <PropertyFilters
              key={filterKey}
              properties={saleProperties}
              onFilterChange={setFilteredProperties}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {paged.length > 0 ? (
              paged.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                <p className="text-xl text-secondary">No se han encontrado propiedades con estos filtros.</p>
                <button
                  onClick={() => { setFilteredProperties(saleProperties); setFilterKey(k => k + 1); }}
                  className="mt-4 text-primary font-bold hover:underline"
                >
                  Limpiar todos los filtros
                </button>
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-1">
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

          <div className="mt-12 bg-primary rounded-lg p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-8">
            <ShieldCheck className="w-10 h-10 text-white/70 shrink-0" />
            <div className="flex-1">
              <h4 className="text-xl md:text-2xl font-bold text-white mb-2">¿Quiere vender su propiedad?</h4>
              <p className="text-white/70 leading-relaxed text-sm md:text-base">
                Como autoridad local en Martorell, ofrecemos tasaciones profesionales precisas basadas en datos reales de mercado.
              </p>
            </div>
            <div className="flex flex-col gap-3 shrink-0">
              <button
                onClick={() => navigate('/ubicacion')}
                className="bg-white text-primary px-8 py-3 rounded-lg font-bold uppercase tracking-wider text-xs md:text-sm hover:bg-white/90 transition-colors whitespace-nowrap"
              >
                Tasación Gratuita
              </button>
              <p className="text-center text-[10px] text-white/40">AICAT 8394 · P.J.I 0516</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 md:px-8 py-20 md:py-32 text-center">
        <h3 className="text-3xl md:text-4xl font-bold text-primary mb-6">La estabilidad que su inversión merece</h3>
        <p className="text-secondary text-base md:text-lg mb-10 md:mb-12 max-w-2xl mx-auto">
          Nuestro equipo de expertos le acompañará en cada paso de la compra, garantizando seguridad jurídica y tranquilidad emocional.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6">
          <button onClick={() => navigate('/ubicacion')} className="bg-primary text-on-primary px-10 py-4 rounded-lg font-bold text-base md:text-lg hover:shadow-xl transition-all">Hablar con un Agente</button>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="bg-surface-container-high text-primary px-10 py-4 rounded-lg font-bold text-base md:text-lg hover:bg-surface-container-highest transition-all">Ver todas las Viviendas</button>
        </div>
      </section>
    </main>
  );
}
