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

    // Insert processed data into the database
    for (const cast of processedData) {
      // Fetch the signer based on fid
      let signer = await prisma.signerUUIDs.findUnique({
        where: { signer_uid: cast.fid.toString() },
      });

      // If signer does not exist, create a new one
      if (!signer) {
        signer = await prisma.signerUUIDs.create({
          data: {
            address_user: cast.fid.toString(),
            signer_uid: cast.fid.toString(),
            name: cast.author_display_name,
            image: cast.author_pfp_url,
          },
        });
      }

      // Insert the cast
      await prisma.casts.create({
        data: {
          cast_text: cast.cast_text,
          ipfs_url: cast.ipfs_url,
          date: cast.date,
          time: cast.time,
          published: true,
          signerUidId: signer.id,
          likes_count: cast.likes_count,
          recasts_count: cast.recasts_count,
          channel_name: cast.channel_name,
        },
      });
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
