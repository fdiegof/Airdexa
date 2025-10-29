'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Package, ClipboardCheck } from 'lucide-react';

const JustflierPage: React.FC = () => {
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
          <Link href="/soluciones" className="font-bold text-gray-900 dark:text-gray-100">Soluciones</Link>
          <Link href="/sobrenosotros" className="font-bold text-gray-900 dark:text-gray-100">Sobre Nosotros</Link>
          <Link href="/#footer" className="font-bold text-gray-900 dark:text-gray-100">Contacto</Link>
          <Link href="/blog" className="font-bold text-gray-900 dark:text-gray-100">Noticias</Link>
        </nav>

        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="focus:outline-none">
            <svg
              className="w-6 h-6 text-gray-900 dark:text-gray-100"
              fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
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

      {/* Main */}
      <main className="pt-40 px-6 max-w-6xl mx-auto space-y-20">
        {/* Hero / Banner */}
        <section className="w-full flex flex-col md:flex-row items-center gap-6 bg-[rgb(234,247,255)] dark:bg-slate-800 rounded-xl p-8 overflow-hidden">
          <div className="w-full md:w-1/2 flex flex-col justify-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100">
              Justflier: gestión integral de flotas y operaciones UAS
            </h1>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300">
              Centraliza aeronaves, pilotos, documentación, mantenimiento y registros de vuelo en una sola plataforma. 
              Trazabilidad, eficiencia y cumplimiento sin fricción.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="mailto:gestion@airdexa.com?subject=Información%20Justflier&body=Me%20gustaría%20obtener%20más%20información%20sobre%20Justflier"
                className="px-6 py-3 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Solicita una demo por email
              </a>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              ¿Buscas automatizar permisos? Conoce <Link href="/soluciones/skai-permit" className="underline hover:text-blue-600 dark:hover:text-blue-400">SkAi Permit</Link>.
            </p>
          </div>
          <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12">
            <Image
              src="/images/banner_uas.png"
              alt="Vista de la plataforma Justflier"
              width={560}
              height={320}
              className="max-w-full h-auto object-contain"
            />
          </div>
        </section>

        {/* Qué resuelve */}
        <section>
          <h2 className="text-3xl font-bold mb-4">Todo lo que necesitas para operar con rigor</h2>
          <p className="text-gray-700 dark:text-gray-300">
            Justflier reemplaza hojas de cálculo y procesos manuales por flujos centralizados y auditables. 
            Está pensado para empresas que necesitan control en tiempo real, alertas proactivas y una capa de cumplimiento lista para auditoría.
          </p>
        </section>

        {/* Módulos clave */}
        <section className="grid md:grid-cols-2 gap-8">
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="space-y-4 p-6">
              <div className="flex items-center space-x-3">
                <Package className="text-orange-500" />
                <h3 className="text-xl font-semibold">Inventario y mantenimiento</h3>
              </div>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start"><CheckCircle className="text-green-600 mr-2" />Ficha técnica de cada dron y payload</li>
                <li className="flex items-start"><CheckCircle className="text-green-600 mr-2" />Plan de mantenimiento y alertas por horas/ciclos</li>
                <li className="flex items-start"><CheckCircle className="text-green-600 mr-2" />Histórico de incidencias y reparaciones</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="space-y-4 p-6">
              <div className="flex items-center space-x-3">
                <ClipboardCheck className="text-blue-600" />
                <h3 className="text-xl font-semibold">Operaciones y cumplimiento</h3>
              </div>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start"><CheckCircle className="text-green-600 mr-2" />Registro de vuelos (manual o automático)</li>
                <li className="flex items-start"><CheckCircle className="text-green-600 mr-2" />Gestión documental (manuales, seguros, STS, licencias)</li>
                <li className="flex items-start"><CheckCircle className="text-green-600 mr-2" />Preparado para auditorías con trazabilidad completa</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Planificación y pilotos */}
        <section className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">Planificación de vuelos y gestión de pilotos</h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li className="flex items-start"><CheckCircle className="text-green-600 mr-2" />Calendario de misiones con asignación de recursos</li>
              <li className="flex items-start"><CheckCircle className="text-green-600 mr-2" />Control de licencias y vencimientos de pilotos</li>
              <li className="flex items-start"><CheckCircle className="text-green-600 mr-2" />Checklists operacionales y bitácoras</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300">
              ¿Necesitas también automatizar permisos y coordinaciones externas? 
              Combina Justflier con <Link href="/soluciones/skai-permit" className="underline hover:text-blue-600 dark:hover:text-blue-400">SkAi Permit</Link>.
            </p>
          </div>
          <Image
            src="/images/mockuper.png"
            alt="Planificación Justflier"
            width={420}
            height={240}
            className="w-full max-w-lg h-auto object-contain"
          />
        </section>
        <br></br>
        {/* CTA */}
        {/* <section className="w-full flex flex-col md:flex-row items-center gap-6 bg-[rgb(234,247,255)] dark:bg-slate-800 rounded-xl p-8">
          <div className="w-full md:w-2/3">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
              Lleva el control de tu flota al siguiente nivel
            </h2>
            <p className="mt-3 text-lg text-gray-700 dark:text-gray-300">
              Pide una demo o habla con un especialista para adaptar Justflier a tus procesos.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link href="/#footer" className="px-6 py-3 rounded bg-blue-600 text-white hover:bg-blue-700">
                Solicitar demo
              </Link>
              <a
                href="mailto:gestion@airdexa.com?subject=Información%20Justflier&body=Me%20gustaría%20obtener%20más%20información%20sobre%20Justflier"
                className="px-6 py-3 rounded border border-slate-300 text-slate-900 hover:bg-slate-50 dark:text-gray-100 dark:border-gray-700 dark:hover:bg-gray-800/60"
              >
                Hablar con un especialista
              </a>
            </div>
          </div>
          <div className="w-full md:w-1/3 flex items-center justify-center p-4">
            <Image
              src="/images/banner_uas.png"
              alt="Vista Justflier"
              width={380}
              height={200}
              className="max-w-full h-auto object-contain"
            />
          </div>
        </section> */}
      </main>

      {/* Footer (reutiliza el global si lo tienes en layout) */}
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

export default JustflierPage;
