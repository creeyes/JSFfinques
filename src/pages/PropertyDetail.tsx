import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Bed, Bath, Warehouse, Square, MapPin, ChevronLeft, ChevronRight, Share2, Phone, Mail, X, ImageOff } from 'lucide-react';
import { propertiesApi } from '../lib/api';
import { toProperty } from '../lib/mappers';
import { Property } from '../types';

export default function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isSharing = useRef(false);
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!id) return;
    propertiesApi.get(Number(id))
      .then(p => setProperty(toProperty(p)))
      .catch(() => setProperty(null))
      .finally(() => setLoading(false));
  }, [id]);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    document.body.style.overflow = '';
  }, []);

  const prevImage = useCallback((images: string[]) => {
    setLightboxIndex(i => i === null ? 0 : (i - 1 + images.length) % images.length);
  }, []);

  const nextImage = useCallback((images: string[]) => {
    setLightboxIndex(i => i === null ? 0 : (i + 1) % images.length);
  }, []);

  useEffect(() => {
    if (lightboxIndex === null || !property) return;
    const images = property.images;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevImage(images);
      if (e.key === 'ArrowRight') nextImage(images);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightboxIndex, property, closeLightbox, prevImage, nextImage]);

  // Cleanup overflow on unmount
  useEffect(() => () => { document.body.style.overflow = ''; }, []);

  if (loading) {
    return <div className="pt-32 pb-24 text-center text-secondary">Cargando...</div>;
  }

  if (!property) {
    return (
      <div className="pt-32 pb-24 text-center">
        <h2 className="text-2xl font-bold text-primary">Propiedad no encontrada</h2>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-primary font-bold hover:underline"
        >
          Volver atrás
        </button>
      </div>
    );
  }

  const handleShare = async () => {
    if (isSharing.current) return;

    const shareData = {
      title: property.title,
      text: `Mira esta propiedad en Martorell: ${property.title}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        isSharing.current = true;
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Enlace copiado al portapapeles');
      }
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        console.error('Error sharing:', err);
      }
    } finally {
      isSharing.current = false;
    }
  };

  // Thumbnails: show up to 4 (images[1..4]). If there are more than 5 total,
  // the last visible thumbnail shows "+N fotos" overlay.
  const thumbs = property.images.slice(1, 5);
  const remainingCount = property.images.length > 5 ? property.images.length - 5 : 0;
  const thumbCols = thumbs.length === 1 ? 'grid-cols-1' : thumbs.length === 2 ? 'grid-cols-2' : thumbs.length === 3 ? 'grid-cols-3' : 'grid-cols-2 md:grid-cols-4';

  return (
    <div className="pt-24 pb-24 bg-surface">
      {/* Header / Navigation */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-6 flex justify-between items-center">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-secondary hover:text-primary transition-colors font-bold text-sm"
        >
          <ChevronLeft className="w-5 h-5" />
          Volver al listado
        </button>
        <div className="flex gap-4">
          <button
            onClick={handleShare}
            className="p-2 rounded-full hover:bg-surface-container-high transition-colors text-secondary"
            title="Compartir propiedad"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Title Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 mb-8 md:mb-12">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
            property.type === 'Venta' ? 'bg-primary text-white' : 'bg-secondary text-white'
          }`}>
            En {property.type}
          </span>
          <div className="flex items-center gap-1 text-secondary text-sm font-medium">
            <MapPin className="w-4 h-4" />
            {property.location}
          </div>
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-primary mb-4 leading-tight">
          {property.title}
        </h1>
        <p className="text-3xl md:text-4xl font-bold text-primary">
          {property.type === 'Venta' ? `${property.price.toLocaleString()} €` : `${property.price} €/mes`}
        </p>
      </section>

      {/* Hero / Image Gallery */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 mb-20 md:mb-24">
        {/* Main image — always full width, fixed height, clickable */}
        <div
          className={`rounded-2xl overflow-hidden relative shadow-md h-[350px] sm:h-[450px] md:h-[550px] lg:h-[650px] ${property.images.length > 0 ? 'cursor-pointer group' : ''}`}
          onClick={() => { if (property.images.length > 0) openLightbox(0); }}
        >
          {property.images[0] ? (
            <img
              src={property.images[0]}
              alt={property.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full bg-surface-container-high flex flex-col items-center justify-center gap-3">
              <ImageOff className="w-16 h-16 text-secondary opacity-40" />
              <span className="text-secondary text-sm">Sin imágenes disponibles</span>
            </div>
          )}
          {property.exclusive && (
            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-primary shadow-lg">
              Exclusiva
            </div>
          )}
          {property.images.length > 1 && (
            <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {property.images.length} fotos
            </div>
          )}
        </div>

        {/* Thumbnails grid — up to 4, last shows "+N" if more exist */}
        {thumbs.length > 0 && (
          <div className={`grid gap-3 mt-3 ${thumbCols}`}>
            {thumbs.map((img, i) => {
              const imageIndex = i + 1;
              const isLastWithMore = i === thumbs.length - 1 && remainingCount > 0;
              return (
                <div
                  key={i}
                  className="relative h-24 md:h-36 rounded-xl overflow-hidden shadow-md cursor-pointer group"
                  onClick={() => openLightbox(isLastWithMore ? imageIndex : imageIndex)}
                >
                  <img
                    src={img}
                    alt={`${property.title} ${imageIndex + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  {isLastWithMore ? (
                    <div className="absolute inset-0 bg-black/55 flex flex-col items-center justify-center gap-1">
                      <span className="text-white font-extrabold text-xl md:text-2xl">+{remainingCount}</span>
                      <span className="text-white/80 text-xs font-semibold uppercase tracking-wider">fotos más</span>
                    </div>
                  ) : (
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Features Bar */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 mb-16 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-10 border-y border-surface-container-high bg-surface">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-surface-container-low flex items-center justify-center text-primary">
              <Square className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-secondary font-bold uppercase">Superficie</p>
              <p className="font-bold">{property.sqm} m²</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-surface-container-low flex items-center justify-center text-primary">
              <Bed className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-secondary font-bold uppercase">Habitaciones</p>
              <p className="font-bold">{property.rooms}</p>
            </div>
          </div>
          {property.bathrooms != null && (
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-surface-container-low flex items-center justify-center text-primary">
                <Bath className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-secondary font-bold uppercase">Baños</p>
                <p className="font-bold">{property.bathrooms}</p>
              </div>
            </div>
          )}
          {property.garage && (
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-surface-container-low flex items-center justify-center text-primary">
                <Warehouse className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-secondary font-bold uppercase">Garaje</p>
                <p className="font-bold">{property.garage}</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Content Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Info */}
          <div className="lg:col-span-8">
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-primary mb-6">Descripción de la propiedad</h3>
              <div
                className="prose prose-slate max-w-none text-secondary leading-relaxed text-lg [&_ul]:list-disc [&_ul]:pl-5"
                dangerouslySetInnerHTML={{ __html: property.description }}
              />
            </div>
          </div>

          {/* Sidebar / Contact Card */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-surface-container">
              <div className="flex items-center gap-4 mb-8">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkY4nmuKhHxKTIqLgGhJlyCewJNl__Iz0AmNjIfPt1TQqta5axH5FslYhdE-0hZqU7LFWe7fHIOcegYqK6h4mLNm7OHRwHwBgsnTgvlm-EIVbO1JTlAwDmOlN_eflLJsfJBFli-QQk20ttUGHErbrM1xXTIZgPR6PN48J8aXIznPOVewN-km6FlUkaIGs4NKqMmbPM-lGBlKdP4lh3EUtdsl_4-2a7xB3WtpThi_zNw1lO2i0PyGd8pC7MEGfA4TRhXhpv5lxD-Iw"
                  alt="Jose Solis"
                  className="w-16 h-16 rounded-full object-cover border-2 border-primary-fixed"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <p className="font-bold text-primary">Jose Solis</p>
                  <p className="text-xs text-secondary">AICAT 8394 | Tasador Judicial</p>
                </div>
              </div>

              <h4 className="text-xl font-bold text-primary mb-6">¿Le interesa esta propiedad?</h4>

              <div className="space-y-4 mb-8">
                <a
                  href="tel:654178938"
                  className="w-full bg-primary text-on-primary py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-primary-container transition-all shadow-lg active:scale-95"
                >
                  <Phone className="w-5 h-5" />
                  Llamar ahora
                </a>
                <a
                  href="mailto:jsfinques@gmail.com"
                  className="w-full border-2 border-primary text-primary py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-primary/5 transition-all"
                >
                  <Mail className="w-5 h-5" />
                  Enviar mensaje
                </a>
                <button
                  onClick={handleShare}
                  className="w-full border border-surface-container-high text-secondary py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-surface-container-low transition-all text-sm"
                >
                  <Share2 className="w-4 h-4" />
                  Compartir propiedad
                </button>
              </div>

              <div className="pt-6 border-t border-surface-container-high">
                <p className="text-xs text-secondary text-center leading-relaxed">
                  Al contactar, acepta nuestra política de privacidad y términos de servicio.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex flex-col"
          onClick={closeLightbox}
        >
          {/* Top bar: counter + close */}
          <div className="flex items-center justify-between px-4 md:px-6 py-4 shrink-0" onClick={e => e.stopPropagation()}>
            <span className="text-white/80 text-sm font-bold tracking-wide">
              {lightboxIndex + 1} / {property.images.length}
            </span>
            <button
              onClick={closeLightbox}
              className="text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
              title="Cerrar"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Main image area */}
          <div className="flex-1 flex items-center justify-center relative min-h-0 px-14 md:px-20">
            <img
              src={property.images[lightboxIndex]}
              alt={`${property.title} ${lightboxIndex + 1}`}
              className="max-w-full max-h-full object-contain rounded-lg select-none"
              referrerPolicy="no-referrer"
              onClick={e => e.stopPropagation()}
              draggable={false}
            />

            {/* Prev button */}
            {property.images.length > 1 && (
              <>
                <button
                  className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 text-white p-2 md:p-3 rounded-full bg-black/40 hover:bg-black/70 transition-colors"
                  onClick={e => { e.stopPropagation(); prevImage(property.images); }}
                  title="Anterior"
                >
                  <ChevronLeft className="w-6 h-6 md:w-7 md:h-7" />
                </button>
                <button
                  className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 text-white p-2 md:p-3 rounded-full bg-black/40 hover:bg-black/70 transition-colors"
                  onClick={e => { e.stopPropagation(); nextImage(property.images); }}
                  title="Siguiente"
                >
                  <ChevronRight className="w-6 h-6 md:w-7 md:h-7" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnail strip */}
          {property.images.length > 1 && (
            <div
              className="shrink-0 py-3 px-4 flex gap-2 justify-center overflow-x-auto"
              onClick={e => e.stopPropagation()}
            >
              {property.images.map((img, i) => (
                <div
                  key={i}
                  className={`shrink-0 w-14 h-10 md:w-16 md:h-11 rounded-md overflow-hidden cursor-pointer transition-all duration-200 ${
                    i === lightboxIndex
                      ? 'ring-2 ring-white opacity-100 scale-105'
                      : 'opacity-40 hover:opacity-75'
                  }`}
                  onClick={() => setLightboxIndex(i)}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
