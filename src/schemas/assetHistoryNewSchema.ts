import z from "zod";

export const assetHistoryNewSchema = z.object({
  assetId: z.string(),
  operationType: z.enum(["BUY", "SELL"]),
  price: z.number(),
  quantity: z.number(),
  date: z.string(),
});
