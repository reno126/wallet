"use server";
import "server-only";
import prisma from "@/lib/prisma";
import { userId } from "@/lib/session";
import { WalletList } from "@/viewModels/walletList";

export async function walletList(): Promise<WalletList> {
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
