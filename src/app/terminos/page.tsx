'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image'

const TerminosPage: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  return (
    <div className="relative min-h-screen bg-white text-gray-800">
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
          <Link href="/#footer" className="text-black font-bold">Contacto</Link>
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          {isMobileMenuOpen && (
            <div className="absolute top-16 right-6 bg-white border p-4 rounded shadow">
              <ul className="flex flex-col space-y-4">
                <li>
                  <Link href="/soluciones" onClick={toggleMobileMenu} className="text-black font-bold">Soluciones</Link>
                </li>
                <li>
                  <Link href="/sobrenosotros" onClick={toggleMobileMenu} className="text-black font-bold">Sobre Nosotros</Link>
                </li>
                <li>
                  <Link href="/#footer" onClick={toggleMobileMenu} className="text-black font-bold">Contacto</Link>
                </li>
                <li>
                  <Link href="/blog" onClick={toggleMobileMenu} className="text-black font-bold">Noticias</Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </header>

      {/* Content */}
      <main className="pt-40 px-6 max-w-6xl mx-auto space-y-20">
        <section className="space-y-6">
          <h2 className="text-4xl font-bold mb-6">Política de Privacidad</h2>

          <h3 className="text-2xl font-bold mb-3">Responsable del Tratamiento de Datos</h3>
          <p>
            El responsable del tratamiento de los datos personales recogidos en este sitio web es el Administrador del sitio web (en adelante, “nosotros” o “el Sitio Web”), operando desde España. Puede contactarnos a través del correo electrónico gestion@airdexa.com para cualquier cuestión relacionada con la privacidad o el ejercicio de sus derechos.
          </p>

          <h3 className="text-2xl font-bold mb-3">Datos Personales Recopilados</h3>
          <p>
            En este Sitio Web solo recopilamos los datos personales que usted nos proporciona de forma voluntaria a través del formulario de contacto. Dichos datos pueden incluir su nombre, dirección de correo electrónico y el mensaje o consulta que nos envíe. La facilitación de estos datos es voluntaria, lo que significa que usted no está obligado a proporcionarlos; si decide no hacerlo, podrá seguir navegando por el Sitio Web sin restricciones.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>No recopilamos datos personales automáticamente (por ejemplo, no usamos cookies para recopilar información personal) ni obtenemos datos de terceros sobre usted.</li>
          </ul>

          <h3 className="text-2xl font-bold mb-3">Finalidad del Tratamiento</h3>
          <p>
            Los datos personales que nos suministre en el formulario de contacto se utilizan exclusivamente con la finalidad de gestionar su solicitud de contacto o consulta y poder responderle. En otros términos, emplearemos su nombre, correo electrónico y mensaje únicamente para comunicarnos con usted y atender la comunicación que nos haya enviado. Sus datos no se utilizarán para fines diferentes.
          </p>

          <h3 className="text-2xl font-bold mb-3">Base Legal del Tratamiento</h3>
          <p>
            La base jurídica que nos permite tratar sus datos personales es su consentimiento libre y explícito. Al enviarnos voluntariamente el formulario de contacto con sus datos personales, usted está dando su consentimiento para que utilicemos esa información con el fin antes descrito.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Este tratamiento cumple con el RGPD, artículo 6(1)(a). Si nos escribe solicitando información sobre nuestros servicios, la base legal podría ser el artículo 6(1)(b).</li>
          </ul>

          <h3 className="text-2xl font-bold mb-3">Uso de Cookies y Tecnologías de Rastreo</h3>
          <p>Este Sitio Web no utiliza cookies ni tecnologías de rastreo para recoger información personal.</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>No se usan balizas web, píxeles de seguimiento ni herramientas de analítica de terceros.</li>
          </ul>

          <h3 className="text-2xl font-bold mb-3">Comunicación de Datos a Terceros</h3>
          <p>Sus datos personales no serán compartidos con terceros salvo obligación legal.</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Solo se divulgarán si una ley lo exige o si lo solicita una autoridad pública.</li>
          </ul>

          <h3 className="text-2xl font-bold mb-3">Conservación de los Datos</h3>
          <p>Conservaremos sus datos solo mientras gestionemos su consulta y un tiempo prudencial posterior.</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Podríamos guardar copias básicas conforme a obligaciones legales antes de eliminarlas definitivamente.</li>
          </ul>

          <h3 className="text-2xl font-bold mb-3">Seguridad de los Datos Personales</h3>
          <p>
            Aplicamos medidas técnicas y organizativas apropiadas para proteger sus datos. Esto incluye conexiones HTTPS, controles de acceso y políticas internas de confidencialidad.
          </p>

          <h3 className="text-2xl font-bold mb-3">Derechos del Usuario</h3>
          <p>De acuerdo con el RGPD, usted tiene los siguientes derechos:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Acceso a sus datos personales</li>
            <li>Rectificación de datos inexactos</li>
            <li>Supresión cuando ya no sean necesarios o retire su consentimiento</li>
            <li>Limitación del tratamiento en ciertos casos</li>
            <li>Oposición al tratamiento por intereses legítimos</li>
            <li>Portabilidad de los datos en formato estructurado</li>
          </ul>

          <h3 className="text-2xl font-bold mb-3">Ejercicio de Derechos</h3>
          <p>
            Puede ejercer sus derechos escribiendo a gestion@airdexa.com. Podríamos solicitar verificación de identidad. Se responderá en el plazo legal de 1 mes (hasta 2 en casos complejos).
          </p>

          <h3 className="text-2xl font-bold mb-3">Derecho a Presentar una Reclamación</h3>
          <p>
            Si considera que no hemos tratado adecuadamente su solicitud, puede reclamar ante la autoridad competente: Agencia Española de Protección de Datos (AEPD), mjusticia.gob.es
          </p>
          
          <ul className="list-disc pl-6 space-y-2">
            <li>Puede acudir a la AEPD para obtener más información o presentar una reclamación formal.</li>
          </ul>

          <h3 className="text-2xl font-bold mb-3">Cambios en la Política de Privacidad</h3>
          <p>
            Esta política puede actualizarse. Se publicará cualquier cambio en esta página. Le recomendamos revisarla periódicamente.
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

export default TerminosPage;
