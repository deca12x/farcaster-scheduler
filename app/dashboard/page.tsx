import { auth, signOut } from "@/auth";

export default async function Page() {
  const session = await auth();

  if (!session || !session.user) return <p>Please log in</p>;

  return (
    <div className="flex flex-col items-center justify-center grow">
      <p>Select a profile from the sidebar or add a new one</p>
    </div>
  );
}
