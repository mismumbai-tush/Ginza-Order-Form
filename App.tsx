
import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { supabase } from './services/supabase.ts';
import { AuthView } from './components/Auth/AuthView.tsx';
import { Dashboard } from './components/Dashboard/Dashboard.tsx';
import { Layout } from './components/Layout/Layout.tsx';
import { User } from '@supabase/supabase-js';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set a safety timeout to end loading after 5 seconds if auth check hangs
    const safetyTimeout = setTimeout(() => {
      if (loading) {
        setLoading(false);
        console.warn("Auth check timed out - proceeding to guest/login view");
      }
    }, 5000);

    // Check initial session
    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        setUser(session?.user ?? null);
      })
      .catch((err) => {
        console.error("Auth session error:", err);
        toast.error("Authentication check failed.");
      })
      .finally(() => {
        clearTimeout(safetyTimeout);
        setLoading(false);
      });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      clearTimeout(safetyTimeout);
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
          <p className="text-slate-500 text-sm font-medium animate-pulse">Initializing Secure Portal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Toaster position="top-right" />
      {!user ? (
        <AuthView />
      ) : (
        <Layout user={user}>
          <Dashboard user={user} />
        </Layout>
      )}
    </div>
  );
};

export default App;
