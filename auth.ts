
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { validateJWT } from "./lib/authHelpers";

type User = {
  id: string;
  // Add other fields as needed
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
        credentials,
      ): Promise<User | null> {
        if(!credentials) {
          throw new Error("Credentials is required");
        }
        const token = credentials.token as string; // Safely cast to string; ensure to handle undefined case
        if (typeof token !== "string" || !token) {
          throw new Error("Token is required");
        }
        const jwtPayload = await validateJWT(token);

        if (jwtPayload) {
          // Transform the JWT payload into your user object
          const user: User = {
            id: jwtPayload.sub || "",
          };
          return user;
        } else {
          return null;
        }
      },
      
    }),
  ],
})
