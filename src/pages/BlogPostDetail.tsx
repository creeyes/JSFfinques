import React, { useRef, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Calendar, Share2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { blogApi } from '../lib/api';
import { toPost } from '../lib/mappers';
import { BlogPost } from '../types';

export default function BlogPostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isSharing = useRef(false);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    blogApi.get(Number(id))
      .then(p => setPost(toPost(p)))
      .catch(() => setPost(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="pt-32 pb-24 text-center text-secondary">Cargando...</div>;
  }

  if (!post) {
    return (
      <div className="pt-32 pb-24 text-center">
        <h2 className="text-2xl font-bold text-primary">Artículo no encontrado</h2>
        <button
          onClick={() => navigate('/blog')}
          className="mt-4 text-primary font-bold hover:underline"
        >
          Volver al blog
        </button>
      </div>
    );
  }

  const handleShare = async () => {
    if (isSharing.current) return;

    const shareData = {
      title: post.title,
      text: `Lee este artículo de JSF Finques: ${post.title}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        isSharing.current = true;
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Enlace copiado al portapapeles');
      }
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        console.error('Error sharing:', err);
      }
    } finally {
      isSharing.current = false;
    }
  };

  return (
    <main className="pt-24 pb-24 bg-surface">
      {/* Navigation & Actions */}
      <div className="max-w-4xl mx-auto px-6 md:px-8 py-6 flex justify-between items-center">
        <button 
          onClick={() => navigate('/blog')}
          className="flex items-center gap-2 text-secondary hover:text-primary transition-colors font-bold text-sm"
        >
          <ChevronLeft className="w-5 h-5" />
          Volver al blog
        </button>
        <div className="flex gap-4">
          <button
            onClick={handleShare}
            className="p-2 rounded-full hover:bg-surface-container-high transition-colors text-secondary"
            title="Compartir artículo"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <header className="max-w-4xl mx-auto px-6 md:px-8 mb-12">
        <div className="flex items-center gap-3 mb-6">
          <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-primary text-white">
            {post.category}
          </span>
          <div className="flex items-center gap-2 text-secondary text-xs font-medium">
            <Calendar className="w-4 h-4" />
            {post.date}
          </div>
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-primary mb-8 leading-tight">
          {post.title}
        </h1>
        
        {post.author.name && (
          <div className="flex items-center gap-4 p-6 bg-surface-container-low rounded-2xl">
            {post.author.avatar ? (
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg shrink-0">
                {post.author.name.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <p className="font-bold text-primary text-sm">{post.author.name}</p>
              <p className="text-xs text-secondary">{post.author.role}</p>
            </div>
          </div>
        )}
      </header>

      {/* Featured Image */}
      <div className="max-w-5xl mx-auto px-6 md:px-8 mb-16">
        <div className="aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Content */}
      <article className="max-w-3xl mx-auto px-6 md:px-8">
        <div className="prose prose-slate lg:prose-xl max-w-none text-secondary leading-relaxed">
          <ReactMarkdown>
            {post.content || post.excerpt}
          </ReactMarkdown>
        </div>
      </article>

      {/* Related Posts CTA */}
      <section className="max-w-4xl mx-auto px-6 md:px-8 mt-24">
        <div className="bg-primary rounded-3xl p-8 md:p-12 text-center text-white shadow-xl">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">¿Necesita asesoramiento personalizado?</h3>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Nuestro equipo de expertos está a su disposición para resolver cualquier duda sobre el mercado inmobiliario en Martorell.
          </p>
          <button 
            onClick={() => navigate('/ubicacion')}
            className="bg-white text-primary px-8 py-4 rounded-xl font-bold hover:bg-surface-container-low transition-all shadow-lg"
          >
            Contactar con nosotros
          </button>
        </div>
      </section>
    </main>
  );
}
