import { Link } from 'react-router-dom';

function scrollToTop() {
  window.scrollTo(0, 0);
}

export default function Footer() {
  return (
    <footer className="bg-slate-50 py-12 md:py-16 border-t border-surface-container-low">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-12 px-6 md:px-8 max-w-7xl mx-auto">
        <div className="sm:col-span-2">
          <div className="text-xl font-bold text-primary mb-6 font-headline">JSF Finques</div>
          <p className="text-secondary text-sm leading-relaxed max-w-sm mb-8">
            Gestión inmobiliaria integral en Martorell. Especialistas en tasaciones, peritajes judiciales y mediación de compraventa con más de dos décadas de compromiso.
          </p>
          <div className="text-secondary text-xs md:text-sm">
            JSF Finques © 2024. AICAT 8394, P.J.I 0516.<br />
            C/ Prat de la Riba, 10, Martorell.
          </div>
        </div>
        
        <div>
          <h4 className="text-primary font-bold mb-6 font-headline">Empresa</h4>
          <nav className="flex flex-col gap-4">
            <Link to="/" onClick={scrollToTop} className="text-secondary text-sm hover:underline">Inicio</Link>
            <Link to="/alquiler" onClick={scrollToTop} className="text-secondary text-sm hover:underline">Propiedades</Link>
            <Link to="/ubicacion" onClick={scrollToTop} className="text-secondary text-sm hover:underline">Ubicación</Link>
            <Link to="/blog" onClick={scrollToTop} className="text-secondary text-sm hover:underline">Blog Inmobiliario</Link>
          </nav>
        </div>

        <div>
          <h4 className="text-primary font-bold mb-6 font-headline">Legal</h4>
          <nav className="flex flex-col gap-4">
            <Link to="/privacidad" onClick={scrollToTop} className="text-secondary text-sm hover:underline">Privacidad</Link>
            <Link to="/aviso-legal" onClick={scrollToTop} className="text-secondary text-sm hover:underline">Aviso Legal</Link>
            <Link to="/cookies" onClick={scrollToTop} className="text-secondary text-sm hover:underline">Cookies</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
