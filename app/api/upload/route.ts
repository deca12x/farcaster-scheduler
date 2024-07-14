import prisma from "@/lib/db";
import lighthouse from "@lighthouse-web3/sdk";
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
        console.log("Image URL:", imageUrl);
        await prisma.casts.create({
          data: {
            ipfs_url: imageUrl,
            cast_text: cast_text,
            datetime: datetime ? datetime.toString() : "",
            published: false,
            signerUidId: id.id,
          },
        });
      } catch (error) {
        console.error("Failed to upload image to IPFS:", error);
        return new NextResponse("Invalid user field format.", { status: 400 });
      }
    }

    // const castOptions = {
    //   method: "POST",
    //   headers: {
    //     accept: "application/json",
    //     api_key: process.env.NEYNAR_API_KEY || "",
    //     "content-type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     parent_author_fid: user.fid,
    //     text: cast_text,
    //     signer_uuid: user.signer_uuid,
    //     embeds: imageUrl ? [{ url: imageUrl }] : [],
    //     channel_id: channel,
    //   }),
    // };

    // console.log("Sending cast to Neynar:", castOptions);
    // const response = await fetch(
    //   "https://api.neynar.com/v2/farcaster/cast",
    //   castOptions
    // );

    // if (!response.ok) {
    //   throw new Error(`Neynar API error: ${response.statusText}`);
    // }

    // const data = await response.json();
    // console.log("Neynar API response:", data);
    return new NextResponse("Success", { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return new NextResponse("Server Side error 500", { status: 500 });
  }
}
