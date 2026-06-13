'use client';

import { useState, useEffect } from 'react';
import { ShoppingCart, Package, RefreshCw, MapPin, Truck, CheckCircle, Clock, AlertTriangle, Search, Filter } from 'lucide-react';
import { useCompany } from '@/providers/CompanyContext';
import { useToast } from '@/providers/ToastContext';

const orderStatusBadge = {
  'Pending': 'badge-warning',
  'Picked': 'badge-info',
  'Packed': 'badge-info',
  'Shipped': 'badge-info',
  'Delivered': 'badge-success',
  'Return Initiated': 'badge-danger',
};

const returnStatusBadge = {
  'Pending Inspection': 'badge-warning',
  'Item Received': 'badge-info',
  'Refunded': 'badge-success',
  'Rejected': 'badge-danger',
};

export default function ECommerceDashboard() {
  const { activeCompany } = useCompany();
  const { addToast } = useToast();
  const [orders, setOrders] = useState([]);
  const [returns, setReturns] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orderFilter, setOrderFilter] = useState('all');

  useEffect(() => {
    loadAll();
  }, [activeCompany]);

  async function loadAll() {
    setLoading(true);
    try {
      const [oRes, rRes] = await Promise.all([
        fetch('/api/orders'),
        fetch('/api/returns'),
      ]);
      const oData = await oRes.json();
      const rData = await rRes.json();
      setOrders(oData.orders);
      setSummary(oData.summary);
      setReturns(rData.returns);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function handleReturnAction(id, status) {
    try {
      await fetch('/api/returns', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      addToast(`Return ${id} marked as ${status}`, 'success');
      loadAll();
    } catch (e) {
      addToast('Failed to update return', 'error');
    }
  }

  const filteredOrders = orderFilter === 'all' ? orders : orders.filter(o => o.status.toLowerCase().includes(orderFilter));

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <RefreshCw className="w-6 h-6 animate-spin text-primary-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold gradient-text">E-Commerce Operations</h1>
          <p className="text-sm text-text-muted mt-1">Multi-channel order management & fulfillment</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="badge badge-info">Central WH Fulfillment</span>
          <span className="badge badge-success">Nearest Outlet Returns</span>
        </div>
      </div>

      {summary && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <div className="stat-card"><div className="text-2xl font-bold">{summary.totalOrders}</div><div className="text-xs text-text-muted">Total Orders</div></div>
          <div className="stat-card"><div className="text-2xl font-bold text-amber-500">{summary.pending}</div><div className="text-xs text-text-muted">Pending</div></div>
          <div className="stat-card"><div className="text-2xl font-bold text-blue-500">{summary.shipped}</div><div className="text-xs text-text-muted">Shipped</div></div>
          <div className="stat-card"><div className="text-2xl font-bold text-red-500">{summary.returned}</div><div className="text-xs text-text-muted">Returns</div></div>
          <div className="stat-card"><div className="text-2xl font-bold text-emerald-500">৳{(summary.revenue / 1000).toFixed(1)}K</div><div className="text-xs text-text-muted">Today Revenue</div></div>
        </div>
      )}

      <div className="glass-card p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold flex items-center gap-2"><Package className="w-4 h-4 text-primary-500" /> Order Management</h2>
          <div className="flex gap-1">
            {['all', 'pending', 'picked', 'shipped', 'delivered', 'return'].map(f => (
              <button key={f} onClick={() => setOrderFilter(f)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                  orderFilter === f ? 'bg-primary-600 text-white' : 'bg-surface-alt dark:bg-dark-surface-alt text-text-muted hover:text-text'
                }`}
              >{f.charAt(0).toUpperCase() + f.slice(1)}</button>
            ))}
          </div>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr><th>Order ID</th><th>Customer</th><th>Items</th><th>Total</th><th>Payment</th><th>Status</th><th>Fulfillment</th><th>Date</th></tr>
            </thead>
            <tbody>
              {filteredOrders.map(o => (
                <tr key={o.id}>
                  <td className="font-mono text-xs">{o.id}</td>
                  <td className="font-medium">{o.customer}</td>
                  <td>{o.items}</td>
                  <td>৳{o.total.toLocaleString()}</td>
                  <td><span className="badge badge-neutral">{o.payment}</span></td>
                  <td><span className={`badge ${orderStatusBadge[o.status] || 'badge-neutral'}`}>{o.status}</span></td>
                  <td>{o.fulfillment}</td>
                  <td className="text-text-muted text-xs">{o.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="glass-card p-5">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-amber-500" /> Return Management
          </h2>
          <div className="table-container">
            <table>
              <thead>
                <tr><th>Return</th><th>Customer</th><th>Item</th><th>Reason</th><th>Condition</th><th>Status</th><th>Action</th></tr>
              </thead>
              <tbody>
                {returns.map(r => (
                  <tr key={r.id}>
                    <td className="font-mono text-xs">{r.id}</td>
                    <td>{r.customer}</td>
                    <td className="text-xs">{r.item}</td>
                    <td className="text-xs text-text-muted">{r.reason}</td>
                    <td><span className={`badge ${r.condition === 'Resaleable' ? 'badge-success' : 'badge-danger'}`}>{r.condition}</span></td>
                    <td><span className={`badge ${returnStatusBadge[r.status] || 'badge-neutral'}`}>{r.status}</span></td>
                    <td>
                      {r.status === 'Pending Inspection' && (
                        <div className="flex gap-1">
                          <button onClick={() => handleReturnAction(r.id, 'Item Received')} className="btn-success text-[11px] px-2 py-1">Receive</button>
                          <button onClick={() => handleReturnAction(r.id, 'Rejected')} className="btn-danger text-[11px] px-2 py-1">Reject</button>
                        </div>
                      )}
                      {r.status === 'Item Received' && (
                        <button onClick={() => handleReturnAction(r.id, 'Refunded')} className="btn-primary text-[11px] px-2 py-1">Process Refund</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="glass-card p-5">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-rose-500" /> Nearest Branch Return Routing
          </h2>
          <div className="space-y-3">
            <div className="p-4 rounded-lg bg-surface-alt dark:bg-dark-surface-alt border-l-4 border-l-rose-500">
              <div className="text-sm font-medium">Return Flow: Online → Nearest Outlet</div>
              <div className="mt-2 space-y-1.5">
                {[
                  'Customer initiates return on website',
                  'System identifies nearest outlet by customer address',
                  'Customer drops item at assigned outlet',
                  'Outlet inspects: Resaleable → add to outlet stock | Defective → route to factory',
                  'Refund processed via original payment method',
                  'Return data feeds analytics & QC review',
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs">
                    <div className="w-5 h-5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">{i + 1}</div>
                    <span className="text-text-secondary dark:text-dark-text-secondary">{step}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30">
              <div className="flex items-start gap-2 text-xs">
                <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-amber-800 dark:text-amber-300">Active Return: </span>
                  <span className="text-amber-700 dark:text-amber-400">Arif Hossain - Boys Denim Jacket (Size mismatch) → Nearest outlet: Dhanmondi</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card p-5">
        <h2 className="font-semibold mb-3 flex items-center gap-2">
          <Search className="w-4 h-4 text-primary-500" /> AI-Powered Storefront Features
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'AI Search', desc: 'Natural language product search', color: 'border-l-purple-500' },
            { label: 'Recommendations', desc: 'Personalized "You May Also Like"', color: 'border-l-blue-500' },
            { label: 'AI Chatbot', desc: '24/7 support in Bengali & English', color: 'border-l-emerald-500' },
            { label: 'Visual Search', desc: 'Search by uploading a photo', color: 'border-l-rose-500' },
            { label: 'Sizing Assistant', desc: 'AI recommends correct size', color: 'border-l-cyan-500' },
            { label: 'Multi-Language', desc: 'Bengali & English UI', color: 'border-l-amber-500' },
            { label: 'Multi-Country', desc: 'Configurable shipping zones', color: 'border-l-indigo-500' },
            { label: 'Flash Sales', desc: 'Countdown timers & urgency', color: 'border-l-red-500' },
          ].map(f => (
            <div key={f.label} className={`p-3 rounded-lg bg-surface-alt dark:bg-dark-surface-alt border-l-4 ${f.color}`}>
              <div className="text-sm font-medium">{f.label}</div>
              <div className="text-xs text-text-muted mt-0.5">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
