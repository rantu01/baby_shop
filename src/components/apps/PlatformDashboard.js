'use client';

import { useEffect, useState } from 'react';
import {
  TrendingUp, DollarSign, ShoppingBag, Users, AlertTriangle,
  ArrowUpRight, ArrowDownRight, Building2, Package, Factory, Activity
} from 'lucide-react';
import { useCompany } from '@/providers/CompanyContext';

export default function PlatformDashboard() {
  const { activeCompany } = useCompany();
  const [data, setData] = useState(null);

  useEffect(() => {
    async function load() {
      const res = await fetch('/api/company');
      const d = await res.json();
      setData(d);
    }
    load();
  }, [activeCompany]);

  const stats = [
    { label: 'Total Revenue', value: '৳2.84Cr', change: 12.5, icon: DollarSign, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
    { label: 'Active Orders', value: '156', change: 8.2, icon: ShoppingBag, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { label: 'Total Employees', value: '1,240', change: 3.1, icon: Users, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20' },
    { label: 'Inventory Value', value: '৳7.85Cr', change: -2.4, icon: Package, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold gradient-text">Platform Overview</h1>
          <p className="text-sm text-text-muted mt-1">Consolidated view across all 6 application suites</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-xs font-medium">
          <Activity className="w-3.5 h-3.5" />
          {activeCompany === 'baby-shop' ? 'Baby Shop Ltd.' : 'SNS'} Active
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="stat-card">
              <div className="flex items-start justify-between">
                <div className={`p-2.5 rounded-lg ${s.bg}`}>
                  <Icon className={`w-5 h-5 ${s.color}`} />
                </div>
                <span className={`flex items-center gap-0.5 text-xs font-medium ${s.change >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                  {s.change >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {Math.abs(s.change)}%
                </span>
              </div>
              <div className="mt-3">
                <div className="text-2xl font-bold">{s.value}</div>
                <div className="text-xs text-text-muted mt-0.5">{s.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 glass-card p-5">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-primary-500" />
            Application Suites Quick Access
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { id: 'business', label: 'Business Core', desc: 'Product, POS, Deposits, Inventory', color: 'border-l-blue-500', Icon: Package },
              { id: 'hr', label: 'HR & Payroll', desc: 'Employees, Payroll, Attendance', color: 'border-l-emerald-500', Icon: Users },
              { id: 'manufacturing', label: 'Manufacturing', desc: 'Production, QC, Sub-contractors', color: 'border-l-amber-500', Icon: Factory },
              { id: 'rd-automation', label: 'R&D & Automation', desc: 'AI Actions, Heatmap, Approvals', color: 'border-l-purple-500', Icon: Bot },
              { id: 'ecommerce', label: 'E-Commerce', desc: 'Orders, Returns, Analytics', color: 'border-l-rose-500', Icon: ShoppingCart },
              { id: 'executive', label: 'Executive Mobile', desc: 'MD Dashboard, AI Assistant', color: 'border-l-cyan-500', Icon: Smartphone },
            ].map(app => {
              const Icn = app.Icon;
              return (
                <div key={app.id} className={`p-3.5 rounded-lg bg-surface-alt dark:bg-dark-surface-alt border-l-4 ${app.color} cursor-pointer hover:shadow-sm transition-all`}>
                  <Icn className="w-4 h-4 text-text-secondary dark:text-dark-text-secondary mb-1.5" />
                  <div className="text-sm font-medium">{app.label}</div>
                  <div className="text-xs text-text-muted mt-0.5">{app.desc}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="glass-card p-5">
          <h2 className="font-semibold mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            Urgent Actions
          </h2>
          <div className="space-y-2.5">
            {[
              { task: 'Deposit overdue - Mohakhali', priority: 'High' },
              { task: 'QC failure >15% on PO-004', priority: 'Urgent' },
              { task: 'Stock critical - Romper Uttara', priority: 'High' },
              { task: 'Payroll June pending approval', priority: 'Urgent' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-surface-alt dark:bg-dark-surface-alt">
                <div className={`w-2 h-2 rounded-full mt-1.5 ${item.priority === 'Urgent' ? 'bg-red-500' : 'bg-amber-500'}`} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm">{item.task}</div>
                  <span className={`badge ${item.priority === 'Urgent' ? 'badge-danger' : 'badge-warning'} mt-1`}>{item.priority}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="glass-card p-4 md:p-5">
        <h2 className="font-semibold mb-3">Multi-Company Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {[
            { name: 'Baby Shop Ltd.', code: 'BSL', outlets: 62, revenue: '৳2.84Cr', profit: '৳92.5L' },
            { name: 'SNS', code: 'SNS', outlets: 18, revenue: '৳1.23Cr', profit: '৳36L' },
          ].map(c => (
            <div key={c.name} className="p-3 md:p-4 rounded-lg bg-surface-alt dark:bg-dark-surface-alt">
              <div className="flex items-center gap-2 mb-2 md:mb-3">
                <div className="w-3 h-3 rounded-full bg-primary-500 shrink-0" />
                <span className="font-medium text-sm md:text-base">{c.name}</span>
                <span className="badge badge-info text-[10px]">{c.code}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 md:gap-3 text-center">
                <div className="min-w-0">
                  <div className="text-base md:text-lg font-bold">{c.outlets}</div>
                  <div className="text-[11px] md:text-xs text-text-muted truncate">Outlets</div>
                </div>
                <div className="min-w-0">
                  <div className="text-base md:text-lg font-bold truncate">{c.revenue}</div>
                  <div className="text-[11px] md:text-xs text-text-muted truncate">Revenue</div>
                </div>
                <div className="min-w-0">
                  <div className="text-base md:text-lg font-bold truncate">{c.profit}</div>
                  <div className="text-[11px] md:text-xs text-text-muted truncate">Profit</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Bot(props) { return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="18" height="18" x="3" y="3" rx="4"/><path d="M8 12h8"/><path d="M12 8v8"/></svg> }
function Smartphone(props) { return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg> }
function ShoppingCart(props) { return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg> }
