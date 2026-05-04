import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  return (
    <div className="fixed bottom-8 right-8 z-50">
      <a
        href="https://wa.me/34654178938"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-primary text-white p-4 rounded-full flex items-center gap-2 shadow-xl hover:scale-110 transition-transform active:scale-95 group"
      >
        <MessageCircle className="w-6 h-6 fill-current" />
        <span className="text-white font-bold uppercase tracking-widest text-[10px] pr-2 hidden group-hover:block">
          WhatsApp
        </span>
      </a>
    </div>
  );
}
