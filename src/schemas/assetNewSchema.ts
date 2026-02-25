import z from "zod";

export const assetNewSchema = z.object({
  walletId: z.string(),
  ticker: z
    .string()
    .trim()
    .min(1, "Ticker is required.")
    .max(10, "Ticker must be at most 10 characters."),
  name: z
    .string()
    .trim()
    .min(2, "Asset name is required.")
    .max(80, "Asset name must be at most 80 characters."),
  currency: z
    .string()
    .trim()
    .min(2, "Currency is required.")
    .max(3, "Currency must be at most 3 characters."),
  lastPrice: z.number().optional(),
  priceUpdatedAt: z.string().optional(),
  totalQuantity: z.number().optional(),
  purchaseValue: z.number().optional(),
  currentValue: z.number().optional(),
});
