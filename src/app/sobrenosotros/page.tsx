'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image'

const SobreNosotrosPage: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      {/* Header */}
      <header className="absolute top-0 left-0 w-full z-20 flex items-center justify-between p-6">
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
          <Link href="/soluciones" className="text-black font-bold">Soluciones</Link>
          <Link href="/sobrenosotros" className="text-black font-bold">Sobre Nosotros</Link>
          <Link href="/#footer" className="text-black font-bold">
            Contacto
          </Link>
          <Link href="/blog" className="text-black font-bold">Noticias</Link>
        </nav>
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="focus:outline-none">
            <svg
              className="w-6 h-6 text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          {isMobileMenuOpen && (
            <div className="absolute top-16 right-6 bg-white border p-4 rounded shadow">
              <ul className="flex flex-col space-y-4">
                <li><Link href="/soluciones" onClick={toggleMobileMenu} className="text-black font-bold">Soluciones</Link></li>
                <li><Link href="/sobrenosotros" onClick={toggleMobileMenu} className="text-black font-bold">Sobre Nosotros</Link></li>
                <li><Link href="/#footer" onClick={toggleMobileMenu} className="text-black font-bold">Contacto</Link></li>
                <li><Link href="/blog" onClick={toggleMobileMenu} className="text-black font-bold">Noticias</Link></li>
              </ul>
            </div>
          )}
        </div>
      </header>

      {/* Content */}
      <main className="flex-grow pt-40 px-6 max-w-6xl mx-auto space-y-20">
        <section>
          <h1 className="text-4xl font-bold mb-6">¿Quiénes somos? - Conoce Airdexa</h1>
          <p className="mb-4">
            <strong>Airdexa</strong> es una empresa especializada en soluciones tecnológicas y consultoría estratégica en el ámbito de los drones en España. Nos dirigimos a empresas, instituciones y operadores que buscan innovar, optimizar y cumplir con la normativa vigente.
          </p>
          <p className="mb-4">
            Nuestra misión es facilitar la transformación digital del sector aeronáutico no tripulado, ofreciendo servicios adaptados a cada tipo de operación.
          </p>

          <h2 className="text-2xl font-semibold mt-10 mb-4">Nuestro enfoque</h2>
          <ol className="list-decimal ml-6 space-y-4">
            <li>
              <strong>Análisis de necesidades:</strong> Evaluamos tus objetivos operativos y regulatorios con drones para diseñar soluciones adecuadas a tu entorno.
            </li>
            <li>
              <strong>Soluciones personalizadas:</strong> Desarrollamos herramientas que optimizan la gestión de flotas, operaciones y cumplimiento normativo.
            </li>
            <li>
              <strong>Consultoría estratégica:</strong> Ofrecemos asesoría técnica y legal adaptada al marco regulador europeo (EASA/AESA), respaldada por nuestro equipo multidisciplinar.
            </li>
          </ol>

          <h2 className="text-2xl font-semibold mt-10 mb-4">Nuestro equipo</h2>
          <p className="mb-4">
            Contamos con un equipo formado por ingenieros aeronáuticos, expertos en normativa UAS, desarrolladores de software y consultores estratégicos. Esta diversidad nos permite abordar proyectos desde múltiples perspectivas y asegurar el éxito en cada fase.
          </p>
          <p>
            Apostamos por la formación continua, la innovación y el compromiso con nuestros clientes. Nos mueve la pasión por la aviación y las oportunidades que ofrece la tecnología dron.
          </p>
          <br></br>
        </section>
      </main>
        <footer id="footer" className="snap-start text-white py-10" style={{ backgroundColor: '#343432' }}>
          <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-8">
            {/* Company Information */}
            <div>
              <h3 className="text-xl font-bold mb-4">Contacto</h3>
              <p>¿Tienes preguntas o deseas más información sobre nuestros servicios? Contáctanos y uno de nuestros expertos
              se pondrá en contacto contigo para ayudarte a transformar tu negocio.</p>
              <br></br>
              <p>gestion@airdexa.com</p>
              <p>Madrid, España</p>
            </div>
            {/* Contact Form */}
            <div>

            </div>
          </div>
          <p className="mt-4 text-center">
            &copy; {new Date().getFullYear()} Airdexa. Todos los derechos reservados. <Link href="/terminos" className="text-white underline">Términos y Política</Link>
          </p>
        </footer>
    </div>
  );
};

export default SobreNosotrosPage;
