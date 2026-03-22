"use client";

import { Asset } from "@/generated/prisma/client";
import { assetHistoryNewSchema } from "@/schemas/assetHistoryNewSchema";
import { walletSchema } from "@/schemas/walletNewSchema";
import { assetHistoryCreate } from "@/serverActions/assetHistoryCreate";
import { walletCreate } from "@/serverActions/walletCreate";
import { zodResolver } from "@hookform/resolvers/zod";
import { use, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export type AssetHistoryNewFormValues = z.input<typeof assetHistoryNewSchema>;

interface AssetHistoryNewFormProps {
  asset: Promise<Asset>;
}

export default function AssetHistoryNewForm({
  asset,
}: AssetHistoryNewFormProps) {
  const [submitError, setSubmitError] = useState<string | null>(null);

  const assetResolved = use(asset);

  const form = useForm<AssetHistoryNewFormValues>({
    resolver: zodResolver(assetHistoryNewSchema),
    defaultValues: { assetId: assetResolved.id },
    mode: "onSubmit",
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const submitHandler = handleSubmit(async (values) => {
    setSubmitError(null);
    try {
      await assetHistoryCreate(values);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Failed to create asset history (unknown error).",
      );
    }
  });

  return (
    <div>
      <div>
        <p>Asset name: {assetResolved.name}</p>
        <p>Asset ticker: {assetResolved.ticker}</p>
      </div>
      <form onSubmit={submitHandler}>
        <fieldset disabled={isSubmitting}>
          <legend>Operation type</legend>

          <input
            type="radio"
            id="operationBuy"
            value="BUY"
            {...register("operationType")}
          />
          <label htmlFor="operationBuy">Buy</label>
          <input
            type="radio"
            id="operationSell"
            value="SELL"
            {...register("operationType")}
          />
          <label htmlFor="operationSell">Sell</label>

          <div>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              {...register("date", { valueAsDate: true })}
            />
            {errors.date && <p>{errors.date.message}</p>}
          </div>

          <div>
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              step="any"
              min="0"
              {...register("price", { valueAsNumber: true })}
            />
            {errors.price && <p>{errors.price.message}</p>}
          </div>

          <div>
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              id="quantity"
              step="any"
              min="0"
              {...register("quantity", { valueAsNumber: true })}
            />
            {errors.quantity && <p>{errors.quantity.message}</p>}
          </div>

          {submitError && <p>{submitError}</p>}

          <button type="submit">
            {isSubmitting ? "Saving..." : "Create asset history"}
          </button>
        </fieldset>
      </form>
    </div>
  );
}
