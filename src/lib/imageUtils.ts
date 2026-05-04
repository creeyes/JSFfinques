import { propertiesApi } from './api'

const MAX_PX = 2400 // píxeles máximos en el lado largo

export function isHeicFile(file: File): boolean {
  return (
    file.type === 'image/heic' ||
    file.type === 'image/heif' ||
    /\.heic$/i.test(file.name) ||
    /\.heif$/i.test(file.name)
  )
}

async function resizeToJpeg(blob: Blob, name: string): Promise<File> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(blob)
    const img = new Image()
    img.onload = () => {
      URL.revokeObjectURL(url)
      const ratio = Math.min(1, MAX_PX / Math.max(img.naturalWidth, img.naturalHeight))
      const w = Math.round(img.naturalWidth * ratio)
      const h = Math.round(img.naturalHeight * ratio)
      const canvas = document.createElement('canvas')
      canvas.width = w
      canvas.height = h
      canvas.getContext('2d')!.drawImage(img, 0, 0, w, h)
      canvas.toBlob(outBlob => {
        if (!outBlob) { reject(new Error('No se pudo procesar la imagen')); return }
        resolve(new File([outBlob], name, { type: 'image/jpeg' }))
      }, 'image/jpeg', 0.88)
    }
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Error al cargar imagen')) }
    img.src = url
  })
}

export async function toJpeg(file: File): Promise<File> {
  const jpegName = file.name.replace(/\.[^.]+$/, '.jpg')

  if (isHeicFile(file)) {
    // El browser no puede decodificar HEIC en Chrome/Firefox.
    // Enviamos al backend (pillow_heif) y recibimos el JPEG para preview y subida.
    const blob = await propertiesApi.convertHeic(file)
    return new File([blob], jpegName, { type: 'image/jpeg' })
  }

  return resizeToJpeg(file, jpegName)
}
