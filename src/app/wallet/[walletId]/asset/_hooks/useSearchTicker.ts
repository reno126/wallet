import { getTickerList } from "@/lib/query/getTickerList";
import { AssetSearchResultList } from "@/viewModels/assetSearchResult";
import { useCallback, useRef, useState } from "react";

export function useSearchTicker() {
  const [searchResult, setSearchResult] = useState<AssetSearchResultList>([]);
  const requestIdRef = useRef(0);

  const setSearchValue = useCallback(async (value: string) => {
    if (!value.trim()) {
      setSearchResult([]);
      return;
    }

    const currentRequestId = ++requestIdRef.current;

    try {
      const result = await getTickerList({ search: value });

      if (currentRequestId !== requestIdRef.current) {
        return;
      }

      setSearchResult(result);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return { setSearchValue, searchResult };
}
