export default function Cookies() {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-primary pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <span className="inline-block px-4 py-1.5 mb-6 bg-white/10 text-primary-fixed border border-white/10 rounded-full text-[10px] md:text-xs tracking-widest uppercase font-bold">
            Legal
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white font-headline leading-tight">
            Política de Cookies
          </h1>
          <p className="mt-4 text-white/70 text-sm md:text-base">
            Última actualización: enero de 2025
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 md:px-8 py-16 md:py-24">
        <div className="space-y-12">

          <Section title="1. ¿Qué son las cookies?">
            <p>Las cookies son pequeños archivos de texto que los sitios web almacenan en el dispositivo del usuario cuando este los visita. Permiten que el sitio web recuerde información sobre su visita, como su idioma preferido y otras opciones, con el fin de facilitar su próxima visita y hacer el sitio más útil.</p>
          </Section>

          <Section title="2. Tipos de cookies que utilizamos">
            <p>El sitio web de JSF Finques utiliza los siguientes tipos de cookies:</p>

            <CookieTable cookies={[
              {
                nombre: 'Cookies técnicas',
                finalidad: 'Necesarias para el correcto funcionamiento del sitio web. Permiten navegar por la página y utilizar sus funciones básicas.',
                duracion: 'Sesión',
                gestion: 'Propias',
              },
              {
                nombre: 'Cookies de preferencias',
                finalidad: 'Permiten recordar información que cambia el aspecto o comportamiento del sitio web, como el idioma preferido.',
                duracion: '1 año',
                gestion: 'Propias',
              },
              {
                nombre: 'Cookies analíticas',
                finalidad: 'Permiten cuantificar el número de usuarios y analizar la navegación para mejorar el servicio ofrecido.',
                duracion: '2 años',
                gestion: 'Terceros (Google Analytics)',
              },
            ]} />
          </Section>

          <Section title="3. Cookies de terceros">
            <p>Este sitio web puede utilizar servicios de terceros que instalan cookies en nombre de JSF Finques. Los principales servicios de terceros son:</p>
            <ul>
              <li><strong>Google Analytics:</strong> herramienta de análisis web de Google LLC que permite medir el comportamiento de los usuarios. Para más información, consulte la <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:opacity-70">Política de Privacidad de Google</a>.</li>
              <li><strong>Google Maps:</strong> servicio de mapas integrado para facilitar la localización de nuestra oficina. Sujeto a la <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:opacity-70">Política de Privacidad de Google</a>.</li>
            </ul>
          </Section>

          <Section title="4. Consentimiento y gestión de cookies">
            <p>Al acceder por primera vez al sitio web, se le mostrará un aviso informativo sobre el uso de cookies. Puede aceptar, rechazar o personalizar las cookies no esenciales a través del panel de configuración disponible en dicho aviso.</p>
            <p>En cualquier momento puede retirar su consentimiento o modificar sus preferencias accediendo a la configuración de su navegador. A continuación, le indicamos cómo hacerlo en los navegadores más habituales:</p>
            <ul>
              <li><strong>Google Chrome:</strong> Configuración → Privacidad y seguridad → Cookies y otros datos de sitios.</li>
              <li><strong>Mozilla Firefox:</strong> Opciones → Privacidad y seguridad → Cookies y datos del sitio.</li>
              <li><strong>Safari:</strong> Preferencias → Privacidad → Gestionar datos de sitios web.</li>
              <li><strong>Microsoft Edge:</strong> Configuración → Privacidad, búsqueda y servicios → Cookies.</li>
            </ul>
            <p>Tenga en cuenta que deshabilitar determinadas cookies puede afectar a la funcionalidad y experiencia de uso del sitio web.</p>
          </Section>

          <Section title="5. Actualización de la política de cookies">
            <p>JSF Finques puede actualizar la presente Política de Cookies en función de cambios legislativos o de los servicios ofrecidos. Se recomienda revisar esta página periódicamente para estar informado de posibles modificaciones.</p>
          </Section>

          <Section title="6. Contacto">
            <p>Si tiene cualquier duda acerca del uso de cookies en nuestro sitio web, puede ponerse en contacto con nosotros a través de <strong>jsfinques@gmail.com</strong> o en nuestra oficina en C/ Prat de la Riba, 10, Martorell.</p>
          </Section>

        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-surface-container-low pb-12">
      <h2 className="text-xl md:text-2xl font-bold text-primary font-headline mb-6">{title}</h2>
      <div className="text-secondary text-sm md:text-base leading-relaxed space-y-4">
        {children}
      </div>
    </div>
  );
}

interface Cookie {
  nombre: string;
  finalidad: string;
  duracion: string;
  gestion: string;
}

function CookieTable({ cookies }: { cookies: Cookie[] }) {
  return (
    <div className="mt-4 rounded-2xl border border-surface-container-low overflow-hidden">
      <div className="hidden md:grid grid-cols-4 bg-primary px-6 py-3">
        {['Tipo', 'Finalidad', 'Duración', 'Gestión'].map(h => (
          <span key={h} className="text-xs font-bold uppercase tracking-widest text-white/80">{h}</span>
        ))}
      </div>
      {cookies.map((c, i) => (
        <div key={i} className="md:grid md:grid-cols-4 px-6 py-5 border-b border-surface-container-low last:border-0 bg-white hover:bg-slate-50 transition-colors space-y-2 md:space-y-0">
          <span className="font-semibold text-primary text-sm">{c.nombre}</span>
          <span className="text-secondary text-sm md:pr-4">{c.finalidad}</span>
          <span className="text-secondary text-sm">{c.duracion}</span>
          <span className="text-secondary text-sm">{c.gestion}</span>
        </div>
      ))}
    </div>
  );
}
