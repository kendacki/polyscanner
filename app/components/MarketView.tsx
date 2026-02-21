"use client";

import React, { useEffect, useState } from "react";

type Market = any;

export default function MarketView() {
  const [markets, setMarkets] = useState<Market[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch('/api/polymarket')
      .then((r) => r.json())
      .then((d) => { setMarkets(d?.markets || d || []); setLoading(false); })
      .catch(() => { setMarkets([]); setLoading(false); });

    const eth = (window as any).ethereum;
    if (eth && eth.selectedAddress) setAddress(eth.selectedAddress);
  }, []);

  async function signIntent(marketId: string, buyYes: boolean, amountEth: string) {
    const eth = (window as any).ethereum;
    if (!eth) return alert('Connect wallet first');
    const accounts = await eth.request({ method: 'eth_requestAccounts' });
    const addr = accounts[0];
    const message = JSON.stringify({ marketId, buyYes, amountEth, ts: Date.now() });
    try {
      const signature = await eth.request({ method: 'personal_sign', params: [message, addr] });
      // send to backend
      const res = await fetch('/api/trade', { method: 'POST', body: JSON.stringify({ marketId, buyYes, amountEth, address: addr, signature }), headers: { 'content-type': 'application/json' } });
      const j = await res.json();
      if (j.ok) alert('Signed trade intent saved'); else alert('Failed to save intent');
    } catch (err) {
      console.error(err);
      alert('Signing failed');
    }
  }

  async function analyzeMarket(market: any) {
    const res = await fetch('/api/analyze', { method: 'POST', body: JSON.stringify(market), headers: { 'content-type': 'application/json' } });
    const j = await res.json();
    if (j.ok && j.analysis) {
      alert('Analysis result:\n' + JSON.stringify(j.analysis, null, 2));
    } else {
      alert('Analysis failed');
    }
  }

  if (loading) return <div>Loading markets…</div>;
  if (!markets || markets.length === 0) return <div>No markets available.</div>;

  return (
    <div className="w-full font-poppins">
      <h2 className="mb-4 text-xl font-semibold card-title">Markets</h2>
      <div className="grid gap-4">
        {markets.slice(0, 10).map((m: any, i: number) => (
          <div key={m.id || i} className="rounded-md border p-4 glass">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">{m.title || m.market_name || 'Untitled'}</div>
              <div className="text-sm text-zinc-600">Liquidity: {m.liquidity || m?.volume || 'n/a'}</div>
            </div>
            <div className="mt-2 flex items-center gap-3">
              <div>YES: {m.current_yes_price ?? m.yes_price ?? m?.price?.yes ?? 'n/a'}</div>
              <div>NO: {m.current_no_price ?? m.no_price ?? m?.price?.no ?? 'n/a'}</div>
            </div>
            <div className="mt-3 flex gap-2">
              <button className="rounded bg-green-600 px-3 py-1 text-white" onClick={() => signIntent(m.id || m.market_id || 'unknown', true, '0.01')}>Sign YES 0.01</button>
              <button className="rounded bg-red-600 px-3 py-1 text-white" onClick={() => signIntent(m.id || m.market_id || 'unknown', false, '0.01')}>Sign NO 0.01</button>
              <button className="rounded bg-indigo-600 px-3 py-1 text-white" onClick={() => analyzeMarket(m)}>Analyze</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
