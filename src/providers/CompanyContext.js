'use client';

import { createContext, useContext, useState, useCallback } from 'react';

const CompanyContext = createContext();

export function CompanyProvider({ children }) {
  const [activeCompany, setActiveCompany] = useState('baby-shop');
  const [isSwitching, setIsSwitching] = useState(false);

  const switchCompany = useCallback(async (companyId) => {
    setIsSwitching(true);
    try {
      const res = await fetch(`/api/company?companyId=${companyId}`);
      const data = await res.json();
      await new Promise(r => setTimeout(r, 400));
      setActiveCompany(companyId);
      return data;
    } catch (err) {
      console.error('Company switch error:', err);
      setActiveCompany(companyId);
    } finally {
      setIsSwitching(false);
    }
  }, []);

  return (
    <CompanyContext.Provider value={{ activeCompany, switchCompany, isSwitching }}>
      {children}
    </CompanyContext.Provider>
  );
}

export const useCompany = () => {
  const ctx = useContext(CompanyContext);
  if (!ctx) throw new Error('useCompany must be used within CompanyProvider');
  return ctx;
};
