import { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import {
  DndContext, closestCenter, PointerSensor,
  useSensor, useSensors, DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext, verticalListSortingStrategy,
  useSortable, arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { propertiesApi, ApiProperty } from '../../lib/api'
import { Plus, Pencil, Trash2, ImageOff, GripVertical } from 'lucide-react'

function SortableRow({ p, onDelete, deleting }: {
  p: ApiProperty
  onDelete: (p: ApiProperty) => void
  deleting: number | null
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: p.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : undefined,
  }

  return (
    <tr
      ref={setNodeRef}
      style={style}
      className="hover:bg-stone-50 transition-colors bg-white"
    >
      <td className="px-3 py-3">
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing text-stone-300 hover:text-stone-500 p-1 touch-none"
          title="Arrastrar para reordenar"
        >
          <GripVertical size={16} />
        </button>
      </td>
      <td className="px-4 py-3">
        {p.images[0] ? (
          <img src={p.images[0].url} alt="" className="w-12 h-9 object-cover rounded-md" />
        ) : (
          <div className="w-12 h-9 bg-stone-100 rounded-md flex items-center justify-center text-stone-300">
            <ImageOff size={14} />
          </div>
        )}
      </td>
      <td className="px-4 py-3 max-w-xs">
        <div className="font-medium text-stone-800 truncate">{p.title}</div>
        <div className="sm:hidden text-xs text-stone-400 truncate mt-0.5">{p.location}</div>
        <div className="sm:hidden mt-1 flex gap-1 flex-wrap">
          <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-medium ${
            p.type === 'Venta' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
          }`}>{p.type}</span>
          {p.featured && <span className="px-1.5 py-0.5 bg-yellow-100 text-yellow-700 rounded-full text-[10px] font-medium">⭐</span>}
          {p.rented && <span className="px-1.5 py-0.5 bg-red-100 text-red-600 rounded-full text-[10px] font-medium">Alquilada</span>}
        </div>
      </td>
      <td className="hidden sm:table-cell px-4 py-3">
        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
          p.type === 'Venta' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
        }`}>
          {p.type}
        </span>
      </td>
      <td className="hidden md:table-cell px-4 py-3 text-stone-500 truncate max-w-xs">{p.location}</td>
      <td className="hidden sm:table-cell px-4 py-3 text-right font-medium text-stone-700">
        {Number(p.price).toLocaleString('es-ES')} €{p.priceUnit ? `/${p.priceUnit.replace('€/', '')}` : ''}
      </td>
      <td className="hidden lg:table-cell px-4 py-3 text-center">
        <div className="flex flex-wrap gap-1 justify-center">
          {p.featured && (
            <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">⭐ Destacada</span>
          )}
          {p.exclusive && (
            <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">Exclusiva</span>
          )}
          {p.rented && (
            <span className="px-2 py-0.5 bg-red-100 text-red-600 rounded-full text-xs font-medium">Alquilada</span>
          )}
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2 justify-end">
          <Link
            to={`/admin/propiedades/${p.id}/editar`}
            className="p-1.5 text-stone-400 hover:text-amber-500 hover:bg-amber-50 rounded-md transition-colors"
          >
            <Pencil size={15} />
          </Link>
          <button
            onClick={() => onDelete(p)}
            disabled={deleting === p.id}
            className="p-1.5 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors disabled:opacity-40"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </td>
    </tr>
  )
}

export default function AdminProperties() {
  const [properties, setProperties] = useState<ApiProperty[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<number | null>(null)
  const [saving, setSaving] = useState(false)

  const sensors = useSensors(useSensor(PointerSensor, {
    activationConstraint: { distance: 5 },
  }))

  useEffect(() => { load() }, [])

  async function load() {
    try {
      const res = await propertiesApi.list()
      setProperties(res.results)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(p: ApiProperty) {
    if (!confirm(`¿Eliminar "${p.title}"? Esta acción no se puede deshacer.`)) return
    setDeleting(p.id)
    try {
      await propertiesApi.delete(p.id)
      setProperties(prev => prev.filter(x => x.id !== p.id))
    } finally {
      setDeleting(null)
    }
  }

  const handleDragEnd = useCallback(async (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    setProperties(prev => {
      const oldIndex = prev.findIndex(p => p.id === active.id)
      const newIndex = prev.findIndex(p => p.id === over.id)
      const reordered = arrayMove(prev, oldIndex, newIndex)

      // Persist new order to API
      setSaving(true)
      propertiesApi.reorder(reordered.map((p, i) => ({ id: p.id, order: i })))
        .finally(() => setSaving(false))

      return reordered
    })
  }, [])

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-stone-800">Propiedades</h1>
          <p className="text-stone-500 text-sm">
            {properties.length} propiedades en total
            {saving && <span className="ml-2 text-amber-500 text-xs">Guardando orden...</span>}
          </p>
        </div>
        <Link
          to="/admin/propiedades/nueva"
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
        >
          <Plus size={16} /> Nueva propiedad
        </Link>
      </div>

      {loading ? (
        <p className="text-stone-400 text-sm">Cargando...</p>
      ) : properties.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm">
          <p className="text-stone-400">No hay propiedades todavía.</p>
          <Link to="/admin/propiedades/nueva" className="text-amber-500 hover:underline text-sm mt-2 inline-block">
            Añadir la primera propiedad
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 text-stone-500 text-xs uppercase tracking-wide">
              <tr>
                <th className="w-8 px-3 py-3"></th>
                <th className="text-left px-4 py-3 w-16"></th>
                <th className="text-left px-4 py-3">Título</th>
                <th className="hidden sm:table-cell text-left px-4 py-3">Tipo</th>
                <th className="hidden md:table-cell text-left px-4 py-3">Ubicación</th>
                <th className="hidden sm:table-cell text-right px-4 py-3">Precio</th>
                <th className="hidden lg:table-cell text-center px-4 py-3">Estado</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={properties.map(p => p.id)} strategy={verticalListSortingStrategy}>
                <tbody className="divide-y divide-stone-100">
                  {properties.map(p => (
                    <SortableRow key={p.id} p={p} onDelete={handleDelete} deleting={deleting} />
                  ))}
                </tbody>
              </SortableContext>
            </DndContext>
          </table>
        </div>
      )}
    </div>
  )
}
