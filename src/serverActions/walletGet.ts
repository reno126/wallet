import prisma from "@/lib/prisma";
import { Wallet } from "@/viewModels/walletList";

export async function walletGet(
  walletId: string,
): Promise<Pick<Wallet, "name">> {
  const queryResult = await prisma.wallet.findUnique({
    where: {
      id: walletId,
    },
    select: {
      name: true,
    },
  });

  if (!queryResult) {
    throw new Error("Wallet not found");
  }
  return queryResult;
}
