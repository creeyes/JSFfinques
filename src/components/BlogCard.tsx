import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../types';

interface BlogCardProps {
  post: BlogPost;
  key?: string | number;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link to={`/blog/${post.id}`} className="flex flex-col group">
      <div className="relative aspect-[4/3] mb-6 overflow-hidden rounded-xl bg-surface-container-low">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded text-[10px] font-bold tracking-widest uppercase text-primary">
          {post.category}
        </div>
      </div>
      <h3 className="text-2xl font-bold text-primary mb-4 leading-snug group-hover:text-secondary transition-colors">
        {post.title}
      </h3>
      <p className="text-secondary text-sm leading-relaxed mb-6">
        {post.excerpt}
      </p>
      <div className="mt-auto text-sm font-bold text-primary flex items-center gap-2 group-hover:gap-4 transition-all">
        Leer más <ArrowRight className="w-4 h-4" />
      </div>
    </Link>
  );
}
