import { NextResponse } from 'next/server';

export async function GET() {
  // Proxy simple markets list from Polymarket Gamma API
  const url = 'https://gamma-api.polymarket.com/markets';
  try {
    const res = await fetch(url);
    const data = await res.json();
    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  } catch (err) {
    return new NextResponse(JSON.stringify({ error: 'failed to fetch polymarket' }), { status: 502 });
  }
}
