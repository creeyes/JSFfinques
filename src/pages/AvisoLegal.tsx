export default function AvisoLegal() {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-primary pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <span className="inline-block px-4 py-1.5 mb-6 bg-white/10 text-primary-fixed border border-white/10 rounded-full text-[10px] md:text-xs tracking-widest uppercase font-bold">
            Legal
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white font-headline leading-tight">
            Aviso Legal
          </h1>
          <p className="mt-4 text-white/70 text-sm md:text-base">
            Última actualización: enero de 2025
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 md:px-8 py-16 md:py-24">
        <div className="space-y-12">

          <Section title="1. Datos identificativos">
            <p>En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se facilitan a continuación los datos identificativos del titular de este sitio web:</p>
            <InfoBlock items={[
              ['Denominación', 'JSF Finques'],
              ['Actividad', 'Agencia Inmobiliaria'],
              ['Domicilio', 'C/ Prat de la Riba, 10, Martorell'],
              ['Número AICAT', '8394'],
              ['Número P.J.I', '0516'],
              ['Correo electrónico', 'jsfinques@gmail.com'],
            ]} />
          </Section>

          <Section title="2. Objeto y ámbito de aplicación">
            <p>El presente Aviso Legal regula el acceso y uso del sitio web de JSF Finques (en adelante, "el Sitio Web"), así como los contenidos y servicios disponibles en él. El acceso al Sitio Web implica la aceptación plena y sin reservas de las presentes condiciones.</p>
            <p>JSF Finques se reserva el derecho a modificar el presente Aviso Legal en cualquier momento, siendo responsabilidad del usuario su consulta periódica.</p>
          </Section>

          <Section title="3. Propiedad intelectual e industrial">
            <p>Todos los contenidos del Sitio Web —incluyendo textos, fotografías, gráficos, imágenes, iconos, tecnología, software, enlaces y demás contenidos audiovisuales— son titularidad de JSF Finques o de terceros que han autorizado su uso, y están protegidos por la legislación española e internacional sobre propiedad intelectual e industrial.</p>
            <p>Queda expresamente prohibida la reproducción, distribución, comunicación pública, transformación o cualquier otra forma de explotación, total o parcial, de los contenidos de este Sitio Web sin la autorización previa y expresa por escrito de JSF Finques.</p>
          </Section>

          <Section title="4. Condiciones de uso">
            <p>El usuario se compromete a hacer un uso adecuado y lícito del Sitio Web y de sus contenidos, de conformidad con la legislación vigente, las presentes condiciones y las buenas costumbres. En particular, el usuario se abstendrá de:</p>
            <ul>
              <li>Utilizar el Sitio Web con fines fraudulentos, ilegales o contrarios al orden público.</li>
              <li>Difundir contenidos o propaganda de carácter racista, xenófobo, pornográfico o que atente contra los derechos humanos.</li>
              <li>Introducir virus informáticos, código malicioso o cualquier otro sistema que pueda dañar o alterar los sistemas informáticos de JSF Finques o de terceros.</li>
              <li>Intentar acceder, modificar o borrar datos a los que no tiene autorización.</li>
            </ul>
          </Section>

          <Section title="5. Exclusión de responsabilidad">
            <p>JSF Finques no garantiza la inexistencia de interrupciones o errores en el acceso al Sitio Web o en sus contenidos, ni que estos se encuentren actualizados. JSF Finques queda exonerada de cualquier responsabilidad derivada de:</p>
            <ul>
              <li>La falta de disponibilidad, mantenimiento y efectivo funcionamiento del Sitio Web.</li>
              <li>Los daños producidos por el uso inadecuado del Sitio Web por parte del usuario.</li>
              <li>Los contenidos de sitios web de terceros a los que se pueda acceder mediante enlaces desde este Sitio Web.</li>
              <li>Actos realizados por terceros que vulneren sistemas informáticos o documentos del Sitio Web.</li>
            </ul>
          </Section>

          <Section title="6. Enlaces a terceros">
            <p>El Sitio Web puede contener enlaces a páginas web de terceros. JSF Finques no tiene control sobre dichos sitios ni se hace responsable de sus contenidos, políticas de privacidad o prácticas. La inclusión de cualquier enlace no implica recomendación ni asociación con el sitio enlazado.</p>
          </Section>

          <Section title="7. Legislación aplicable y jurisdicción">
            <p>El presente Aviso Legal se rige por la legislación española. Para la resolución de cualquier controversia derivada del acceso o uso del Sitio Web, las partes se someten a los Juzgados y Tribunales de Barcelona, con renuncia expresa a cualquier otro fuero que pudiera corresponderles.</p>
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

function InfoBlock({ items }: { items: [string, string][] }) {
  return (
    <div className="mt-4 rounded-2xl border border-surface-container-low bg-slate-50 overflow-hidden">
      {items.map(([label, value]) => (
        <div key={label} className="flex flex-col sm:flex-row sm:items-center px-6 py-4 border-b border-surface-container-low last:border-0">
          <span className="text-xs font-bold uppercase tracking-widest text-primary w-40 shrink-0 mb-1 sm:mb-0">{label}</span>
          <span className="text-secondary text-sm">{value}</span>
        </div>
      ))}
    </div>
  );
}
