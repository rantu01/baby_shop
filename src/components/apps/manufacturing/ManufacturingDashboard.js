'use client';
import { useState, useEffect, useMemo } from 'react';
import { Factory, Truck, BarChart3, CheckCircle, Clock, AlertTriangle, ChevronRight, Layers, RefreshCw } from 'lucide-react';
import { useCompany } from '@/providers/CompanyContext';
import { useToast } from '@/providers/ToastContext';

const stageDefs = [
  { name: 'Pattern & Cutting', key: 'Cutting' },
  { name: 'Sewing', key: 'Sewing' },
  { name: 'Embroidery', key: 'Embroidery' },
  { name: 'Washing & Dyeing', key: 'Washing' },
  { name: 'QC', key: 'QC Check' },
  { name: 'Finishing', key: 'Finishing' },
  { name: 'Packaging', key: 'Packaging' },
  { name: 'Finished Goods Transfer', key: 'Transfer' },
];

export default function ManufacturingDashboard() {
  const { activeCompany } = useCompany();
  const { addToast } = useToast();
  const [orders, setOrders] = useState([]);
  const [subcontractors, setSubcontractors] = useState([]);
  const [jobOrders, setJobOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const [prodRes, subRes] = await Promise.all([
          fetch('/api/production'),
          fetch('/api/subcontractors'),
        ]);
        const prodData = await prodRes.json();
        const subData = await subRes.json();
        setOrders(prodData.orders || []);
        setSubcontractors(subData.subcontractors || []);
        setJobOrders(subData.jobWorkOrders || []);
      } catch (e) {
        addToast('Failed to load manufacturing data', 'error');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [activeCompany, addToast]);

  const stages = useMemo(() => {
    const activeStages = new Set(orders.map(o => o.stage));
    return stageDefs.map(s => ({ ...s, active: activeStages.has(s.key) }));
  }, [orders]);

  async function handleMarkComplete(jwoId) {
    setCompleting(jwoId);
    try {
      const res = await fetch('/api/subcontractors', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: jwoId, status: 'Completed' }),
      });
      if (res.ok) {
        setJobOrders(prev => prev.map(j => j.id === jwoId ? { ...j, status: 'Completed' } : j));
        addToast(`Job work order ${jwoId} marked complete`, 'success');
      } else {
        addToast('Failed to update job work order', 'error');
      }
    } catch {
      addToast('Failed to update job work order', 'error');
    } finally {
      setCompleting(null);
    }
  }

  const activeOrders = orders.filter(o => o.status !== 'Completed').length;
  const avgEfficiency = orders.length
    ? Math.round(orders.reduce((s, o) => s + (o.targetQty ? (o.completedQty / o.targetQty) * 100 : 0), 0) / orders.length)
    : 0;
  const pendingQc = orders.filter(o => o.stage === 'QC Check').length;

  const getPctClass = (pct) => {
    if (pct >= 100) return 'bg-emerald-500';
    if (pct >= 50) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const badgeMap = {
    Urgent: 'badge-danger', High: 'badge-warning', Medium: 'badge-info', Low: 'badge-neutral',
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center gap-3 text-text-muted">
          <RefreshCw className="w-5 h-5 animate-spin" />
          <span className="text-sm">Loading manufacturing data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold gradient-text">Manufacturing Dashboard</h1>
          <p className="text-sm text-text-muted mt-1">Production, subcontracting and efficiency monitoring</p>
        </div>
        <div className="badge badge-info">{activeCompany === 'baby-shop' ? 'Baby Shop Ltd.' : 'SNS'}</div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Active Orders', value: activeOrders, icon: Factory, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
          { label: 'Sub-contractors', value: subcontractors.length, icon: Truck, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20' },
          { label: 'Avg Efficiency', value: `${avgEfficiency}%`, icon: BarChart3, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
          { label: 'Pending QC', value: pendingQc, icon: CheckCircle, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20' },
        ].map(s => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="stat-card">
              <div className={`p-2.5 rounded-lg inline-flex ${s.bg}`}>
                <Icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <div className="mt-3">
                <div className="text-2xl font-bold">{s.value}</div>
                <div className="text-xs text-text-muted mt-0.5">{s.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="glass-card p-5">
        <h2 className="font-semibold mb-4 flex items-center gap-2">
          <Layers className="w-4 h-4 text-primary-500" />
          Production Order Tracker
        </h2>
        <div className="table-container">
          <table>
            <thead>
              <tr><th>ID</th><th>Style</th><th>Target</th><th>Completed %</th><th>Stage</th><th>Status</th><th>Due Date</th><th>Priority</th></tr>
            </thead>
            <tbody>
              {orders.map(o => {
                const pct = o.targetQty ? Math.min(Math.round((o.completedQty / o.targetQty) * 100), 100) : 0;
                const statusClass = o.status === 'Completed' ? 'badge-success' : o.status === 'In Progress' ? 'badge-warning' : 'badge-neutral';
                return (
                  <tr key={o.id}>
                    <td className="font-medium">{o.id}</td>
                    <td className="text-text-muted">{o.style}</td>
                    <td>{o.targetQty.toLocaleString()}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                          <div className={`h-full rounded-full ${getPctClass(pct)} transition-all`} style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-xs font-medium w-10 text-right">{pct}%</span>
                      </div>
                    </td>
                    <td className="text-text-muted">{o.stage}</td>
                    <td><span className={`badge ${statusClass}`}>{o.status}</span></td>
                    <td className="text-text-muted">{o.dueDate}</td>
                    <td><span className={`badge ${badgeMap[o.priority] || 'badge-neutral'}`}>{o.priority}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3 glass-card p-5">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <Factory className="w-4 h-4 text-primary-500" />
            Production Stage Flow
          </h2>
          <div className="flex flex-wrap items-center gap-1.5">
            {stages.map((s, i) => (
              <div key={s.name} className="flex items-center gap-1.5">
                <div className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  s.active
                    ? 'bg-primary-500 text-white shadow-md shadow-primary-500/30 scale-105'
                    : 'bg-surface-alt dark:bg-dark-surface-alt text-text-muted'
                }`}>
                  {s.name}
                </div>
                {i < stages.length - 1 && (
                  <ChevronRight className={`w-3.5 h-3.5 ${s.active ? 'text-primary-500' : 'text-text-muted/40'}`} />
                )}
              </div>
            ))}
          </div>
          <div className="mt-3 text-xs text-text-muted">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-primary-500" /> Active stage with orders
            </span>
          </div>
        </div>

        <div className="lg:col-span-2 glass-card p-5">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-emerald-500" />
            Efficiency Metrics
          </h2>
          <div className="space-y-3">
            {[
              { label: 'Line Efficiency', value: 78.5, color: 'bg-emerald-500' },
              { label: 'Operator Performance', value: 82, color: 'bg-blue-500' },
              { label: 'Machine Utilization', value: 76, color: 'bg-purple-500' },
            ].map(m => (
              <div key={m.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-text-muted">{m.label}</span>
                  <span className="font-medium">{m.value}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                  <div className={`h-full rounded-full ${m.color}`} style={{ width: `${m.value}%` }} />
                </div>
              </div>
            ))}
            <div className="pt-1">
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 text-xs">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span><strong>Bottleneck:</strong> Sewing stage</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card p-5">
        <h2 className="font-semibold mb-4 flex items-center gap-2">
          <Truck className="w-4 h-4 text-purple-500" />
          Sub-Contractor Management
        </h2>
        <div className="table-container mb-4">
          <table>
            <thead>
              <tr><th>Name</th><th>Specialty</th><th>Active Jobs</th><th>On-Time Rate</th><th>QC Pass Rate</th><th>Balance</th></tr>
            </thead>
            <tbody>
              {subcontractors.map(sc => (
                <tr key={sc.id}>
                  <td className="font-medium">{sc.name}</td>
                  <td><span className="badge badge-info">{sc.specialty}</span></td>
                  <td>{sc.activeJobs}</td>
                  <td><span className={sc.onTimeRate >= 90 ? 'text-emerald-600 dark:text-emerald-400' : sc.onTimeRate >= 80 ? 'text-amber-600 dark:text-amber-400' : 'text-red-600 dark:text-red-400'}>{sc.onTimeRate}%</span></td>
                  <td><span className={sc.qcPassRate >= 90 ? 'text-emerald-600 dark:text-emerald-400' : sc.qcPassRate >= 80 ? 'text-amber-600 dark:text-amber-400' : 'text-red-600 dark:text-red-400'}>{sc.qcPassRate}%</span></td>
                  <td className="font-medium">৳{sc.balance.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
          <Clock className="w-4 h-4 text-text-muted" />
          Active Job Work Orders
        </h3>
        <div className="table-container">
          <table>
            <thead>
              <tr><th>JWO ID</th><th>Sub-contractor</th><th>Style</th><th>Quantity</th><th>Rate</th><th>Status</th><th>Due Date</th><th>Action</th></tr>
            </thead>
            <tbody>
              {jobOrders.map(jwo => (
                <tr key={jwo.id}>
                  <td className="font-medium">{jwo.id}</td>
                  <td className="text-text-muted">{jwo.subcontractor}</td>
                  <td className="text-text-muted">{jwo.style}</td>
                  <td>{jwo.quantity.toLocaleString()}</td>
                  <td>৳{jwo.rate}</td>
                  <td>
                    <span className={`badge ${jwo.status === 'Completed' ? 'badge-success' : jwo.status === 'In Progress' ? 'badge-warning' : 'badge-neutral'}`}>
                      {jwo.status}
                    </span>
                  </td>
                  <td className="text-text-muted">{jwo.dueDate}</td>
                  <td>
                    {jwo.status !== 'Completed' ? (
                      <button onClick={() => handleMarkComplete(jwo.id)} disabled={completing === jwo.id}
                        className="btn btn-success text-xs px-2 py-1 flex items-center gap-1">
                        {completing === jwo.id ? <RefreshCw className="w-3 h-3 animate-spin" /> : <CheckCircle className="w-3 h-3" />}
                        {completing === jwo.id ? '...' : 'Complete'}
                      </button>
                    ) : (
                      <span className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" /> Done
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
