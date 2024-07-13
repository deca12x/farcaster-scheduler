import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { validateJWT } from "./lib/authHelpers";
import prisma from "./lib/db";

type User = {
  id: string;
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  theme: {
    logo: "https://next-auth.js.org/img/logo/logo-sm.png",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        token: { label: "Token", type: "text" },
      },
      async authorize(
        credentials: Partial<Record<"token", unknown>>,
      ): Promise<User | null> {
        const token = credentials.token as string; // Safely cast to string; ensure to handle undefined case
        if (typeof token !== "string" || !token) {
          throw new Error("Token is required");
        }
        const jwtPayload = await validateJWT(token);

        if (jwtPayload) {
          const user: User = {
            id: jwtPayload.verified_credentials[0].address || "",
          };
          const currentUser = await prisma.users.findFirst({
            where: {
              address: user.id,
            },
          });
          if (!currentUser) {
            await prisma.users.create({
              data: {
                address: user.id,
              },
            });
          }
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
});
