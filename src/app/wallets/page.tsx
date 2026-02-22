import { walletList } from "@/serverActions/walletList";
import { Suspense } from "react";
import { WalletListGrid } from "./_components/WalletListGrid";

export default async function WalletsPage() {
  const wallets = walletList();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="mb-4 text-3xl font-bold">Wallets list</h1>
      <Suspense fallback={<p>Loading wallets...</p>}>
        <WalletListGrid wallets={wallets} />
      </Suspense>
    </div>
  );
}
