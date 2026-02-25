"use client";

import { assetNewSchema } from "@/schemas/assetNewSchema";
import { assetCreate } from "@/serverActions/assetCreate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export type AssetNewFormValues = Omit<
  z.infer<typeof assetNewSchema>,
  "walletId"
>;

export default function AssetNewForm({ walletId }: { walletId: string }) {
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<AssetNewFormValues>({
    resolver: zodResolver(assetNewSchema.omit({ walletId: true })),
    defaultValues: {
      currency: "USD",
    },
    mode: "onSubmit",
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const submitHandler = handleSubmit(async (values) => {
    console.log("Submitting asset:", {
      walletId,
      ...values,
    });
    setSubmitError(null);
    try {
      await assetCreate({ walletId, ...values });
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Failed to create asset (unknown error).",
      );
    }
  });

  return (
    <form onSubmit={submitHandler}>
      <fieldset disabled={isSubmitting}>
        <legend>New asset</legend>

        <div>
          <label htmlFor="name">Asset name</label>
          <input id="name" type="text" {...register("name")} />
          {errors.name && <p>{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="ticker">Ticker</label>
          <input id="ticker" type="text" {...register("ticker")} />
          {errors.ticker && <p>{errors.ticker.message}</p>}
        </div>

        {submitError && <p>{submitError}</p>}

        <button type="submit">
          {isSubmitting ? "Saving..." : "Create asset"}
        </button>
      </fieldset>
    </form>
  );
}
