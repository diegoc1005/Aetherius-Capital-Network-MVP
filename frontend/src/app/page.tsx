import WalletConnect from '@/components/WalletConnect';

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold text-center sm:text-left w-full mb-8">
          Avalanche Fuji dApp
        </h1>

        <div className="w-full max-w-2xl mx-auto">
          <WalletConnect />
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center text-sm text-gray-500">
        <p>Built with Next.js and Ethers.js</p>
      </footer>
    </div>
  );
}
