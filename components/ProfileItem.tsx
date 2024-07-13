"use client";

import { SignerUUIDs } from "@prisma/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

export default function ProfileItem({ profile }: { profile: SignerUUIDs }) {
  const pathname = usePathname();
  return (
    <Link
      className="flex items-center justify-start mt-2 gap-4 w-full px-4"
      key={profile.id}
      href={"/dashboard/" + profile.signer_uid}
    >
      <Image
        src={profile.image}
        alt="profile"
        className={twMerge(
          "rounded-full w-14 h-14",
          pathname.includes(profile.signer_uid) && "ring-violet-400 ring ring-offset-2"
        )}
        width={50}
        height={50}
      />
      <span>{profile.name}</span>
    </Link>
  );
}
