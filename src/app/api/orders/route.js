import { NextResponse } from 'next/server';

export async function GET() {
  await new Promise(r => setTimeout(r, 200));
  return NextResponse.json({
    orders: [
      { id: 'ECO-001', customer: 'Ayesha Khatun', items: 3, total: 2450, payment: 'bKash', status: 'Picked', date: '2026-06-13', fulfillment: 'Central WH' },
      { id: 'ECO-002', customer: 'Mizanur Rahman', items: 1, total: 890, payment: 'COD', status: 'Packed', date: '2026-06-13', fulfillment: 'Central WH' },
      { id: 'ECO-003', customer: 'Shamima Akter', items: 5, total: 4200, payment: 'Card', status: 'Shipped', date: '2026-06-12', fulfillment: 'Central WH' },
      { id: 'ECO-004', customer: 'Jahidul Islam', items: 2, total: 1100, payment: 'Nagad', status: 'Pending', date: '2026-06-13', fulfillment: 'Central WH' },
      { id: 'ECO-005', customer: 'Nadia Sultana', items: 4, total: 3800, payment: 'bKash', status: 'Delivered', date: '2026-06-11', fulfillment: 'Central WH' },
      { id: 'ECO-006', customer: 'Arif Hossain', items: 1, total: 1500, payment: 'COD', status: 'Return Initiated', date: '2026-06-10', fulfillment: 'Nearest Outlet' },
    ],
    summary: { totalOrders: 156, pending: 24, shipped: 89, returned: 3, revenue: 245000 },
  });
}
