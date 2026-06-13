import { NextResponse } from 'next/server';

let actionItems = [
  { id: 'ACT-001', task: 'Stock Transfer Note pending approval', assignee: 'Rahim Uddin', priority: 'High', due: 'Today', status: 'Pending' },
  { id: 'ACT-002', task: 'Bank deposit overdue - Mohakhali Outlet', assignee: 'Hasan Mahmud', priority: 'High', due: 'Today', status: 'Pending' },
  { id: 'ACT-003', task: 'QC failure >15% - PO-2026-004', assignee: 'Kamal Hossain', priority: 'Urgent', due: 'Today', status: 'Pending' },
  { id: 'ACT-004', task: 'Sub-contractor JWO-002 return pending', assignee: 'Factory Manager', priority: 'Medium', due: 'Tomorrow', status: 'In Progress' },
  { id: 'ACT-005', task: 'Minimum stock alert - Romper (Uttara)', assignee: 'Warehouse Manager', priority: 'High', due: 'Today', status: 'Pending' },
];

export async function GET() {
  await new Promise(r => setTimeout(r, 150));
  return NextResponse.json({ actions: actionItems });
}

export async function PUT(request) {
  const body = await request.json();
  const { id, status } = body;
  await new Promise(r => setTimeout(r, 300));

  const idx = actionItems.findIndex(a => a.id === id);
  if (idx === -1) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });

  actionItems[idx] = { ...actionItems[idx], status };
  return NextResponse.json({ success: true, action: actionItems[idx] });
}
