import { NextResponse } from 'next/server';

export async function GET() {
  await new Promise(r => setTimeout(r, 200));
  const inventory = [
    { sku: 'CBS-001-WHT-0M', style: 'Baby Cotton Bodysuit', location: 'Central Warehouse', quantity: 520, minStock: 100, status: 'OK' },
    { sku: 'CBS-001-WHT-0M', style: 'Baby Cotton Bodysuit', location: 'Factory Store', quantity: 320, minStock: 50, status: 'OK' },
    { sku: 'CBS-001-WHT-0M', style: 'Baby Cotton Bodysuit', location: 'Dhanmondi Outlet', quantity: 45, minStock: 30, status: 'OK' },
    { sku: 'TFR-002-GRY-6M', style: 'Toddler Fleece Romper', location: 'Central Warehouse', quantity: 180, minStock: 100, status: 'LOW' },
    { sku: 'TFR-002-GRY-6M', style: 'Toddler Fleece Romper', location: 'Uttara Outlet', quantity: 12, minStock: 20, status: 'CRITICAL' },
    { sku: 'NGS-003-PNK-0M', style: 'Newborn Gift Set', location: 'Central Warehouse', quantity: 420, minStock: 50, status: 'OK' },
    { sku: 'GFD-004-PNK-12M', style: 'Girls Floral Dress', location: 'Gulshan Outlet', quantity: 8, minStock: 15, status: 'CRITICAL' },
  ];
  return NextResponse.json({ inventory });
}

export async function POST(request) {
  const body = await request.json();
  const { type, data } = body;
  await new Promise(r => setTimeout(r, 300));

  if (type === 'transfer') {
    return NextResponse.json({ success: true, message: `Stock transfer initiated: ${data.quantity} units from ${data.from} to ${data.to}` });
  }
  return NextResponse.json({ success: true, message: 'Stock updated' });
}
