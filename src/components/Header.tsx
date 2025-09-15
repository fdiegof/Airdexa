'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Header: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      if (y > lastScrollY && y > 100) setIsVisible(false);
      else setIsVisible(true);

      setScrolled(y > 0);
      setLastScrollY(y);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={[
        'fixed top-0 left-0 w-full z-20 transition-transform duration-150',
        isVisible ? 'translate-y-0' : '-translate-y-full',
      ].join(' ')}
    >
      {/* translucent bar like before */}
      <div
        className={[
          'backdrop-blur bg-white/80 dark:bg-gray-900/80',
          scrolled ? 'border-b border-gray-200 dark:border-gray-800' : 'border-b border-transparent',
        ].join(' ')}
      >
        <div className="max-w-6xl mx-auto px-6">
          {/* match Soluciones: big logo height via h-20 and comfy padding via py-6 */}
          <div className="flex items-center justify-between py-6">
            <Link href="/" aria-label="Ir al inicio" className="flex items-center min-w-0">
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={120}
                height={30}
                // replicate Soluciones behaviour:
                className="h-20 w-auto object-contain cursor-pointer"
                // (optional) sizes can be omitted since we're controlling height via CSS
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/soluciones" className="font-bold text-gray-900 dark:text-gray-100 hover:underline">
                Soluciones
              </Link>
              <Link href="/sobrenosotros" className="font-bold text-gray-900 dark:text-gray-100 hover:underline">
                Sobre Nosotros
              </Link>
              <Link href="/#footer" className="font-bold text-gray-900 dark:text-gray-100 hover:underline">
                Contacto
              </Link>
              <Link href="/blog" className="font-bold text-gray-900 dark:text-gray-100 hover:underline">
                Noticias
              </Link>
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Abrir menú"
              aria-expanded={menuOpen}
              className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500"
            >
              <svg
                className="w-6 h-6 text-gray-900 dark:text-gray-100"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown (full-width) */}
      {menuOpen && (
        <div className="md:hidden w-full bg-black/80 dark:bg-gray-900/90">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <ul className="flex flex-col space-y-4">
              <li>
                <Link href="/soluciones" className="block font-bold text-gray-100" onClick={() => setMenuOpen(false)}>
                  Soluciones
                </Link>
              </li>
              <li>
                <Link href="/sobrenosotros" className="block font-bold text-gray-100" onClick={() => setMenuOpen(false)}>
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link href="/#footer" className="block font-bold text-gray-100" onClick={() => setMenuOpen(false)}>
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/blog" className="block font-bold text-gray-100" onClick={() => setMenuOpen(false)}>
                  Noticias
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
