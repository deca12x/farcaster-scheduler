import { auth } from "@/auth";
import AddProfile from "@/components/AddProfile";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import { DynamicWidget } from "@/lib/dynamic";
import ProfileItem from "@/components/ProfileItem";
import Link from "next/link";

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
        <p className="font-bold my-8">Dashboard</p>
        {profiles.map((profile) => (
          <ProfileItem profile={profile} key={profile.signer_uid} />
        ))}
        <div className="flex justify-center mt-8">
          <AddProfile />
        </div>
      </div>
      <div className="col-span-5 min-h-screen flex flex-col">
        <div className="w-full bg-base-200 flex p-2 items-center">
        <div className="grow">
          <Link href="/">Scheduler</Link>
        </div>
          <div>
            <DynamicWidget />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
