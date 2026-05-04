export default function Privacidad() {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-primary pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <span className="inline-block px-4 py-1.5 mb-6 bg-white/10 text-primary-fixed border border-white/10 rounded-full text-[10px] md:text-xs tracking-widest uppercase font-bold">
            Legal
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white font-headline leading-tight">
            Política de Privacidad
          </h1>
          <p className="mt-4 text-white/70 text-sm md:text-base">
            Última actualización: enero de 2025
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 md:px-8 py-16 md:py-24">
        <div className="prose prose-slate max-w-none space-y-12">

          <Section title="1. Responsable del tratamiento">
            <p>En cumplimiento del Reglamento (UE) 2016/679 del Parlamento Europeo (RGPD) y la Ley Orgánica 3/2018, de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD), le informamos que el responsable del tratamiento de sus datos personales es:</p>
            <InfoBlock items={[
              ['Denominación', 'JSF Finques'],
              ['Domicilio', 'C/ Prat de la Riba, 10, Martorell'],
              ['Número AICAT', '8394'],
              ['Número P.J.I', '0516'],
              ['Correo electrónico', 'jsfinques@gmail.com'],
            ]} />
          </Section>

          <Section title="2. Finalidad del tratamiento">
            <p>Sus datos personales son recogidos y tratados con las siguientes finalidades:</p>
            <ul>
              <li>Gestionar las solicitudes de información sobre propiedades en alquiler o compraventa.</li>
              <li>Facilitar la intermediación inmobiliaria, tasaciones y peritajes judiciales.</li>
              <li>Responder a consultas enviadas a través de los formularios de contacto o por correo electrónico.</li>
              <li>Enviar comunicaciones comerciales relacionadas con nuestros servicios, si ha prestado su consentimiento.</li>
              <li>Cumplir con las obligaciones legales aplicables a la actividad inmobiliaria.</li>
            </ul>
          </Section>

          <Section title="3. Base jurídica del tratamiento">
            <p>El tratamiento de sus datos se fundamenta en las siguientes bases legales:</p>
            <ul>
              <li><strong>Ejecución de un contrato</strong> o aplicación de medidas precontractuales a petición del interesado (Art. 6.1.b RGPD).</li>
              <li><strong>Consentimiento</strong> del interesado para el envío de comunicaciones comerciales (Art. 6.1.a RGPD).</li>
              <li><strong>Interés legítimo</strong> en la gestión y seguimiento de relaciones comerciales (Art. 6.1.f RGPD).</li>
              <li><strong>Cumplimiento de obligaciones legales</strong> (Art. 6.1.c RGPD).</li>
            </ul>
          </Section>

          <Section title="4. Conservación de los datos">
            <p>Los datos personales serán conservados durante el tiempo estrictamente necesario para la finalidad para la que fueron recabados y, en todo caso, durante los plazos legalmente exigibles. Una vez concluida dicha finalidad, los datos serán bloqueados y posteriormente eliminados de forma segura.</p>
          </Section>

          <Section title="5. Destinatarios de los datos">
            <p>Sus datos personales no serán cedidos a terceros, salvo en los siguientes supuestos:</p>
            <ul>
              <li>Cuando exista una obligación legal que lo requiera.</li>
              <li>Cuando sea necesario para la prestación del servicio contratado (colaboradores, asesores jurídicos o peritos).</li>
              <li>Proveedores tecnológicos que actúan como encargados del tratamiento bajo contrato.</li>
            </ul>
          </Section>

          <Section title="6. Derechos del interesado">
            <p>Puede ejercer en cualquier momento los siguientes derechos sobre sus datos:</p>
            <ul>
              <li><strong>Acceso:</strong> conocer qué datos tratamos sobre usted.</li>
              <li><strong>Rectificación:</strong> corregir datos inexactos o incompletos.</li>
              <li><strong>Supresión:</strong> solicitar la eliminación de sus datos cuando ya no sean necesarios.</li>
              <li><strong>Oposición:</strong> oponerse al tratamiento de sus datos en determinadas circunstancias.</li>
              <li><strong>Limitación:</strong> solicitar que se restrinja el tratamiento de sus datos.</li>
              <li><strong>Portabilidad:</strong> recibir sus datos en formato estructurado y legible por máquina.</li>
            </ul>
            <p>Para ejercer estos derechos, puede dirigirse a <strong>jsfinques@gmail.com</strong> adjuntando copia de su documento de identidad. Asimismo, tiene derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es).</p>
          </Section>

          <Section title="7. Seguridad">
            <p>JSF Finques aplica las medidas técnicas y organizativas adecuadas para garantizar la seguridad de sus datos personales y evitar su alteración, pérdida, tratamiento o acceso no autorizado, teniendo en cuenta el estado de la tecnología, la naturaleza de los datos y los riesgos a los que están expuestos.</p>
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
