import { NextResponse } from 'next/server';

const companies = {
  'baby-shop': { id: 'baby-shop', name: 'Baby Shop Ltd.', code: 'BSL', outlets: 62 },
  'sns': { id: 'sns', name: 'SNS', code: 'SNS', outlets: 18 },
};

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const companyId = searchParams.get('companyId');

  await new Promise(r => setTimeout(r, 200));

  if (companyId && companies[companyId]) {
    return NextResponse.json({ success: true, company: companies[companyId] });
  }

  return NextResponse.json({ success: true, companies });
}

export async function POST(request) {
  const body = await request.json();
  const { companyId } = body;

  await new Promise(r => setTimeout(r, 300));

  if (!companyId || !companies[companyId]) {
    return NextResponse.json({ success: false, error: 'Invalid company' }, { status: 400 });
  }

  return NextResponse.json({
    success: true,
    company: companies[companyId],
    message: `Switched to ${companies[companyId].name}`,
  });
}
