import { NextResponse } from 'next/server';

export async function GET() {
  await new Promise(r => setTimeout(r, 200));
  const data = {
    subcontractors: [
      { id: 'SUB-001', name: 'Dhaka Stitching Ltd.', specialty: 'Sewing', activeJobs: 3, onTimeRate: 92, qcPassRate: 95, balance: 450000 },
      { id: 'SUB-002', name: 'Chattogram Embroidery', specialty: 'Embroidery', activeJobs: 1, onTimeRate: 88, qcPassRate: 90, balance: 180000 },
      { id: 'SUB-003', name: 'Sylhet Wash Works', specialty: 'Washing', activeJobs: 2, onTimeRate: 95, qcPassRate: 97, balance: 290000 },
      { id: 'SUB-004', name: 'Savar Stitch Craft', specialty: 'Sewing', activeJobs: 0, onTimeRate: 78, qcPassRate: 82, balance: 65000 },
    ],
    jobWorkOrders: [
      { id: 'JWO-001', subcontractor: 'Dhaka Stitching Ltd.', style: 'Baby Cotton Bodysuit', quantity: 2000, rate: 25, status: 'In Progress', dueDate: '2026-06-22' },
      { id: 'JWO-002', subcontractor: 'Chattogram Embroidery', style: 'Girls Floral Dress', quantity: 500, rate: 15, status: 'Completed', dueDate: '2026-06-14' },
      { id: 'JWO-003', subcontractor: 'Sylhet Wash Works', style: 'Toddler Fleece Romper', quantity: 1500, rate: 12, status: 'Pending', dueDate: '2026-06-28' },
    ],
  };
  return NextResponse.json(data);
}

export async function PUT(request) {
  const body = await request.json();
  const { id, status } = body;
  await new Promise(r => setTimeout(r, 300));
  return NextResponse.json({ success: true, message: `Job work order ${id} updated to ${status}` });
}
