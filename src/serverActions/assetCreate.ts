"use server";
import "server-only";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Prisma } from "@/generated/prisma/client";
import { isWalletOwner } from "@/lib/helper/isWalletOwner";
import { assetNewSchema } from "@/schemas/assetNewSchema";
import z from "zod";
import { getUserId } from "@/lib/session";

export type AssetCreateAction = typeof assetCreate;

export async function assetCreate(
  props: Readonly<z.infer<typeof assetNewSchema>>,
) {
  console.log("assetCreate.....");
  const userId = await getUserId();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  if (!isWalletOwner(props.walletId, userId)) {
    throw new Error("This is not your wallet.");
  }

  const validation = assetNewSchema.safeParse(props);

  if (!validation.success) {
    throw new Error(validation.error.name);
  }

  const { walletId, name, ticker, currency } = props;

  try {
    await prisma.asset.create({
      data: {
        walletId,
        name,
        ticker,
        currency,
        lastPrice: props.lastPrice,
        priceUpdatedAt: props.priceUpdatedAt,
        totalQuantity: props.totalQuantity,
        purchaseValue: props.purchaseValue,
        currentValue: props.currentValue,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error?.message);
      throw new Error("Database error: " + error.code);
    }

    throw new Error(
      "Unknown error occurred while creating asset. Please try again.",
    );
  }

  // revalidatePath("/assets");
  redirect("/wallet/" + walletId);
}
