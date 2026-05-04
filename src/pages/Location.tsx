import { useState, useEffect, FormEvent } from 'react';
import { Train, Hospital, School, Clock, Phone, Mail, ExternalLink, Loader2, CheckCircle, LocateFixed } from 'lucide-react';
import { messagesApi } from '../lib/api';

const MAP_SRC = "https://www.openstreetmap.org/export/embed.html?bbox=1.9235%2C41.4710%2C1.9335%2C41.4760&layer=mapnik&marker=41.4735%2C1.9285";

export default function Location() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', website: '' })
  const [mapKey, setMapKey] = useState(0)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [formError, setFormError] = useState('')
  const [cooldownUntil, setCooldownUntil] = useState<number | null>(null)
  const [secondsLeft, setSecondsLeft] = useState(0)

  useEffect(() => {
    if (!cooldownUntil) return
    const tick = () => {
      const left = Math.ceil((cooldownUntil - Date.now()) / 1000)
      if (left <= 0) { setSecondsLeft(0); setCooldownUntil(null) }
      else setSecondsLeft(left)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [cooldownUntil])

  function setField(key: keyof typeof form, val: string) {
    setForm(prev => ({ ...prev, [key]: val }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setFormError('')
    setSending(true)
    try {
      await messagesApi.create({ name: form.name, email: form.email, phone: form.phone, message: form.message, website: form.website })
      setSent(true)
      setCooldownUntil(Date.now() + 60_000)
      setForm({ name: '', email: '', phone: '', message: '', website: '' })
    } catch {
      setFormError('Ha ocurrido un error al enviar el mensaje. Inténtalo de nuevo.')
    } finally {
      setSending(false)
    }
  }

  return (
    <main className="pt-32 pb-24">
      <section className="max-w-7xl mx-auto px-6 md:px-8 mb-16 md:20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7">
            <span className="text-primary font-bold uppercase tracking-widest text-xs md:text-sm mb-4 block">Nuestra Sede</span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-primary mb-6 md:mb-8 leading-tight">La Autoridad Local en Martorell</h1>
            <p className="text-base md:text-lg text-secondary leading-relaxed mb-8 max-w-2xl">
              Ubicados en el corazón histórico de Martorell, en JSF Finques entendemos que una propiedad no es solo una estructura, es el epicentro de su vida. Nuestra oficina en la Calle Prat de la Riba es el punto de encuentro para quienes buscan la excelencia inmobiliaria en una ubicación privilegiada con conexiones estratégicas a Barcelona.
            </p>
            <div className="flex flex-wrap gap-3 md:gap-4">
              <div className="flex items-center gap-3 bg-surface-container-low p-3 md:p-4 rounded-xl border border-outline/10">
                <Train className="text-primary w-4 h-4 md:w-5 md:h-5" />
                <span className="font-semibold text-on-surface text-sm md:text-base">Conexión Directa FGC</span>
              </div>
              <div className="flex items-center gap-3 bg-surface-container-low p-3 md:p-4 rounded-xl border border-outline/10">
                <Hospital className="text-primary w-4 h-4 md:w-5 md:h-5" />
                <span className="font-semibold text-on-surface text-sm md:text-base">Servicios de Salud</span>
              </div>
              <div className="flex items-center gap-3 bg-surface-container-low p-3 md:p-4 rounded-xl border border-outline/10">
                <School className="text-primary w-4 h-4 md:w-5 md:h-5" />
                <span className="font-semibold text-on-surface text-sm md:text-base">Oferta Educativa</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQ-uIsCR5fwtjUsFVNThycrSA-CXBV9aYye-E4409KK-Mh21LkgVepoUKfeTlLQdHUL2O6-BBctujovMPlr8XgTYfMrIgv7euGRo_oa55tgRDEOEicLwsZsGh8njYsO5R8XP6YB_rjrYJUt8DvhRVlwgOE2jXuE5mCzQqmPZyNv2D6fnxL_tEUY1UAThRk8HEO_9YM4TU5FlaSBwVATM1ScrQsMS40dqyZ8TV9W9txytBmPxomqx0676b1vZ-rdB5CIWGiSPw5RX8"
                alt="Office"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-white p-6 md:p-8 rounded-2xl shadow-xl max-w-[200px] md:max-w-xs hidden sm:block">
              <p className="text-primary font-bold text-base md:text-xl mb-2 italic">"Martorell es el equilibrio perfecto entre tradición y modernidad."</p>
              <p className="text-secondary text-[10px] md:text-sm">— Joan S., Director General</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-8 mb-16 md:mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 bg-surface-container-low rounded-3xl overflow-hidden min-h-[350px] md:min-h-[500px] relative">
            <iframe
              key={mapKey}
              title="Ubicación JSF Finques"
              src={MAP_SRC}
              className="w-full h-full min-h-[350px] md:min-h-[500px] border-0"
              loading="lazy"
            />
            <button
              onClick={() => setMapKey(k => k + 1)}
              title="Volver a la ubicación"
              className="absolute top-[68px] right-[10px] z-10 w-[26px] h-[26px] bg-white border border-stone-300 rounded flex items-center justify-center shadow-sm hover:bg-stone-50 transition-colors"
            >
              <LocateFixed className="w-3.5 h-3.5 text-stone-700" />
            </button>
            <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 bg-white/90 backdrop-blur-md p-5 md:p-6 rounded-2xl shadow-lg border border-white/20 max-w-[280px] md:max-w-sm">
              <h3 className="text-primary font-bold text-base md:text-lg mb-2">Visítenos en Martorell</h3>
              <p className="text-secondary text-xs md:text-sm">Carrer d'Enric Prat de la Riba, 10, 08760 Martorell, Barcelona.</p>
              <a
                className="mt-3 md:mt-4 inline-flex items-center text-primary font-bold hover:underline gap-2 text-sm"
                href="https://www.google.com/maps/dir/?api=1&destination=Carrer+d'Enric+Prat+de+la+Riba+10+08760+Martorell+Barcelona"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Cómo llegar</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-1 flex flex-col gap-6">
            <div className="bg-surface-container-lowest p-6 md:p-8 rounded-3xl shadow-sm flex-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary-fixed flex items-center justify-center">
                  <Clock className="text-primary w-5 h-5 md:w-6 md:h-6" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-primary">Horario</h3>
              </div>
              <div className="space-y-4 text-secondary text-sm md:text-base">
                <div className="flex justify-between border-b border-surface-container py-2">
                  <span>Lun - Vie (mañana)</span>
                  <span className="font-semibold text-on-surface">09:30 - 13:30</span>
                </div>
                <div className="flex justify-between border-b border-surface-container py-2">
                  <span>Lun - Vie (tarde)</span>
                  <span className="font-semibold text-on-surface">16:30 - 20:00</span>
                </div>
                <div className="flex justify-between border-b border-surface-container py-2">
                  <span>Sábados</span>
                  <span className="font-semibold text-on-surface">10:00 - 14:00</span>
                </div>
                <div className="flex justify-between py-2">
                  <span>Domingos</span>
                  <span className="text-red-600 font-medium">Cerrado</span>
                </div>
              </div>
            </div>

            <div className="bg-primary text-white p-6 md:p-8 rounded-3xl shadow-xl flex-1">
              <h3 className="text-lg md:text-xl font-bold mb-6">Atención Directa</h3>
              <div className="space-y-4 md:space-y-6">
                <a className="flex items-center gap-4 group" href="tel:654178938">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-base md:text-lg">654 178 938</span>
                </a>
                <a className="flex items-center gap-4 group" href="mailto:jsfinques@gmail.com">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-sm md:text-base break-all">jsfinques@gmail.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 md:px-8">
        <div className="bg-surface-container-low rounded-3xl p-8 md:p-16">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-extrabold text-primary mb-4">¿Tiene alguna consulta?</h2>
            <p className="text-secondary text-sm md:text-base max-w-lg mx-auto">Complete el formulario y uno de nuestros asesores expertos se pondrá en contacto con usted en menos de 24 horas.</p>
          </div>

          {sent ? (
            <div className="flex flex-col items-center gap-4 py-8 text-center">
              <CheckCircle className="w-14 h-14 text-green-500" />
              <p className="text-xl font-bold text-primary">¡Mensaje enviado!</p>
              <p className="text-secondary text-sm">Nos pondremos en contacto con usted en breve.</p>
              {secondsLeft > 0 ? (
                <p className="mt-2 text-secondary text-sm">Podrá enviar otro mensaje en <span className="font-bold text-primary">{secondsLeft}s</span></p>
              ) : (
                <button onClick={() => setSent(false)} className="mt-2 text-primary font-bold hover:underline text-sm">Enviar otro mensaje</button>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div aria-hidden="true" className="absolute left-[-9999px] w-0 h-0 overflow-hidden">
                <label htmlFor="website">No rellenar</label>
                <input
                  id="website"
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website}
                  onChange={e => setField('website', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] md:text-xs font-bold uppercase text-secondary ml-1">Nombre Completo *</label>
                <input
                  className="w-full bg-surface-container-lowest border-none rounded-xl p-4 focus:ring-2 focus:ring-primary transition-all outline-none text-sm"
                  placeholder="Ej. Ana García"
                  type="text"
                  value={form.name}
                  onChange={e => setField('name', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] md:text-xs font-bold uppercase text-secondary ml-1">Correo Electrónico *</label>
                <input
                  className="w-full bg-surface-container-lowest border-none rounded-xl p-4 focus:ring-2 focus:ring-primary transition-all outline-none text-sm"
                  placeholder="ana.garcia@email.com"
                  type="email"
                  value={form.email}
                  onChange={e => setField('email', e.target.value)}
                  required
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] md:text-xs font-bold uppercase text-secondary ml-1">Teléfono</label>
                <input
                  className="w-full bg-surface-container-lowest border-none rounded-xl p-4 focus:ring-2 focus:ring-primary transition-all outline-none text-sm"
                  placeholder="Ej. 654 178 938"
                  type="tel"
                  value={form.phone}
                  onChange={e => setField('phone', e.target.value)}
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] md:text-xs font-bold uppercase text-secondary ml-1">Mensaje *</label>
                <textarea
                  className="w-full bg-surface-container-lowest border-none rounded-xl p-4 focus:ring-2 focus:ring-primary transition-all outline-none text-sm"
                  placeholder="¿En qué podemos ayudarle?"
                  rows={4}
                  value={form.message}
                  onChange={e => setField('message', e.target.value)}
                  required
                />
              </div>
              {formError && (
                <div className="md:col-span-2">
                  <p className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-3">{formError}</p>
                </div>
              )}
              <div className="md:col-span-2 mt-4">
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full bg-primary text-on-primary py-4 rounded-xl font-bold text-base md:text-lg hover:bg-primary-container transition-all shadow-lg active:scale-95 disabled:opacity-60 flex items-center justify-center gap-3"
                >
                  {sending && <Loader2 className="w-5 h-5 animate-spin" />}
                  {sending ? 'Enviando...' : 'Enviar Mensaje'}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
