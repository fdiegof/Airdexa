// src/components/Header.tsx
'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image'

const Header: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // If scrolling down and past 100px, hide the header.
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        // Otherwise, show the header.
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-20 flex items-center justify-between p-6 transition-transform duration-150 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width='120'
              height='30'
              className="h-20 cursor-pointer" 
            />
          </Link>
        </div>
      <nav className="hidden md:flex space-x-8">
        <Link href="/soluciones"  className="text-black font-bold">Soluciones</Link>
        <Link href="/sobrenosotros" className="text-black font-bold">Sobre Nosotros</Link>
        <Link href="/#footer" className="text-black font-bold">
          Contacto
        </Link>

      </nav>
      {/* Mobile Menu */}
      <div className="md:hidden">
        <button className="focus:outline-none">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
