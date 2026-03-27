import { useState } from 'react';
import { PenLine, LogIn } from 'lucide-react';
import { useMyPosts, useDeletePost } from '../hooks/usePosts';
import { useAuth } from '../context/AuthContext';
import PostCard from '../components/PostCard';
import PostSkeleton from '../components/PostSkeleton';
import Pagination from '../components/Pagination';
import CreatePostModal from '../components/CreatePostModal';

const LIMIT = 9;

export default function MyPostsPage() {
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const [showCreate, setShowCreate] = useState(false);

  const { data, isLoading } = useMyPosts(user?.uid, page);
  const { mutate: deletePost, isPending: isDeleting } = useDeletePost();

  if (!user) {
    return (
      <div className="text-center py-24 animate-fade-in">
        <LogIn size={40} className="mx-auto text-ink-300 mb-4" />
        <p className="font-display text-2xl font-semibold text-ink-700">Sign in to see your posts</p>
        <p className="text-sm text-ink-400 mt-2 font-body">
          Create an account or sign in to start publishing.
        </p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-ink-900">My Posts</h2>
          {data && (
            <p className="text-xs font-mono text-ink-400 mt-0.5">
              {data.total} post{data.total !== 1 ? 's' : ''}
            </p>
          )}
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="btn-primary flex items-center gap-1.5 text-sm"
        >
          <PenLine size={14} />
          New Post
        </button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => <PostSkeleton key={i} />)}
        </div>
      ) : !data?.posts.length ? (
        <div className="text-center py-20 text-ink-400 font-body">
          <p className="text-4xl mb-3">✍️</p>
          <p className="text-lg font-semibold text-ink-600">No posts yet</p>
          <p className="text-sm mt-1">Click "New Post" to write your first one.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onDelete={(id) => deletePost({ postId: id, userId: user.uid })}
                isDeleting={isDeleting}
              />
            ))}
          </div>
          <Pagination page={page} total={data.total} limit={LIMIT} onChange={setPage} />
        </>
      )}

      {showCreate && <CreatePostModal onClose={() => setShowCreate(false)} />}
    </div>
  );
}
