import { Asset } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";

export async function assetGet(assetId: string): Promise<Asset> {
  const queryResult = await prisma.asset.findUnique({
    where: {
      id: assetId,
    },
  });

  if (!queryResult) {
    throw new Error("Asset not found");
  }
  return queryResult;
}
