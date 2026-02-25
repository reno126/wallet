"use client";
import { WalletList } from "@/viewModels/walletList";
import Link from "next/link";
import { use } from "react";
import { Fragment } from "react/jsx-runtime";

interface WalletListGridProps {
  wallets: Promise<WalletList>;
}

export function WalletListGrid({ wallets }: WalletListGridProps) {
  const resolvedWallets = use(wallets);
  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
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
        </Fragment>
      ))}
    </div>
  );
}
