import { useEffect, useState, ChangeEvent, FormEvent } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { blogApi, ApiAuthor } from '../../lib/api'
import { toJpeg } from '../../lib/imageUtils'
import { ArrowLeft, Upload, Loader2, Trash2 } from 'lucide-react'

const EMPTY = {
  title: '', category: '', date: '', excerpt: '',
  content: '', published: true, author: '',
}

const INPUT = 'w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary'

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-stone-600 mb-1">{label}</label>
      {children}
    </div>
  )
}

export default function AdminBlogForm() {
  const { id } = useParams<{ id: string }>()
  const isEdit = !!id
  const navigate = useNavigate()

  const [form, setForm] = useState(EMPTY)
  // Imagen existente en el servidor
  const [existingImageUrl, setExistingImageUrl] = useState('')
  // Nuevo archivo seleccionado localmente (aún no subido)
  const [newImageFile, setNewImageFile] = useState<File | null>(null)
  const [newImagePreview, setNewImagePreview] = useState('')
  // Si el usuario marcó la imagen existente para borrar
  const [deleteExisting, setDeleteExisting] = useState(false)
  const [authors, setAuthors] = useState<ApiAuthor[]>([])
  const [saving, setSaving] = useState(false)
  const [converting, setConverting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    blogApi.authors().then(res => setAuthors(res.results)).catch(() => {})

    if (!isEdit) return
    blogApi.get(Number(id)).then(p => {
      let dateVal = ''
      try { dateVal = new Date(p.date).toISOString().slice(0, 10) } catch { dateVal = '' }
      setForm({
        title: p.title, category: p.category, date: dateVal,
        excerpt: p.excerpt, content: p.content ?? '',
        published: p.published,
        author: '',
      })
      setExistingImageUrl(p.image_url)
    }).catch(() => navigate('/admin/blog'))
  }, [id, isEdit, navigate])

  // Asignar autor una vez cargados ambos
  useEffect(() => {
    if (!isEdit || authors.length === 0) return
    blogApi.get(Number(id)).then(p => {
      const match = authors.find(a => a.name === p.author?.name)
      if (match) setForm(prev => ({ ...prev, author: String(match.id) }))
    }).catch(() => {})
  }, [authors, id, isEdit])

  function set(key: keyof typeof EMPTY, val: string | boolean) {
    setForm(prev => ({ ...prev, [key]: val }))
  }

  async function handleImage(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    e.target.value = ''
    setConverting(true)
    setError('')
    try {
      const converted = await toJpeg(file)
      setNewImageFile(converted)
      setNewImagePreview(URL.createObjectURL(converted))
      setDeleteExisting(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al procesar imagen')
    } finally {
      setConverting(false)
    }
  }

  function removeNewImage() {
    setNewImageFile(null)
    setNewImagePreview('')
  }

  function markDeleteExisting() {
    setExistingImageUrl('')
    setDeleteExisting(true)
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setSaving(true)
    try {
      const payload: Record<string, unknown> = {
        title: form.title,
        category: form.category,
        date: form.date,
        excerpt: form.excerpt,
        content: form.content,
        published: form.published,
      }
      if (form.author) payload.author = Number(form.author)

      let postId = Number(id)

      if (isEdit) {
        await blogApi.update(postId, payload)
        // Borrar imagen existente si se marcó para eliminar
        if (deleteExisting) await blogApi.deleteImage(postId)
      } else {
        const created = await blogApi.create(payload)
        postId = created.id
      }

      // Subir nueva imagen si se seleccionó una
      if (newImageFile) {
        await blogApi.setImage(postId, newImageFile)
      }

      navigate('/admin/blog')
    } catch {
      setError('Ha ocurrido un error al guardar.')
    } finally {
      setSaving(false)
    }
  }

  // Imagen visible actualmente
  const showExisting = existingImageUrl && !deleteExisting
  const showNew = !!newImagePreview

  return (
    <div className="p-4 md:p-8 max-w-3xl">
      <Link to="/admin/blog" className="flex items-center gap-1.5 text-stone-400 hover:text-stone-700 text-sm mb-6 transition-colors">
        <ArrowLeft size={15} /> Volver al blog
      </Link>

      <h1 className="text-2xl font-bold text-stone-800 mb-6">
        {isEdit ? 'Editar artículo' : 'Nuevo artículo'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="bg-white rounded-xl p-6 shadow-sm space-y-4">
          <h2 className="font-semibold text-stone-700 text-sm uppercase tracking-wide">Información del artículo</h2>

          <Field label="Título *">
            <input type="text" value={form.title} onChange={e => set('title', e.target.value)} className={INPUT} required />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Categoría *">
              <input type="text" value={form.category} onChange={e => set('category', e.target.value)} className={INPUT} placeholder="MERCADO LOCAL, VENTAS..." required />
            </Field>
            <Field label="Fecha de publicación *">
              <input type="date" value={form.date} onChange={e => set('date', e.target.value)} className={INPUT} required />
            </Field>
          </div>

          <Field label="Extracto *">
            <textarea value={form.excerpt} onChange={e => set('excerpt', e.target.value)} className={`${INPUT} h-20 resize-none`} required />
          </Field>

          <Field label="Contenido (Markdown)">
            <textarea value={form.content} onChange={e => set('content', e.target.value)} className={`${INPUT} h-48 resize-y font-mono text-xs`} placeholder="Soporta **negrita**, # Títulos, - listas..." />
          </Field>
        </section>

        <section className="bg-white rounded-xl p-6 shadow-sm space-y-4">
          <h2 className="font-semibold text-stone-700 text-sm uppercase tracking-wide">Autor e imagen</h2>

          <Field label="Autor">
            <select value={form.author} onChange={e => set('author', e.target.value)} className={INPUT}>
              <option value="">— Sin autor —</option>
              {authors.map(a => (
                <option key={a.id} value={a.id}>{a.name} ({a.role})</option>
              ))}
            </select>
            <Link to="/admin/autores" target="_blank" className="text-xs text-primary hover:underline mt-1 inline-block">
              + Gestionar autores
            </Link>
          </Field>

          <Field label="Imagen principal">
            <div className="space-y-3">
              {/* Imagen guardada en el servidor */}
              {showExisting && (
                <div className="relative group w-full">
                  <img src={existingImageUrl} alt="" className="w-full h-36 object-cover rounded-lg border border-stone-200" />
                  <button
                    type="button"
                    onClick={markDeleteExisting}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Eliminar imagen"
                  >
                    <Trash2 size={11} />
                  </button>
                </div>
              )}

              {/* Nueva imagen seleccionada localmente */}
              {showNew && (
                <div className="relative group w-full">
                  <img src={newImagePreview} alt="" className="w-full h-36 object-cover rounded-lg border-2 border-primary" />
                  <button
                    type="button"
                    onClick={removeNewImage}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Quitar imagen seleccionada"
                  >
                    <Trash2 size={11} />
                  </button>
                </div>
              )}

              <label className={`flex items-center gap-2 w-fit border border-dashed border-stone-300 rounded-lg px-4 py-2.5 text-sm transition-colors ${converting ? 'bg-primary-fixed text-primary cursor-wait' : 'cursor-pointer bg-stone-50 hover:bg-stone-100 text-stone-500'}`}>
                {converting ? <Loader2 size={15} className="animate-spin" /> : <Upload size={15} />}
                {converting ? 'Procesando...' : (showExisting || showNew) ? 'Cambiar imagen' : 'Subir imagen'}
                <input type="file" accept="image/*" onChange={handleImage} className="hidden" disabled={converting} />
              </label>
            </div>
          </Field>

          <label className="flex items-center gap-2 text-sm text-stone-600 cursor-pointer select-none">
            <input type="checkbox" checked={form.published} onChange={e => set('published', e.target.checked)} className="accent-primary w-4 h-4" />
            Publicado (visible en el sitio web)
          </label>
        </section>

        {error && <p className="text-sm text-red-600 bg-red-50 rounded-lg px-4 py-2">{error}</p>}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 bg-primary hover:bg-primary-container disabled:opacity-50 text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors"
          >
            {saving && <Loader2 size={15} className="animate-spin" />}
            {saving ? 'Guardando...' : isEdit ? 'Guardar cambios' : 'Publicar artículo'}
          </button>
          <Link to="/admin/blog" className="px-6 py-2.5 rounded-lg border border-stone-200 text-sm text-stone-600 hover:bg-stone-50 transition-colors">
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  )
}
