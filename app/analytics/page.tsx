import { auth } from "@/auth";
import prisma from "@/lib/db";

export default async function Page() {
  const session = await auth();

  if (!session || !session.user) {
    console.log("Unauthenticated");
    return <p>Please log in</p>;
  }

  const user = await prisma.users.findUnique({
    where: { address: session.user.id },
  });

  if (!user) {
    console.log("User not found");
    return <p>User not found</p>;
  }

  const activeAccount = await prisma.signerUUIDs.findFirst({
    where: {
      address_user: session.user.id,
    },
    select: {
      id: true, // Include the id here
      fid: true,
    },
  });

  if (!activeAccount) {
    console.log("No active account found");
    return <p>No active account found</p>;
  }

  const fid = activeAccount.fid;
  const casts = await prisma.casts.findMany({
    where: {
      signerUidId: activeAccount.id,
    },
    select: {
      likes_count: true,
      recasts_count: true,
      date_time: true,
      channel_name: true,
    },
  });

  // Log the retrieved cast data
  console.log("Casts for fid:", fid);
  casts.forEach((cast) => {
    console.log({
      likes_count: cast.likes_count,
      recasts_count: cast.recasts_count,
      date_time: cast.date_time,
      channel_name: cast.channel_name,
    });
  });

  return (
    <div>
      <p>hey page</p>
      <ul>
        {casts.map((cast, index) => (
          <li key={index}>
            <p>Likes: {cast.likes_count}</p>
            <p>Recasts: {cast.recasts_count}</p>
            <p>Date: {new Date(cast.date_time).toLocaleString()}</p>
            <p>Channel: {cast.channel_name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
