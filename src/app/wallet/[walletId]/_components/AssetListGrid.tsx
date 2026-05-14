"use client";
import { AssetList } from "@/serverActions/assetList";
import Link from "next/link";
import { use } from "react";
import { Fragment } from "react/jsx-runtime";

interface AssetListGridProps {
  assets: Promise<AssetList>;
  walletId: string;
}

export function AssetListGrid({ assets, walletId }: AssetListGridProps) {
  const resolvedAssets = use(assets);

  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-6">
      <strong>Ticker</strong>
      <strong>Name</strong>
      <strong>Purchase Value</strong>
      <strong>Total Quantity</strong>
      <strong>Created At</strong>
      <strong>Updated At</strong>

      {resolvedAssets.map((asset) => (
        <Fragment key={asset.id}>
          <div>{asset.ticker}</div>
          <Link
            href={`/wallet/${walletId}/asset/${asset.id}/history/new`}
            className="text-lg font-semibold truncate"
          >
            {asset.name}
          </Link>
          <p className="text-sm text-gray-500">
            {asset.purchaseValue?.toString()}
          </p>
          <p className="text-sm text-gray-500">
            {asset.totalQuantity?.toString()}
          </p>
          <p className="text-sm text-gray-500">
            {asset.createdAt.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500">
            {asset.updatedAt.toLocaleString()}
          </p>
        </Fragment>
      ))}
    </div>
  );
}
