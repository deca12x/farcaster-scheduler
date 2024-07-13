"use server"

import { auth } from "@/auth";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function addProfile (signer_uuid: string) {
    const session = await auth();
    if (!session || !session.user?.id) {
        console.log(session)
        console.log("Unauthenticated")
        return;
    }
    await prisma.signerUUIDs.create({
      data: {
        signer_uid: signer_uuid,
        address_user: session.user.id,
      },
    });
    revalidatePath("/dashboard");
  };