import { walletGet } from "@/serverActions/walletGet";
import WalletForm from "../../_components/WalletNewForm";
import { Suspense } from "react";

export default async function WalletEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const wallet = walletGet(id);
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="mb-4 text-3xl font-bold">Edit Wallet page</h1>
      <Suspense fallback={<p>Loading wallet data...</p>}>
        <WalletForm isNew={false} walletPromise={wallet} />
      </Suspense>
    </div>
  );
}
