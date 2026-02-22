"use client";

import type { WalletCreateAction } from "@/serverActions/walletCreate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const walletNewSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Wallet name is required.")
    .max(80, "Wallet name must be at most 80 characters."),
});

export type WalletNewFormValues = z.infer<typeof walletNewSchema>;

export default function WalletNewForm({
  action,
}: {
  action: WalletCreateAction;
}) {
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<WalletNewFormValues>({
    resolver: zodResolver(walletNewSchema),
    defaultValues: {
      name: "",
    },
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
      await action({ name: values.name });
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
        <legend>New wallet</legend>

        <div>
          <label htmlFor="name">Wallet name</label>
          <input id="name" type="text" {...register("name")} />
          {errors.name && <p>{errors.name.message}</p>}
        </div>

        {submitError && <p>{submitError}</p>}

        <button type="submit">
          {isSubmitting ? "Saving..." : "Create wallet"}
        </button>
      </fieldset>
    </form>
  );
}
