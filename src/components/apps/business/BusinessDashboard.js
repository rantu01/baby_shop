'use client';
import { useState, useEffect, useCallback } from 'react';
import { Package, DollarSign, AlertTriangle, CheckCircle, RefreshCw, Search, Filter, MoreHorizontal } from 'lucide-react';
import { useCompany } from '@/providers/CompanyContext';
import { useToast } from '@/providers/ToastContext';
import {
  products as mockProducts,
  inventory as mockInventory,
  bankDeposits as mockDeposits,
  purchaseRequisitions as mockRequisitions,
  companyData,
} from '@/lib/mockData';

function formatCurrency(amount) {
  return '\u09F3' + Number(amount).toLocaleString('en-IN');
}

function StatusBadge({ status }) {
  const map = {
    OK: 'badge-success',
    LOW: 'badge-warning',
    CRITICAL: 'badge-danger',
    Verified: 'badge-success',
    Pending: 'badge-warning',
    Mismatch: 'badge-danger',
    Overdue: 'badge-danger',
    Active: 'badge-success',
    Seasonal: 'badge-info',
    Discontinued: 'badge-neutral',
    Sample: 'badge-warning',
    Approved: 'badge-success',
    'Converted to PO': 'badge-info',
    Rejected: 'badge-danger',
  };
  return <span className={`badge ${map[status] || 'badge-neutral'}`}>{status}</span>;
}

export default function BusinessDashboard() {
  const { activeCompany } = useCompany();
  const { addToast } = useToast();

  const [products, setProducts] = useState(mockProducts);
  const [inventory, setInventory] = useState(mockInventory);
  const [deposits, setDeposits] = useState(mockDeposits);
  const [requisitions, setRequisitions] = useState(mockRequisitions);
  const [updatingProduct, setUpdatingProduct] = useState(null);
  const [verifyingDeposit, setVerifyingDeposit] = useState(null);

  const loadData = useCallback(async () => {
    try {
      const [prodRes, invRes, depRes, reqRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/inventory'),
        fetch('/api/deposits'),
        fetch('/api/purchase-requisitions'),
      ]);
      const [prodData, invData, depData, reqData] = await Promise.all([
        prodRes.json(),
        invRes.json(),
        depRes.json(),
        reqRes.json(),
      ]);
      if (prodData.products) setProducts(prodData.products);
      if (invData.inventory) setInventory(invData.inventory);
      if (depData.deposits) setDeposits(depData.deposits);
      if (reqData.requisitions) setRequisitions(reqData.requisitions);
    } catch {
      addToast('Failed to fetch data — showing cached data', 'warning');
    }
  }, [addToast]);

  useEffect(() => {
    const timer = setTimeout(() => loadData(), 0);
    return () => clearTimeout(timer);
  }, [activeCompany, loadData]);

  async function handleStatusChange(productId, newStatus) {
    setUpdatingProduct(productId);
    try {
      const res = await fetch('/api/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: productId, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setProducts((prev) =>
          prev.map((p) => (p.id === productId ? { ...p, status: newStatus } : p))
        );
        addToast(`${productId} status updated to ${newStatus}`, 'success');
      }
    } catch {
      addToast('Failed to update product status', 'error');
    } finally {
      setUpdatingProduct(null);
    }
  }

  async function handleVerifyDeposit(depositId) {
    setVerifyingDeposit(depositId);
    try {
      const res = await fetch('/api/deposits', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: depositId, status: 'Verified' }),
      });
      const data = await res.json();
      if (data.success) {
        setDeposits((prev) =>
          prev.map((d) => (d.id === depositId ? { ...d, status: 'Verified' } : d))
        );
        addToast(`Deposit ${depositId} verified successfully`, 'success');
      }
    } catch {
      addToast('Failed to verify deposit', 'error');
    } finally {
      setVerifyingDeposit(null);
    }
  }

  const stats = [
    {
      label: 'Total Products',
      value: products.length,
      icon: Package,
      color: 'text-blue-500',
      bg: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      label: 'Active Styles',
      value: products.filter((p) => p.status === 'Active').length,
      icon: CheckCircle,
      color: 'text-emerald-500',
      bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    },
    {
      label: 'Pending Deposits',
      value: deposits.filter((d) => d.status !== 'Verified').length,
      icon: AlertTriangle,
      color: 'text-amber-500',
      bg: 'bg-amber-50 dark:bg-amber-900/20',
    },
    {
      label: 'Inventory Value',
      value: formatCurrency(companyData[activeCompany]?.inventoryValue || 0),
      icon: DollarSign,
      color: 'text-purple-500',
      bg: 'bg-purple-50 dark:bg-purple-900/20',
    },
  ];

  const pendingRequisitions = requisitions.filter((r) => r.status === 'Pending');

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold gradient-text">Business Core Dashboard</h1>
          <p className="text-sm text-text-muted mt-1">
            Products &bull; Inventory &bull; Deposits &bull; Procurement
          </p>
        </div>
        <button onClick={loadData} className="btn-ghost p-2">
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="stat-card">
              <div className="flex items-start justify-between">
                <div className={`p-2.5 rounded-lg ${s.bg}`}>
                  <Icon className={`w-5 h-5 ${s.color}`} />
                </div>
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
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold flex items-center gap-2">
            <Package className="w-4 h-4 text-primary-500" />
            Style &amp; Product Management
          </h2>
          <div className="flex items-center gap-2">
            <button className="btn-ghost p-2">
              <Search className="w-4 h-4" />
            </button>
            <button className="btn-ghost p-2">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Season</th>
                <th>Status</th>
                <th>Margin %</th>
                <th>Price</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td className="font-mono text-xs">{p.id}</td>
                  <td className="font-medium">{p.name}</td>
                  <td>{p.category}</td>
                  <td>{p.season}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <select
                        value={p.status}
                        onChange={(e) => handleStatusChange(p.id, e.target.value)}
                        disabled={updatingProduct === p.id}
                        className="input py-1 px-2 text-xs w-auto min-w-[110px]"
                      >
                        <option value="Active">Active</option>
                        <option value="Seasonal">Seasonal</option>
                        <option value="Discontinued">Discontinued</option>
                      </select>
                      {updatingProduct === p.id && (
                        <RefreshCw className="w-3 h-3 animate-spin text-text-muted" />
                      )}
                    </div>
                  </td>
                  <td>{p.margin}%</td>
                  <td>{formatCurrency(p.price)}</td>
                  <td>
                    <span className={p.stock === 0 ? 'text-red-500 font-semibold' : ''}>
                      {p.stock}
                    </span>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center text-text-muted py-6">
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-5">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <Package className="w-4 h-4 text-emerald-500" />
            Inventory Overview
          </h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Style</th>
                  <th>Location</th>
                  <th>Qty</th>
                  <th>Min</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((item, i) => (
                  <tr key={i}>
                    <td className="font-medium">{item.style}</td>
                    <td className="text-text-secondary text-xs">{item.location}</td>
                    <td>{item.quantity}</td>
                    <td className="text-text-muted">{item.minStock}</td>
                    <td>
                      <StatusBadge status={item.status} />
                    </td>
                  </tr>
                ))}
                {inventory.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center text-text-muted py-6">
                      No inventory data
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="glass-card p-5">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-amber-500" />
            Daily Bank Deposit Tracker
          </h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Outlet</th>
                  <th>Amount</th>
                  <th>Bank</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {deposits.map((d) => (
                  <tr key={d.id}>
                    <td className="font-medium">{d.outlet}</td>
                    <td>{formatCurrency(d.amount)}</td>
                    <td className="text-text-secondary text-xs">{d.bank}</td>
                    <td className="text-text-muted text-xs">{d.date}</td>
                    <td>
                      <StatusBadge status={d.status} />
                    </td>
                    <td>
                      {d.status !== 'Verified' && (
                        <button
                          onClick={() => handleVerifyDeposit(d.id)}
                          disabled={verifyingDeposit === d.id}
                          className="btn-success text-xs px-2.5 py-1"
                        >
                          {verifyingDeposit === d.id ? (
                            <RefreshCw className="w-3 h-3 animate-spin" />
                          ) : (
                            'Verify'
                          )}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                {deposits.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center text-text-muted py-6">
                      No deposits found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="glass-card p-5">
        <h2 className="font-semibold mb-4 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          Procurement &amp; Purchase Requisitions
          {pendingRequisitions.length > 0 && (
            <span className="badge badge-warning text-[10px] ml-1">
              {pendingRequisitions.length} pending
            </span>
          )}
        </h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Requester</th>
                <th>Item</th>
                <th>Qty</th>
                <th>Amount</th>
                <th>Urgency</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {requisitions.map((r) => (
                <tr key={r.id}>
                  <td className="font-mono text-xs">{r.id}</td>
                  <td>{r.requester}</td>
                  <td className="font-medium">{r.item}</td>
                  <td>
                    {r.quantity} {r.unit}
                  </td>
                  <td>{formatCurrency(r.amount)}</td>
                  <td>
                    <span
                      className={`badge ${
                        r.urgency === 'High' || r.urgency === 'Urgent'
                          ? 'badge-danger'
                          : r.urgency === 'Medium'
                          ? 'badge-warning'
                          : 'badge-neutral'
                      }`}
                    >
                      {r.urgency}
                    </span>
                  </td>
                  <td>
                    <StatusBadge status={r.status} />
                  </td>
                </tr>
              ))}
              {requisitions.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center text-text-muted py-6">
                    No requisitions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
