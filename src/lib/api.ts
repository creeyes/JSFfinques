const BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api'

function token() {
  return localStorage.getItem('jsf_token')
}

async function req<T = unknown>(path: string, opts: RequestInit = {}): Promise<T> {
  const tok = token()
  const headers: Record<string, string> = {}
  if (tok) headers['Authorization'] = `Token ${tok}`
  if (!(opts.body instanceof FormData)) headers['Content-Type'] = 'application/json'
  const res = await fetch(`${BASE}${path}`, { ...opts, headers: { ...headers, ...(opts.headers as Record<string, string> || {}) } })
  if (res.status === 204) return null as T
  const data = await res.json()
  if (!res.ok) throw data
  return data as T
}

function authedFormData(path: string, method: string, fd: FormData) {
  const tok = token()
  return fetch(`${BASE}${path}`, {
    method,
    headers: tok ? { Authorization: `Token ${tok}` } : {},
    body: fd,
  }).then(async r => {
    if (r.status === 204) return null
    const data = await r.json()
    if (!r.ok) throw data
    return data
  })
}

// ---------- Auth ----------
export const auth = {
  login: async (username: string, password: string) => {
    const res = await fetch(`${BASE}/auth/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
    const data = await res.json().catch(() => null)
    if (!res.ok) throw data || new Error('Credenciales incorrectas')
    localStorage.setItem('jsf_token', data.token)
    return data
  },
  logout: () => localStorage.removeItem('jsf_token'),
  isLoggedIn: () => !!token(),
}

// ---------- Properties ----------
export interface ApiImage { id: number; url: string; order: number }
export interface ApiProperty {
  id: number; title: string; type: 'Venta' | 'Alquiler'; location: string
  price: string; priceUnit: string; sqm: number; rooms: number
  bathrooms: number | null; garage: number | null
  exclusive: boolean; rented: boolean; featured: boolean; description: string
  images: ApiImage[]
}

export const propertiesApi = {
  list: (params?: { type?: 'Venta' | 'Alquiler' }): Promise<{ results: ApiProperty[] }> => {
    const q = params?.type ? `?type=${encodeURIComponent(params.type)}` : ''
    return req(`/properties/${q}`)
  },
  get: (id: number): Promise<ApiProperty> => req(`/properties/${id}/`),
  create: (data: Record<string, unknown>): Promise<ApiProperty> =>
    req('/properties/', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number, data: Record<string, unknown>): Promise<ApiProperty> =>
    req(`/properties/${id}/`, { method: 'PATCH', body: JSON.stringify(data) }),
  delete: (id: number): Promise<null> =>
    req(`/properties/${id}/`, { method: 'DELETE' }),
  reorder: (items: { id: number; order: number }[]): Promise<null> =>
    req('/properties/reorder/', { method: 'POST', body: JSON.stringify(items) }),
  /** Sube UNA imagen a Cloudinary. El backend acepta el campo 'images' (puede repetirse). */
  addImage: async (id: number, file: File, order: number): Promise<ApiImage> => {
    const fd = new FormData()
    fd.append('images', file)          // campo correcto según el backend
    fd.append('order', String(order))
    const res = await authedFormData(`/properties/${id}/images/`, 'POST', fd)
    // El backend devuelve { created: [ApiImage] }
    return (res as { created: ApiImage[] }).created[0]
  },
  /** Sube VARIAS imágenes en una sola petición multipart. */
  addImages: async (id: number, files: File[], startOrder: number): Promise<ApiImage[]> => {
    const fd = new FormData()
    files.forEach(f => fd.append('images', f))
    fd.append('order', String(startOrder))
    const res = await authedFormData(`/properties/${id}/images/`, 'POST', fd)
    return (res as { created: ApiImage[] }).created
  },
  deleteImage: (propertyId: number, imageId: number): Promise<null> =>
    req(`/properties/${propertyId}/images/${imageId}/`, { method: 'DELETE' }),
  convertHeic: async (file: File): Promise<Blob> => {
    const tok = token()
    const fd = new FormData()
    fd.append('image', file)
    const res = await fetch(`${BASE}/properties/convert-heic/`, {
      method: 'POST',
      headers: tok ? { Authorization: `Token ${tok}` } : {},
      body: fd,
    })
    if (!res.ok) throw new Error('convert-heic failed')
    return res.blob()
  },
}

// ---------- Blog ----------
export interface ApiAuthor { id: number; name: string; role: string; avatar_url: string }
export interface ApiPost {
  id: number; title: string; category: string; date: string; excerpt: string
  image_url: string; author: { name: string; role: string; avatar: string } | null
  content: string; published: boolean
}

export const blogApi = {
  list: (): Promise<{ results: ApiPost[] }> => req('/blog/'),
  get: (id: number): Promise<ApiPost> => req(`/blog/${id}/`),
  authors: (): Promise<{ results: ApiAuthor[] }> => req('/blog/authors/'),
  create: (fd: FormData): Promise<ApiPost> =>
    authedFormData('/blog/', 'POST', fd),
  update: (id: number, fd: FormData): Promise<ApiPost> =>
    authedFormData(`/blog/${id}/`, 'PATCH', fd),
  delete: (id: number): Promise<null> =>
    req(`/blog/${id}/`, { method: 'DELETE' }),
  createAuthor: (fd: FormData): Promise<ApiAuthor> =>
    authedFormData('/blog/authors/', 'POST', fd),
  updateAuthor: (id: number, fd: FormData): Promise<ApiAuthor> =>
    authedFormData(`/blog/authors/${id}/`, 'PATCH', fd),
  deleteAuthor: (id: number): Promise<null> =>
    req(`/blog/authors/${id}/`, { method: 'DELETE' }),
}

// ---------- Messages ----------
export interface ApiMessage {
  id: number; name: string; email: string; phone: string
  message: string; read: boolean; created_at: string
}

export const messagesApi = {
  list: (): Promise<{ results: ApiMessage[] }> => req('/contact/'),
  markRead: (id: number): Promise<ApiMessage> =>
    req(`/contact/${id}/`, { method: 'PATCH', body: JSON.stringify({ read: true }) }),
  delete: (id: number): Promise<null> =>
    req(`/contact/${id}/`, { method: 'DELETE' }),
  create: (data: { name: string; email: string; phone?: string; message: string; website?: string }): Promise<{ detail: string }> =>
    req('/contact/', { method: 'POST', body: JSON.stringify(data) }),
}
