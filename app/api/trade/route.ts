import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.resolve(process.cwd(), 'data');
const INTENTS_FILE = path.join(DATA_DIR, 'signed_intents.json');

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);
  if (!fs.existsSync(INTENTS_FILE)) fs.writeFileSync(INTENTS_FILE, JSON.stringify([]));
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // body should contain: marketId, buyYes, amountEth, address, signature
    if (!body || !body.marketId || !body.address || !body.signature) {
      return new NextResponse(JSON.stringify({ error: 'missing fields' }), { status: 400 });
    }

    ensureDataDir();
    const existing = JSON.parse(fs.readFileSync(INTENTS_FILE, 'utf8') || '[]');
    existing.push({ ...body, receivedAt: new Date().toISOString() });
    fs.writeFileSync(INTENTS_FILE, JSON.stringify(existing, null, 2));

    const payload = {
      ok: true,
      tradeRouterAddress: process.env.TRADE_ROUTER_ADDRESS || null,
      recommendedNetwork: 'polygon',
      savedTo: INTENTS_FILE,
    };

    return new NextResponse(JSON.stringify(payload), { status: 200, headers: { 'content-type': 'application/json' } });
  } catch (err) {
    return new NextResponse(JSON.stringify({ error: 'invalid request' }), { status: 400 });
  }
}
