import { NextResponse } from 'next/server';

let deposits = [
  { id: 'DEP-001', outlet: 'Dhanmondi', amount: 142500, bank: 'DBBL', date: '2026-06-13', status: 'Verified', slipRef: 'DBBL-1306-001' },
  { id: 'DEP-002', outlet: 'Uttara', amount: 98500, bank: 'BKash', date: '2026-06-13', status: 'Pending', slipRef: 'BKA-1306-042' },
  { id: 'DEP-003', outlet: 'Gulshan', amount: 156200, bank: 'DBBL', date: '2026-06-12', status: 'Verified', slipRef: 'DBBL-1206-089' },
  { id: 'DEP-004', outlet: 'Mirpur', amount: 72300, bank: 'Nagad', date: '2026-06-12', status: 'Pending', slipRef: 'NGD-1206-031' },
  { id: 'DEP-005', outlet: 'Banani', amount: 118900, bank: 'DBBL', date: '2026-06-13', status: 'Mismatch', slipRef: 'DBBL-1306-112' },
  { id: 'DEP-006', outlet: 'Mohakhali', amount: 0, bank: '-', date: '2026-06-13', status: 'Overdue', slipRef: '-' },
  { id: 'DEP-007', outlet: 'Shymoli', amount: 89400, bank: 'City Bank', date: '2026-06-11', status: 'Verified', slipRef: 'CTY-1106-025' },
  { id: 'DEP-008', outlet: 'Sylhet', amount: 167300, bank: 'DBBL', date: '2026-06-13', status: 'Verified', slipRef: 'DBBL-1306-156' },
];

export async function GET() {
  await new Promise(r => setTimeout(r, 200));
  return NextResponse.json({ deposits });
}

export async function PUT(request) {
  const body = await request.json();
  const { id, status } = body;
  await new Promise(r => setTimeout(r, 300));

  const idx = deposits.findIndex(d => d.id === id);
  if (idx === -1) {
    return NextResponse.json({ success: false, error: 'Deposit not found' }, { status: 404 });
  }

  deposits[idx] = { ...deposits[idx], status };
  return NextResponse.json({ success: true, deposit: deposits[idx] });
}
