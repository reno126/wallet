"use server";
import "server-only";
import prisma from "@/lib/prisma";
import { WalletListViewModel } from "@/viewModels/walletList";
import { getUserId } from "@/lib/session";

export async function walletList(): Promise<WalletListViewModel> {
  const userId = await getUserId();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const walletsRaw = await prisma.wallet.findMany({
    where: {
      userId: userId,
    },
  });

  return walletsRaw.map((wallet) => ({
    id: wallet.id,
    name: wallet.name,
    createdAt: wallet.createdAt,
    updatedAt: wallet.updatedAt,
  }));
}
