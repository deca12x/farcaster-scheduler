import { NextResponse } from "next/server";
import { processData } from "../../../lib/utils/dataProcessing";

export async function GET() {
  const url =
    "https://api.neynar.com/v2/farcaster/feed?feed_type=filter&filter_type=fids&fids=410626&with_recasts=false&limit=100";

  const apiKey = process.env.NEYNAR_API_KEY ?? "";

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      api_key: apiKey,
    },
  };

  try {
    const res = await fetch(url, options);
    const data = await res.json();

    // Process the data using the utility function
    const processedData = processData(data);

    return NextResponse.json(processedData);
  } catch (err) {
    console.error("error:", err);
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { error: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
}
