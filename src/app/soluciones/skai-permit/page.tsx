"use client";
import React, { useState } from "react";
import { CheckCircle, Clock, Shield, Map, ChevronRight, Rocket, Paperclip, Sparkles } from "lucide-react";

import Link from 'next/link';
import Image from 'next/image';

/* ---------------- UI PRIMITIVES (local) ---------------- */

type BtnVariant = "default" | "outline" | "ghost" | "secondary";
type BtnSize = "sm" | "md" | "lg";

export function Button({
  className = "",
  variant = "default",
  size = "md",
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: BtnVariant; size?: BtnSize }) {
  const base = "inline-flex items-center justify-center rounded-2xl font-medium transition border border-transparent disabled:opacity-60 disabled:cursor-not-allowed";
  const sizes: Record<BtnSize, string> = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-5 text-base",
  };
  const variants: Record<BtnVariant, string> = {
    default: "bg-sky-600 text-white hover:bg-sky-700 shadow",
    outline: "bg-white text-slate-800 border-slate-200 hover:bg-slate-50 dark:bg-transparent dark:text-gray-100 dark:border-gray-700 dark:hover:bg-gray-800/60",
    ghost: "bg-transparent text-slate-700 hover:bg-slate-100 dark:text-gray-100 dark:hover:bg-gray-800/60",
    secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700",
  };
  return (
    <button className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

export function Card({ className = "", children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-white shadow-sm dark:bg-gray-800 dark:border-gray-700 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className = "", children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`p-6 pb-2 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardContent({ className = "", children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`p-6 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className = "", children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={`font-semibold text-slate-900 dark:text-gray-100 ${className}`} {...props}>
      {children}
    </h3>
  );
}

export function Badge({
  className = "",
  variant = "default",
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { variant?: "default" | "outline" | "secondary" }) {
  const variants = {
    default: "bg-sky-600 text-white",
    outline: "border border-slate-300 text-slate-700 dark:border-gray-600 dark:text-gray-200",
    secondary: "bg-slate-100 text-slate-800 dark:bg-gray-700 dark:text-gray-100",
  } as const;
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${variants[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
}
/* ------------------------------------------------------- */

// Nota: utiliza la clase `dark` en <html> (p.ej. con next-themes) para activar el modo oscuro.
export default function SkAiPermitLanding() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);

  return (
    <div className="relative min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      {/* Navbar */}
      <header className="absolute top-0 left-0 w-full z-30 flex items-center justify-between p-6
  bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-slate-200/60">
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
            <div className="absolute top-16 right-6 bg-black/80 dark:bg-gray-900/90 p-4 rounded-lg border border-white/10">
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

    {/* Banner (CTA) – coherent with containerized sections */}
    <section className="pt-28 md:pt-32 w-full bg-sky-50 dark:bg-slate-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 items-center min-h-[520px] md:min-h-[560px] overflow-hidden">
        <div className="flex flex-col justify-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-gray-100">
            Simplifica la gestión de tus permisos de vuelo
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-gray-300">
            Dinos <strong>cuándo</strong>, <strong>dónde</strong> y con <strong>qué dron</strong> quieres volar. SkAi Permit gestiona automáticamente todas las autorizaciones y te las entrega en un solo lugar.
            </p>
            <a
            href="https://www.linkedin.com/showcase/skai-permit/"
            className="text-lg px-6 py-3 bg-sky-600 text-white hover:bg-sky-700 w-fit rounded-2xl"
            >
            Enterate de todo en nuestro LinkedIn <ChevronRight className="inline-block ml-2 h-5 w-5" />
            </a>
        </div>

        <div className="flex items-center justify-center p-6 md:p-12">
            <Image
                src="/images/skai-permit-landing.png"
                alt="Vista previa de SkAi Permit"
                width={1000}           // pon valores razonables
                height={700}           // proporción aproximada
                priority               // opcional si es hero
                className="max-w-full h-auto object-contain max-h-[400px] md:max-h-[440px] lg:max-h-[500px]"
            />
        </div>
        </div>
    </div>
    </section>


      {/* Problema */}
      <section className="py-16 bg-white dark:bg-gray-900" id="problema">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">Coordinar un vuelo nunca debería ser tan complicado</h2>
            <p className="mt-4 text-slate-600 dark:text-slate-300">
              Operar drones en España implica coordinar con múltiples organismos, cada uno con sus propios procedimientos.
              Horas invertidas en gestiones administrativas, formularios y seguimiento de normativas cambiantes generan
              incertidumbre y riesgo de incumplimiento para pilotos y operadores.
            </p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Fragmentación típica</CardTitle>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-3">
              {[
                "ENAIRE",
                "Ayuntamientos",
                "Ministerio del Interior",
                "Policia local, Nacional, Guardia Civil",
                "ADIF",
                "Y mucho más...",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <Paperclip className="h-4 w-4 mt-1 text-slate-400 dark:text-slate-300" />
                  <span className="text-sm text-slate-700 dark:text-slate-300">{item}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Solución */}
      <section className="py-16 bg-slate-50 dark:bg-gray-950/40" id="solucion">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-6 items-stretch">
            <div className="lg:col-span-1">
              <h2 className="text-2xl sm:text-3xl font-bold">Tu copiloto administrativo</h2>
              <p className="mt-4 text-slate-600 dark:text-slate-300">
                SkAi Permit automatiza la obtención de permisos. Indica <strong>quién</strong> vuela, con <strong>qué dron</strong> y <strong>dónde</strong>.
                La plataforma gestiona las autorizaciones y te las entrega directamente.
              </p>
              <div className="mt-6 space-y-3">
                <FeatureRow icon={<Clock className="h-5 w-5" />} title="Automatización total" caption="Ahorra horas de gestiones manuales" />
                <FeatureRow icon={<Shield className="h-5 w-5" />} title="Cumplimiento garantizado" caption="Vuelos 100% legales" />
                <FeatureRow icon={<Map className="h-5 w-5" />} title="Consciencia situacional" caption="Contexto completo del entorno operacional" />
              </div>
            </div>
            <div className="lg:col-span-2">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-base">Vista del proceso </CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-3 gap-4">
                  <StepCard step="1" title="Indica tu operación" caption="Cuándo, dónde y con qué dron" />
                  <StepCard step="2" title="Gestionamos permisos" caption="Coordinación con entidades requeridas" />
                  <StepCard step="3" title="Recibe autorizaciones" caption="Todo centralizado en tu panel" />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Valor añadido */}
      <section className="py-16 bg-white dark:bg-gray-900" id="valor">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            <ValueCard icon={<Rocket className="h-5 w-5" />} title="Menos fricción, más vuelo" caption="Libera tiempo operativo y acelera entregas." />
            <ValueCard icon={<Sparkles className="h-5 w-5" />} title="Actualizado siempre" caption="Nos adaptamos a cambios normativos." />
            <ValueCard icon={<CheckCircle className="h-5 w-5" />} title="Control documental" caption="Licencias, vencimientos y trazabilidad." />
          </div>
        </div>
      </section>

      {/* Testimonios / Casos de uso */}
      {/* <section className="py-16 bg-slate-50 dark:bg-gray-950/40" id="casos">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { quote: "Antes pasábamos días gestionando autorizaciones; ahora en minutos tenemos todo listo.", author: "Operador profesional, Madrid" },
              { quote: "Nos aporta tranquilidad y rigor en cada operación.", author: "Empresa audiovisual, Barcelona" },
              { quote: "Centraliza permisos y documentación: menos errores, más seguridad.", author: "Topógrafo, Sevilla" },
            ].map((t, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <p className="text-slate-700 dark:text-slate-300 italic">“{t.quote}”</p>
                  <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">— {t.author}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA Final */}
      <section className="py-16 bg-white dark:bg-gray-900" id="contacto">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-to-r from-sky-600 to-sky-500 text-white border-none dark:from-sky-700 dark:to-sky-600">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-6 items-center">
                <div>
                  <h3 className="text-2xl font-bold">Simplifica tus operaciones aéreas hoy mismo</h3>
                  <p className="mt-2 text-sky-50">Empieza a ahorrar tiempo y garantiza tus vuelos legales con SkAi Permit.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-end">

                <a
                    href="mailto:gestion@airdexa.com?subject=Información%20SkAi%20Permit&body=Me%20gustaría%20obtener%20más%20información%20sobre%20SkAi%20Permit"
                    className="inline-flex items-center justify-center rounded-2xl font-medium transition border border-transparent bg-white text-sky-700 hover:bg-slate-100 dark:bg-gray-100 dark:text-sky-800 dark:hover:bg-white h-12 px-5 text-base"
                >
                    Hablar con un especialista (email)
                </a>
                </div>

              </div>
            </CardContent>
          </Card>
        </div>
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
}

function FeatureRow({ icon, title, caption }: { icon: React.ReactNode; title: string; caption: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-1 text-sky-700 dark:text-sky-400">{icon}</div>
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-slate-600 dark:text-slate-300">{caption}</p>
      </div>
    </div>
  );
}

function StepCard({ step, title, caption }: { step: string; title: string; caption: string }) {
  return (
    <Card className="border-slate-200 dark:border-gray-700">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <Badge variant="outline">Paso {step}</Badge>
        </div>
        <h4 className="mt-3 font-semibold text-slate-900 dark:text-gray-100">{title}</h4>
        <p className="text-sm text-slate-600 dark:text-slate-300">{caption}</p>
      </CardContent>
    </Card>
  );
}

function ValueCard({ icon, title, caption }: { icon: React.ReactNode; title: string; caption: string }) {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center gap-3 pb-2">
        <div className="text-sky-700 dark:text-sky-400">{icon}</div>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-slate-600 dark:text-slate-300">{caption}</p>
      </CardContent>
    </Card>
  );
}
