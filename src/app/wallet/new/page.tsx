import WalletForm from "../_components/WalletNewForm";

export default async function WalletNewPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="mb-4 text-3xl font-bold">New Wallet page</h1>
      <WalletForm isNew={true} />
    </div>
  );
}
