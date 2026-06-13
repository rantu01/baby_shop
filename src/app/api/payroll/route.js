import { NextResponse } from 'next/server';

export async function GET() {
  await new Promise(r => setTimeout(r, 200));
  const payrollData = {
    periods: [
      { id: 'PRL-2026-05', period: 'May 2026', status: 'Locked', totalEmployees: 1240, grossPay: 52400000, deductions: 4200000, netPay: 48200000 },
      { id: 'PRL-2026-06', period: 'June 2026', status: 'Processing', totalEmployees: 1240, grossPay: 52400000, deductions: 4200000, netPay: 48200000 },
    ],
    summary: { totalPayroll: 48200000, yoyChange: 8.5, avgSalary: 38900 },
  };
  return NextResponse.json(payrollData);
}

export async function POST(request) {
  const body = await request.json();
  const { periodId, action } = body;
  await new Promise(r => setTimeout(r, 500));

  return NextResponse.json({
    success: true,
    message: action === 'approve' ? `Payroll ${periodId} approved and locked` : `Payroll ${periodId} processed`,
    status: 'Locked',
  });
}
