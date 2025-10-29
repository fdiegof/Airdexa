'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const SobreNosotrosPage: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <header className="absolute top-0 left-0 w-full z-20 flex items-center justify-between p-6">
        <div className="flex items-center">
        <Link href="/" aria-label="Inicio">
          {/* Logo claro */}
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={120}
            height={30}
            className="cursor-pointer block dark:hidden"
            priority
          />
          {/* Logo oscuro */}
          <Image
            src="/images/logo-dark.png"
            alt="Logo (modo oscuro)"
            width={120}
            height={30}
            className="cursor-pointer hidden dark:block"
            priority
          />
        </Link>
        </div>
        <nav className="hidden md:flex space-x-8">
          <Link href="/soluciones" className="font-bold text-gray-900 dark:text-gray-100">Soluciones</Link>
          <Link href="/sobrenosotros" className="font-bold text-gray-900 dark:text-gray-100">Sobre Nosotros</Link>
          <Link href="/#footer" className="font-bold text-gray-900 dark:text-gray-100">Contacto</Link>
          <Link href="/blog" className="font-bold text-gray-900 dark:text-gray-100">Noticias</Link>
        </nav>
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="focus:outline-none">
            <svg
              className="w-6 h-6 text-gray-900 dark:text-gray-100"
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
            <div className="absolute top-16 right-6 bg-black/80 dark:bg-gray-900/90 p-4 rounded">
              <ul className="flex flex-col space-y-4">
                <li><Link href="/soluciones" onClick={toggleMobileMenu} className="text-gray-100 font-bold">Soluciones</Link></li>
                <li><Link href="/sobrenosotros" onClick={toggleMobileMenu} className="text-gray-100 font-bold">Sobre Nosotros</Link></li>
                <li><Link href="/#footer" onClick={toggleMobileMenu} className="text-gray-100 font-bold">Contacto</Link></li>
                <li><Link href="/blog" onClick={toggleMobileMenu} className="text-gray-100 font-bold">Noticias</Link></li>
              </ul>
            </div>
          )}
        </div>
      </header>

      {/* Content */}
      <main className="flex-grow pt-40 px-6 max-w-6xl mx-auto space-y-20">
        <section>
          <h1 className="text-4xl font-bold mb-6">¿Quiénes somos? - Conoce Airdexa</h1>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            <strong>Airdexa</strong> es una empresa especializada en soluciones tecnológicas y consultoría estratégica en el ámbito de los drones en España. Nos dirigimos a empresas, instituciones y operadores que buscan innovar, optimizar y cumplir con la normativa vigente.
          </p>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            Nuestra misión es facilitar la transformación digital del sector aeronáutico no tripulado, ofreciendo servicios adaptados a cada tipo de operación.
          </p>

          <h2 className="text-2xl font-semibold mt-10 mb-4">Nuestro enfoque</h2>
          <ol className="list-decimal ml-6 space-y-4 text-gray-700 dark:text-gray-300">
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
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            Contamos con un equipo formado por ingenieros aeronáuticos, expertos en normativa UAS, desarrolladores de software y consultores estratégicos. Esta diversidad nos permite abordar proyectos desde múltiples perspectivas y asegurar el éxito en cada fase.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            Apostamos por la formación continua, la innovación y el compromiso con nuestros clientes. Nos mueve la pasión por la aviación y las oportunidades que ofrece la tecnología dron.
          </p>
          <br />
        </section>
      </main>

      {/* Footer */}
<footer id="footer" className="snap-start text-white py-10" style={{ backgroundColor: '#343432' }}>
  <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-8">
    <div>
      <h3 className="text-xl font-bold mb-4">Contacto</h3>
      <p className="text-gray-200">
        ¿Tienes preguntas o deseas más información sobre nuestros servicios? Contáctanos y uno de nuestros expertos
        se pondrá en contacto contigo para ayudarte a transformar tu negocio.
      </p>
      <br />
      <p className="text-gray-200">gestion@airdexa.com</p>
      <p className="text-gray-200">Madrid, España</p>
    </div>
    <div>
      {/* <h3 className="text-xl font-bold mb-4">Envíanos un mensaje</h3> */}
      {/* <ContactForm /> */}
    </div>
  </div>

  <div className="mt-6 flex flex-col items-center space-y-2">
    <a
      href="https://www.linkedin.com/company/airdexa/"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center text-gray-200 hover:text-blue-400 transition"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5 mr-2"
      >
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.762 2.239 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.787-1.75-1.754 0-.969.784-1.754 1.75-1.754s1.75.785 1.75 1.754c0 .967-.784 1.754-1.75 1.754zm13.5 11.268h-3v-5.604c0-1.337-.026-3.058-1.863-3.058-1.865 0-2.152 1.456-2.152 2.962v5.7h-3v-10h2.881v1.367h.04c.401-.76 1.381-1.562 2.844-1.562 3.042 0 3.6 2.003 3.6 4.605v5.59z"/>
      </svg>
      Síguenos en LinkedIn
    </a>
  </div>

  <p className="mt-4 text-center text-gray-200">
    &copy; {new Date().getFullYear()} Airdexa. Todos los derechos reservados.{" "}
    <Link href="/terminos" className="underline text-gray-100 hover:text-gray-300">Términos y Política</Link>
  </p>
</footer>

    </div>
  );
};

export default SobreNosotrosPage;
