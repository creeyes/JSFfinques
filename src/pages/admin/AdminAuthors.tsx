import { useEffect, useState, useRef, FormEvent } from 'react'
import { blogApi, ApiAuthor } from '../../lib/api'
import { toJpeg } from '../../lib/imageUtils'
import { Plus, Trash2, Loader2, User, Pencil, X, Upload } from 'lucide-react'

const INPUT = 'w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary'

export default function AdminAuthors() {
  const [authors, setAuthors] = useState<ApiAuthor[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingAuthor, setEditingAuthor] = useState<ApiAuthor | null>(null)

  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string>('')
  const [removeAvatar, setRemoveAvatar] = useState(false)
  const [converting, setConverting] = useState(false)

  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState<number | null>(null)
  const [formError, setFormError] = useState('')

  const fileInputRef = useRef<HTMLInputElement>(null)
  const prevPreviewRef = useRef<string>('')

  useEffect(() => { load() }, [])

  // Revoke preview URL when it changes to avoid memory leaks
  useEffect(() => {
    if (prevPreviewRef.current) URL.revokeObjectURL(prevPreviewRef.current)
    prevPreviewRef.current = avatarPreview
  }, [avatarPreview])

  async function load() {
    try {
      const res = await blogApi.authors()
      setAuthors(res.results)
    } finally {
      setLoading(false)
    }
  }

  function resetForm() {
    setName('')
    setRole('')
    setAvatarFile(null)
    setAvatarPreview('')
    setRemoveAvatar(false)
    setFormError('')
  }

  function openCreate() {
    setEditingAuthor(null)
    resetForm()
    setShowForm(true)
  }

  function openEdit(a: ApiAuthor) {
    setEditingAuthor(a)
    setName(a.name)
    setRole(a.role)
    setAvatarFile(null)
    setAvatarPreview('')
    setRemoveAvatar(false)
    setFormError('')
    setShowForm(true)
  }

  function closeForm() {
    setShowForm(false)
    setEditingAuthor(null)
    resetForm()
  }

  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    e.target.value = ''
    setConverting(true)
    setFormError('')
    try {
      const jpeg = await toJpeg(file)
      setAvatarFile(jpeg)
      setAvatarPreview(URL.createObjectURL(jpeg))
      setRemoveAvatar(false)
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Error al procesar la imagen')
    } finally {
      setConverting(false)
    }
  }

  function handleRemoveAvatar() {
    setAvatarFile(null)
    setAvatarPreview('')
    setRemoveAvatar(true)
  }

  // The avatar to show in the form: new preview > existing > nothing
  const displayAvatar = removeAvatar
    ? null
    : avatarPreview || editingAuthor?.avatar_url || null

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setFormError('')
    setSaving(true)
    try {
      const fd = new FormData()
      fd.append('name', name)
      fd.append('role', role)
      if (avatarFile) {
        fd.append('avatar', avatarFile)
      } else if (removeAvatar) {
        fd.append('remove_avatar', 'true')
      }

      if (editingAuthor) {
        const updated = await blogApi.updateAuthor(editingAuthor.id, fd)
        setAuthors(prev => prev.map(a => a.id === updated.id ? updated : a))
      } else {
        const created = await blogApi.createAuthor(fd)
        setAuthors(prev => [...prev, created])
      }
      closeForm()
    } catch {
      setFormError(
        editingAuthor
          ? 'No se ha podido guardar los cambios. Revisa los campos.'
          : 'No se ha podido crear el autor. Revisa los campos.'
      )
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(a: ApiAuthor) {
    if (!confirm(`¿Eliminar autor "${a.name}"?`)) return
    setDeleting(a.id)
    try {
      await blogApi.deleteAuthor(a.id)
      setAuthors(prev => prev.filter(x => x.id !== a.id))
    } catch {
      alert('No se ha podido eliminar el autor. Puede que tenga entradas de blog asociadas.')
    } finally {
      setDeleting(null)
    }
  }

  return (
    <div className="p-4 md:p-8 max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-stone-800">Autores</h1>
          <p className="text-stone-500 text-sm">{authors.length} autores registrados</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-primary hover:bg-primary-container text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
        >
          <Plus size={16} /> Nuevo autor
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-sm mb-6 space-y-5">
          <h2 className="font-semibold text-stone-700 text-sm">
            {editingAuthor ? 'Editar autor' : 'Crear autor'}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-stone-600 mb-1">Nombre *</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} className={INPUT} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-600 mb-1">Cargo *</label>
              <input type="text" value={role} onChange={e => setRole(e.target.value)} className={INPUT} placeholder="Director de Estrategia" required />
            </div>
          </div>

          {/* Avatar picker */}
          <div>
            <label className="block text-sm font-medium text-stone-600 mb-2">Foto de perfil</label>
            <div className="flex items-center gap-4">
              {/* Preview circle */}
              <div className="relative shrink-0">
                {displayAvatar ? (
                  <img src={displayAvatar} alt="avatar" className="w-16 h-16 rounded-full object-cover border border-stone-200" />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-300 border border-stone-200">
                    <User size={24} />
                  </div>
                )}
                {/* Remove button — only shown when there's an avatar */}
                {displayAvatar && (
                  <button
                    type="button"
                    onClick={handleRemoveAvatar}
                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600 transition-colors"
                    title="Eliminar foto"
                  >
                    <X size={11} />
                  </button>
                )}
              </div>

              {/* Upload button */}
              <label className={`flex items-center gap-2 border border-dashed border-stone-300 rounded-lg px-4 py-2 text-sm transition-colors ${converting ? 'bg-primary-fixed text-primary cursor-wait' : 'cursor-pointer bg-stone-50 hover:bg-stone-100 text-stone-500'}`}>
                {converting ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                {converting ? 'Procesando...' : displayAvatar ? 'Cambiar foto' : 'Subir foto'}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                  disabled={converting}
                />
              </label>
            </div>
          </div>

          {formError && <p className="text-sm text-red-600 bg-red-50 rounded-lg px-4 py-2">{formError}</p>}

          <div className="flex gap-3">
            <button type="submit" disabled={saving} className="flex items-center gap-2 bg-primary hover:bg-primary-container disabled:opacity-50 text-white font-semibold px-5 py-2 rounded-lg text-sm transition-colors">
              {saving && <Loader2 size={14} className="animate-spin" />}
              {editingAuthor ? 'Guardar cambios' : 'Crear autor'}
            </button>
            <button type="button" onClick={closeForm} className="px-5 py-2 rounded-lg border border-stone-200 text-sm text-stone-600 hover:bg-stone-50 transition-colors">
              Cancelar
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <p className="text-stone-400 text-sm">Cargando...</p>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {authors.length === 0 ? (
            <p className="text-stone-400 text-sm text-center py-10">No hay autores todavía.</p>
          ) : (
            <ul className="divide-y divide-stone-100">
              {authors.map(a => (
                <li key={a.id} className="flex items-center gap-4 px-5 py-4">
                  {a.avatar_url ? (
                    <img src={a.avatar_url} alt={a.name} className="w-10 h-10 rounded-full object-cover" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-300">
                      <User size={18} />
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="font-medium text-stone-800 text-sm">{a.name}</p>
                    <p className="text-stone-400 text-xs">{a.role}</p>
                  </div>
                  <button
                    onClick={() => openEdit(a)}
                    className="p-1.5 text-stone-300 hover:text-primary hover:bg-primary-fixed rounded-md transition-colors"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    onClick={() => handleDelete(a)}
                    disabled={deleting === a.id}
                    className="p-1.5 text-stone-300 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors disabled:opacity-40"
                  >
                    <Trash2 size={15} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
