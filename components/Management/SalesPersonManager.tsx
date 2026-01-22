
import React, { useState, useEffect } from 'react';
import { UserPlus, Trash2, Users, Loader2, MapPin, Plus, DatabaseBackup, CheckCircle2 } from 'lucide-react';
import { supabase } from '../../services/supabase.ts';
import { BRANCHES } from '../../constants.ts';
import { toast } from 'react-hot-toast';

// The list of initial staff members you provided
const INITIAL_STAFF_DATA = [
  { branch: 'Mumbai', name: 'Amit Korgaonkar' },
  { branch: 'Mumbai', name: 'Santosh Pachratkar' },
  { branch: 'Mumbai', name: 'Rakesh Jain' },
  { branch: 'Mumbai', name: 'Kamlesh Sutar' },
  { branch: 'Mumbai', name: 'Pradeep Jadhav' },
  { branch: 'Mumbai', name: 'Mumbai HO' },
  { branch: 'Ulhasnagar', name: 'Shiv Ratan' },
  { branch: 'Ulhasnagar', name: 'Viay Sutar' },
  { branch: 'Ulhasnagar', name: 'Ulasnagar HO' },
  { branch: 'Kolkata', name: 'Rajesh Jain' },
  { branch: 'Kolkata', name: 'Kolkata HO' },
  { branch: 'Jaipur', name: 'Durgesh Bhati' },
  { branch: 'Jaipur', name: 'Jaipur HO' },
  { branch: 'Delhi', name: 'Lalit Maroo' },
  { branch: 'Delhi', name: 'Anish Jain' },
  { branch: 'Delhi', name: 'Suresh Nautiyal' },
  { branch: 'Delhi', name: 'Rahul Vashishtha' },
  { branch: 'Delhi', name: 'Mohit Sharma' },
  { branch: 'Delhi', name: 'Delhi HO' },
  { branch: 'Banglore', name: 'Balasubramanyam' },
  { branch: 'Banglore', name: 'Tarachand' },
  { branch: 'Banglore', name: 'Banglore HO' },
  { branch: 'Tirupur', name: 'Alexander Pushkin' },
  { branch: 'Tirupur', name: 'Subramanian' },
  { branch: 'Tirupur', name: 'Mani Maran' },
  { branch: 'Tirupur', name: 'Tirupur HO' },
  { branch: 'Ahmedabad', name: 'ravindra kaushik' },
  { branch: 'Ahmedabad', name: 'Ahmedabad HO' },
  { branch: 'Surat', name: 'Anil Marthe' },
  { branch: 'Surat', name: 'Raghuveer Darbar' },
  { branch: 'Surat', name: 'Sailesh Pathak' },
  { branch: 'Surat', name: 'Vanraj Darbar' },
  { branch: 'Surat', name: 'Surat HO' }
];

export const SalesPersonManager: React.FC = () => {
  const [selectedBranch, setSelectedBranch] = useState(BRANCHES[0]);
  const [salesPersons, setSalesPersons] = useState<{ id: string, name: string }[]>([]);
  const [newName, setNewName] = useState('');
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [isImporting, setIsImporting] = useState(false);

  const fetchSalesPersons = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('sales_persons')
        .select('id, name')
        .eq('branch', selectedBranch)
        .order('name', { ascending: true });
      
      if (error) throw error;
      setSalesPersons(data || []);
    } catch (error: any) {
      console.error('Error fetching staff:', error);
      toast.error('Ensure "sales_persons" table exists in Supabase.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSalesPersons();
  }, [selectedBranch]);

  const handleImportInitialData = async () => {
    if (!confirm('This will import all the original salesperson names for all branches. Continue?')) return;
    setIsImporting(true);
    try {
      const { error } = await supabase
        .from('sales_persons')
        .insert(INITIAL_STAFF_DATA);
      
      if (error) throw error;
      toast.success('Initial staff list imported successfully!');
      fetchSalesPersons();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsImporting(false);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    setAdding(true);
    try {
      const { error } = await supabase
        .from('sales_persons')
        .insert([{ name: newName.trim(), branch: selectedBranch }]);
      
      if (error) throw error;
      toast.success('Salesperson added successfully');
      setNewName('');
      fetchSalesPersons();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this salesperson?')) return;
    try {
      const { error } = await supabase
        .from('sales_persons')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      toast.success('Removed from list');
      fetchSalesPersons();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Setup Action */}
      <div className="bg-indigo-600 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-center md:text-left">
          <div className="bg-white/20 p-3 rounded-xl">
            <DatabaseBackup className="h-6 w-6" />
          </div>
          <div>
            <h4 className="font-black text-lg tracking-tight">Initial Setup Required?</h4>
            <p className="text-indigo-100 text-xs font-medium uppercase tracking-widest">Import the original Ginza staff list in one click.</p>
          </div>
        </div>
        <button
          onClick={handleImportInitialData}
          disabled={isImporting}
          className="bg-white text-indigo-600 px-8 py-3 rounded-xl text-sm font-black uppercase tracking-tighter hover:bg-indigo-50 transition-all flex items-center gap-2 shadow-lg disabled:opacity-50"
        >
          {isImporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
          Import Initial Ginza Team
        </button>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-slate-900 p-3 rounded-2xl shadow-lg">
            <Users className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase">Staff Management</h3>
            <p className="text-xs text-slate-400 font-bold tracking-widest uppercase">Select a branch to manage names</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-black text-slate-500 uppercase mb-2 tracking-widest flex items-center gap-2">
                <MapPin className="h-3 w-3" /> Step 1: Select Branch
              </label>
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="w-full border-2 border-slate-100 rounded-2xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-indigo-500 outline-none bg-slate-50 cursor-pointer"
              >
                {BRANCHES.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>

            <form onSubmit={handleAdd} className="space-y-4">
              <label className="block text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <UserPlus className="h-3 w-3" /> Step 2: Add New Personnel
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Enter full name..."
                  className="w-full border-2 border-slate-100 rounded-2xl px-5 py-3 text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none pr-12 shadow-inner"
                />
                <button
                  type="submit"
                  disabled={adding || !newName.trim()}
                  className="absolute right-2 top-2 p-1.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-md active:scale-90"
                >
                  {adding ? <Loader2 className="h-5 w-5 animate-spin" /> : <Plus className="h-5 w-5" />}
                </button>
              </div>
            </form>
          </div>

          <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 min-h-[350px]">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center justify-between">
              <span className="flex items-center gap-2"><CheckCircle2 className="h-3 w-3 text-emerald-500" /> {selectedBranch} Staff List</span>
              <span className="bg-slate-200 text-slate-600 px-2 py-0.5 rounded-lg font-black">{salesPersons.length}</span>
            </h4>

            {loading ? (
              <div className="flex flex-col items-center justify-center h-48 gap-3 text-slate-400">
                <Loader2 className="h-8 w-8 animate-spin" />
                <p className="text-[10px] font-bold uppercase tracking-widest">Fetching Personnel...</p>
              </div>
            ) : salesPersons.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-48 text-center px-6">
                <Users className="h-10 w-10 text-slate-200 mb-2" />
                <p className="text-xs font-bold text-slate-400 uppercase leading-relaxed">No staff assigned yet.<br/>Use the form or import button.</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                {salesPersons.map((person) => (
                  <div 
                    key={person.id} 
                    className="flex items-center justify-between bg-white px-4 py-3 rounded-xl border border-slate-100 shadow-sm group hover:border-indigo-200 transition-all"
                  >
                    <span className="text-sm font-black text-slate-700 tracking-tight">{person.name}</span>
                    <button
                      onClick={() => handleDelete(person.id)}
                      className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                      title="Delete Name"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
