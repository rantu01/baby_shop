'use client';
import { useState, useEffect } from 'react';
import { Users, Clock, DollarSign, CalendarCheck, CheckCircle } from 'lucide-react';
import { useCompany } from '@/providers/CompanyContext';
import { useToast } from '@/providers/ToastContext';

const statusBadge = (status) => {
  if (status === 'Active') return <span className="badge badge-success">Active</span>;
  if (status === 'Probation') return <span className="badge badge-warning">Probation</span>;
  return <span className="badge badge-neutral">{status}</span>;
};

const attendanceBadge = (status) => {
  if (status === 'Present') return <span className="badge badge-success">Present</span>;
  if (status === 'Late') return <span className="badge badge-warning">Late</span>;
  if (status === 'Absent') return <span className="badge badge-danger">Absent</span>;
  return <span className="badge badge-neutral">{status}</span>;
};

export default function HRDashboard() {
  const { activeCompany } = useCompany();
  const { addToast } = useToast();

  const [employees, setEmployees] = useState([]);
  const [payrolls, setPayrolls] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [quickStats, setQuickStats] = useState({
    totalEmployees: 0,
    activePayrolls: 0,
    todayAttendance: 0,
    pendingLeaves: 0,
  });
  const [loading, setLoading] = useState(true);
  const [approvingId, setApprovingId] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const [empRes, payRes, attRes] = await Promise.all([
          fetch('/api/employees'),
          fetch('/api/payroll'),
          fetch('/api/attendance'),
        ]);
        const empData = await empRes.json();
        const payData = await payRes.json();
        const attData = await attRes.json();
        if (cancelled) return;

        const empList = empData.employees || [];
        const payList = payData.periods || [];
        const attList = attData.attendance || [];

        setEmployees(empList);
        setPayrolls(payList);
        setAttendance(attList);

        const presentCount = attList.filter(a => a.status === 'Present').length;
        const totalAtt = attList.length || 1;

        setQuickStats({
          totalEmployees: empList.length,
          activePayrolls: payList.filter(p => p.status === 'Processing').length,
          todayAttendance: Math.round((presentCount / totalAtt) * 100),
          pendingLeaves: 0,
        });
      } catch {
        addToast('Failed to load HR dashboard data', 'error');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [activeCompany, addToast]);

  const handleApprovePayroll = async (periodId) => {
    setApprovingId(periodId);
    try {
      const res = await fetch('/api/payroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ periodId, action: 'approve' }),
      });
      if (!res.ok) throw new Error('Failed to approve');
      addToast('Payroll period approved and locked', 'success');
      setPayrolls(prev => prev.map(p =>
        (p.id === periodId || p.periodId === periodId) ? { ...p, status: 'Approved' } : p
      ));
    } catch {
      addToast('Failed to approve payroll period', 'error');
    } finally {
      setApprovingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold gradient-text">HR & Payroll Dashboard</h1>
          <p className="text-sm text-text-muted mt-1">Employee lifecycle, payroll & attendance management</p>
        </div>
        <span className="badge badge-info">{activeCompany === 'baby-shop' ? 'Baby Shop Ltd.' : 'SNS'}</span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Employees', value: quickStats.totalEmployees, icon: Users, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
          { label: 'Active Payroll', value: quickStats.activePayrolls, icon: DollarSign, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
          { label: 'Today Attendance', value: `${quickStats.todayAttendance}%`, icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20' },
          { label: 'Pending Leaves', value: quickStats.pendingLeaves, icon: CalendarCheck, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20' },
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

      <div className="glass-card p-5">
        <h2 className="font-semibold mb-4 flex items-center gap-2">
          <Users className="w-4 h-4 text-blue-500" />
          Employee Management
        </h2>
        <div className="table-container">
          <table>
            <thead>
              <tr><th>ID</th><th>Name</th><th>Department</th><th>Role</th><th>Grade</th><th>Status</th><th>Salary</th><th>Attendance %</th></tr>
            </thead>
            <tbody>
              {employees.map(emp => (
                <tr key={emp.id}>
                  <td className="font-mono text-xs text-text-muted">{emp.id}</td>
                  <td className="font-medium">{emp.name}</td>
                  <td>{emp.department}</td>
                  <td>{emp.role}</td>
                  <td>{emp.grade}</td>
                  <td>{statusBadge(emp.status)}</td>
                  <td>৳{emp.salary?.toLocaleString()}</td>
                  <td>{emp.attendance ?? '-'}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="glass-card p-5">
        <h2 className="font-semibold mb-4 flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-emerald-500" />
          Payroll Processing
        </h2>
        <div className="table-container">
          <table>
            <thead>
              <tr><th>Period</th><th>Status</th><th>Employees</th><th>Gross Pay</th><th>Deductions</th><th>Net Pay</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {payrolls.map(p => (
                <tr key={p.id || p.periodId}>
                  <td className="font-medium">{p.period}</td>
                  <td>
                    <span className={`badge ${p.status === 'Locked' || p.status === 'Approved' ? 'badge-success' : p.status === 'Processing' ? 'badge-warning' : 'badge-neutral'}`}>
                      {p.status}
                    </span>
                  </td>
                  <td>{p.totalEmployees ?? p.employees}</td>
                  <td>৳{(p.grossPay ?? 0).toLocaleString()}</td>
                  <td className="text-red-600 dark:text-red-400">৳{(p.deductions ?? 0).toLocaleString()}</td>
                  <td className="text-emerald-600 dark:text-emerald-400 font-medium">৳{(p.netPay ?? 0).toLocaleString()}</td>
                  <td>
                    {p.status === 'Processing' && (
                      <button
                        className="btn-success text-xs px-3 py-1.5"
                        onClick={() => handleApprovePayroll(p.id || p.periodId)}
                        disabled={approvingId === (p.id || p.periodId)}
                      >
                        {approvingId === (p.id || p.periodId) ? (
                          <>Processing...</>
                        ) : (
                          <><CheckCircle className="w-3.5 h-3.5" /> Approve & Lock</>
                        )}
                      </button>
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
          <Clock className="w-4 h-4 text-amber-500" />
          Today&apos;s Attendance
        </h2>
        <div className="table-container">
          <table>
            <thead>
              <tr><th>Employee</th><th>Department</th><th>Status</th><th>In Time</th><th>Out Time</th><th>Overtime</th></tr>
            </thead>
            <tbody>
              {attendance.map((a, i) => (
                <tr key={a.id || i}>
                  <td className="font-medium">{a.employee}</td>
                  <td>{a.department}</td>
                  <td>{attendanceBadge(a.status)}</td>
                  <td>{a.inTime || '-'}</td>
                  <td>{a.outTime || '-'}</td>
                  <td>{a.overtime ? `${a.overtime}h` : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
