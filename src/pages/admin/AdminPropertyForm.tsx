import { useEffect, useState, ChangeEvent, FormEvent } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { propertiesApi, ApiImage } from '../../lib/api'
import { toJpeg } from '../../lib/imageUtils'
import { ArrowLeft, Trash2, Upload, Loader2 } from 'lucide-react'

const EMPTY = {
  title: '', type: 'Venta', location: '', price: '', priceUnit: '',
  sqm: '', rooms: '', bathrooms: '', garage: '',
  exclusive: false, rented: false, featured: false, description: '',
}

type FormState = typeof EMPTY

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-stone-600 mb-1">{label}</label>
      {children}
    </div>
  )
}

const INPUT = 'w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400'

export default function AdminPropertyForm() {
  const { id } = useParams<{ id: string }>()
  const isEdit = !!id
  const navigate = useNavigate()

  const [form, setForm] = useState<FormState>(EMPTY)
  const [existingImages, setExistingImages] = useState<ApiImage[]>([])
  const [newFiles, setNewFiles] = useState<File[]>([])
  const [deletedIds, setDeletedIds] = useState<number[]>([])
  const [saving, setSaving] = useState(false)
  const [converting, setConverting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isEdit) return
    propertiesApi.get(Number(id)).then(p => {
      setForm({
        title: p.title, type: p.type, location: p.location,
        price: p.price, priceUnit: p.priceUnit ?? '',
        sqm: String(p.sqm), rooms: String(p.rooms),
        bathrooms: p.bathrooms != null ? String(p.bathrooms) : '',
        garage: p.garage != null ? String(p.garage) : '',
        exclusive: p.exclusive, rented: p.rented, featured: p.featured, description: p.description,
      })
      setExistingImages(p.images)
    }).catch(() => navigate('/admin/propiedades'))
  }, [id, isEdit, navigate])

  function set(key: keyof FormState, val: string | boolean) {
    setForm(prev => ({ ...prev, [key]: val }))
  }

  async function handleFiles(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.length) return
    const selected = Array.from(e.target.files)
    e.target.value = ''
    setConverting(true)
    setError('')
    const converted: File[] = []
    for (const file of selected) {
      try {
        converted.push(await toJpeg(file))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al procesar imagen')
      }
    }
    setConverting(false)
    if (converted.length) setNewFiles(prev => [...prev, ...converted])
  }

  function removeNew(idx: number) {
    setNewFiles(prev => prev.filter((_, i) => i !== idx))
  }

  function markDelete(imgId: number) {
    setDeletedIds(prev => [...prev, imgId])
    setExistingImages(prev => prev.filter(i => i.id !== imgId))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setSaving(true)
    try {
      const payload = {
        title: form.title, type: form.type, location: form.location,
        price: Number(form.price), priceUnit: form.priceUnit,
        sqm: Number(form.sqm), rooms: Number(form.rooms),
        bathrooms: form.bathrooms ? Number(form.bathrooms) : null,
        garage: form.garage ? Number(form.garage) : null,
        exclusive: form.exclusive, rented: form.rented, featured: form.featured, description: form.description,
      }

      let propertyId = Number(id)

      if (isEdit) {
        await propertiesApi.update(propertyId, payload)
        for (const imgId of deletedIds) await propertiesApi.deleteImage(propertyId, imgId)
      } else {
        const created = await propertiesApi.create(payload)
        propertyId = created.id
      }

      // Subir todas las imágenes nuevas en una sola petición (bulk)
      if (newFiles.length > 0) {
        await propertiesApi.addImages(propertyId, newFiles, existingImages.length)
      }

      navigate('/admin/propiedades')
    } catch {
      setError('Ha ocurrido un error al guardar. Revisa los campos.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="p-4 md:p-8 max-w-3xl">
      <Link to="/admin/propiedades" className="flex items-center gap-1.5 text-stone-400 hover:text-stone-700 text-sm mb-6 transition-colors">
        <ArrowLeft size={15} /> Volver a propiedades
      </Link>

      <h1 className="text-2xl font-bold text-stone-800 mb-6">
        {isEdit ? 'Editar propiedad' : 'Nueva propiedad'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Información principal */}
        <section className="bg-white rounded-xl p-6 shadow-sm space-y-4">
          <h2 className="font-semibold text-stone-700 text-sm uppercase tracking-wide">Información principal</h2>

          <Field label="Título *">
            <input type="text" value={form.title} onChange={e => set('title', e.target.value)} className={INPUT} required />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Tipo *">
              <select value={form.type} onChange={e => set('type', e.target.value)} className={INPUT}>
                <option>Venta</option>
                <option>Alquiler</option>
              </select>
            </Field>
            <Field label="Ubicación *">
              <input type="text" value={form.location} onChange={e => set('location', e.target.value)} className={INPUT} placeholder="Martorell - Centre" required />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Precio *">
              <input type="number" value={form.price} onChange={e => set('price', e.target.value)} className={INPUT} min="0" required />
            </Field>
            <Field label="Unidad de precio">
              <input type="text" value={form.priceUnit} onChange={e => set('priceUnit', e.target.value)} className={INPUT} placeholder="€/mes (solo alquiler)" />
            </Field>
          </div>

          <Field label="Descripción *">
            <textarea value={form.description} onChange={e => set('description', e.target.value)} className={`${INPUT} h-28 resize-none`} required />
          </Field>
        </section>

        {/* Características */}
        <section className="bg-white rounded-xl p-6 shadow-sm space-y-4">
          <h2 className="font-semibold text-stone-700 text-sm uppercase tracking-wide">Características</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Field label="m² *">
              <input type="number" value={form.sqm} onChange={e => set('sqm', e.target.value)} className={INPUT} min="1" required />
            </Field>
            <Field label="Habitaciones *">
              <input type="number" value={form.rooms} onChange={e => set('rooms', e.target.value)} className={INPUT} min="0" required />
            </Field>
            <Field label="Baños">
              <input type="number" value={form.bathrooms} onChange={e => set('bathrooms', e.target.value)} className={INPUT} min="0" />
            </Field>
            <Field label="Garaje (plazas)">
              <input type="number" value={form.garage} onChange={e => set('garage', e.target.value)} className={INPUT} min="0" />
            </Field>
          </div>
          <div className="flex gap-6 flex-wrap">
            <label className="flex items-center gap-2 text-sm text-stone-600 cursor-pointer select-none">
              <input type="checkbox" checked={form.exclusive} onChange={e => set('exclusive', e.target.checked)} className="accent-amber-500 w-4 h-4" />
              Exclusiva
            </label>
            <label className="flex items-center gap-2 text-sm text-stone-600 cursor-pointer select-none">
              <input type="checkbox" checked={form.rented} onChange={e => set('rented', e.target.checked)} className="accent-amber-500 w-4 h-4" />
              Alquilada
            </label>
            <label className="flex items-center gap-2 text-sm text-stone-600 cursor-pointer select-none">
              <input type="checkbox" checked={form.featured} onChange={e => set('featured', e.target.checked)} className="accent-amber-500 w-4 h-4" />
              ⭐ Destacada (aparece en el inicio)
            </label>
          </div>
        </section>

        {/* Imágenes */}
        <section className="bg-white rounded-xl p-6 shadow-sm space-y-4">
          <h2 className="font-semibold text-stone-700 text-sm uppercase tracking-wide">Imágenes</h2>

          {/* Existing */}
          {existingImages.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {existingImages.map(img => (
                <div key={img.id} className="relative group">
                  <img src={img.url} alt="" className="w-24 h-18 object-cover rounded-lg border border-stone-200" style={{ height: '72px' }} />
                  <button
                    type="button"
                    onClick={() => markDelete(img.id)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={11} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* New file previews */}
          {newFiles.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {newFiles.map((f, i) => (
                <div key={i} className="relative group">
                  <img src={URL.createObjectURL(f)} alt="" className="w-24 object-cover rounded-lg border-2 border-amber-300" style={{ height: '72px' }} />
                  <button
                    type="button"
                    onClick={() => removeNew(i)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={11} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <label className={`flex items-center gap-2 w-fit border border-dashed border-stone-300 rounded-lg px-4 py-2.5 text-sm transition-colors ${converting ? 'bg-amber-50 text-amber-600 cursor-wait' : 'cursor-pointer bg-stone-50 hover:bg-stone-100 text-stone-500'}`}>
            {converting ? <Loader2 size={15} className="animate-spin" /> : <Upload size={15} />}
            {converting ? 'Procesando...' : 'Añadir imágenes'}
            <input type="file" accept="image/*" multiple onChange={handleFiles} className="hidden" disabled={converting} />
          </label>
        </section>

        {error && <p className="text-sm text-red-600 bg-red-50 rounded-lg px-4 py-2">{error}</p>}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors"
          >
            {saving && <Loader2 size={15} className="animate-spin" />}
            {saving ? 'Guardando...' : isEdit ? 'Guardar cambios' : 'Crear propiedad'}
          </button>
          <Link to="/admin/propiedades" className="px-6 py-2.5 rounded-lg border border-stone-200 text-sm text-stone-600 hover:bg-stone-50 transition-colors">
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  )
}
