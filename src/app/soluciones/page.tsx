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
    <div className="relative min-h-screen bg-white text-gray-800">
      {/* Header */}
      <header className="absolute top-0 left-0 w-full z-20 flex items-center justify-between p-6 bg-transparent">
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
          <Link href="/soluciones" className="text-red font-bold">Soluciones</Link>
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          {isMobileMenuOpen && (
            <div className="absolute top-16 right-6 bg-black bg-opacity-75 p-4 rounded">
              <ul className="flex flex-col space-y-4">
                <li><Link href="/soluciones" onClick={toggleMobileMenu} className="text-white font-bold">Soluciones</Link></li>
                <li><Link href="/sobrenosotros" onClick={toggleMobileMenu} className="text-white font-bold">Sobre nosotros</Link></li>
                <li><Link href="/#footer" onClick={toggleMobileMenu} className="text-white font-bold">Contacto</Link></li>
                <li><Link href="/blog" onClick={toggleMobileMenu} className="text-white font-bold">Noticias</Link></li>
              </ul>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-40 px-6 max-w-6xl mx-auto space-y-20">
        {/* Gestión de Flotas */}
        <section>
          <h1 className="text-4xl font-bold mb-6">Soluciones a medida para la gestión de flotas de drones</h1>
          <p className="mb-4">
            En <strong>Airdexa</strong>, desarrollamos herramientas personalizadas que permiten a operadores y empresas gestionar de forma integral sus flotas de drones. Estas soluciones se ajustan a los procesos internos de cada cliente, garantizando eficiencia, trazabilidad y cumplimiento normativo.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2">Características principales</h2>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Mantenimiento y trazabilidad:</strong> Registro detallado de inspecciones, reparaciones y ciclos de vida de cada aeronave, con alertas automáticas para tareas programadas.</li>
            <li><strong>Planificación de vuelos:</strong> Calendario integrado con seguimiento de misiones, áreas de operación y asignación de pilotos certificados.</li>
            <li><strong>Gestión documental:</strong> Almacenamiento seguro de manuales, seguros, certificados STS y otros documentos exigidos por la normativa EASA/AESA.</li>
          </ul>

          <p className="mt-6">
            Ya seas una empresa audiovisual que busca registrar vuelos urbanos, una ingeniería que realiza inspecciones técnicas, o una administración pública con proyectos de monitoreo aéreo, nuestras herramientas se adaptan a tus flujos de trabajo para ofrecer una <strong>gestión más eficiente, segura y rentable</strong>.
          </p>
        </section>

        <section>
          <h1 className="text-4xl font-bold mb-6">Consultoría especializada en drones en España</h1>
          <p className="mb-4">
            Además del desarrollo de software, ofrecemos servicios de consultoría estratégica y técnica para empresas que desean incorporar drones en sus operaciones o mejorar su desempeño actual.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2">Servicios de consultoría</h2>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Asesoramiento normativo:</strong> Guía completa sobre cumplimiento con EASA, AESA, STS, categorías A1/A3, U-Space, y marcos de operación específicos.</li>
            <li><strong>Diseño de operaciones:</strong> Ayuda para estructurar operaciones BVLOS, vuelos automáticos, integración con sensores y payloads especializados.</li>
            <li><strong>Estudios técnicos:</strong> Informes de viabilidad, análisis de riesgos (SORA), evaluaciones de rendimiento y adaptación tecnológica de flotas.</li>
          </ul>

          <p className="mt-6">
            Contamos con un equipo multidisciplinar con experiencia en aviación, normativa europea, integración de sistemas y tecnologías UAS, lo que nos permite ofrecer soluciones de <strong>alto valor añadido</strong> tanto para el sector privado como institucional.
          </p>
        </section>
        <section>
        <h1 className="text-4xl font-bold mb-6">Herramienta de gestión de flotas para empresas</h1>
        <p>Justflier es la solución integral que tu empresa necesita para gestionar de forma ágil y segura todo el ciclo de vida de sus operaciones con drones. Olvídate de hojas de cálculo dispersas y de procesos manuales que consumen tiempo: con nuestra plataforma web tendrás, en un mismo entorno, un inventario detallado de cada unidad aérea, un registro completo de las certificaciones de tus pilotos y un histórico exhaustivo de cada vuelo. Gracias a su arquitectura modular y a sus paneles de control personalizables, Justflier se adapta a tus necesidades presentes y escala sin complicaciones a medida que tu flota crece.</p>
        </section>

        {/* Justflier Beneficios Clave */}
        <section className="grid gap-6 md:grid-cols-2 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">¿Por qué Justflier?</h2>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start"><CheckCircle className="text-green-600 mr-2" />Gestión centralizada desde una única plataforma</li>
              <li className="flex items-start"><CheckCircle className="text-green-600 mr-2" />Ahorro de tiempo y reducción de errores operativos</li>
              <li className="flex items-start"><CheckCircle className="text-green-600 mr-2" />Cumplimiento normativo sin esfuerzo</li>
              <li className="flex items-start"><CheckCircle className="text-green-600 mr-2" />Escalable según el crecimiento de tu flota</li>
            </ul>
          </div>
            <Image
              src="/images/mockuper.png"
              alt="Tool Mockup"
              width='350'
              height='60'
              className="w-full max-w-md md:max-w-lg h-auto"
            />
        </section>

        <section className="w-full flex flex-col md:flex-row h-auto md:h-[600px] bg-[rgb(234,247,255)]">

          <div className="w-full md:w-1/2 flex flex-col justify-center px-8 py-12 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Simplifica la gestión de tu flota de drones
            </h1>
            <p className="text-lg md:text-xl text-gray-700">
              La plataforma integral para planificar, supervisar y escalar tus operaciones aéreas con eficiencia y confianza.
            </p>
            <Link href="/#footer" className="text-lg px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 w-fit">
              Solicita una demo
            </Link>
          </div>

          <div className="w-full md:w-1/2 flex items-center justify-center p-4">
            <Image
              src="/images/banner_uas.png"
              alt="Vista de la plataforma Justflier"
              width='450'
              height='90'
              className="max-w-full h-auto object-contain"
            />
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardContent className="space-y-4 p-6">
              <div className="flex items-center space-x-3">
                <Package className="text-orange-500" />
                <h3 className="text-xl font-semibold">Control de Flota</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start"><CheckCircle className="text-green-600 mr-2" />Seguimiento en tiempo real de cada dron</li>
                <li className="flex items-start"><CheckCircle className="text-green-600 mr-2" />Alertas automáticas para mantenimiento</li>
                <li className="flex items-start"><CheckCircle className="text-green-600 mr-2" />Reducción de tiempos de inactividad</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-4 p-6">
              <div className="flex items-center space-x-3">
                <ClipboardCheck className="text-blue-600" />
                <h3 className="text-xl font-semibold">Control de Operaciones</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start"><CheckCircle className="text-green-600 mr-2" />Registro de vuelos manual o automático</li>
                <li className="flex items-start"><CheckCircle className="text-green-600 mr-2" />Documentación organizada y accesible</li>
                <li className="flex items-start"><CheckCircle className="text-green-600 mr-2" />Preparado para auditorías sin complicaciones</li>
              </ul>
            </CardContent>
          </Card>
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

export default SolucionesPage;
