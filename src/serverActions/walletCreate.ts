"use server";
import "server-only";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

import { redirect } from "next/navigation";
import { Prisma } from "@/generated/prisma/client";
import { walletNewSchema } from "@/schemas/walletNewSchema";
import { getUserId } from "@/lib/session";

interface WalletCreateProps {
  name: string;
}

export type WalletCreateAction = typeof walletCreate;

export async function walletCreate({ name }: Readonly<WalletCreateProps>) {
  const userId = await getUserId();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const validation = walletNewSchema.safeParse({ name });

  if (!validation.success) {
    throw new Error(validation.error.name);
  }

  try {
    await prisma.wallet.create({
      data: {
        name,
        userId: userId,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new Error("Database error: " + error.code);
    }

    throw new Error(
      "Unknown error occurred while creating wallet. Please try again.",
    );
  }

  // revalidatePath("/wallets");
  redirect("/wallets");
}
