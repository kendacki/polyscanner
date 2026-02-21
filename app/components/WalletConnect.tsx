"use client";

import React, { useEffect, useState } from "react";

export default function WalletConnect() {
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const eth = (window as any).ethereum;
    if (!eth) return;
    eth.on && eth.on("accountsChanged", (accounts: string[]) => setAddress(accounts[0] || null));
  }, []);

  async function connect() {
    const eth = (window as any).ethereum;
    if (!eth) {
      alert("No Web3 wallet found. Install MetaMask or another wallet.");
      return;
    }
    try {
      const accounts = await eth.request({ method: "eth_requestAccounts" });
      setAddress(accounts[0] || null);
    } catch (err) {
      console.error(err);
    }
  }

  async function disconnect() {
    setAddress(null);
  }

  function short(addr: string | null) {
    if (!addr) return "";
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  }

  return (
    <div className="flex items-center gap-3 font-poppins">
      {address ? (
        <>
          <div className="rounded-md bg-zinc-100 px-3 py-1 text-sm">{short(address)}</div>
          <button className="rounded-md bg-red-500 px-3 py-1 text-sm text-white" onClick={disconnect}>
            Disconnect
          </button>
        </>
      ) : (
        <button className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white" onClick={connect}>
          Connect Wallet
        </button>
      )}
    </div>
  );
}
