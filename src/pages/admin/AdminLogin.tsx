import { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../lib/api'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await auth.login(username, password)
      navigate('/admin/dashboard')
    } catch (err: any) {
      console.error(err);
      if (err instanceof TypeError) {
        setError('Error de red: revisa que el backend esté corriendo en el puerto 8000 y CORS.')
      } else if (err?.non_field_errors) {
        setError(err.non_field_errors[0])
      } else if (err?.detail) {
        setError(err.detail)
      } else {
        setError(err.message || 'Usuario o contraseña incorrectos')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-stone-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm p-8">
        <div className="text-center mb-8">
          <p className="text-xs tracking-widest text-stone-400 uppercase mb-1">Panel de administración</p>
          <h1 className="text-2xl font-bold text-stone-800">JSF Finques</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-stone-600 mb-1">Usuario</label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              autoFocus
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-600 mb-1">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-container disabled:opacity-50 text-white font-semibold rounded-lg py-2.5 text-sm transition-colors"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}
