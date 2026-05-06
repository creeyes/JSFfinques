import { useEffect, useRef, useState } from 'react'
import { Bold, Underline, List } from 'lucide-react'

interface Props {
  value: string
  onChange: (html: string) => void
}

export default function RichTextEditor({ value, onChange }: Props) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [activeFormats, setActiveFormats] = useState({ bold: false, underline: false })
  const lastValueRef = useRef(value)

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

  return (
    <div className="border border-stone-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary">
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
      </div>
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        className="w-full px-3 py-2 text-sm text-stone-800 outline-none min-h-[10rem] [&_ul]:list-disc [&_ul]:pl-5"
        onInput={emitChange}
        onKeyUp={updateActiveFormats}
        onMouseUp={updateActiveFormats}
      />
    </div>
  )
}
