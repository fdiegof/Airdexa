import React, { useState } from 'react';

const ContactForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(null);

    if (!acceptedPrivacy) {
      setStatus("Debes aceptar la política de privacidad antes de enviar el formulario.");
      return;
    }

    const data = { name, email, message };

    try {
      const apiUrl = process.env.NEXT_PUBLIC_CONTACT_API_URL;
      if (!apiUrl) {
        throw new Error('Environment variable NEXT_PUBLIC_CONTACT_API_URL is not defined.');
      }

      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        setStatus("¡Mensaje enviado!");
        setName('');
        setEmail('');
        setMessage('');
        setAcceptedPrivacy(false);
      } else {
        setStatus(result.error || "Error al enviar el mensaje. Inténtalo más tarde o envía un correo a gestion@airdexa.com");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("Error al enviar el mensaje.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <textarea
          placeholder="Mensaje"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>
      <div className="flex items-start gap-2">
        <input
          type="checkbox"
          id="privacy"
          checked={acceptedPrivacy}
          onChange={(e) => setAcceptedPrivacy(e.target.checked)}
          className="mt-1"
        />
        <label htmlFor="privacy" className="text-white text-sm">
          He leído y acepto la{' '}
          <a href="/terminos" target="_blank" className="underline text-blue-400">
            Política de Privacidad
          </a>.
        </label>
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 transition">
        Enviar
      </button>
      {status && <p className="mt-2 text-white">{status}</p>}
    </form>
  );
};

export default ContactForm;
