import prisma from "@/lib/prisma";

export async function isAssetOwner(
  assetId: string,
  userId: string,
): Promise<boolean> {
  const asset = await prisma.asset.findUnique({
    where: {
      id: assetId,
      wallet: {
        userId: userId,
      },
    },
  });
  return !!asset;
}
