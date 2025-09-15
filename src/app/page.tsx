"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ContactForm from './ContactForm';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import BlogCardList from './blog/BlogCardList';
import type { BlogPost } from './blog/BlogCardList';

/* ===================== Reveal on Scroll (fixed) =====================

What changed:
- We read matchMedia results *inside the effect* (desktopNow / reducedNow)
  so we don't rely on state that hasn't updated yet during first paint.
- This prevents the "show everything instantly" bug and enables real scroll-in animations.

Behavior:
- Desktop only (>= 1024px).
- Honors prefers-reduced-motion.
- Skips animating items already visible on initial load.
- Animates when items ENTER the viewport as you scroll.

-------------------------------------------------------------------- */
type RevealProps = React.HTMLAttributes<HTMLDivElement> & {
  delay?: number;
  threshold?: number;      // 0..1, default 0.25
  rootMargin?: string;     // default '0px 0px -10% 0px'
  skipInitialInView?: boolean; // default true
  once?: boolean;          // default true
};

const RevealOnScroll: React.FC<React.PropsWithChildren<RevealProps>> = ({
  children,
  delay = 0,
  className = '',
  style,
  threshold = 0.25,
  rootMargin = '0px 0px -10% 0px',
  skipInitialInView = true,
  once = true,
  ...rest
}) => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = React.useState(false);
  const [disableTransition, setDisableTransition] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Read media queries *now* (no async state race)
    const desktopNow = window.matchMedia('(min-width: 1024px)').matches;
    const reducedNow = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Mobile or reduced motion -> show instantly, never animate
    if (!desktopNow || reducedNow) {
      setShown(true);
      setDisableTransition(true);
      return;
    }

    // If already in view on initial load, render without animation
    if (skipInitialInView) {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const vw = window.innerWidth || document.documentElement.clientWidth;

      const horizontallyInView = rect.left < vw && rect.right > 0;
      const minVisible = Math.min(rect.height, vh) * 0.1; // at least 10% visible
      const verticallyInView = rect.top < vh - minVisible && rect.bottom > minVisible;

      if (horizontallyInView && verticallyInView) {
        setShown(true);
        setDisableTransition(true);
        if (once) return; // no need to observe
      }
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true);
            setDisableTransition(false);
            if (once && el) io.unobserve(el);
          }
        });
      },
      { threshold, rootMargin }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin, skipInitialInView, once]);

  return (
    <div
      ref={ref}
      {...rest}
      style={{ ...(disableTransition ? {} : { transitionDelay: `${delay}ms` }), ...style }}
      className={[
        disableTransition ? 'transition-none' : 'transition-all duration-700 ease-out will-change-transform',
        shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  );
};
/* ================================================================== */

// Typewriter
const words = ["innovación", "seguridad", "tecnología"];

const Typewriter: React.FC = () => {
  const [currentWord, setCurrentWord] = React.useState('');
  const [currentWordIndex, setCurrentWordIndex] = React.useState(0);
  const [currentCharIndex, setCurrentCharIndex] = React.useState(0);

  React.useEffect(() => {
    const typingSpeed = 50;
    const pauseTime = 2000;

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
  }, [currentCharIndex, currentWordIndex]);

  return <span className="text-red-600 dark:text-red-400">{currentWord}</span>;
};

// FAQ Item
interface FAQItemProps {
  question: string;
  answer: string;
}
const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="w-full border-b border-gray-300 dark:border-gray-700 pb-2">
      <button
        className="w-full text-left focus:outline-none flex justify-between items-center py-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-2xl font-semibold">{question}</h3>
        <span className="text-xl">{isOpen ? '-' : '+'}</span>
      </button>
      {isOpen && (
        <div className="w-full">
          <p className="text-gray-700 dark:text-gray-300 mt-2 w-full">{answer}</p>
        </div>
      )}
    </div>
  );
};

const LandingPage: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);
  const [recentPosts, setRecentPosts] = React.useState<BlogPost[]>([]);

  React.useEffect(() => {
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
    <div className="relative snap-y snap-mandatory text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900">

      {/* Header */}
      <header className="absolute top-0 left-0 w-full z-20 flex items-center justify-between p-6">
        <div className="flex items-center">
          <Image src="/images/logo.png" alt="Logo" width={120} height={30} className="cursor-pointer" />
        </div>
        <nav className="hidden md:flex space-x-8">
          <Link href="/soluciones"  className="font-bold text-gray-100 dark:text-gray-100">Soluciones</Link>
          <Link href="/sobrenosotros" className="font-bold text-gray-100 dark:text-gray-100">Sobre Nosotros</Link>
          <Link href="#footer" className="font-bold text-gray-100 dark:text-gray-100">Contacto</Link>
          <Link href="/blog" className="font-bold text-gray-100 dark:text-gray-100">Noticias</Link>
        </nav>
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="focus:outline-none">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          {isMobileMenuOpen && (
            <div className="absolute top-16 right-6 bg-black/80 dark:bg-gray-900/90 p-4 rounded">
              <ul className="flex flex-col space-y-4">
                <li><Link href="/soluciones" onClick={toggleMobileMenu} className="font-bold text-gray-100">Soluciones</Link></li>
                <li><Link href="/sobrenosotros" onClick={toggleMobileMenu} className="font-bold text-gray-100">Sobre nosotros</Link></li>
                <li><Link href="#contact" onClick={toggleMobileMenu} className="font-bold text-gray-100">Contacto</Link></li>
                <li><Link href="/blog" onClick={toggleMobileMenu} className="font-bold text-gray-100">Noticias</Link></li>
              </ul>
            </div>
          )}
        </div>
      </header>

      {/* Hero (no animation to keep text crisp on load) */}
      <section
        id="hero"
        className="relative snap-start h-screen overflow-hidden bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: 'url("/images/background.jpg")' }}
      >
        <div className="absolute inset-0 bg-black/50 pointer-events-none"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl text-white font-bold mb-4">
            Impulsa tu negocio con <Typewriter />
          </h1>
          <h1 className="text-white/95 text-lg">
            Descubre cómo te ayudamos a transformar tu negocio
          </h1>
        </div>
      </section>

      {/* About Us */}
      <section id="aboutus" className="snap-start min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 py-20">
        <RevealOnScroll className="max-w-6xl w-full px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <RevealOnScroll delay={0}>
              <div>
                <h2 className="text-4xl font-bold mb-4">¿Quiénes somos? - Conoce Airdexa</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  <b>Airdexa</b> es una empresa especializada en soluciones tecnológicas y consultoría estratégica en el ámbito de los drones en España. Nos dirigimos a empresas, instituciones y operadores que buscan innovar, optimizar y cumplir con la normativa vigente.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Nuestro equipo multidisciplinar permite ofrecer soluciones de alto valor añadido tanto a nivel operativo como regulatorio.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={120}>
              <div className="space-y-6">
                <div className="max-w-4xl w-full">
                  <ol className="relative border-l border-gray-300 dark:border-gray-700 pl-6 space-y-10">
                    <li>
                      <span className="absolute w-4 h-4 bg-red-600 rounded-full -left-2 top-1.5"></span>
                      <h4 className="font-semibold text-lg">Análisis de necesidades</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Evaluamos tus objetivos operativos y regulatorios con drones.</p>
                    </li>
                    <li>
                      <span className="absolute w-4 h-4 bg-red-600 rounded-full -left-2 top-1.5"></span>
                      <h4 className="font-semibold text-lg">Soluciones personalizadas</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Desarrollamos herramientas de gestión de flotas y cumplimiento normativo.</p>
                    </li>
                    <li>
                      <span className="absolute w-4 h-4 bg-red-600 rounded-full -left-2 top-1.5"></span>
                      <h4 className="font-semibold text-lg">Consultoría estratégica</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Ofrecemos asesoría técnica y legal adaptada al marco EASA/AESA.</p>
                    </li>
                  </ol>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </RevealOnScroll>
      </section>

      {/* Solutions */}
      <section id="solutions" className="snap-start min-h-screen flex items-center justify-center flex-col bg-gray-100 dark:bg-gray-950 py-20">
        <RevealOnScroll className="w-full">
          <div className="text-center px-4 mb-12">
            <h2 className="text-4xl font-bold mb-4">¿Qué ofrecemos? - Conoce nuestros servicios</h2>
          </div>

          <div className="w-full flex flex-col md:flex-row">
            <RevealOnScroll delay={0} className="w-full md:w-1/2 flex justify-center items-center mb-8 md:mb-0">
              <Image
                src="/images/mockuper.png"
                alt="Placeholder"
                width={350}
                height={60}
                className="w-full max-w-md md:max-w-lg h-auto"
              />
            </RevealOnScroll>

            <RevealOnScroll delay={140} className="w-full md:w-1/2 px-4 pr-8" style={{ textAlign: 'justify' }}>
              <div>
                <h2 className="font-semibold text-lg">Soluciones a medida para la gestión de flotas de drones</h2>
                <p className="text-gray-700 dark:text-gray-300">
                  En Airdexa desarrollamos herramientas personalizadas para la <strong>gestión de flotas de drones</strong>. Nuestro enfoque se adapta a las necesidades específicas de cada cliente, permitiendo un control completo sobre:
                </p>
                <ul className="list-disc ml-6 my-2 text-gray-700 dark:text-gray-300">
                  <li>Mantenimiento y trazabilidad de aeronaves.</li>
                  <li>Registro y planificación de vuelos.</li>
                  <li>Gestión documental y cumplimiento normativo EASA/AESA.</li>
                </ul>
                <p className="text-gray-700 dark:text-gray-300">
                  Ya seas una empresa audiovisual, una ingeniería, o una administración pública, nuestras soluciones permiten una <strong>gestión más eficiente, segura y rentable</strong> de tus operaciones con drones.
                </p>

                <br />

                <h2 className="font-semibold text-lg">Consultoría especializada en drones en España</h2>
                <p className="text-gray-700 dark:text-gray-300">
                  También ofrecemos servicios de <strong>consultoría estratégica y técnica</strong> para empresas del sector o aquellas que desean integrar drones en su actividad. Algunos de nuestros servicios incluyen:
                </p>
                <ul className="list-disc ml-6 my-2 text-gray-700 dark:text-gray-300">
                  <li>Asesoramiento normativo (regulación EASA, AESA, STS, A1/A3, etc.).</li>
                  <li>Diseño e implementación de operaciones con drones.</li>
                  <li>Estudios de viabilidad, seguridad y adaptación tecnológica.</li>
                </ul>
                <p className="text-gray-700 dark:text-gray-300">
                  Contamos con un equipo multidisciplinar con amplia experiencia en el sector, lo que nos permite ofrecer soluciones de alto valor añadido, tanto a nivel operativo como regulatorio.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </RevealOnScroll>
      </section>

      {/* Contact (hidden) */}
      <section id="contact" className="snap-start min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950 py-20 hidden">
        <RevealOnScroll className="max-w-3xl w-full text-center px-4">
          <h2 className="text-4xl font-bold mb-4">Contacto</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            ¿Tienes preguntas o deseas más información sobre nuestros servicios? Contáctanos y uno de nuestros expertos
            se pondrá en contacto contigo para ayudarte a transformar tu negocio.
          </p>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p><strong>Dirección:</strong> Calle de la Innovación, 123, Madrid, España</p>
            <p><strong>Teléfono:</strong> +34 912 345 678</p>
            <p><strong>Email:</strong> gestion@airdexa.com</p>
          </div>
        </RevealOnScroll>
      </section>

      {/* Blog */}
      <section id="blog" className="snap-start min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 py-20">
        <RevealOnScroll className="max-w-6xl w-full px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">Noticias</h2>
          <BlogCardList posts={recentPosts} />
          <div className="text-center mt-12">
            <Link href="/blog" className="text-blue-600 dark:text-blue-400 underline font-medium">
              Ver todas las publicaciones
            </Link>
          </div>
        </RevealOnScroll>
      </section>

      {/* FAQ */}
      <section id="faq" className="snap-start min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-800 py-20">
        <RevealOnScroll className="max-w-3xl text-center px-4">
          <h2 className="text-4xl font-bold mb-8">Preguntas Frecuentes</h2>
          <div className="space-y-6 text-left">
            <FAQItem
              question="¿Qué servicios ofrecemos?"
              answer="Ponemos a tu disposición consultoría especializada en la integración de drones en tu negocio, optimización de operaciones y asesoramiento en equipos, normativas y seguridad. Además, estamos desarrollando una plataforma de gestión integral de flotas y operaciones con drones, actualmente en fase de pruebas, que revolucionará la forma en que las empresas administran sus recursos aéreos."
            />

            <FAQItem
              question="¿Qué problema resuelve el servicio de gestión de flotas?"
              answer="La normativa europea y española exige que todas las operaciones con drones sean realizadas por operadores autorizados, con los permisos y registros correspondientes. Nuestro software simplifica este proceso al centralizar toda la gestión de flota: desde el inventario de drones y certificaciones de pilotos hasta la documentación de operaciones. De esta manera, se asegura el cumplimiento normativo, se reducen riesgos y se dispone de un historial completo de vuelos y documentos listo para presentar en cualquier auditoría o inspección de AESA."
            />

            <FAQItem
              question="¿Podemos acceder al servicio de gestión de flota y operaciones?"
              answer="Actualmente el servicio se encuentra en fase beta, con acceso limitado a un grupo reducido de usuarios. Sin embargo, puedes dejarnos tus datos en el formulario al final de la página para recibir novedades y obtener prioridad de acceso tan pronto abramos nuevas plazas."
            />

            <FAQItem
              question="¿Ofrecéis soporte continuo?"
              answer="Sí. Todas nuestras soluciones incluyen soporte técnico continuo y actualizaciones periódicas. Nuestro objetivo es evolucionar junto a las necesidades de los operadores, incorporando mejoras y nuevas funcionalidades para que siempre cuentes con una herramienta fiable, actualizada y en crecimiento."
            />

          </div>
        </RevealOnScroll>
      </section>

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
            <h3 className="text-xl font-bold mb-4">Envíanos un mensaje</h3>
            <ContactForm />
          </div>
        </div>
        <p className="mt-4 text-center text-gray-200">
          &copy; {new Date().getFullYear()} Airdexa. Todos los derechos reservados.{" "}
          <Link href="/terminos" className="underline text-gray-100">Términos y Política</Link>
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
