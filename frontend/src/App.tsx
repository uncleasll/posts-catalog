import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import AllPostsPage from './pages/AllPostsPage';
import MyPostsPage from './pages/MyPostsPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

type Tab = 'all' | 'my';

function AppContent() {
  const [tab, setTab] = useState<Tab>('all');

  return (
    <div className="min-h-screen">
      <Header />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Tab bar */}
        <div className="flex gap-0 border-b border-ink-200 mb-8">
          {(['all', 'my'] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`relative px-5 py-2.5 font-body font-medium text-sm transition-colors
                ${tab === t
                  ? 'text-ink-950 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-ink-950'
                  : 'text-ink-400 hover:text-ink-700'
                }`}
            >
              {t === 'all' ? 'All Posts' : 'My Posts'}
            </button>
          ))}
        </div>

        {tab === 'all' ? <AllPostsPage /> : <MyPostsPage />}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppContent />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              fontFamily: '"DM Sans", sans-serif',
              fontSize: '14px',
              background: '#261f1a',
              color: '#f5f0e8',
              borderRadius: '2px',
            },
          }}
        />
      </AuthProvider>
    </QueryClientProvider>
  );
}
