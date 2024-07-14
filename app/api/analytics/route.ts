import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { processData } from "../../../lib/utils/dataProcessing";

const prisma = new PrismaClient();

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

    // Insert or update processed data into the database
    for (const cast of processedData) {
      // Check if the cast already exists
      const existingCast = await prisma.casts.findUnique({
        where: { cast_hash: cast.cast_hash },
      });

      if (existingCast) {
        // Update the existing cast
        await prisma.casts.update({
          where: { cast_hash: cast.cast_hash },
          data: {
            cast_text: cast.cast_text,
            date_time: new Date(cast.datetime),
            published: true,
            signerUidId: existingCast.signerUidId ?? undefined,
          },
        });
      } else {
        // Prepare data for new cast creation
        const castData: any = {
          cast_text: cast.cast_text,
          ipfs_url: cast.ipfs_url,
          date_time: new Date(cast.datetime),
          published: true,
          cast_hash: cast.cast_hash,
        };

        // If `signerUidId` is available, include it in the data
        if (cast.signerUidId) {
          castData.signerUidId = cast.signerUidId;
        }

        // Insert the new cast
        await prisma.casts.create({
          data: castData,
        });
      }
    }

    return NextResponse.json({
      message: "Data processed and stored successfully",
    });
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
  } finally {
    await prisma.$disconnect();
  }
}
