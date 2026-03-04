"use server";
import "server-only";
import prisma from "@/lib/prisma";
import { getUserId } from "@/lib/session";
import { AssetSelect } from "@/generated/prisma/models";

export type AssetList = Awaited<ReturnType<typeof assetList>>;

export async function assetList(walletId: string) {
  const userId = await getUserId();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  return await prisma.asset.findMany({
    where: {
      walletId: walletId,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      name: true,
      ticker: true,
      currency: true,
      totalQuantity: true,
      purchaseValue: true,
      currentValue: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

const assetSelect: AssetSelect = {
  id: true,
  name: true,
  ticker: true,
  currency: true,
  totalQuantity: true,
  purchaseValue: true,
  currentValue: true,
  createdAt: true,
  updatedAt: true,
};
