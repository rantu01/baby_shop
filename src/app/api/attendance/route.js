import { NextResponse } from 'next/server';

export async function GET() {
  await new Promise(r => setTimeout(r, 150));
  return NextResponse.json({
    attendance: [
      { employee: 'Rahim Uddin', department: 'Factory', status: 'Present', inTime: '08:55', outTime: '18:02', overtime: 1.5 },
      { employee: 'Fatima Begum', department: 'Outlet', status: 'Present', inTime: '09:30', outTime: '20:45', overtime: 2.25 },
      { employee: 'Hasan Mahmud', department: 'HQ', status: 'Present', inTime: '09:00', outTime: '18:00', overtime: 0 },
      { employee: 'Kamal Hossain', department: 'Factory', status: 'Late', inTime: '09:20', outTime: '18:15', overtime: 0.5 },
      { employee: 'Shahin Ahmed', department: 'Factory', status: 'Present', inTime: '08:30', outTime: '17:00', overtime: 0 },
      { employee: 'Rabeya Akter', department: 'Outlet', status: 'Absent', inTime: '-', outTime: '-', overtime: 0 },
    ],
    summary: { present: 5, late: 1, absent: 1, totalOvertime: 4.25 },
  });
}
