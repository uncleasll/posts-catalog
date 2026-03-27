import { useState } from 'react';
import { LogOut, User, PenLine } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';
import CreatePostModal from './CreatePostModal';

export default function Header() {
  const { user, logOut } = useAuth();
  const [showAuth, setShowAuth] = useState(false);
  const [showCreate, setShowCreate] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-parchment/80 backdrop-blur border-b border-ink-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="font-display text-xl font-bold text-ink-950 tracking-tight">
              Posts<span className="text-sepia italic">Catalog</span>
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {user ? (
              <>
                <button
                  onClick={() => setShowCreate(true)}
                  className="btn-primary flex items-center gap-1.5 text-sm py-2"
                >
                  <PenLine size={14} />
                  <span className="hidden sm:inline">New Post</span>
                </button>
                <div className="flex items-center gap-1 text-ink-500 text-sm font-mono truncate max-w-[140px] hidden sm:flex">
                  <User size={13} />
                  {user.email}
                </div>
                <button
                  onClick={logOut}
                  className="btn-ghost flex items-center gap-1.5 text-sm py-2"
                  title="Sign out"
                >
                  <LogOut size={14} />
                  <span className="hidden sm:inline">Sign Out</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => setShowAuth(true)}
                className="btn-primary text-sm py-2"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </header>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
      {showCreate && <CreatePostModal onClose={() => setShowCreate(false)} />}
    </>
  );
}
