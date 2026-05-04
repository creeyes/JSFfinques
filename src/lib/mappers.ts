import { Property, BlogPost } from '../types'
import { ApiProperty, ApiPost } from './api'

function formatBlogDate(iso: string): string {
  if (!iso) return ''
  const d = new Date(iso)
  if (isNaN(d.getTime())) return iso
  return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function toProperty(p: ApiProperty): Property {
  return {
    id: String(p.id),
    title: p.title,
    type: p.type,
    location: p.location,
    price: Number(p.price),
    priceUnit: p.priceUnit,
    sqm: p.sqm,
    rooms: p.rooms,
    bathrooms: p.bathrooms ?? undefined,
    garage: p.garage ?? undefined,
    images: p.images.map(img => img.url),
    exclusive: p.exclusive,
    rented: p.rented,
    featured: p.featured,
    description: p.description,
  }
}

export function toPost(p: ApiPost): BlogPost {
  return {
    id: String(p.id),
    title: p.title,
    category: p.category,
    date: formatBlogDate(p.date),
    excerpt: p.excerpt,
    image: p.image_url,
    author: p.author ?? { name: 'JSF Finques', role: '', avatar: '' },
    content: p.content,
  }
}
