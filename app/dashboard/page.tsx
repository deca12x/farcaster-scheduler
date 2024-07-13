import { auth, signOut } from "@/auth";

export default async function Page() {
  const session = await auth();

  if (!session || !session.user) return <p>Please log in</p>;

  return (
    <div>
      <p>{session.user.id}</p>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">Sign Out</button>
      </form>
    </div>
  );
}
