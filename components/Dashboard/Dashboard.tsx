
import React, { useState } from 'react';
import { PlusCircle, History, MapPin, ShieldCheck } from 'lucide-react';
import { OrderForm } from '../OrderForm/OrderForm.tsx';
import { OrderHistory } from '../History/OrderHistory.tsx';
import { User } from '@supabase/supabase-js';

interface DashboardProps {
  user: User;
}

export const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'new-order' | 'history'>('new-order');

  const firstName = user.user_metadata?.first_name || '';
  const lastName = user.user_metadata?.last_name || '';
  const fullName = `${firstName} ${lastName}`.trim() || user.email?.split('@')[0];
  const branch = user.user_metadata?.branch || 'N/A';

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="bg-indigo-50 p-3 rounded-xl">
            <ShieldCheck className="h-6 w-6 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              Welcome, {fullName}
            </h2>
            <div className="flex items-center gap-1.5 text-slate-500 mt-1 uppercase tracking-widest font-black text-[10px]">
              <MapPin className="h-3 w-3 text-indigo-500" />
              <span>{branch} Branch Office</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap bg-slate-100 p-1 rounded-xl shadow-inner gap-1">
          <button
            onClick={() => setActiveTab('new-order')}
            className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-lg text-xs sm:text-sm font-black transition-all ${
              activeTab === 'new-order' 
                ? 'bg-white text-indigo-600 shadow-md' 
                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
            }`}
          >
            <PlusCircle className="h-4 w-4" />
            New Order
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-lg text-xs sm:text-sm font-black transition-all ${
              activeTab === 'history' 
                ? 'bg-white text-indigo-600 shadow-md' 
                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
            }`}
          >
            <History className="h-4 w-4" />
            History
          </button>
        </div>
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
        {activeTab === 'new-order' && <OrderForm />}
        {activeTab === 'history' && <OrderHistory />}
      </div>
    </div>
  );
};
