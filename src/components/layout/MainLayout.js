'use client';

import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import PlatformDashboard from '@/components/apps/PlatformDashboard';
import BusinessDashboard from '@/components/apps/business/BusinessDashboard';
import HRDashboard from '@/components/apps/hr/HRDashboard';
import ManufacturingDashboard from '@/components/apps/manufacturing/ManufacturingDashboard';
import RDAutomationDashboard from '@/components/apps/rd-automation/RDAutomationDashboard';
import ECommerceDashboard from '@/components/apps/ecommerce/ECommerceDashboard';
import ExecutiveDashboard from '@/components/apps/executive/ExecutiveDashboard';

const views = {
  dashboard: PlatformDashboard,
  business: BusinessDashboard,
  hr: HRDashboard,
  manufacturing: ManufacturingDashboard,
  'rd-automation': RDAutomationDashboard,
  ecommerce: ECommerceDashboard,
  executive: ExecutiveDashboard,
};

export default function MainLayout() {
  const [activeView, setActiveView] = useState('dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);

  const ActiveComponent = views[activeView] || PlatformDashboard;

  return (
    <div className="min-h-screen bg-surface dark:bg-dark-surface">
      <Sidebar
        activeView={activeView}
        onNavigate={setActiveView}
        mobileOpen={mobileOpen}
        onMobileToggle={() => setMobileOpen(!mobileOpen)}
      />
      <main className="pt-16 min-h-screen transition-all duration-300 md:ml-64">
        <div className="p-3 md:p-6 max-w-[1600px] mx-auto">
          <ActiveComponent />
        </div>
      </main>
    </div>
  );
}
