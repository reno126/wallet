import { AssetSearchResultList } from "@/viewModels/assetSearchResult";
import { getRequest } from "../client/getRequest";

export interface TickerRaw {
  active: boolean;
  cik: string;
  composite_figi: string;
  currency_name: string;
  last_updated_utc: string;
  locale: string;
  market: string;
  name: string;
  primary_exchange: string;
  share_class_figi: string;
  ticker: string;
  type: string;
}

export interface TickerRawResponse {
  count: number;
  request_id: string;
  results: TickerRaw[];
  status: string;
}

export const getTickerList = async (
  queryParams?: Record<string, string>,
): Promise<AssetSearchResultList> => {
  return await getRequest("tickerSearch", queryParams);
};
