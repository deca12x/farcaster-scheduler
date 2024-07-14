import prisma from "@/lib/db";
import lighthouse from "@lighthouse-web3/sdk";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.formData();
  const uuid = data.get("uuid")?.toString();
  const datetime = data.get("datetime");
  const image = data.get("file") as File;
  const castText = data.get("castText");
  const cast_text = castText ? castText.toString() : "🤷";
  let channel = data.get("channel")?.toString();
  channel = channel?.startsWith("/") ? channel?.substring(1) : channel;

  try {
    let imageUrl = "";
    let newCast;

    if (image) {
      try {
        const id = await prisma.signerUUIDs.findFirstOrThrow({
          where: {
            signer_uid: uuid,
          },
        });
        const apiKey = process.env.LIGHTHOUSE_API_KEY || "";
        const arrayBuffer = await image.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer); // Convert to Buffer
        const uploadResponse = await lighthouse.uploadBuffer(buffer, apiKey);
        const { Hash } = uploadResponse.data;
        imageUrl = `https://gateway.lighthouse.storage/ipfs/${Hash}`;
        newCast = await prisma.casts.create({
          data: {
            ipfs_url: imageUrl,
            cast_text: cast_text,
            date_time: datetime ? new Date(datetime.toString()) : new Date(),
            published: false,
            signerUidId: id.id,
          },
        });
      } catch (error) {
        console.error("Failed to upload image to IPFS:", error);
        return new NextResponse("Invalid user field format.", { status: 400 });
      }
    }

    if (!newCast) {
      return new NextResponse("Failed to create cast entry.", { status: 500 });
    }

    // Send cast to Neynar API
    const castOptions = {
      method: "POST",
      headers: {
        accept: "application/json",
        api_key: process.env.NEYNAR_API_KEY || "",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        parent_author_fid: newCast.signerUidId,
        text: cast_text,
        signer_uuid: uuid,
        embeds: imageUrl ? [{ url: imageUrl }] : [],
        channel_id: channel,
      }),
    };

    console.log("Sending cast to Neynar:", castOptions);
    const response = await fetch(
      "https://api.neynar.com/v2/farcaster/cast",
      castOptions
    );

    if (!response.ok) {
      throw new Error(`Neynar API error: ${response.statusText}`);
    }

    const responseData = await response.json();
    console.log("Neynar API response:", responseData);

    // Update cast entry with hash from Neynar response
    const castHash = responseData.hash;
    await prisma.casts.update({
      where: {
        id: newCast.id,
      },
      data: {
        cast_hash: castHash,
        published: true,
      },
    });

    revalidatePath("/dashboard/[uuid]", "page");
    return NextResponse.json({ status: "ok", castHash });
  } catch (error) {
    console.error("Error:", error);
    return new NextResponse("Server Side error 500", { status: 500 });
  }
}
