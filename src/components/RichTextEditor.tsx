import { useEffect, useRef, useState } from 'react'
import { Bold, Underline, List, Maximize2, Minimize2, X } from 'lucide-react'

interface Props {
  value: string
  onChange: (html: string) => void
}

export default function RichTextEditor({ value, onChange }: Props) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [fullscreen, setFullscreen] = useState(false)
  const [activeFormats, setActiveFormats] = useState({ bold: false, underline: false })
  const lastValueRef = useRef(value)

  // Sync external value into the editor only when it actually changes from outside
  useEffect(() => {
    const el = editorRef.current
    if (!el) return
    if (lastValueRef.current !== value && el.innerHTML !== value) {
      el.innerHTML = value
      lastValueRef.current = value
    }
  }, [value])

  function exec(command: string) {
    editorRef.current?.focus()
    document.execCommand(command, false)
    updateActiveFormats()
    emitChange()
  }

  function updateActiveFormats() {
    setActiveFormats({
      bold: document.queryCommandState('bold'),
      underline: document.queryCommandState('underline'),
    })
  }

  function emitChange() {
    const html = editorRef.current?.innerHTML ?? ''
    lastValueRef.current = html
    onChange(html)
  }

  const toolbarBtn = (active: boolean) =>
    `p-1.5 rounded hover:bg-stone-200 transition-colors ${active ? 'bg-stone-200 text-primary' : 'text-stone-600'}`

  const editorClasses = fullscreen ? 'min-h-[60vh]' : 'min-h-[10rem]'

  const content = (
    <div className={`border border-stone-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary ${fullscreen ? 'flex flex-col flex-1' : ''}`}>
      {/* Toolbar */}
      <div className="flex items-center gap-1 px-2 py-1.5 border-b border-stone-200 bg-stone-50">
        <button type="button" title="Negrita" className={toolbarBtn(activeFormats.bold)} onMouseDown={e => { e.preventDefault(); exec('bold') }}>
          <Bold size={15} strokeWidth={2.5} />
        </button>
        <button type="button" title="Subrayado" className={toolbarBtn(activeFormats.underline)} onMouseDown={e => { e.preventDefault(); exec('underline') }}>
          <Underline size={15} />
        </button>
        <button type="button" title="Lista de puntos" className={toolbarBtn(false)} onMouseDown={e => { e.preventDefault(); exec('insertUnorderedList') }}>
          <List size={15} />
        </button>
        <div className="flex-1" />
        <button type="button" title={fullscreen ? 'Minimizar' : 'Ampliar'} className={toolbarBtn(false)} onClick={() => setFullscreen(f => !f)}>
          {fullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
        </button>
      </div>

      {/* Editable area */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        className={`w-full px-3 py-2 text-sm text-stone-800 outline-none overflow-y-auto ${editorClasses} [&_ul]:list-disc [&_ul]:pl-5`}
        onInput={emitChange}
        onKeyUp={updateActiveFormats}
        onMouseUp={updateActiveFormats}
      />
    </div>
  )

  if (fullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-6">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl flex flex-col" style={{ maxHeight: '90vh' }}>
          <div className="flex items-center justify-between px-4 py-3 border-b border-stone-200">
            <span className="text-sm font-medium text-stone-700">Descripción</span>
            <button type="button" onClick={() => setFullscreen(false)} className="text-stone-400 hover:text-stone-700">
              <X size={18} />
            </button>
          </div>
          <div className="flex flex-col flex-1 p-4 overflow-hidden">
            {content}
          </div>
        </div>
      </div>
    )
  }

  return content
}
