import { polygonClient } from "@/lib/client/polygonClient";

export function ticekrPriceService(searchParams: URLSearchParams) {
  return {
    getTickerLastPrice: async () => {
      try {
        const ticker = searchParams.get("ticker");

        const rawResponse = await polygonClient(
          `v2/aggs/ticker/${ticker}/prev`,
        );

        return rawResponse.results[0].c;
      } catch (error) {
        console.error("Error fetching ticker last price:", error);
        throw Error("Failed to fetch ticker last price");
      }
    },
    tickerSearch: async () => {
      try {
        const rawResponse = await polygonClient(
          "v3/reference/tickers",
          searchParams,
        );
        const searchResult = rawResponse;
        return searchResult;
      } catch (error) {
        console.error("Error during ticker search:", error);
        throw Error("Failed to search tickers");
      }
    },
  };
}
