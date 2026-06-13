'use client';

import {
  LayoutDashboard, Package, Users, Factory, Bot, ShoppingCart, Smartphone,
  Menu, X, Bell, Search
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCompany } from '@/providers/CompanyContext';
import CompanySwitcher from './CompanySwitcher';

const navItems = [
  { id: 'dashboard', label: 'Platform Dashboard', icon: LayoutDashboard, color: 'text-primary-500' },
  { id: 'business', label: 'Business App (Core)', icon: Package, color: 'text-blue-500' },
  { id: 'hr', label: 'HR & Payroll', icon: Users, color: 'text-emerald-500' },
  { id: 'manufacturing', label: 'Manufacturing', icon: Factory, color: 'text-amber-500' },
  { id: 'rd-automation', label: 'R&D & Automation', icon: Bot, color: 'text-purple-500' },
  { id: 'ecommerce', label: 'E-Commerce', icon: ShoppingCart, color: 'text-rose-500' },
  { id: 'executive', label: 'Executive Mobile', icon: Smartphone, color: 'text-cyan-500' },
];

export default function Sidebar({ activeView, onNavigate, mobileOpen, onMobileToggle }) {
  const [collapsed, setCollapsed] = useState(false);
  const { isSwitching } = useCompany();

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const renderNav = (closeSidebar) => (
    <>
      <div className="flex items-center gap-3 px-4 h-16 border-b border-border dark:border-dark-border shrink-0">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shrink-0">
          <span className="text-white font-bold text-sm">E</span>
        </div>
        {!collapsed && <span className="font-semibold text-sm whitespace-nowrap">Enterprise Suite</span>}
        <button onClick={() => setCollapsed(!collapsed)} className="ml-auto p-1.5 rounded-lg hover:bg-surface-hover dark:hover:bg-dark-surface-hover text-text-muted hidden md:block">
          {collapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
        </button>
        {closeSidebar && (
          <button onClick={closeSidebar} className="ml-2 p-1.5 rounded-lg hover:bg-surface-hover dark:hover:bg-dark-surface-hover text-text-muted md:hidden">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto p-2 space-y-1">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button key={item.id}
              onClick={() => { onNavigate(item.id); if (closeSidebar) closeSidebar(); }}
              className={`w-full sidebar-link ${isActive ? 'active' : ''}`}
              title={collapsed ? item.label : undefined}
            >
              <Icon className={`w-5 h-5 shrink-0 ${isActive ? item.color : ''}`} />
              {!collapsed && <span className="truncate">{item.label}</span>}
              {!collapsed && isActive && <div className="w-1.5 h-1.5 rounded-full bg-primary-500 ml-auto shrink-0" />}
            </button>
          );
        })}
      </nav>

      <div className="p-3 border-t border-border dark:border-dark-border">
        {!collapsed && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-alt dark:bg-dark-surface-alt text-xs text-text-muted">
            <div className={`w-2 h-2 rounded-full shrink-0 ${isSwitching ? 'bg-amber-400 animate-pulse' : 'bg-accent-500'}`} />
            {isSwitching ? 'Switching Company...' : 'System Online'}
          </div>
        )}
      </div>
    </>
  );

  return (
    <>
      <aside className={`fixed left-0 top-0 h-full z-40 flex-col glass border-r border-border dark:border-dark-border transition-all duration-300 hidden md:flex ${
        collapsed ? 'w-[72px]' : 'w-64'
      }`}>
        {renderNav(null)}
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onMobileToggle} />
          <aside className="absolute left-0 top-0 h-full w-72 flex flex-col glass border-r border-border dark:border-dark-border shadow-2xl animate-fade-in">
            {renderNav(onMobileToggle)}
          </aside>
        </div>
      )}

      <header className={`fixed top-0 right-0 h-16 z-30 glass border-b border-border dark:border-dark-border flex items-center justify-between px-3 md:px-6 transition-all duration-300 ${
        collapsed ? 'md:left-[72px]' : 'md:left-64'
      } left-0`}>
        <div className="flex items-center gap-2 md:gap-4 flex-1 min-w-0">
          <button onClick={onMobileToggle} className="md:hidden p-2 -ml-1.5 rounded-lg hover:bg-surface-hover dark:hover:bg-dark-surface-hover text-text-secondary">
            <Menu className="w-5 h-5" />
          </button>
          <div className="relative max-w-md w-full hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input type="text" placeholder="Search..." className="input pl-9 py-2 text-sm" />
          </div>
        </div>
        <div className="flex items-center gap-1.5 md:gap-3">
          <CompanySwitcher />
          <button className="relative p-2 rounded-lg hover:bg-surface-hover dark:hover:bg-dark-surface-hover transition-colors">
            <Bell className="w-5 h-5 text-text-secondary" />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">3</span>
          </button>
          <div className="flex items-center gap-2.5 pl-3 border-l border-border dark:border-dark-border">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center text-white text-xs font-bold shrink-0">JA</div>
            <div className="text-sm leading-tight hidden lg:block">
              <div className="font-medium text-text dark:text-dark-text leading-tight">Jahangir Alam</div>
              <div className="text-xs text-text-muted">Manager, O&P</div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
