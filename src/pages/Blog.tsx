import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { blogApi } from '../lib/api';
import { toPost } from '../lib/mappers';
import BlogCard from '../components/BlogCard';
import { BlogPost } from '../types';

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    blogApi.list()
      .then(res => setPosts(res.results.map(toPost)))
      .catch(() => {});
  }, []);

  const featuredPost = posts[0];
  const otherPosts = posts.slice(1);

  return (
    <main className="pt-32 pb-24">
      <header className="max-w-7xl mx-auto px-6 md:px-8 mb-12 md:mb-20 text-center">
        <span className="inline-block px-4 py-1.5 mb-6 text-[10px] md:text-xs font-bold tracking-[0.2em] text-primary bg-primary-fixed/30 rounded-full uppercase">El Blog de Martorell</span>
        <h1 className="text-4xl md:text-7xl font-extrabold text-primary tracking-tight leading-[1.1] mb-6">
          Actualidad Inmobiliaria y <br className="hidden md:block" /> Consejos de Expertos
        </h1>
        <p className="text-lg md:text-xl text-secondary max-w-2xl mx-auto leading-relaxed">
          Descubra las claves del mercado local en el Baix Llobregat de la mano de profesionales con más de 20 años de experiencia.
        </p>
      </header>

      {featuredPost && <section className="max-w-7xl mx-auto px-6 md:px-8 mb-16 md:mb-24">
        <Link to={`/blog/${featuredPost.id}`} className="block relative group overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm">
          <div className="grid md:grid-cols-2 gap-0 items-stretch">
            <div className="relative h-[300px] md:h-auto overflow-hidden">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="flex gap-4 items-center mb-6">
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-primary">{featuredPost.category}</span>
                <span className="h-px w-8 md:w-12 bg-surface-container-high"></span>
                <span className="text-[10px] md:text-xs text-secondary font-medium">{featuredPost.date}</span>
              </div>
              <h2 className="text-2xl md:text-4xl font-bold text-primary mb-6 leading-tight group-hover:text-secondary transition-colors">
                {featuredPost.title}
              </h2>
              <p className="text-secondary leading-relaxed mb-8 text-base md:text-lg">
                {featuredPost.excerpt}
              </p>
              {featuredPost.author.name && (
                <div className="flex items-center gap-4">
                  {featuredPost.author.avatar ? (
                    <img
                      src={featuredPost.author.avatar}
                      alt={featuredPost.author.name}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-surface-container-high object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shrink-0">
                      {featuredPost.author.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <p className="text-xs md:text-sm font-bold text-on-surface">{featuredPost.author.name}</p>
                    <p className="text-[10px] md:text-xs text-secondary">{featuredPost.author.role}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Link>
      </section>}

      <section className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {otherPosts.map(post => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </main>
  );
}
