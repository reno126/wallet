import { Asset } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";

export async function assetGet(assetId: string): Promise<Asset> {
  const queryResult = await prisma.asset.findUnique({
    where: {
      id: assetId,
    },
    // select: {
    //   id: true,
    //   walletId: true,
    //   name: true,
    //   ticker: true,
    //   lastPrice: true,
    //   priceUpdatedAt: true,
    //   currency: true,
    //   totalQuantity: true,
    //   purchaseValue: true,
    //   currentValue: true,
    //   createdAt: true,
    //   updatedAt: true,
    // },
  });

  if (!queryResult) {
    throw new Error("Asset not found");
  }
  return queryResult;
}
