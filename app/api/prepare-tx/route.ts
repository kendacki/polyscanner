import { NextResponse } from 'next/server';
import { encodeExecuteTrade } from '../../../../lib/trade';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // expected: marketId, buyYes (bool), minOutcomeAmount (in base units), valueWei (optional)
    if (!body || typeof body.buyYes === 'undefined' || !body.marketId) {
      return new NextResponse(JSON.stringify({ error: 'missing fields' }), { status: 400 });
    }

    const tx = encodeExecuteTrade(body.marketId, Boolean(body.buyYes), body.minOutcomeAmount || '0', body.valueWei || '0');
    return new NextResponse(JSON.stringify({ ok: true, tx }), { status: 200, headers: { 'content-type': 'application/json' } });
  } catch (err) {
    return new NextResponse(JSON.stringify({ error: 'invalid request' }), { status: 400 });
  }
}
