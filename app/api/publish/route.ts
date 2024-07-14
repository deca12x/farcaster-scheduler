import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET() {
  const casts = await prisma.casts.findMany({
    include: {
      signer_uid: true,
    },
    where: {
      date_time: {
        lt: new Date(),
      },
      published: false,
    },
  });
  try {
    casts.map(async (cast) => {
      const castOptions = {
        method: "POST",
        headers: {
          accept: "application/json",
          api_key: process.env.NEYNAR_API_KEY || "",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          parent_author_fid: cast.signer_uid.fid,
          text: cast.cast_text,
          signer_uuid: cast.signer_uid.signer_uid,
          embeds: cast.ipfs_url ? [{ url: cast.ipfs_url }] : [],
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

      const data = await response.json();
      console.log("Neynar API response:", data);
    });
    revalidatePath("/dashboard/[uuid]", "page");
    return Response.json({ status: "ok" });
  } catch (error) {
    console.error("Error:", error);
    return new NextResponse("Server Side error 500", { status: 500 });
  }
}
