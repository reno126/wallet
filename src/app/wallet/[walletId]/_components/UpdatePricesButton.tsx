"use client";

import { getTickerLastPrice } from "@/lib/query/getTickerLastPrice";

export function UpdatePricesButton() {
  const value = "AAPL";
  const handleClick = async () => {
    try {
      const result = await getTickerLastPrice({ ticker: value });

      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      onClick={handleClick}
    >
      Update Prices
    </button>
  );
}
