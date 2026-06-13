import { NextResponse } from 'next/server';

const aiContext = {
  'top-selling': 'Based on last week\'s data, the top 3 selling styles were: 1) Baby Cotton Bodysuit (1,240 units), 2) Toddler Fleece Romper (860 units), 3) Newborn Gift Set (520 units). Dhanmondi and Gulshan outlets showed the highest sell-through rates.',
  'low-margin': 'Styles with margin below 30%: Boys Denim Jacket (35% - approaching threshold). No styles currently below 30% margin.',
  'outlet-performance': 'Gulshan (120% of target) and Sylhet (119%) are outperforming. Mohakhali is 17% below target. Uttara needs attention at 82%.',
  'attendance': 'Factory - 92%, Outlets - 88%, HQ - 96%. 3 employees marked late, 1 absent.',
  'production-status': 'PO-2026-001 at 64% (Sewing), PO-2026-003 at 0% (Cutting), PO-2026-004 at 93% (QC stage).',
  'deposit-overdue': 'Mohakhali deposit overdue (~82,000 BDT). Banani shows mismatch. 3 pending verifications.',
};

export async function GET() {
  await new Promise(r => setTimeout(r, 200));
  return NextResponse.json({ suggestions: Object.keys(aiContext) });
}

export async function POST(request) {
  const body = await request.json();
  const { query } = body;
  await new Promise(r => setTimeout(r, 1000));

  const lowerQuery = query.toLowerCase();

  if (lowerQuery.includes('top selling') || lowerQuery.includes('best seller')) {
    return NextResponse.json({ response: aiContext['top-selling'], type: 'data' });
  }
  if (lowerQuery.includes('margin') || lowerQuery.includes('profit')) {
    return NextResponse.json({ response: aiContext['low-margin'], type: 'data' });
  }
  if (lowerQuery.includes('outlet') || lowerQuery.includes('branch') || lowerQuery.includes('performance')) {
    return NextResponse.json({ response: aiContext['outlet-performance'], type: 'data' });
  }
  if (lowerQuery.includes('attendance') || lowerQuery.includes('absent')) {
    return NextResponse.json({ response: aiContext['attendance'], type: 'data' });
  }
  if (lowerQuery.includes('production') || lowerQuery.includes('order')) {
    return NextResponse.json({ response: aiContext['production-status'], type: 'data' });
  }
  if (lowerQuery.includes('deposit') || lowerQuery.includes('overdue')) {
    return NextResponse.json({ response: aiContext['deposit-overdue'], type: 'data' });
  }

  return NextResponse.json({
    response: `I understand you're asking about: "${query}". I can help with sales data, inventory levels, production status, attendance, and deposit reconciliation. Please try a more specific query.`,
    type: 'general',
  });
}
