import { NextResponse } from 'next/server';
import { analyzeMarketWithClaude } from '../../../../lib/claude';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body) return new NextResponse(JSON.stringify({ error: 'missing body' }), { status: 400 });

    const res = await analyzeMarketWithClaude(body);
    if (!res.ok) return new NextResponse(JSON.stringify({ error: res.error, raw: res.raw }), { status: 502 });

    return new NextResponse(JSON.stringify({ ok: true, analysis: res.result }), { status: 200, headers: { 'content-type': 'application/json' } });
  } catch (err) {
    return new NextResponse(JSON.stringify({ error: 'server error' }), { status: 500 });
  }
}
