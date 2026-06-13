import { NextResponse } from 'next/server';

let productionOrders = [
  { id: 'PO-2026-001', style: 'Baby Cotton Bodysuit', targetQty: 5000, completedQty: 3200, stage: 'Sewing', status: 'In Progress', dueDate: '2026-06-20', priority: 'High' },
  { id: 'PO-2026-002', style: 'Toddler Fleece Romper', targetQty: 3000, completedQty: 3000, stage: 'Packaging', status: 'Completed', dueDate: '2026-06-15', priority: 'Medium' },
  { id: 'PO-2026-003', style: 'Newborn Gift Set', targetQty: 2000, completedQty: 0, stage: 'Cutting', status: 'In Progress', dueDate: '2026-06-25', priority: 'High' },
  { id: 'PO-2026-004', style: 'Girls Floral Dress', targetQty: 1500, completedQty: 1400, stage: 'QC Check', status: 'In Progress', dueDate: '2026-06-18', priority: 'Urgent' },
];

export async function GET() {
  await new Promise(r => setTimeout(r, 200));
  return NextResponse.json({ orders: productionOrders });
}

export async function PUT(request) {
  const body = await request.json();
  const { id, stage, completedQty } = body;
  await new Promise(r => setTimeout(r, 300));

  const idx = productionOrders.findIndex(o => o.id === id);
  if (idx === -1) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });

  if (stage) productionOrders[idx].stage = stage;
  if (completedQty !== undefined) productionOrders[idx].completedQty = completedQty;
  if (productionOrders[idx].completedQty >= productionOrders[idx].targetQty) productionOrders[idx].status = 'Completed';

  return NextResponse.json({ success: true, order: productionOrders[idx] });
}
