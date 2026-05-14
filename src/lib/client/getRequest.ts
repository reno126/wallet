import { createUrl } from "@/lib/client/createUrl";
import { NetworkError } from "@/errors/errors";
import { anyToError } from "@/lib/helper/anyToError";

type TQueryParams = Record<string, string>;

export const getRequest = async <TResult>(
  action: string,
  searchParams?: TQueryParams,
): Promise<TResult> => {
  try {
    const uri = createUrl("/api/polygon/", action, searchParams);
    const response = await fetch(uri);

    if (!response.ok) {
      const message = await response.text();
      throw new NetworkError(
        message,
        { context: `fetch.get.${action}` },
        response.status,
      );
    }

    return await response.json();
  } catch (e) {
    console.error(e);
    throw anyToError(e);
  }
};
