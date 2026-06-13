'use client';

import { useState, useEffect } from 'react';
import { Smartphone, BarChart3, CheckCircle, MessageSquare, Mic, Zap, TrendingUp, MapPin, Bell, ArrowUpRight, ArrowDownRight, Sun, Moon, Activity } from 'lucide-react';
import { useCompany } from '@/providers/CompanyContext';

export default function ExecutiveDashboard() {
  const { activeCompany } = useCompany();
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    async function load() {
      const compRes = await fetch('/api/company');
      const cData = await compRes.json();
      setDashboardData(cData);
    }
    load();
  }, [activeCompany]);

  async function handleAiQuery(query) {
    if (!query.trim()) return;
    setLoading(true);
    setAiResponse(null);
    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      setAiResponse(data);
    } catch (e) {
      setAiResponse({ response: 'Sorry, I encountered an error processing your request.', type: 'error' });
    } finally {
      setLoading(false);
    }
  }

  const presets = [
    { label: 'Revenue today?', query: 'What is today top selling styles' },
    { label: 'Outlet performance', query: 'Compare outlet performance' },
    { label: 'Production status', query: 'production status' },
    { label: 'Deposit alerts', query: 'deposit overdue' },
    { label: 'Attendance', query: 'attendance summary' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold gradient-text">Executive Command Center</h1>
          <p className="text-sm text-text-muted mt-1">MD / Director - AI-powered decision dashboard</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300 text-xs font-medium">
          <Smartphone className="w-3.5 h-3.5" />
          Mobile App View
        </div>
      </div>

      <div className="glass-card p-5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-accent-500/5 pointer-events-none" />
        <h2 className="font-semibold mb-3 flex items-center gap-2 relative z-10">
          <MessageSquare className="w-4 h-4 text-primary-500" />
          Ask AI - Executive Assistant
        </h2>
        <div className="flex flex-wrap gap-2 mb-3 relative z-10">
          {presets.map(p => (
            <button key={p.label} onClick={() => { setAiQuery(p.query); handleAiQuery(p.query); }}
              className="px-3 py-1.5 rounded-lg bg-surface-alt dark:bg-dark-surface-alt text-xs font-medium hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-700 dark:hover:text-primary-300 transition-all border border-border dark:border-dark-border"
            >{p.label}</button>
          ))}
        </div>
        <div className="flex gap-2 relative z-10">
          <input
            type="text"
            value={aiQuery}
            onChange={e => setAiQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAiQuery(aiQuery)}
            placeholder="Ask anything... 'What's the revenue this week?'"
            className="input flex-1"
          />
          <button onClick={() => handleAiQuery(aiQuery)} disabled={loading || !aiQuery.trim()}
            className="btn-primary"
          >
            {loading ? <Activity className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
            Ask
          </button>
        </div>
        {aiResponse && (
          <div className="mt-3 p-4 rounded-lg bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800/30 relative z-10 animate-fade-in">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center shrink-0">
                <MessageSquare className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-sm font-medium text-primary-800 dark:text-primary-200">AI Response</div>
                <p className="text-sm text-primary-700 dark:text-primary-300 mt-1">{aiResponse.response}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Total Revenue', value: '৳2.84Cr', change: 12.5, color: 'text-emerald-500' },
          { label: 'Active Outlets', value: '62', change: 0, color: 'text-blue-500' },
          { label: 'Pending Approvals', value: '7', change: -3, color: 'text-amber-500' },
          { label: 'AI Alerts Today', value: '4', change: 2, color: 'text-purple-500' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className="flex items-center justify-between">
              <div className="text-xs text-text-muted">{s.label}</div>
              {s.change !== 0 && (
                <span className={`flex items-center gap-0.5 text-xs ${s.change > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                  {s.change > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {Math.abs(s.change)}
                </span>
              )}
            </div>
            <div className={`text-xl font-bold mt-1 ${s.color}`}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="glass-card p-5">
          <h2 className="font-semibold mb-3 flex items-center gap-2">
            <Bell className="w-4 h-4 text-amber-500" />
            AI Digest - Morning Summary
          </h2>
          <div className="space-y-2">
            {[
              { icon: TrendingUp, text: 'Yesterday\'s revenue: ৳28.45L (12.5% above target)', color: 'text-emerald-500' },
              { icon: MapPin, text: 'Mohakhali outlet 17% below target - AI recommends check-in', color: 'text-red-500' },
              { icon: Activity, text: 'Production PO-004 at 93% - on track for June 18 delivery', color: 'text-blue-500' },
              { icon: CheckCircle, text: '3 deposit verifications pending from yesterday', color: 'text-amber-500' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex items-start gap-3 p-2.5 rounded-lg bg-surface-alt dark:bg-dark-surface-alt">
                  <Icon className={`w-4 h-4 mt-0.5 ${item.color}`} />
                  <span className="text-sm">{item.text}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="glass-card p-5">
          <h2 className="font-semibold mb-3 flex items-center gap-2">
            <Zap className="w-4 h-4 text-purple-500" />
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'View Branch Heatmap', icon: MapPin, color: 'bg-blue-500' },
              { label: 'Pending Approvals', icon: CheckCircle, color: 'bg-amber-500' },
              { label: 'Production Status', icon: Activity, color: 'bg-emerald-500' },
              { label: 'Financial Summary', icon: TrendingUp, color: 'bg-purple-500' },
              { label: 'Cross-Company View', icon: Sun, color: 'bg-cyan-500' },
              { label: 'AI Voice Query', icon: Mic, color: 'bg-rose-500' },
            ].map((action, i) => {
              const Icon = action.icon;
              return (
                <button key={i} className="flex items-center gap-2.5 p-3 rounded-lg bg-surface-alt dark:bg-dark-surface-alt hover:bg-surface-hover dark:hover:bg-dark-surface-hover transition-all text-left">
                  <div className={`w-8 h-8 rounded-lg ${action.color} flex items-center justify-center`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">{action.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="glass-card p-5">
        <h2 className="font-semibold mb-3 flex items-center gap-2">
          <Smartphone className="w-4 h-4 text-cyan-500" />
          Mobile App Preview - Cross Company View
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: 'Baby Shop Ltd.', color: 'from-blue-500 to-blue-700', revenue: '৳2.84Cr', profit: '92.5L', attendance: '94%', orders: 156, alerts: 2 },
            { name: 'SNS', color: 'from-purple-500 to-purple-700', revenue: '৳1.23Cr', profit: '36L', attendance: '91%', orders: 68, alerts: 1 },
          ].map(c => (
            <div key={c.name} className={`p-4 rounded-xl bg-gradient-to-br ${c.color} text-white`}>
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold">{c.name}</span>
                <span className="text-xs opacity-80">Today</span>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div><div className="text-lg font-bold">{c.revenue}</div><div className="text-[10px] opacity-80">Revenue</div></div>
                <div><div className="text-lg font-bold">{c.profit}</div><div className="text-[10px] opacity-80">Profit</div></div>
                <div><div className="text-lg font-bold">{c.attendance}</div><div className="text-[10px] opacity-80">Attendance</div></div>
              </div>
              <div className="mt-3 pt-3 border-t border-white/20 flex justify-between text-xs">
                <span>{c.orders} Orders</span>
                <span className="flex items-center gap-1"><Bell className="w-3 h-3" />{c.alerts} Alerts</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
