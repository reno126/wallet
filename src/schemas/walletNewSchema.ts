import z from "zod";

export const walletNewSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Wallet name is required.")
    .max(80, "Wallet name must be at most 80 characters."),
});
