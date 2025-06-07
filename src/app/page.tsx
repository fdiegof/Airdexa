"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image'
import ContactForm from './ContactForm'; // Make sure you have created ContactForm.tsx
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import BlogCardList from './blog/BlogCardList';
import type { BlogPost } from './blog/BlogCardList'; 
// Typewriter Component (only changes one word)

const words = ["innovación", "seguridad", "tecnología"];

const Typewriter: React.FC = () => {
  // Words to cycle through
  
  const [currentWord, setCurrentWord] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  useEffect(() => {
    const typingSpeed = 50; // ms per character
    const pauseTime = 2000;  // pause after full word

    if (currentCharIndex < words[currentWordIndex].length) {
      const timeout = setTimeout(() => {
        setCurrentWord(prev => prev + words[currentWordIndex][currentCharIndex]);
        setCurrentCharIndex(currentCharIndex + 1);
      }, typingSpeed);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCurrentWord('');
        setCurrentCharIndex(0);
        setCurrentWordIndex((currentWordIndex + 1) % words.length);
      }, pauseTime);
      return () => clearTimeout(timeout);
    }
  }, [currentCharIndex, currentWordIndex, words]);

  return <span className="text-red-500">{currentWord}</span>;
};

// FAQ Item Component with fixed width for both question and answer
interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full border-b border-gray-300 pb-2">
      <button
        className="w-full text-left focus:outline-none flex justify-between items-center py-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-2xl font-semibold">{question}</h3>
        <span className="text-xl">{isOpen ? '-' : '+'}</span>
      </button>
      {isOpen && (
        <div className="w-full">
          <p className="text-gray-700 mt-2 w-full">{answer}</p>
        </div>
      )}
    </div>
  );
};

const LandingPage: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);

  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/posts');
        if (!res.ok) throw new Error('Failed to fetch');
        const data: BlogPost[] = await res.json();
        const sorted = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setRecentPosts(sorted.slice(0, 3));
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="relative snap-y snap-mandatory">

      <header className="absolute top-0 left-0 w-full z-20 flex items-center justify-between p-6">
        <div className="flex items-center">

          <Image
            src="/images/logo.png"
            alt="Logo"
            width='120'
            height='30'
            className="cursor-pointer"
          />
        </div>
        <nav className="hidden md:flex space-x-8">
          <Link href="/soluciones"  className="text-white font-bold">Soluciones</Link>
          <Link href="/sobrenosotros" className="text-white font-bold">Sobre Nosotros</Link>
          <Link href="#footer" className="text-white font-bold">Contacto</Link>
          <Link href="/blog" className="text-white font-bold">Noticias</Link>
        </nav>
        {/* Mobile Menu */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="focus:outline-none">
            <svg
              className="w-6 h-6 text-white"
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
            <div className="absolute top-16 right-6 bg-black bg-opacity-75 p-4 rounded">
              <ul className="flex flex-col space-y-4">
                <li>
                  <Link href="/soluciones" onClick={toggleMobileMenu} className="text-white font-bold">
                    Soluciones
                  </Link>
                </li>
                <li>
                  <Link href="/sobrenosotros" onClick={toggleMobileMenu} className="text-white font-bold">
                    Sobre nosotros
                  </Link>
                </li>
                <li>
                  <Link href="#contact" onClick={toggleMobileMenu} className="text-white font-bold">
                    Contacto
                  </Link>
                </li>
                <li>
                  <Link href="/blog" onClick={toggleMobileMenu} className="text-white font-bold">
                    Noticias
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section with Background Image */}
      <section
        id="hero"
        className="relative snap-start h-screen overflow-hidden bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: 'url("/images/background.jpg")' }}
      >
        {/* Overlay to diffuse the background (only within the hero section) */}
        <div className="absolute inset-0 bg-black/50 pointer-events-none"></div>
        {/* Text content with typewriter effect integrated into the h1 */}
        <div className="relative z-10 text-center">
          <h1 className="text-5xl text-white font-bold mb-4">
            Impulsa tu negocio con <Typewriter />
          </h1>
          <h1 className="text-white text-lg">
            Descubre cómo te ayudamos a transformar tu negocio
          </h1>
        </div>
      </section>

      {/* About Us Section */}
      <section id="aboutus" className="snap-start min-h-screen flex items-center justify-center bg-white py-20">
        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 px-4">
          <div>
            <h2 className="text-4xl font-bold mb-4">¿Quiénes somos? - Conoce Airdexa</h2>
            <p className="text-gray-700 mb-6">
              <b>Airdexa</b> es una empresa especializada en soluciones tecnológicas y consultoría estratégica en el ámbito de los drones en España. Nos dirigimos a empresas, instituciones y operadores que buscan innovar, optimizar y cumplir con la normativa vigente.
            </p>
            <p className="text-gray-700">
              Nuestro equipo multidisciplinar permite ofrecer soluciones de alto valor añadido tanto a nivel operativo como regulatorio.
            </p>
          </div>

          <div className="space-y-6">
            <div className="max-w-4xl w-full">
              <ol className="relative border-l border-gray-300 pl-6 space-y-10">
                <li>
                  <span className="absolute w-4 h-4 bg-red-600 rounded-full -left-2 top-1.5"></span>
                  <h4 className="font-semibold text-lg">Análisis de necesidades</h4>
                  <p className="text-gray-600 text-sm">Evaluamos tus objetivos operativos y regulatorios con drones.</p>
                </li>
                <li>
                  <span className="absolute w-4 h-4 bg-red-600 rounded-full -left-2 top-1.5"></span>
                  <h4 className="font-semibold text-lg">Soluciones personalizadas</h4>
                  <p className="text-gray-600 text-sm">Desarrollamos herramientas de gestión de flotas y cumplimiento normativo.</p>
                </li>
                <li>
                  <span className="absolute w-4 h-4 bg-red-600 rounded-full -left-2 top-1.5"></span>
                  <h4 className="font-semibold text-lg">Consultoría estratégica</h4>
                  <p className="text-gray-600 text-sm">Ofrecemos asesoría técnica y legal adaptada al marco EASA/AESA.</p>
                </li>
              </ol>
            </div>

          </div>
        </div>
      </section>


      <section id="solutions" className="snap-start min-h-screen flex items-center justify-center flex-col bg-gray-100 py-20">
        {/* Section title centered on top */}
        <div className="text-center px-4 mb-12">
          <h2 className="text-4xl font-bold mb-4">¿Qué ofrecemos? - Conoce nuestros servicios</h2>
        </div>

        {/* Full-width container to split the screen into two columns */}
        <div className="w-full flex flex-col md:flex-row">
          {/* Left side image */}
          <div className="w-full md:w-1/2 flex justify-center items-center mb-8 md:mb-0">
            <Image
              src="/images/mockuper.png"
              alt="Placeholder"
              width='350'
              height='60'
              className="w-full max-w-md md:max-w-lg h-auto"
            />
          </div>

          {/* Right side text */}
          <div className="w-full md:w-1/2 px-4 pr-8" style={{ textAlign: "justify" }}>
            <h2 className="font-semibold text-lg">Soluciones a medida para la gestión de flotas de drones</h2>
            <p>En Airdexa desarrollamos herramientas personalizadas para la <strong>gestión de flotas de drones</strong>. Nuestro enfoque se adapta a las necesidades específicas de cada cliente, permitiendo un control completo sobre:</p>
            <ul className="list-disc ml-6 my-2">
              <li>Mantenimiento y trazabilidad de aeronaves.</li>
              <li>Registro y planificación de vuelos.</li>
              <li>Gestión documental y cumplimiento normativo EASA/AESA.</li>
            </ul>
            <p>Ya seas una empresa audiovisual, una ingeniería, o una administración pública, nuestras soluciones permiten una <strong>gestión más eficiente, segura y rentable</strong> de tus operaciones con drones.</p>

            <br />

            <h2 className="font-semibold text-lg">Consultoría especializada en drones en España</h2>
            <p>También ofrecemos servicios de <strong>consultoría estratégica y técnica</strong> para empresas del sector o aquellas que desean integrar drones en su actividad. Algunos de nuestros servicios incluyen:</p>
            <ul className="list-disc ml-6 my-2">
              <li>Asesoramiento normativo (regulación EASA, AESA, STS, A1/A3, etc.).</li>
              <li>Diseño e implementación de operaciones con drones.</li>
              <li>Estudios de viabilidad, seguridad y adaptación tecnológica.</li>
            </ul>
            <p>Contamos con un equipo multidisciplinar con amplia experiencia en el sector, lo que nos permite ofrecer soluciones de alto valor añadido, tanto a nivel operativo como regulatorio.</p>
          </div>
        </div>
      </section>





      {/* Contact Section */}
      <section id="contact" className="snap-start min-h-screen flex items-center justify-center bg-gray-100 py-20 hidden">
        <div className="max-w-3xl text-center px-4">
          <h2 className="text-4xl font-bold mb-4">Contacto</h2>
          <p className="text-gray-700 mb-6">
            ¿Tienes preguntas o deseas más información sobre nuestros servicios? Contáctanos y uno de nuestros expertos
            se pondrá en contacto contigo para ayudarte a transformar tu negocio.
          </p>
          <div className="space-y-4">
            <p className="text-gray-700"><strong>Dirección:</strong> Calle de la Innovación, 123, Madrid, España</p>
            <p className="text-gray-700"><strong>Teléfono:</strong> +34 912 345 678</p>
            <p className="text-gray-700"><strong>Email:</strong> gestion@airdexa.com</p>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="snap-start min-h-screen flex items-center justify-center bg-white py-20">
        <div className="max-w-6xl w-full px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">Noticias</h2>
          <BlogCardList posts={recentPosts} />
          <div className="text-center mt-12">
            <Link href="/blog" className="text-blue-500 underline font-medium">
              Ver todas las publicaciones
            </Link>
          </div>
        </div>
      </section>


      {/* FAQ Section as Dropdowns */}
      <section id="faq" className="snap-start min-h-screen flex items-center justify-center bg-gray-50 py-20">
        <div className="max-w-3xl text-center px-4">
          <h2 className="text-4xl font-bold mb-8">Preguntas Frecuentes</h2>
          <div className="space-y-6 text-left">
            <FAQItem
              question="¿Qué servicios ofrecemos?"
              answer="Ofrecemos consultoría especializada en la integración de drones en tu negocio, optimización de operaciones, y asesoramiento en equipos, normativas y seguridad."
            />
            <FAQItem
              question="¿Podemos acceder al servicio de gestión de flota y operaciones?"
              answer="Actualmente este servicio se encuentra en desarrollo, pero puedes interesarte completando el formulario al final de la página. Recibirás actualizaciones del estado del servicio, así como un aviso tan pronto esté disponible."
            />
            <FAQItem
              question="¿Ofreceis soporte post-implementación?"
              answer="Sí, ofrecemos soporte continuo y actualizaciones para garantizar el éxito de tu integración tecnológica."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
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
            <h3 className="text-xl font-bold mb-4">Envíanos un mensaje</h3>
            <ContactForm />
          </div>
        </div>
        <p className="mt-4 text-center">
          &copy; {new Date().getFullYear()} Airdexa. Todos los derechos reservados. <Link href="/terminos" className="text-white underline">Términos y Política</Link>
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
