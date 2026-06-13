import { NextResponse } from 'next/server';

let approvals = [
  { id: 'APR-001', type: 'Purchase Requisition', requester: 'Rahim Uddin', amount: 750000, date: '2026-06-13', status: 'Pending', urgency: 'High' },
  { id: 'APR-002', type: 'Leave Application', requester: 'Shahin Ahmed', amount: 0, date: '2026-06-13', status: 'Pending', urgency: 'Low' },
  { id: 'APR-003', type: 'Discount Override', requester: 'Gulshan Outlet', amount: 12500, date: '2026-06-12', status: 'Approved', urgency: 'Medium' },
  { id: 'APR-004', type: 'Stock Transfer', requester: 'Warehouse Manager', amount: 0, date: '2026-06-12', status: 'Pending', urgency: 'High' },
  { id: 'APR-005', type: 'Payroll', requester: 'HR Manager', amount: 48200000, date: '2026-06-11', status: 'Pending', urgency: 'Urgent' },
  { id: 'APR-006', type: 'Job Work Order', requester: 'Factory Manager', amount: 50000, date: '2026-06-10', status: 'Approved', urgency: 'Medium' },
  { id: 'APR-007', type: 'New Style Activation', requester: 'Merchandiser', amount: 0, date: '2026-06-10', status: 'Rejected', urgency: 'Low' },
];

export async function GET() {
  await new Promise(r => setTimeout(r, 150));
  return NextResponse.json({ approvals });
}

export async function PUT(request) {
  const body = await request.json();
  const { id, status } = body;
  await new Promise(r => setTimeout(r, 400));

  const idx = approvals.findIndex(a => a.id === id);
  if (idx === -1) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });

  approvals[idx] = { ...approvals[idx], status };
  return NextResponse.json({ success: true, approval: approvals[idx] });
}
