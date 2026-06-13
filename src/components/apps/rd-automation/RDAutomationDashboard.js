'use client';
import { useState, useEffect, useRef } from 'react';
import { Bot, Sparkles, CheckCircle, XCircle, AlertTriangle, Send, MessageSquare, MapPin, Activity, ThumbsUp, Zap } from 'lucide-react';
import { useCompany } from '@/providers/CompanyContext';
import { useToast } from '@/providers/ToastContext';
import { outlets } from '@/lib/mockData';

const presetQueries = [
  'Top selling styles', 'Low margin products', 'Outlet performance',
  'Attendance summary', 'Production status', 'Deposit status',
];

const priorityBadge = (p) => {
  if (!p) return null;
  const s = p.toLowerCase();
  if (s === 'urgent') return <span className="badge badge-danger">Urgent</span>;
  if (s === 'high') return <span className="badge badge-warning">High</span>;
  return <span className="badge badge-info">{p}</span>;
};

const statusBadge = (s) => {
  if (!s) return null;
  const l = s.toLowerCase();
  if (l === 'approved' || l === 'converted to po') return <span className="badge badge-success">{s}</span>;
  if (l === 'rejected') return <span className="badge badge-danger">{s}</span>;
  if (l === 'pending') return <span className="badge badge-warning">{s}</span>;
  return <span className="badge badge-info">{s}</span>;
};

export default function RDAutomationDashboard() {
  const { activeCompany } = useCompany();
  const { addToast } = useToast();
  const [aiQuery, setAiQuery] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [typingText, setTypingText] = useState('');
  const typingRef = useRef(null);

  const [actions, setActions] = useState([]);
  const [actionsLoading, setActionsLoading] = useState(true);
  const [approvals, setApprovals] = useState([]);
  const [approvalsLoading, setApprovalsLoading] = useState(true);
  const [prs, setPrs] = useState([]);
  const [prsLoading, setPrsLoading] = useState(true);
  const [aiQueriesToday, setAiQueriesToday] = useState(0);

  useEffect(() => {
    fetchActions();
    fetchApprovals();
    fetchPRs();
  }, [activeCompany]);

  useEffect(() => {
    if (typingRef.current) clearInterval(typingRef.current);
    typingRef.current = null;
    if (!aiResponse) {
      return;
    }
    let currentText = '';
    let idx = 0;
    const interval = setInterval(() => {
      idx++;
      if (idx <= aiResponse.length) {
        currentText = aiResponse.slice(0, idx);
        setTypingText(currentText);
      }
      if (idx >= aiResponse.length) {
        clearInterval(interval);
        typingRef.current = null;
      }
    }, 15);
    typingRef.current = interval;
    return () => {
      if (typingRef.current) clearInterval(typingRef.current);
    };
  }, [aiResponse]);

  async function fetchActions() {
    setActionsLoading(true);
    try {
      const res = await fetch('/api/actions');
      const data = await res.json();
      setActions(data.actions || []);
    } catch { /* ignore */ } finally {
      setActionsLoading(false);
    }
  }

  async function fetchApprovals() {
    setApprovalsLoading(true);
    try {
      const res = await fetch('/api/approvals');
      const data = await res.json();
      setApprovals(data.approvals || []);
    } catch { /* ignore */ } finally {
      setApprovalsLoading(false);
    }
  }

  async function fetchPRs() {
    setPrsLoading(true);
    try {
      const res = await fetch('/api/purchase-requisitions');
      const data = await res.json();
      setPrs(data.requisitions || []);
    } catch { /* ignore */ } finally {
      setPrsLoading(false);
    }
  }

  async function handleAiQuery(query) {
    setAiLoading(true);
    setAiResponse('');
    setTypingText('');
    if (typingRef.current) clearInterval(typingRef.current);
    setAiQueriesToday(prev => prev + 1);
    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      setAiResponse(data.response || data.message || JSON.stringify(data));
    } catch {
      setAiResponse('Sorry, I encountered an error processing your request.');
    } finally {
      setAiLoading(false);
    }
  }

  async function handleCompleteAction(id) {
    try {
      await fetch('/api/actions', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: 'Completed' }),
      });
      addToast('Action marked as complete', 'success');
      fetchActions();
    } catch { /* ignore */ }
  }

  async function handleApproval(id, status) {
    try {
      const res = await fetch('/api/approvals', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        addToast(`Request ${status}`, status === 'Approved' ? 'success' : 'error');
        fetchApprovals();
      }
    } catch { /* ignore */ }
  }

  const pendingApprovals = approvals.filter(a => a.status === 'Pending').length;
  const activeActions = actions.filter(a => {
    const p = (a.priority || '').toLowerCase();
    return p === 'urgent' || p === 'high';
  }).length;
  const openPRs = prs.filter(p => p.status === 'Pending').length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold gradient-text">R&D and Automation</h1>
          <p className="text-sm text-text-muted mt-1">AI-powered insights, approvals, and outlet monitoring</p>
        </div>
        <div className="badge badge-info">{activeCompany === 'baby-shop' ? 'Baby Shop Ltd.' : 'SNS'}</div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Pending Approvals', value: pendingApprovals, icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20' },
          { label: 'Active Actions', value: activeActions, icon: Zap, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
          { label: 'Open PRs', value: openPRs, icon: Activity, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20' },
          { label: 'AI Queries Today', value: aiQueriesToday, icon: Sparkles, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
        ].map(s => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="stat-card flex items-center gap-3">
              <div className={`p-2.5 rounded-lg ${s.bg}`}>
                <Icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <div>
                <div className="text-2xl font-bold">{s.value}</div>
                <div className="text-xs text-text-muted">{s.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="glass-card p-5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 pointer-events-none" />
        <div className="flex items-center gap-2 mb-4 relative z-10">
          <Bot className="w-5 h-5 text-purple-500" />
          <h2 className="font-semibold">AI Action Panel</h2>
        </div>
        <div className="flex flex-wrap gap-2 mb-4 relative z-10">
          {presetQueries.map(q => (
            <button key={q} onClick={() => handleAiQuery(q)} disabled={aiLoading}
              className="px-3 py-1.5 text-xs font-medium rounded-full border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors disabled:opacity-50"
            >{q}</button>
          ))}
        </div>
        {aiLoading && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-purple-50 dark:bg-purple-900/10 mb-3">
            <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
            <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" style={{ animationDelay: '0.2s' }} />
            <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" style={{ animationDelay: '0.4s' }} />
            <span className="text-sm text-purple-600 dark:text-purple-400 ml-1">Thinking...</span>
          </div>
        )}
        {aiResponse && !aiLoading && (
          <div className="p-3 rounded-lg bg-surface-alt dark:bg-dark-surface-alt mb-3">
            <div className="flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-purple-500 mt-0.5 shrink-0" />
              <div className="text-sm">{typingText}{typingText.length < (aiResponse?.length || 0) && <span className="animate-pulse">|</span>}</div>
            </div>
          </div>
        )}
        <div className="flex gap-2 relative z-10">
          <input type="text" value={aiQuery} onChange={e => setAiQuery(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && aiQuery.trim()) { handleAiQuery(aiQuery.trim()); setAiQuery(''); } }}
            placeholder="Ask anything about your business..."
            className="input flex-1" />
          <button onClick={() => { if (aiQuery.trim()) { handleAiQuery(aiQuery.trim()); setAiQuery(''); } }}
            disabled={aiLoading || !aiQuery.trim()}
            className="btn btn-primary flex items-center gap-1.5">
            <Send className="w-4 h-4" /> Send
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="glass-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <ThumbsUp className="w-5 h-5 text-blue-500" />
            <h2 className="font-semibold">My Action Suggestions</h2>
          </div>
          {actionsLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : actions.length === 0 ? (
            <p className="text-sm text-text-muted text-center py-8">No action items</p>
          ) : (
            <div className="space-y-2.5 max-h-80 overflow-y-auto">
              {actions.map(action => (
                <div key={action.id} className="flex items-start gap-3 p-3 rounded-lg bg-surface-alt dark:bg-dark-surface-alt">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium">{action.task}</div>
                    <div className="flex items-center gap-2 mt-1.5">
                      {priorityBadge(action.priority)}
                      <span className="text-xs text-text-muted">{action.assignee}</span>
                      {action.due && <span className="text-xs text-text-muted"> &bull; {action.due}</span>}
                    </div>
                  </div>
                  <button onClick={() => handleCompleteAction(action.id)}
                    className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
                    title="Mark complete">
                    <CheckCircle className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="glass-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-amber-500" />
            <h2 className="font-semibold">Approval Management</h2>
          </div>
          {approvalsLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="table-container">
              <table>
                <thead>
                  <tr><th>Type</th><th>Requester</th><th>Amount</th><th>Urgency</th><th>Action</th></tr>
                </thead>
                <tbody>
                  {approvals.filter(a => a.status === 'Pending').length > 0 ? (
                    approvals.filter(a => a.status === 'Pending').map(apr => (
                      <tr key={apr.id}>
                        <td>{apr.type}</td>
                        <td>{apr.requester}</td>
                        <td>{apr.amount > 0 ? `\u09F3${apr.amount.toLocaleString()}` : '-'}</td>
                        <td>{priorityBadge(apr.urgency)}</td>
                        <td>
                          <div className="flex items-center gap-1.5">
                            <button onClick={() => handleApproval(apr.id, 'Approved')}
                              className="p-1 rounded text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors">
                              <ThumbsUp className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleApproval(apr.id, 'Rejected')}
                              className="p-1 rounded text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                              <XCircle className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan={5} className="text-center py-4 text-sm text-text-muted">No pending approvals</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <div className="glass-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare className="w-5 h-5 text-blue-500" />
          <h2 className="font-semibold">Smart Purchase Requisitions</h2>
        </div>
        {prsLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr><th>ID</th><th>Item</th><th>Requester</th><th>Qty</th><th>Amount</th><th>Status</th></tr>
              </thead>
              <tbody>
                {prs.map(pr => (
                  <tr key={pr.id}>
                    <td className="font-mono text-xs">{pr.id}</td>
                    <td>{pr.item}</td>
                    <td>{pr.requester}</td>
                    <td>{pr.quantity} {pr.unit}</td>
                    <td>\u09F3{pr.amount.toLocaleString()}</td>
                    <td>{statusBadge(pr.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="glass-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="w-5 h-5 text-rose-500" />
          <h2 className="font-semibold">Branch Heatmap - Performance View</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {outlets.map(outlet => {
            const pct = outlet.target > 0 ? ((outlet.todaySales / outlet.target) * 100) : 0;
            const color = outlet.todaySales >= outlet.target
              ? 'bg-emerald-500'
              : outlet.todaySales >= outlet.target * 0.8
                ? 'bg-amber-400'
                : 'bg-red-400';
            return (
              <div key={outlet.name} className="p-3 rounded-lg bg-surface-alt dark:bg-dark-surface-alt text-center">
                <div className={`w-8 h-8 rounded-lg mx-auto mb-2 flex items-center justify-center text-white text-xs font-bold ${color}`}>
                  {Math.round(pct)}%
                </div>
                <div className="text-sm font-medium truncate">{outlet.name}</div>
                <div className="text-xs text-text-muted">{outlet.city}</div>
                <div className="text-xs text-text-muted">\u09F3{outlet.todaySales.toLocaleString()} / \u09F3{outlet.target.toLocaleString()}</div>
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-4 mt-4 text-xs text-text-muted">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-emerald-500" /> &gt;100% target
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-amber-400" /> 80-100% target
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-red-400" /> &lt;80% target
          </div>
        </div>
      </div>
    </div>
  );
}
