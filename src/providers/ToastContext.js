'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';

const ToastContext = createContext();

const icons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
};

const colors = {
  success: 'border-l-4 border-accent-500 bg-accent-50 dark:bg-accent-900/20',
  error: 'border-l-4 border-red-500 bg-red-50 dark:bg-red-900/20',
  warning: 'border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-900/20',
  info: 'border-l-4 border-primary-500 bg-primary-50 dark:bg-primary-900/20',
};

function ToastItem({ id, type, message, onDismiss }) {
  const Icon = icons[type];
  return (
    <div className={`toast ${colors[type]}`}>
      <Icon className="w-5 h-5 shrink-0" />
      <span className="text-sm">{message}</span>
      <button onClick={() => onDismiss(id)} className="ml-2 p-0.5 hover:opacity-70">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-60 flex flex-col gap-2">
        {toasts.map(t => (
          <ToastItem key={t.id} {...t} onDismiss={dismissToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
};
