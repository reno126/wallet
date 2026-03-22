import { assetGet } from "@/serverActions/assetGet";
import { Suspense } from "react";
import AssetHistoryNewForm from "./_components/AssetHistoryNewForm";

export default async function WalletNewPage({
  params,
}: {
  params: Promise<{ walletId: string; assetId: string }>;
}) {
  const { walletId, assetId } = await params;

  const asset = assetGet(assetId);
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="mb-4 text-3xl font-bold">New Asset History page</h1>
      <Suspense fallback={<p>Loading asset data...</p>}>
        <AssetHistoryNewForm asset={asset} />
      </Suspense>
    </div>
  );
}
