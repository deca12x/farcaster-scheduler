import { auth } from "@/auth";
import AddProfile from "@/components/AddProfile";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import Image from "next/image";

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
      <div className="bg-base-200 flex flex-col items-center">
        <p className="font-bold my-8">Scheduler</p>
        {profiles.map((profile) => (
            <div className="flex items-center justify-start gap-4" key={profile.id}>
              <Image src={profile.image} alt="profile" className="rounded-full" width={50} height={50} />
              {profile.name}
            </div>
          ))}
        <div className="flex justify-center mt-8">
          <AddProfile />
        </div>
      </div>
      <div className="col-span-5 flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
}
