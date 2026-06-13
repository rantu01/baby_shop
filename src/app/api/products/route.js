import { NextResponse } from 'next/server';

let products = [
  { id: 'STY-001', name: 'Baby Cotton Bodysuit', category: 'Bodysuit', season: 'Summer', gender: 'Unisex', ageGroup: '0-6m', status: 'Active', margin: 42, price: 450, stock: 1240 },
  { id: 'STY-002', name: 'Toddler Fleece Romper', category: 'Romper', season: 'Winter', gender: 'Unisex', ageGroup: '6-12m', status: 'Active', margin: 38, price: 890, stock: 860 },
  { id: 'STY-003', name: 'Newborn Gift Set', category: 'Set', season: 'All Season', gender: 'Unisex', ageGroup: '0-3m', status: 'Active', margin: 45, price: 1650, stock: 520 },
  { id: 'STY-004', name: 'Girls Floral Dress', category: 'Dress', season: 'Summer', gender: 'Girl', ageGroup: '12-24m', status: 'Active', margin: 52, price: 1200, stock: 340 },
  { id: 'STY-005', name: 'Boys Denim Jacket', category: 'Jacket', season: 'Spring', gender: 'Boy', ageGroup: '2-4y', status: 'Seasonal', margin: 35, price: 1500, stock: 210 },
  { id: 'STY-006', name: 'Baby Sleepsuit', category: 'Bodysuit', season: 'All Season', gender: 'Unisex', ageGroup: '0-6m', status: 'Active', margin: 40, price: 550, stock: 980 },
  { id: 'STY-007', name: 'Girls Party Frock', category: 'Dress', season: 'Eid', gender: 'Girl', ageGroup: '2-4y', status: 'Sample', margin: 55, price: 2200, stock: 0 },
];

export async function GET() {
  await new Promise(r => setTimeout(r, 200));
  return NextResponse.json({ products });
}

export async function PUT(request) {
  const body = await request.json();
  const { id, status } = body;
  await new Promise(r => setTimeout(r, 300));

  const idx = products.findIndex(p => p.id === id);
  if (idx === -1) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });

  if (status) products[idx] = { ...products[idx], status };
  return NextResponse.json({ success: true, product: products[idx] });
}
