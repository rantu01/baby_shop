import { NextResponse } from 'next/server';

export async function GET() {
  await new Promise(r => setTimeout(r, 150));
  return NextResponse.json({
    returns: [
      { id: 'RET-001', order: 'ECO-006', customer: 'Arif Hossain', item: 'Boys Denim Jacket', reason: 'Size mismatch', condition: 'Resaleable', status: 'Item Received', refundAmount: 1500 },
      { id: 'RET-002', order: 'ECO-003', customer: 'Shamima Akter', item: 'Girls Floral Dress', reason: 'Color variation', condition: 'Defective', status: 'Pending Inspection', refundAmount: 1200 },
    ],
  });
}

export async function PUT(request) {
  const body = await request.json();
  const { id, status } = body;
  await new Promise(r => setTimeout(r, 300));
  return NextResponse.json({ success: true, message: `Return ${id} updated to ${status}` });
}
