import { AssetLastPriceListResult } from "@/viewModels/assetLastPriceListResult";
import { getRequest } from "../client/getRequest";

export const getTickerLastPrice = async (
  queryParams?: Record<string, string>,
): Promise<AssetLastPriceListResult> => {
  return await getRequest("tickerLastPrice", queryParams);
};
