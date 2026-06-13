import { NextResponse } from 'next/server';

export async function GET() {
  await new Promise(r => setTimeout(r, 150));
  const employees = [
    { id: 'EMP-001', name: 'Rahim Uddin', department: 'Factory', role: 'Line Supervisor', grade: 'Grade-4', status: 'Active', salary: 45000, attendance: 95 },
    { id: 'EMP-002', name: 'Fatima Begum', department: 'Outlet', role: 'Outlet Manager', grade: 'Grade-5', status: 'Active', salary: 55000, attendance: 98 },
    { id: 'EMP-003', name: 'Hasan Mahmud', department: 'HQ', role: 'Accounts Manager', grade: 'Grade-7', status: 'Active', salary: 85000, attendance: 100 },
    { id: 'EMP-004', name: 'Nusrat Jahan', department: 'HQ', role: 'HR Manager', grade: 'Grade-7', status: 'Active', salary: 80000, attendance: 97 },
    { id: 'EMP-005', name: 'Kamal Hossain', department: 'Factory', role: 'QC Inspector', grade: 'Grade-4', status: 'Active', salary: 35000, attendance: 92 },
    { id: 'EMP-006', name: 'Shahin Ahmed', department: 'Factory', role: 'Machine Operator', grade: 'Grade-2', status: 'Active', salary: 18000, attendance: 88 },
    { id: 'EMP-007', name: 'Rabeya Akter', department: 'Outlet', role: 'Cashier', grade: 'Grade-2', status: 'Probation', salary: 15000, attendance: 85 },
    { id: 'EMP-008', name: 'Tanvir Hasan', department: 'HQ', role: 'IT Executive', grade: 'Grade-5', status: 'Active', salary: 50000, attendance: 96 },
  ];
  return NextResponse.json({ employees });
}

export async function PUT(request) {
  const body = await request.json();
  const { id, status } = body;
  await new Promise(r => setTimeout(r, 300));
  return NextResponse.json({ success: true, message: `Employee ${id} status updated to ${status}` });
}
