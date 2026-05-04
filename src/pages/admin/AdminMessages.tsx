import { useEffect, useState } from 'react'
import { messagesApi, ApiMessage } from '../../lib/api'
import { Mail, MailOpen, Phone, Trash2, Loader2 } from 'lucide-react'

export default function AdminMessages() {
  const [messages, setMessages] = useState<ApiMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState<number | null>(null)
  const [deleting, setDeleting] = useState<number | null>(null)

  useEffect(() => { load() }, [])

  async function load() {
    try {
      const res = await messagesApi.list()
      setMessages(res.results)
    } finally {
      setLoading(false)
    }
  }

  async function handleMarkRead(msg: ApiMessage) {
    if (msg.read) return
    try {
      const updated = await messagesApi.markRead(msg.id)
      setMessages(prev => prev.map(m => m.id === updated.id ? updated : m))
    } catch { /* ignore */ }
  }

  function toggle(id: number, msg: ApiMessage) {
    setExpanded(expanded === id ? null : id)
    if (!msg.read) handleMarkRead(msg)
  }

  async function handleDelete(msg: ApiMessage, e: React.MouseEvent) {
    e.stopPropagation()
    if (!confirm(`¿Eliminar el mensaje de ${msg.name}?`)) return
    setDeleting(msg.id)
    try {
      await messagesApi.delete(msg.id)
      setMessages(prev => prev.filter(m => m.id !== msg.id))
      if (expanded === msg.id) setExpanded(null)
    } catch {
      alert('No se ha podido eliminar el mensaje.')
    } finally {
      setDeleting(null)
    }
  }

  const unread = messages.filter(m => !m.read).length

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-stone-800">Mensajes</h1>
        <p className="text-stone-500 text-sm">
          {unread > 0 ? <span className="text-red-500 font-medium">{unread} sin leer</span> : 'Todos leídos'} · {messages.length} total
        </p>
      </div>

      {loading ? (
        <p className="text-stone-400 text-sm">Cargando...</p>
      ) : messages.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm">
          <p className="text-stone-400">No hay mensajes todavía.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {messages.map(msg => (
            <div key={msg.id} className={`bg-white rounded-xl shadow-sm overflow-hidden border-l-4 transition-colors ${msg.read ? 'border-stone-200' : 'border-amber-400'}`}>
              <div className="relative flex items-stretch">
                <button
                  onClick={() => toggle(msg.id, msg)}
                  className="flex-1 text-left px-5 py-4 flex items-start gap-4 hover:bg-stone-50 transition-colors"
                >
                  <div className={`mt-0.5 shrink-0 ${msg.read ? 'text-stone-300' : 'text-amber-500'}`}>
                    {msg.read ? <MailOpen size={18} /> : <Mail size={18} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-stone-800 text-sm">{msg.name}</span>
                      {!msg.read && (
                        <span className="px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded text-xs font-medium">Nuevo</span>
                      )}
                      <span className="text-stone-400 text-xs ml-auto">
                        {new Date(msg.created_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                    <p className="text-stone-500 text-xs mt-0.5">{msg.email}</p>
                    <p className="text-stone-500 text-sm mt-1 truncate">{msg.message}</p>
                  </div>
                </button>
                <button
                  onClick={(e) => handleDelete(msg, e)}
                  disabled={deleting === msg.id}
                  className="px-4 text-stone-300 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-40"
                  title="Eliminar mensaje"
                >
                  {deleting === msg.id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                </button>
              </div>

              {expanded === msg.id && (
                <div className="px-5 pb-5 pt-0 border-t border-stone-100">
                  <div className="bg-stone-50 rounded-lg p-4 mt-3">
                    <p className="text-stone-700 text-sm whitespace-pre-wrap">{msg.message}</p>
                  </div>
                  <div className="flex gap-4 mt-3 text-xs text-stone-400">
                    <a href={`mailto:${msg.email}`} className="flex items-center gap-1 hover:text-amber-500 transition-colors">
                      <Mail size={12} /> {msg.email}
                    </a>
                    {msg.phone && (
                      <a href={`tel:${msg.phone}`} className="flex items-center gap-1 hover:text-amber-500 transition-colors">
                        <Phone size={12} /> {msg.phone}
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
