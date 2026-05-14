import { assetList } from "@/serverActions/assetList";
import Link from "next/link";
import { Suspense } from "react";
import { AssetListGrid } from "./_components/AssetListGrid";
import { UpdatePricesButton } from "./_components/UpdatePricesButton";

export default async function WalletPage({
  params,
}: {
  params: Promise<{ walletId: string }>;
}) {
  const { walletId: walletId } = await params;

  const assets = assetList(walletId);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="mb-4 text-3xl font-bold">Wallet page</h1>
      <h2>List of assets for wallet {walletId}</h2>
      <Link
        href={`/wallet/${walletId}/asset/new`}
        className="mt-4 inline-block rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Add Asset
      </Link>

      <div>
        <UpdatePricesButton />
      </div>

      <div>
        <Suspense fallback={<div>Loading assets...</div>}>
          <AssetListGrid assets={assets} walletId={walletId} />
        </Suspense>
      </div>
    </div>
  );
}
