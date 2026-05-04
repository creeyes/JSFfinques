import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { name: 'Inicio', path: '/' },
  { name: 'Alquiler', path: '/alquiler' },
  { name: 'Compra', path: '/compra' },
  { name: 'Ubicación', path: '/ubicacion' },
  { name: 'Blog', path: '/blog' },
];

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-md shadow-sm">
      <div className="flex justify-between items-center h-20 px-6 md:px-8 max-w-7xl mx-auto">
        <Link to="/" className="text-xl font-bold tracking-tight text-primary font-headline">
          JSF Finques
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors relative py-1 ${
                  isActive ? 'text-primary' : 'text-secondary hover:text-primary'
                }`}
              >
                {link.name}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                )}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/ubicacion"
            className="hidden sm:block bg-primary text-on-primary px-6 py-2.5 rounded-full font-semibold transition-all hover:bg-primary-container"
          >
            Contacto
          </Link>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-primary"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-surface-container">
          <div className="flex flex-col p-6 gap-4">
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-lg font-semibold py-2 ${
                    isActive ? 'text-primary' : 'text-secondary'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <Link
              to="/ubicacion"
              onClick={() => setIsOpen(false)}
              className="mt-4 bg-primary text-on-primary w-full py-4 rounded-xl font-bold text-center"
            >
              Contacto
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
