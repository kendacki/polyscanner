import Image from "next/image";
import WalletConnect from "./components/WalletConnect";
import MarketView from "./components/MarketView";

export default function Home() {
  return (
    <div className="flex min-h-screen items-start justify-center bg-zinc-50 font-sans dark:bg-black py-8">
      <main className="w-full max-w-5xl space-y-8 px-6">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image className="dark:invert" src="/next.svg" alt="Next.js logo" width={80} height={18} priority />
            <h1 className="text-2xl font-semibold">Polyscanner — Markets</h1>
          </div>
          <div className="glass rounded-md p-2">
            <WalletConnect />
          </div>
        </header>

        <section className="grid grid-cols-1 gap-6 md:grid-cols-3 md:items-start">
          <div className="col-span-2">
            <div className="glass rounded-md p-4">
              <MarketView />
            </div>
          </div>
          <aside className="glass rounded-md p-4">
            <h3 className="mb-2 text-lg font-medium">Trade Router</h3>
            <p className="text-sm text-zinc-600">Connect your wallet and sign a trade intent. Backend will provide router details for on-chain execution.</p>
          </aside>
        </section>
      </main>
    </div>
  );
}
