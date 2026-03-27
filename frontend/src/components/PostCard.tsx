import { Trash2, Clock, User } from 'lucide-react';
import { Post } from '../types';
import { getCategoryStyle } from '../utils/categories';

interface Props {
  post: Post;
  onDelete?: (id: number) => void;
  isDeleting?: boolean;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  });
}

export default function PostCard({ post, onDelete, isDeleting }: Props) {
  const { bg, text, border } = getCategoryStyle(post.category);

  return (
    <article className="card p-6 flex flex-col gap-3 animate-slide-up">
      <div className="flex items-start justify-between gap-3">
        <span className={`category-badge ${bg} ${text} ${border}`}>
          {post.category}
        </span>
        {onDelete && (
          <button
            onClick={() => onDelete(post.id)}
            disabled={isDeleting}
            className="btn-danger shrink-0"
            title="Delete post"
          >
            <Trash2 size={14} className="inline mr-1" />
            Delete
          </button>
        )}
      </div>

      <h3 className="font-display text-xl font-semibold text-ink-900 leading-snug">
        {post.title}
      </h3>

      <p className="font-body text-ink-600 text-sm leading-relaxed line-clamp-3">
        {post.description}
      </p>

      <div className="flex items-center gap-4 mt-auto pt-2 border-t border-ink-100 text-xs text-ink-400 font-mono">
        <span className="flex items-center gap-1">
          <Clock size={11} />
          {formatDate(post.created_at)}
        </span>
        {post.user_email && (
          <span className="flex items-center gap-1 truncate">
            <User size={11} />
            {post.user_email}
          </span>
        )}
      </div>
    </article>
  );
}
