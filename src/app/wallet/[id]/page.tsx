import Link from "next/link";

export default async function WalletPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: walletId } = await params;

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
    </div>
  );
}
