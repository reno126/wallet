"use client";
import { WalletListViewModel } from "@/viewModels/walletList";
import Link from "next/link";
import { use } from "react";
import { Fragment } from "react/jsx-runtime";

interface WalletListGridProps {
  wallets: Promise<WalletListViewModel>;
}

export function WalletListGrid({ wallets }: WalletListGridProps) {
  const resolvedWallets = use(wallets);
  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
      {resolvedWallets.map((wallet) => (
        <Fragment key={wallet.id}>
          <Link href={`/wallet/${wallet.id}`} className="text-lg font-semibold">
            {wallet.name}
          </Link>
          <p className="text-sm text-gray-500">
            Created at: {wallet.createdAt.toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-500">
            Updated at: {wallet.updatedAt.toLocaleDateString()}
          </p>
          <Link
            href={`/wallet/${wallet.id}/edit`}
            className="text-lg font-semibold hover:underline"
          >
            Edit
          </Link>
        </Fragment>
      ))}
    </div>
  );
}
