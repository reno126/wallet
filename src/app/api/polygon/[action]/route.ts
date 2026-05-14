import { NextRequest, NextResponse } from "next/server";
import { ticekrPriceService } from "@/services/tickerPrice/tickerPriceService";

export const FETCH_CONFIG: RequestInit = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.API_TOKEN}`,
  },
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ action: string }> },
) {
  const { action } = await params;

  console.log("action", action);

  const searchParams = request.nextUrl.searchParams;

  const actionHandlerService = {
    tickerLastPrice: ticekrPriceService(searchParams).getTickerLastPrice,
    tickerSearch: ticekrPriceService(searchParams).tickerSearch,
  };

  const handler =
    actionHandlerService[action as keyof typeof actionHandlerService];

  if (!handler) {
    return NextResponse.json(`Unknown action: ${action}`, { status: 400 });
  }

  try {
    const rawResponse = await handler();

    console.log(rawResponse);

    return NextResponse.json(rawResponse);
  } catch (e) {
    console.error(e);
    const message = e instanceof Error ? e.message : "";
    return NextResponse.json(message, { status: 500 });
  }
}
