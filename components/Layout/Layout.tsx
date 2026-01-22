
import React from 'react';
import { User } from '@supabase/supabase-js';
import { LogOut, User as UserIcon, MapPin } from 'lucide-react';
import { supabase } from '../../services/supabase.ts';
import { toast } from 'react-hot-toast';

interface LayoutProps {
  user: User;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ user, children }) => {
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) toast.error('Logout failed');
  };

  const firstName = user.user_metadata?.first_name || '';
  const lastName = user.user_metadata?.last_name || '';
  const fullName = `${firstName} ${lastName}`.trim() || user.email?.split('@')[0];
  const branch = user.user_metadata?.branch || 'General';

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-4">
              <img 
                src="https://www.ginzalimited.com/cdn/shop/files/Ginza_logo.jpg?v=1668509673&width=500" 
                alt="Ginza Industries" 
                className="h-12 object-contain"
              />
              <div className="hidden sm:flex flex-col border-l border-slate-200 pl-4">
                <p className="text-[10px] text-slate-400 font-black tracking-widest uppercase mb-0.5">Ginza Industries</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-indigo-600 flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {branch}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden md:flex flex-col items-end">
                <span className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <UserIcon className="h-3.5 w-3.5 text-slate-400" /> {fullName}
                </span>
                <span className="text-[10px] text-slate-400 font-bold lowercase">{user.email}</span>
              </div>
              <button 
                onClick={handleLogout}
                className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all border border-transparent hover:border-red-100"
                title="Sign Out"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <footer className="bg-white border-t border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs text-slate-400 flex items-center justify-center gap-2 font-medium">
            <span>🔐 Secure System</span>
            <span>•</span>
            <span>Encrypted Connection</span>
            <span>•</span>
            <span>Authorized Personnel Only</span>
          </p>
        </div>
      </footer>
    </div>
  );
};
