import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShieldCheck, ArrowRight, MapPin, Clock, Mail } from 'lucide-react';
import { propertiesApi } from '../lib/api';
import { toProperty } from '../lib/mappers';
import PropertyCard from '../components/PropertyCard';
import { Property } from '../types';

export default function Home() {
  const navigate = useNavigate();
  const [allProperties, setAllProperties] = useState<Property[]>([]);

  useEffect(() => {
    propertiesApi.list()
      .then(res => setAllProperties(res.results.map(toProperty)))
      .catch(() => {});
  }, []);

  const featuredProperties = allProperties.filter(p => p.featured).slice(0, 3);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[85vh] md:h-[90vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXQ88n50lwfl6zkkzTFFpzPzksay84qi6dIk3oKWQBXX_J6fmzuHGLZriNf4ep3QgAfxQtC0_-PRhsgHP-Bqw1Z6ZyEqBCT_5vNK5sZ9aNRjeNK5h9NlagAuidUP1fiIK5SVPsnvJ5Fyppwryuh0Oz5o__VpIQ7hIs74f4CGW0nSRmNI_ZKECNMAGlQ9U8hZ4TRvIBABW0OBZyRS-C_VfOWT7MFSXOkqUs3bt5uRShnouAQ562nlwPpHa43RqUgDqwADwfp2IBC0o"
            alt="Hero"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/60 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl pt-[60px] pl-0"
          >
            <span className="inline-block px-4 py-1.5 mb-6 bg-primary-container/30 backdrop-blur-md text-primary-fixed border border-white/10 rounded-full text-[10px] md:text-xs tracking-widest uppercase font-bold">
              Exclusividad en Martorell
            </span>
            <h1 className="text-4xl md:text-7xl font-extrabold text-white leading-[1.1] mb-6 md:mb-8">
              Tu confianza, nuestra mayor propiedad.
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8 md:mb-10 leading-relaxed max-w-lg">
              Descubra una gestión inmobiliaria basada en el rigor profesional y la cercanía local en el Baix Llobregat.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate('/compra')}
                className="bg-white text-primary px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all text-center"
              >
                Ver Propiedades
              </button>
              <button
                onClick={() => navigate('/ubicacion')}
                className="border border-white/30 backdrop-blur-md text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-all text-center"
              >
                Saber más
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-5 relative order-2 lg:order-1">
              <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-2xl">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkY4nmuKhHxKTIqLgGhJlyCewJNl__Iz0AmNjIfPt1TQqta5axH5FslYhdE-0hZqU7LFWe7fHIOcegYqK6h4mLNm7OHRwHwBgsnTgvlm-EIVbO1JTlAwDmOlN_eflLJsfJBFli-QQk20ttUGHErbrM1xXTIZgPR6PN48J8aXIznPOVewN-km6FlUkaIGs4NKqMmbPM-lGBlKdP4lh3EUtdsl_4-2a7xB3WtpThi_zNw1lO2i0PyGd8pC7MEGfA4TRhXhpv5lxD-Iw"
                  alt="Jose Solis"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 bg-white p-6 md:p-8 rounded-xl shadow-xl max-w-[240px] md:max-w-xs">
                <div className="flex items-center gap-3 md:gap-4 mb-2 text-primary">
                  <ShieldCheck className="w-5 h-5 md:w-6 md:h-6 fill-primary/10" />
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider">Certificación Oficial</span>
                </div>
                <p className="text-xs md:text-sm text-secondary leading-relaxed">
                  AICAT 8394 | P.J.I 0516. Garantía de rigor en cada valoración.
                </p>
              </div>
            </div>
            
            <div className="lg:col-span-7 order-1 lg:order-2">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-secondary mb-4">La Autoridad Local</h2>
              <h3 className="text-3xl md:text-5xl font-extrabold text-primary mb-6 md:mb-8 leading-tight">Jose Solis</h3>
              <div className="space-y-6 text-base md:text-lg text-on-surface-variant leading-relaxed">
                <p>
                  Con una trayectoria consolidada en Martorell, Jose Solis lidera <span className="font-semibold text-primary">JSF Finques</span> bajo una premisa innegociable: la transparencia técnica.
                </p>
                <p>
                  Como <span className="text-primary font-medium">Agente de la Propiedad Inmobiliaria, Tasador y Perito Judicial Inmobiliario</span>, ofrece una visión que trasciende la simple venta. Su especialización técnica permite blindar cada operación con seguridad jurídica y una valoración real de mercado.
                </p>
                <div className="grid grid-cols-2 gap-6 md:gap-8 pt-6 md:pt-8">
                  <div>
                    <div className="text-2xl md:text-3xl font-bold text-primary mb-1">20+</div>
                    <div className="text-[10px] md:text-sm uppercase tracking-wider text-secondary">Años de Experiencia</div>
                  </div>
                  <div>
                    <div className="text-2xl md:text-3xl font-bold text-primary mb-1">1k+</div>
                    <div className="text-[10px] md:text-sm uppercase tracking-wider text-secondary">Hogares Gestionados</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      {featuredProperties.length > 0 && (
        <section className="py-16 md:py-24 bg-surface-container-low">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-4">
              <div>
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-secondary mb-4">Catálogo Seleccionado</h2>
                <h3 className="text-3xl md:text-4xl font-extrabold text-primary">Propiedades Destacadas</h3>
              </div>
              <Link to="/compra" className="flex items-center gap-2 text-primary font-bold group">
                Ver todo el catálogo
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProperties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Location Section */}
      <section className="py-16 md:py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="bg-primary rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
            <div className="md:w-2/5 p-8 md:p-12 text-white flex flex-col justify-center">
              <h3 className="text-2xl md:text-3xl font-extrabold mb-6 md:mb-8">Nuestra Sede</h3>
              <div className="space-y-6 md:space-y-8">
                <div className="flex gap-4">
                  <MapPin className="text-primary-fixed w-5 h-5 md:w-6 md:h-6 shrink-0" />
                  <div>
                    <p className="font-bold mb-1 text-sm md:text-base">C/ Prat de la Riba, 10</p>
                    <p className="text-white/70 text-sm">08760 Martorell, Barcelona</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Clock className="text-primary-fixed w-5 h-5 md:w-6 md:h-6 shrink-0" />
                  <div>
                    <p className="font-bold mb-1 text-sm md:text-base">Horario de Atención</p>
                    <p className="text-white/70 text-sm">Lun - Vie: 09:30 - 13:30 / 16:30 - 20:00</p>
                    <p className="text-white/70 text-sm">Sáb: 10:00 - 14:00 · Dom: Cerrado</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Mail className="text-primary-fixed w-5 h-5 md:w-6 md:h-6 shrink-0" />
                  <div>
                    <p className="font-bold mb-1 text-sm md:text-base">Contacto Directo</p>
                    <p className="text-white/70 text-sm">jsfinques@gmail.com</p>
                  </div>
                </div>
              </div>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=C%2F+Prat+de+la+Riba%2C+10%2C+08760+Martorell%2C+Barcelona"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 md:mt-12 bg-white text-primary px-8 py-3 rounded-full font-bold self-start hover:bg-surface-container-high transition-colors text-sm md:text-base"
              >
                Cómo llegar
              </a>
            </div>
            <div className="md:w-3/5 h-[300px] md:h-[450px] relative">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjHSlRzaUaKFf778spwyBxaE5uRG_P_zh6wJnEi11vV4rqpD41rIpTMEq1PajFjUF-IlVlx9jr90-PgFhopsesQAGpb-kEPaVZa4Z0tUheVyF-wCmyDkke6laEwsjs9Mep5CuPrXUhy2LTnTfv3X5W2b5oEaMjzZqsVna_TXriL4_nbvIkCLpk76ukLclJT99PDn5gbQZvdx5SqQzqliHoUsUIWrMXqz47Ed7pdWN_wGEVuzlUWfjfSXcoQmxP4dmdwsrHSkXRKgg"
                alt="Map"
                className="w-full h-full object-cover grayscale opacity-80 mix-blend-multiply"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-primary/10"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
