import { useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { usePosts, useCategories } from '../hooks/usePosts';
import { useDebounce } from '../hooks/useDebounce';
import PostCard from '../components/PostCard';
import PostSkeleton from '../components/PostSkeleton';
import Pagination from '../components/Pagination';

const LIMIT = 9;

export default function AllPostsPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search, 400);

  const { data, isLoading, isError } = usePosts({
    search: debouncedSearch || undefined,
    category: category || undefined,
    page,
    limit: LIMIT,
  });

  const { data: categories } = useCategories();

  const handleSearch = (v: string) => {
    setSearch(v);
    setPage(1);
  };

  const handleCategory = (c: string) => {
    setCategory(c);
    setPage(1);
  };

  const clearFilters = () => {
    setSearch('');
    setCategory('');
    setPage(1);
  };

  const hasFilters = search || category;

  return (
    <div className="animate-fade-in">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        {/* Search */}
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
          <input
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search posts…"
            className="input-field pl-9"
          />
        </div>

        {/* Category filter */}
        <div className="relative sm:w-48">
          <SlidersHorizontal size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
          <select
            value={category}
            onChange={(e) => handleCategory(e.target.value)}
            className="input-field pl-9 appearance-none"
          >
            <option value="">All categories</option>
            {(categories ?? []).map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Clear */}
        {hasFilters && (
          <button onClick={clearFilters} className="btn-ghost flex items-center gap-1.5 shrink-0">
            <X size={14} />
            Clear
          </button>
        )}
      </div>

      {/* Results meta */}
      {data && (
        <p className="text-xs font-mono text-ink-400 mb-4">
          {data.total} post{data.total !== 1 ? 's' : ''} found
          {debouncedSearch && ` for "${debouncedSearch}"`}
          {category && ` in ${category}`}
        </p>
      )}

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: LIMIT }).map((_, i) => <PostSkeleton key={i} />)}
        </div>
      ) : isError ? (
        <div className="text-center py-20 text-rust font-body">
          <p className="text-lg font-semibold">Failed to load posts</p>
          <p className="text-sm mt-1 text-ink-500">Please check your connection and try again.</p>
        </div>
      ) : !data?.posts.length ? (
        <div className="text-center py-20 text-ink-400 font-body">
          <p className="text-4xl mb-3">📭</p>
          <p className="text-lg font-semibold text-ink-600">No posts found</p>
          <p className="text-sm mt-1">
            {hasFilters ? 'Try adjusting your filters.' : 'Be the first to publish!'}
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          <Pagination
            page={page}
            total={data.total}
            limit={LIMIT}
            onChange={setPage}
          />
        </>
      )}
    </div>
  );
}
