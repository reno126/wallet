"use server";
import "server-only";
import prisma from "@/lib/prisma";
import { WalletList } from "@/viewModels/walletList";
import { getUserId } from "@/lib/session";

export async function walletList(): Promise<WalletList> {
  const userId = await getUserId();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  return await prisma.wallet.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      name: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}
