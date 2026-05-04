import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { blogApi, ApiPost } from '../../lib/api'
import { Plus, Pencil, Trash2, ImageOff } from 'lucide-react'

export default function AdminBlog() {
  const [posts, setPosts] = useState<ApiPost[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<number | null>(null)

  useEffect(() => { load() }, [])

  async function load() {
    try {
      const res = await blogApi.list()
      setPosts(res.results)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(post: ApiPost) {
    if (!confirm(`¿Eliminar "${post.title}"?`)) return
    setDeleting(post.id)
    try {
      await blogApi.delete(post.id)
      setPosts(prev => prev.filter(p => p.id !== post.id))
    } finally {
      setDeleting(null)
    }
  }

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-stone-800">Blog</h1>
          <p className="text-stone-500 text-sm">{posts.length} artículos</p>
        </div>
        <Link
          to="/admin/blog/nuevo"
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
        >
          <Plus size={16} /> Nuevo artículo
        </Link>
      </div>

      {loading ? (
        <p className="text-stone-400 text-sm">Cargando...</p>
      ) : posts.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm">
          <p className="text-stone-400">No hay artículos todavía.</p>
          <Link to="/admin/blog/nuevo" className="text-amber-500 hover:underline text-sm mt-2 inline-block">
            Crear el primer artículo
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 text-stone-500 text-xs uppercase tracking-wide">
              <tr>
                <th className="text-left px-4 py-3 w-16"></th>
                <th className="text-left px-4 py-3">Título</th>
                <th className="hidden sm:table-cell text-left px-4 py-3">Categoría</th>
                <th className="hidden md:table-cell text-left px-4 py-3">Autor</th>
                <th className="hidden md:table-cell text-left px-4 py-3">Fecha</th>
                <th className="hidden sm:table-cell text-center px-4 py-3">Estado</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {posts.map(post => (
                <tr key={post.id} className="hover:bg-stone-50 transition-colors">
                  <td className="px-4 py-3">
                    {post.image_url ? (
                      <img src={post.image_url} alt="" className="w-12 h-9 object-cover rounded-md" />
                    ) : (
                      <div className="w-12 h-9 bg-stone-100 rounded-md flex items-center justify-center text-stone-300">
                        <ImageOff size={14} />
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 max-w-xs">
                    <div className="font-medium text-stone-800 truncate">{post.title}</div>
                    <div className="sm:hidden mt-1 flex gap-1 flex-wrap">
                      <span className="px-1.5 py-0.5 bg-stone-100 text-stone-600 rounded-full text-[10px]">{post.category}</span>
                      <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-medium ${
                        post.published ? 'bg-green-100 text-green-700' : 'bg-stone-100 text-stone-500'
                      }`}>{post.published ? 'Publicado' : 'Borrador'}</span>
                    </div>
                  </td>
                  <td className="hidden sm:table-cell px-4 py-3">
                    <span className="px-2 py-0.5 bg-stone-100 text-stone-600 rounded-full text-xs">{post.category}</span>
                  </td>
                  <td className="hidden md:table-cell px-4 py-3 text-stone-500">{post.author?.name ?? '—'}</td>
                  <td className="hidden md:table-cell px-4 py-3 text-stone-500">{post.date}</td>
                  <td className="hidden sm:table-cell px-4 py-3 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      post.published ? 'bg-green-100 text-green-700' : 'bg-stone-100 text-stone-500'
                    }`}>
                      {post.published ? 'Publicado' : 'Borrador'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 justify-end">
                      <Link
                        to={`/admin/blog/${post.id}/editar`}
                        className="p-1.5 text-stone-400 hover:text-amber-500 hover:bg-amber-50 rounded-md transition-colors"
                      >
                        <Pencil size={15} />
                      </Link>
                      <button
                        onClick={() => handleDelete(post)}
                        disabled={deleting === post.id}
                        className="p-1.5 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors disabled:opacity-40"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
