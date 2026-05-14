import AssetNewForm from "../_components/AssetNewForm";

export default async function AssetNewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: walletId } = await params;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="mb-4 text-3xl font-bold">
        <AssetNewForm walletId={walletId} />
      </h1>
    </div>
  );
}
