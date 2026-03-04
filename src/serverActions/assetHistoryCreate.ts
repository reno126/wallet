"use server";
import "server-only";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Prisma } from "@/generated/prisma/client";
import { isAssetOwner } from "@/lib/helper/isAssetOwner";
import z from "zod";
import { getUserId } from "@/lib/session";
import { assetHistoryNewSchema } from "@/schemas/assetHistoryNewSchema";

export type AssetHistoryCreateAction = typeof assetHistoryCreate;

export async function assetHistoryCreate(
  props: Readonly<z.infer<typeof assetHistoryNewSchema>>,
) {
  const userId = await getUserId();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  if (!isAssetOwner(props.assetId, userId)) {
    throw new Error("This is not your asset.");
  }

  const validation = assetHistoryNewSchema.safeParse(props);

  if (!validation.success) {
    throw new Error(validation.error.name);
  }

  try {
    await prisma.assetHistory.create({ data: props });

    await prisma.$transaction(async (tx) => {
      // 1. Aktualizacja dziecka
      const updatedChild = await tx.child.update({
        where: { id: childId },
        data: { quantity: newQuantity },
      });

      // 2. Pobierz wszystkie dzieci tego rodzica
      const allChildren = await tx.child.findMany({
        where: { parentId: updatedChild.parentId },
      });

      // 3. Oblicz nową sumę
      const newTotal = allChildren.reduce(
        (sum, c) => sum + c.price * c.quantity,
        0,
      );

      // 4. Zaktualizuj rodzica
      await tx.parent.update({
        where: { id: updatedChild.parentId },
        data: { totalValue: newTotal },
      });
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

  // redirect("/wallet/" + walletId);
}
