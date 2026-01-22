
import React, { useState, useEffect } from 'react';
import { Package, Search, Calendar, ChevronDown, ChevronUp, Clock, FileSpreadsheet } from 'lucide-react';
import { Order } from '../../types.ts';

export const OrderHistory: React.FC = () => {
  const [history, setHistory] = useState<Order[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const rawData = localStorage.getItem('ginza_order_history');
    if (rawData) {
      try {
        const parsed: Order[] = JSON.parse(rawData);
        
        // Retention Policy: 5 days (5 * 24 * 60 * 60 * 1000 = 432,000,000 ms)
        const FIVE_DAYS_MS = 432000000;
        const now = Date.now();
        
        const filtered = parsed.filter(order => (now - (order.timestamp || 0)) <= FIVE_DAYS_MS);
        
        // Update local storage if we removed old items
        if (filtered.length !== parsed.length) {
          localStorage.setItem('ginza_order_history', JSON.stringify(filtered));
        }
        
        setHistory(filtered);
      } catch (e) {
        console.error("Error parsing history", e);
      }
    }
  }, []);

  const filteredHistory = history.filter(order => 
    order.customer?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search history by ID or Customer..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {filteredHistory.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 shadow-sm">
          <Clock className="h-12 w-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500 font-medium">No recent orders found in the last 5 days.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredHistory.map((order) => (
            <div 
              key={order.id} 
              className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:border-indigo-300 transition-colors"
            >
              <div 
                className="px-6 py-4 flex items-center justify-between cursor-pointer"
                onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}
              >
                <div className="flex items-center gap-4">
                  <div className="bg-slate-100 p-2 rounded-lg">
                    <FileSpreadsheet className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900">{order.id}</span>
                      <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded">SYNCED</span>
                    </div>
                    <p className="text-xs text-slate-500">{order.customer?.name} • {order.branch}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="hidden md:block text-right">
                    <p className="text-xs font-bold text-slate-700">₹{order.items.reduce((s, i) => s + i.total, 0).toLocaleString()}</p>
                    <p className="text-[10px] text-slate-400 uppercase font-bold">{order.items.length} Items</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500 flex items-center gap-1 justify-end">
                      <Calendar className="h-3 w-3" />
                      {order.orderDate}
                    </p>
                  </div>
                  {expandedId === order.id ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
                </div>
              </div>

              {expandedId === order.id && (
                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 animate-in slide-in-from-top-2">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Sales Person</p>
                      <p className="text-xs font-semibold text-slate-700">{order.salesPerson}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Billing Address</p>
                      <p className="text-xs text-slate-600 truncate">{order.billingAddress}</p>
                    </div>
                    <div className="col-span-2">
                       <p className="text-[10px] font-bold text-slate-400 uppercase">Delivery Address</p>
                       <p className="text-xs text-slate-600 truncate">{order.deliveryAddress}</p>
                    </div>
                  </div>

                  <table className="w-full text-left bg-white rounded-lg border border-slate-200 overflow-hidden">
                    <thead className="bg-slate-100 text-[10px] font-bold text-slate-500 uppercase">
                      <tr>
                        <th className="px-3 py-2">Item</th>
                        <th className="px-3 py-2">Cat</th>
                        <th className="px-3 py-2 text-right">Qty</th>
                        <th className="px-3 py-2 text-right">Rate</th>
                        <th className="px-3 py-2 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {order.items.map(item => (
                        <tr key={item.id} className="text-xs">
                          <td className="px-3 py-2 font-medium">{item.itemName}</td>
                          <td className="px-3 py-2 text-slate-500">{item.category}</td>
                          <td className="px-3 py-2 text-right">{item.quantity} {item.uom}</td>
                          <td className="px-3 py-2 text-right">₹{item.rate}</td>
                          <td className="px-3 py-2 text-right font-bold">₹{item.total.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
