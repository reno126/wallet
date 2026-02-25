import prisma from "@/lib/prisma";
import { WalletViewModel } from "@/viewModels/walletList";

export async function walletGet(
  walletId: string,
): Promise<Pick<WalletViewModel, "name">> {
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
