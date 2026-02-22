"use server";
import "server-only";
import prisma from "@/lib/prisma";
import { userId } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { redirect } from "next/navigation";
import { Prisma } from "@/generated/prisma/client";

const walletNewSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Wallet name is required.")
    .max(80, "Wallet name must be at most 80 characters."),
});

interface WalletCreateProps {
  name: string;
}

export type WalletCreateAction = typeof walletCreate;

export async function walletCreate({ name }: Readonly<WalletCreateProps>) {
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
