import { FETCH_CONFIG } from "@/app/api/polygon/[action]/route";
import { createUrl } from "./createUrl";
import { th } from "zod/locales";

export async function polygonClient(
  path: string,
  searchParams?: URLSearchParams,
) {
  const url = createUrl(process.env.API_HOST as string, path, searchParams);

  try {
    const response = await fetch(url, {
      ...FETCH_CONFIG,
    });

    if (!response.ok) {
      throw new Error(
        `Polygon API error: ${response.status} ${response.statusText}`,
      );
    }

    const rawResponse = await response.json();

    return rawResponse;
  } catch (e) {
    console.error(e);
    throw Error("Polygon network error");
  }
}
