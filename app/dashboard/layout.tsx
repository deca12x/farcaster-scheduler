import { auth } from "@/auth";
import AddProfile from "@/components/AddProfile";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import { DynamicWidget } from "@/lib/dynamic";
import ProfileItem from "@/components/ProfileItem";
import Link from "next/link";
import Image from "next/image";
import { GET as runAnalyticsFlow } from "@/app/api/analytics/route"; // Import the analytics flow

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

  const userId = session.user.id;
  const user = await prisma.users.findUnique({
    where: { address: userId },
  });

  if (!user) {
    redirect("/");
  }

  const now = new Date();
  const lastTrigger = user.lastAnalyticsTrigger;
  const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);

  if (!lastTrigger || lastTrigger < fiveMinutesAgo) {
    // Run the analytics flow
    await runAnalyticsFlow();

    // Update the last trigger time
    await prisma.users.update({
      where: { address: userId },
      data: { lastAnalyticsTrigger: now },
    });
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
            <Link href="/">
              <Image
                src="/Logobru.png"
                alt="Logo"
                className="w-24"
                width={100}
                height={100}
              />
            </Link>
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
