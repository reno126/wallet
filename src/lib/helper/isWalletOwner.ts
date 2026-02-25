import prisma from "../prisma";

export async function isWalletOwner(
  walletId: string,
  userId: string,
): Promise<boolean> {
  const wallet = await prisma.wallet.findUnique({
    where: {
      id: walletId,
      userId: userId,
    },
  });
  return !!wallet;
}
