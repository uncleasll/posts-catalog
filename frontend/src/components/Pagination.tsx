import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  page: number;
  total: number;
  limit: number;
  onChange: (page: number) => void;
}

export default function Pagination({ page, total, limit, onChange }: Props) {
  const totalPages = Math.ceil(total / limit);
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className="btn-ghost p-2 disabled:opacity-40"
      >
        <ChevronLeft size={16} />
      </button>

      <div className="flex items-center gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={`w-9 h-9 rounded-sm font-mono text-sm font-medium transition-all ${
              p === page
                ? 'bg-ink-950 text-parchment'
                : 'hover:bg-ink-100 text-ink-600'
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      <button
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        className="btn-ghost p-2 disabled:opacity-40"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
