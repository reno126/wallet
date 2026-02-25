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
    </div>
  );
}
