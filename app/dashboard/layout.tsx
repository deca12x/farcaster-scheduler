import { auth } from "@/auth";
import AddProfile from "@/components/AddProfile";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { DynamicWidget } from "@/lib/dynamic";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session || !session.user?.id) {
    console.log("Unauthenticated");
    redirect("/");
  }
  const profiles = await prisma.signerUUIDs.findMany({
    where: {
      address_user: session.user.id,
    },
  });
  return (
    <div className="grid grid-cols-6 min-h-screen">
      <div className="bg-base-200 flex flex-col items-center border-r-2 border-base-300">
        <p className="font-bold my-8">Scheduler</p>
        {profiles.map((profile) => (
          <Link
            className="flex items-center justify-start mt-2 gap-4 w-full px-4"
            key={profile.id}
            href={"/dashboard/" + profile.signer_uid}
          >
            <Image
              src={profile.image}
              alt="profile"
              className="rounded-full"
              width={50}
              height={50}
            />
            <span>{profile.name}</span>
          </Link>
        ))}
        <div className="flex justify-center mt-8">
          <AddProfile />
        </div>
      </div>
      <div className="col-span-5 min-h-screen flex flex-col">
        <div className="w-full bg-base-200 justify-end flex p-2">
          <div>
            <DynamicWidget />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
