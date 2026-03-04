"use client";

import { assetNewSchema } from "@/schemas/assetNewSchema";
import { assetCreate } from "@/serverActions/assetCreate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import SearchAsset from "./SearchAsset";
import { useSearchTicker } from "../_hooks/useSearchTicker";

export type AssetNewFormValues = Omit<
  z.infer<typeof assetNewSchema>,
  "walletId"
>;

export default function AssetNewForm({ walletId }: { walletId: string }) {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { setSearchValue, searchResult } = useSearchTicker();

  const form = useForm<AssetNewFormValues>({
    resolver: zodResolver(assetNewSchema.omit({ walletId: true })),
    mode: "onChange",
  });

  const [name, ticker, currency] = useWatch({
    control: form.control,
    name: ["name", "ticker", "currency"],
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

  console.log("AssetNewForm", searchResult);

  return (
    <form onSubmit={submitHandler}>
      <fieldset disabled={isSubmitting}>
        <legend>New asset</legend>

        <div>
          <SearchAsset setValue={setSearchValue} />
        </div>

        <div>
          <label>Search results</label>
          <ul className="text-stone-400 text-lg max-h-96 overflow-auto">
            {searchResult.map((item) => (
              <li key={item.ticker} className="hover:bg-stone-700">
                <button
                  type="button"
                  onClick={() => {
                    form.setValue("name", item.name);
                    form.setValue("ticker", item.ticker);
                    form.setValue("currency", item.currency);
                  }}
                >
                  Use this
                </button>{" "}
                {item.name} ({item.ticker}) - {item.currency}
              </li>
            ))}
          </ul>
        </div>

        <div>
          Selected asset: {name} {ticker} - {currency}
        </div>

        {errors.currency && (
          <p className="text-red-600 text-sm">
            {Object.entries(errors)
              .map(([key, value]) => `${key}: ${value?.message}`)
              .join(", ")}
          </p>
        )}

        {submitError && <p>{submitError}</p>}

        <button type="submit">
          {isSubmitting ? "Saving..." : "Create asset"}
        </button>
      </fieldset>
    </form>
  );
}
