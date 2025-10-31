'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Package, ClipboardCheck } from 'lucide-react';

const SolucionesPage: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);

  return (
    <div className="relative min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <header className="absolute top-0 left-0 w-full z-20 flex items-center justify-between p-6 bg-transparent">
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
          <Link href="/soluciones" className="font-bold text-gray-900 dark:text-gray-100">
            Soluciones
          </Link>
          <Link href="/sobrenosotros" className="font-bold text-gray-900 dark:text-gray-100">
            Sobre Nosotros
          </Link>
          <Link href="/#footer" className="font-bold text-gray-900 dark:text-gray-100">
            Contacto
          </Link>
          <Link href="/blog" className="font-bold text-gray-900 dark:text-gray-100">
            Noticias
          </Link>
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          {isMobileMenuOpen && (
            <div className="absolute top-16 right-6 bg-black/80 dark:bg-gray-900/90 p-4 rounded">
              <ul className="flex flex-col space-y-4">
                <li><Link href="/soluciones" onClick={toggleMobileMenu} className="text-gray-100 font-bold">Soluciones</Link></li>
                <li><Link href="/sobrenosotros" onClick={toggleMobileMenu} className="text-gray-100 font-bold">Sobre nosotros</Link></li>
                <li><Link href="/#footer" onClick={toggleMobileMenu} className="text-gray-100 font-bold">Contacto</Link></li>
                <li><Link href="/blog" onClick={toggleMobileMenu} className="text-gray-100 font-bold">Noticias</Link></li>
              </ul>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-40 px-6 max-w-6xl mx-auto space-y-20">
        {/* Gestión de Flotas (genérico) */}
        <section>
          <h1 className="text-4xl font-bold mb-6">Soluciones a medida para la gestión de flotas de drones</h1>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            En <strong>Airdexa</strong>, desarrollamos herramientas personalizadas que permiten a operadores y empresas gestionar de forma integral sus flotas de drones. Estas soluciones se ajustan a los procesos internos de cada cliente, garantizando eficiencia, trazabilidad y cumplimiento normativo.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2">Características principales</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li><strong>Mantenimiento y trazabilidad:</strong> Registro detallado de inspecciones, reparaciones y ciclos de vida de cada aeronave, con alertas automáticas para tareas programadas.</li>
            <li><strong>Planificación de vuelos:</strong> Calendario integrado con seguimiento de misiones, áreas de operación y asignación de pilotos certificados.</li>
            <li><strong>Gestión documental:</strong> Almacenamiento seguro de manuales, seguros, certificados STS y otros documentos exigidos por la normativa EASA/AESA.</li>
          </ul>

          <p className="mt-6 text-gray-700 dark:text-gray-300">
            Ya seas una empresa audiovisual que busca registrar vuelos urbanos, una ingeniería que realiza inspecciones técnicas, o una administración pública con proyectos de monitoreo aéreo, nuestras herramientas se adaptan a tus flujos de trabajo para ofrecer una <strong>gestión más eficiente, segura y rentable</strong>.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-8">Nuestras soluciones</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Link href="/soluciones/skai-permit" className="block group">
              <Card className="h-full dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="p-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <Image src="/images/skai-permit-logo.jpg" alt="SkAi Permit" width={40} height={40} className="rounded" />
                    <h3 className="text-xl font-semibold">SkAi Permit</h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    Automatiza la obtención de permisos y coordinaciones necesarias para volar en España. Dinos cuándo, dónde y con qué dron; el sistema gestiona el resto.
                  </p>
                  <span className="text-blue-600 dark:text-blue-400 font-medium group-hover:underline">Ver más →</span>
                </CardContent>
              </Card>
            </Link>

          </div>
        </section>

        {/* Consultoría (genérico) */}
        <section>
          <h1 className="text-4xl font-bold mb-6">Consultoría especializada en drones en España</h1>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            Además del desarrollo de software, ofrecemos servicios de consultoría estratégica y técnica para empresas que desean incorporar drones en sus operaciones o mejorar su desempeño actual.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2">Servicios de consultoría</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li><strong>Asesoramiento normativo:</strong> Guía completa sobre cumplimiento con EASA, AESA, STS, categorías A1/A3, U-Space, y marcos de operación específicos.</li>
            <li><strong>Diseño de operaciones:</strong> Ayuda para estructurar operaciones BVLOS, vuelos automáticos, integración con sensores y payloads especializados.</li>
            <li><strong>Estudios técnicos:</strong> Informes de viabilidad, análisis de riesgos (SORA), evaluaciones de rendimiento y adaptación tecnológica de flotas.</li>
          </ul>

          <p className="mt-6 text-gray-700 dark:text-gray-300">
            Contamos con un equipo multidisciplinar con experiencia en aviación, normativa europea, integración de sistemas y tecnologías UAS, lo que nos permite ofrecer soluciones de <strong>alto valor añadido</strong> tanto para el sector privado como institucional.
          </p>
        </section>

        {/* SkAi Permit Intro */}
        <section>
          <h1 className="text-4xl font-bold mb-6">Automatización de permisos: SkAi Permit</h1>
          <p className="text-gray-700 dark:text-gray-300">
            SkAi Permit simplifica la coordinación con múltiples organismos para operar de forma legal y segura. 
            La herramienta obtiene de manera automática las autorizaciones y te entrega un paquete listo para volar con consciencia situacional del entorno.
          </p>
          <div className="mt-4">
            <Link href="/soluciones/skai-permit" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
              Conoce SkAi Permit →
            </Link>
          </div>
        </section>

        {/* Beneficios SkAi Permit (clave) */}
        <section className="grid gap-6 md:grid-cols-1 items-start">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">¿Por qué SkAi Permit?</h2>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li className="flex items-start"><CheckCircle className="mr-2 text-green-600" />Automatiza permisos y coordinaciones multi-entidad</li>
              <li className="flex items-start"><CheckCircle className="mr-2 text-green-600" />Reduce tiempos y elimina fricción burocrática</li>
              <li className="flex items-start"><CheckCircle className="mr-2 text-green-600" />Consciencia situacional del entorno operacional</li>
              <li className="flex items-start"><CheckCircle className="mr-2 text-green-600" />Cumplimiento normativo asegurado</li>
            </ul>
          </div>

        </section>


        {/* Banner CTA dual */}
        <section className="w-full flex flex-col md:flex-row items-center gap-6 h-auto md:min-h-[420px] bg-[rgb(234,247,255)] dark:bg-slate-800 rounded-xl p-8">
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
              Elige la solución que encaja contigo
            </h2>
            <p className="mt-3 text-lg text-gray-700 dark:text-gray-300">
              Optimiza tus operaciones: automatiza permisos con <strong>SkAi Permit</strong>.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">

              <Link href="/soluciones/skai-permit" className="px-6 py-3 rounded border border-slate-300 text-slate-900 hover:bg-slate-50 dark:text-gray-100 dark:border-gray-700 dark:hover:bg-gray-800/60">
                Ver SkAi Permit
              </Link>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex items-center justify-center p-4">
            <Image
              src="/images/banner_uas.png"
              alt="Vista soluciones"
              width={450}
              height={90}
              className="max-w-full h-auto object-contain"
            />
          </div>
        </section>

        {/* Cards (genérico de capacidades) */}
        <section className="grid md:grid-cols-2 gap-8">
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="space-y-4 p-6">
              <div className="flex items-center space-x-3">
                <Package className="text-orange-500" />
                <h3 className="text-xl font-semibold">Control de Flota</h3>
              </div>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start"><CheckCircle className="text-green-600 mr-2" />Seguimiento en tiempo real de cada dron</li>
                <li className="flex items-start"><CheckCircle className="text-green-600 mr-2" />Alertas automáticas para mantenimiento</li>
                <li className="flex items-start"><CheckCircle className="text-green-600 mr-2" />Reducción de tiempos de inactividad</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="space-y-4 p-6">
              <div className="flex items-center space-x-3">
                <ClipboardCheck className="text-blue-600" />
                <h3 className="text-xl font-semibold">Control de Operaciones</h3>
              </div>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start"><CheckCircle className="text-green-600 mr-2" />Registro de vuelos manual o automático</li>
                <li className="flex items-start"><CheckCircle className="text-green-600 mr-2" />Documentación organizada y accesible</li>
                <li className="flex items-start"><CheckCircle className="text-green-600 mr-2" />Preparado para auditorías sin complicaciones</li>
              </ul>
            </CardContent>
          </Card>
          <br></br>
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

export default SolucionesPage;
