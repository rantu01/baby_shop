import { NextResponse } from 'next/server';

export async function GET() {
  await new Promise(r => setTimeout(r, 200));
  const data = [
    { id: 'PR-001', requester: 'Rahim Uddin', department: 'Factory', item: 'Cotton Fabric - White', quantity: 500, unit: 'rolls', amount: 750000, status: 'Pending', urgency: 'High' },
    { id: 'PR-002', requester: 'Fatima Begum', department: 'Outlet', item: 'POS Thermal Paper Rolls', quantity: 200, unit: 'pcs', amount: 24000, status: 'Approved', urgency: 'Low' },
    { id: 'PR-003', requester: 'Hasan Mahmud', department: 'HQ', item: 'Office Stationery', quantity: 1, unit: 'lot', amount: 15000, status: 'Converted to PO', urgency: 'Low' },
    { id: 'PR-004', requester: 'Nusrat Jahan', department: 'HQ', item: 'Biometric Device - New Outlet', quantity: 2, unit: 'pcs', amount: 45000, status: 'Pending', urgency: 'Medium' },
    { id: 'PR-005', requester: 'Kamal Hossain', department: 'Factory', item: 'Polyester Thread - Blue', quantity: 100, unit: 'cones', amount: 8500, status: 'Rejected', urgency: 'Medium' },
  ];
  return NextResponse.json({ requisitions: data });
}

export async function POST(request) {
  const body = await request.json();
  await new Promise(r => setTimeout(r, 300));
  return NextResponse.json({ success: true, message: 'Purchase requisition created', id: 'PR-00' + Date.now() });
}
