"use server";

import { auth } from "@/auth";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function addProfile(signer_uuid: string, name: string, image: string, fid: string) {
  const session = await auth();
  if (!session || !session.user?.id) {
    console.log("Unauthenticated");
    return;
  }
  const profile = await prisma.signerUUIDs.findFirst({
    where: {
      signer_uid: signer_uuid,
      address_user: session.user.id,
    },
  });
  if (!profile) {
    await prisma.signerUUIDs.create({
      data: {
        signer_uid: signer_uuid,
        address_user: session.user.id,
        image: image,
        name: name,
        fid: fid
      },
    });
  }
  revalidatePath("/dashboard");
}
