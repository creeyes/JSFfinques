import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { propertiesApi, blogApi, messagesApi } from '../../lib/api'
import { Building2, FileText, MessageSquare, TrendingUp } from 'lucide-react'

export default function AdminDashboard() {
  const [stats, setStats] = useState({ properties: 0, venta: 0, alquiler: 0, posts: 0, unread: 0 })

  useEffect(() => {
    Promise.all([
      propertiesApi.list(),
      blogApi.list(),
      messagesApi.list(),
    ]).then(([props, posts, msgs]) => {
      const properties = props.results
      const unread = msgs.results.filter(m => !m.read).length
      setStats({
        properties: properties.length,
        venta: properties.filter(p => p.type === 'Venta').length,
        alquiler: properties.filter(p => p.type === 'Alquiler').length,
        posts: posts.results.length,
        unread,
      })
    }).catch(() => {})
  }, [])

  const cards = [
    { label: 'Propiedades en venta',   value: stats.venta,      icon: Building2,     color: 'bg-blue-50 text-blue-600',    to: '/admin/propiedades' },
    { label: 'Propiedades en alquiler', value: stats.alquiler,   icon: TrendingUp,    color: 'bg-green-50 text-green-600',  to: '/admin/propiedades' },
    { label: 'Artículos publicados',    value: stats.posts,      icon: FileText,      color: 'bg-primary-fixed text-primary',  to: '/admin/blog' },
    { label: 'Mensajes sin leer',       value: stats.unread,     icon: MessageSquare, color: 'bg-red-50 text-red-600',      to: '/admin/mensajes' },
  ]

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold text-stone-800 mb-1">Dashboard</h1>
      <p className="text-stone-500 text-sm mb-6 md:mb-8">Resumen del contenido de JSF Finques</p>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-10">
        {cards.map(({ label, value, icon: Icon, color, to }) => (
          <Link key={label} to={to} className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className={`inline-flex p-2.5 rounded-lg mb-3 ${color}`}>
              <Icon size={20} />
            </div>
            <p className="text-3xl font-bold text-stone-800">{value}</p>
            <p className="text-sm text-stone-500 mt-0.5">{label}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { to: '/admin/propiedades/nueva', label: 'Añadir propiedad', icon: Building2 },
          { to: '/admin/blog/nuevo',        label: 'Nuevo artículo',   icon: FileText },
          { to: '/admin/mensajes',          label: 'Ver mensajes',     icon: MessageSquare },
        ].map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md border-2 border-dashed border-stone-200 hover:border-primary flex items-center gap-3 text-stone-600 hover:text-primary transition-all"
          >
            <Icon size={20} />
            <span className="font-medium">{label}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
