"use server";
import "server-only";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Prisma } from "@/generated/prisma/client";
import { isAssetOwner } from "@/lib/helper/isAssetOwner";
import z from "zod";
import { getUserId } from "@/lib/session";
import { assetHistoryNewSchema } from "@/schemas/assetHistoryNewSchema";
import Big from "big.js";

export type AssetHistoryCreateAction = typeof assetHistoryCreate;

export async function assetHistoryCreate(
  props: Readonly<z.infer<typeof assetHistoryNewSchema>>,
) {
  const userId = await getUserId();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  if (!(await isAssetOwner(props.assetId, userId))) {
    throw new Error("This is not your asset.");
  }

  const validation = assetHistoryNewSchema.safeParse(props);

  if (!validation.success) {
    throw new Error(validation.error.name);
  }

  const updatedAsset = await assetHistoryCreateTransaction(props);

  redirect("/wallet/" + updatedAsset.walletId);
}

async function assetHistoryCreateTransaction(
  props: Readonly<z.infer<typeof assetHistoryNewSchema>>,
) {
  try {
    return prisma.$transaction(async (tx) => {
      const asset = await tx.asset.findUniqueOrThrow({
        where: { id: props.assetId },
        select: { totalQuantity: true, purchaseValue: true, walletId: true },
      });

      const priceInput = Big(props.price);
      const quantityInput = Big(props.quantity);

      const currentQty = Big(asset.totalQuantity ?? 0);
      const currentPurchaseValue = Big(asset.purchaseValue ?? 0);

      let nextQty: Big;
      let nextPurchase: Big;

      if (props.operationType === "BUY") {
        nextQty = currentQty.plus(quantityInput);
        nextPurchase = currentPurchaseValue.plus(
          priceInput.times(quantityInput),
        );
      } else {
        if (currentQty.lt(quantityInput)) {
          throw new Error("Sell below current quantity.");
        }

        nextQty = currentQty.minus(quantityInput);
        nextPurchase = currentPurchaseValue.minus(
          priceInput.times(quantityInput),
        );
      }

      await tx.assetHistory.create({
        data: {
          assetId: props.assetId,
          price: priceInput.toNumber(),
          quantity: quantityInput.toNumber(),
          operationType: props.operationType,
          date: props.date,
        },
      });

      const updatedAsset = await tx.asset.update({
        where: { id: props.assetId },
        data: {
          totalQuantity: nextQty.toNumber(),
          purchaseValue: nextPurchase.toNumber(),
        },
      });

      return updatedAsset;
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error?.message);
      throw new Error("Database error: " + error.code);
    }

    throw new Error(
      "Unknown error occurred while creating assetHistory. Please try again.",
    );
  }
}
