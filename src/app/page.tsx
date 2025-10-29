"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import BlogCardList from './blog/BlogCardList';
import type { BlogPost } from './blog/BlogCardList';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react'

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
            Porque volar debería ser lo único que te preocupe
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
                  En <b>Airdexa Drone Solutions</b> desarrollamos tecnología para transformar la forma en que se gestionan las operaciones de drones.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Nacida en el marco del programa ENAIRE Open Innovation, Airdexa impulsa la digitalización del sector UAS mediante soluciones de software que automatizan procesos, mejoran la seguridad operativa y facilitan la conexión entre operadores, pilotos y autoridades aeronáuticas.
                </p><br></br>
                <p className="text-gray-700 dark:text-gray-300">
                  Nuestro trabajo combina ingeniería y visión estratégica para crear herramientas que aportan valor real a la gestión aérea y la movilidad del futuro.
                </p><br></br>
                <p className="text-gray-700 dark:text-gray-300">
                  En Airdexa creemos en la colaboración, la innovación y la tecnología responsable como motores del progreso en el ecosistema UAS.
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
                      <h4 className="font-semibold text-lg">Soluciones digitales</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Te proporcionamos de herramientas que te permiten centrarte en lo verdaderamente importante, volar.</p>
                    </li>
                    <li>
                      <span className="absolute w-4 h-4 bg-red-600 rounded-full -left-2 top-1.5"></span>
                      <h4 className="font-semibold text-lg">Soluciones personalizadas</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Nos adaptamos a tus necesidades para proporcionarte las soluciones particulares que pudieses necesitar.</p>
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
<section>
  <div className="max-w-6xl mx-auto px-4">
    <h2 className="text-3xl font-bold mb-8">Nuestras soluciones</h2>

    <div className="grid gap-6 md:grid-cols-2">
      {/* SkAi Permit */}
      <Link href="/soluciones/skai-permit" className="block group" aria-label="Ver SkAi Permit">
        <Card className="h-full dark:bg-gray-800 dark:border-gray-700 transition hover:-translate-y-0.5 hover:shadow-md">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <Image src="/images/skai-permit-logo.jpg" alt="SkAi Permit" width={40} height={40} className="rounded" />
              <h3 className="text-xl font-semibold">SkAi Permit</h3>
              <span className="ml-auto text-[11px] px-2 py-0.5 rounded-full bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300">
                Permisos automáticos
              </span>
            </div>

            <p className="text-gray-700 dark:text-gray-300">
              Automatiza la obtención de permisos y coordinaciones para volar en España. Indica <strong>cuándo</strong>, <strong>dónde</strong> y <strong>con qué dron</strong>; nosotros gestionamos el resto.
            </p>

            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-600 mt-0.5" /> Coordinación multi-entidad</li>
              <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-600 mt-0.5" /> Estado y entregables en un único panel</li>
              <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-600 mt-0.5" /> Consciencia situacional del entorno</li>
            </ul>

            {/* <div className="text-xs text-gray-500 dark:text-gray-400">
              Tiempo medio de solicitud: <span className="font-medium text-gray-700 dark:text-gray-200">menos de 5 min</span>
            </div> */}

            <span className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium group-hover:underline">
              Ver más →
            </span>
          </CardContent>
        </Card>
      </Link>

      {/* Justflier */}
      <Link href="/soluciones/justflier" className="block group" aria-label="Ver Justflier">
        <Card className="h-full dark:bg-gray-800 dark:border-gray-700 transition hover:-translate-y-0.5 hover:shadow-md">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <Image src="/images/justflier-logo.jpeg" alt="Justflier" width={40} height={40} className="rounded" />
              <h3 className="text-xl font-semibold">Justflier</h3>
              <span className="ml-auto text-[11px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                Gestión de flotas
              </span>
            </div>

            <p className="text-gray-700 dark:text-gray-300">
              Plataforma integral para gestionar flotas, pilotos, documentación y registros de vuelo con dashboards y trazabilidad completa.
            </p>

            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-600 mt-0.5" /> Inventario, mantenimiento y alertas</li>
              <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-600 mt-0.5" /> Licencias y vencimientos de pilotos</li>
              <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-600 mt-0.5" /> Planificación y registro de misiones</li>
            </ul>

            {/* <div className="text-xs text-gray-500 dark:text-gray-400">
              Implementación típica: <span className="font-medium text-gray-700 dark:text-gray-200">en días, no semanas</span>
            </div> */}

            <span className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium group-hover:underline">
              Ver más →
            </span>
          </CardContent>
        </Card>
      </Link>
    </div>
  </div>
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

export default LandingPage;
