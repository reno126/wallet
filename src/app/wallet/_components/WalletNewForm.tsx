"use client";

import { walletSchema } from "@/schemas/walletNewSchema";
import { walletCreate } from "@/serverActions/walletCreate";
import { zodResolver } from "@hookform/resolvers/zod";
import { use, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export type WalletFormValues = z.infer<typeof walletSchema>;

interface WalletFormProps {
  isNew: boolean;
  walletPromise?: Promise<WalletFormValues>;
}

export default function WalletForm({ isNew, walletPromise }: WalletFormProps) {
  const [submitError, setSubmitError] = useState<string | null>(null);

  let wallet: WalletFormValues | undefined;
  if (!isNew && walletPromise) {
    wallet = use(walletPromise);
  }

  const form = useForm<WalletFormValues>({
    resolver: zodResolver(walletSchema),
    defaultValues: wallet,
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
      await walletCreate({ name: values.name });
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Failed to create wallet (unknown error).",
      );
    }
  });

  return (
    <form onSubmit={submitHandler}>
      <fieldset disabled={isSubmitting}>
        <legend>{isNew ? "New wallet" : "Edit wallet"}</legend>

        <div>
          <label htmlFor="name">Wallet name</label>
          <input id="name" type="text" {...register("name")} />
          {errors.name && <p>{errors.name.message}</p>}
        </div>

        {submitError && <p>{submitError}</p>}

        <button type="submit">
          {isSubmitting
            ? "Saving..."
            : isNew
              ? "Create wallet"
              : "Update wallet"}
        </button>
      </fieldset>
    </form>
  );
}
