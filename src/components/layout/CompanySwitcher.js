'use client';

import { Building2, ChevronDown, Check } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useCompany } from '@/providers/CompanyContext';
import { companies } from '@/lib/mockData';

export default function CompanySwitcher() {
  const { activeCompany, switchCompany, isSwitching } = useCompany();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const current = companies.find(c => c.id === activeCompany) || companies[0];

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 md:gap-2.5 glass-card px-2 md:px-3.5 py-2 text-sm font-medium hover:bg-surface-hover dark:hover:bg-dark-surface-hover transition-all"
      >
        <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: current.color }} />
        <span className="hidden sm:inline truncate max-w-[80px] md:max-w-none">{current.name}</span>
        <ChevronDown className={`w-4 h-4 text-text-muted transition-transform shrink-0 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute top-full mt-2 right-0 glass-card p-1.5 min-w-[180px] md:min-w-[220px] shadow-lg z-50 animate-fade-in">
          {companies.map(c => (
            <button
              key={c.id}
              onClick={() => { switchCompany(c.id); setOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                activeCompany === c.id
                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                  : 'hover:bg-surface-hover dark:hover:bg-dark-surface-hover text-text dark:text-dark-text'
              }`}
              disabled={isSwitching}
            >
              <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
              <div className="flex-1 text-left min-w-0">
                <div className="font-medium truncate">{c.name}</div>
                <div className="text-xs text-text-muted">{c.outlets} outlets</div>
              </div>
              {activeCompany === c.id && <Check className="w-4 h-4 shrink-0" />}
            </button>
          ))}
          {isSwitching && (
            <div className="px-3 py-2 text-xs text-text-muted flex items-center gap-2">
              <div className="w-3 h-3 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
              Switching...
            </div>
          )}
        </div>
      )}
    </div>
  );
}
