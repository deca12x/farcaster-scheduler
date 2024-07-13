"use client";
import { addProfile } from "@/actions/addProfile";
import { NeynarContextProvider, Theme } from "@neynar/react";
import { getCsrfToken, getSession, signOut } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import {
  DynamicContextProvider,
  EthereumWalletConnectors,
} from "../lib/dynamic";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <DynamicContextProvider
        settings={{
          environmentId: process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID || "",
          walletConnectors: [EthereumWalletConnectors],
          eventsCallbacks: {
            onLogout: async () => {
              await signOut();
            },
            onAuthSuccess: async (event) => {
              const { authToken } = event;

              const csrfToken = await getCsrfToken();

              fetch("/api/auth/callback/credentials", {
                method: "POST",
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
                body: `csrfToken=${encodeURIComponent(
                  csrfToken!
                )}&token=${encodeURIComponent(authToken)}`,
              })
                .then((res) => {
                  if (res.ok) {
                    getSession();
                  } else {
                    console.error("Failed to log in");
                  }
                })
                .catch((error) => {
                  // Handle any exceptions
                  console.error("Error logging in", error);
                });
            },
          },
        }}
      >
        <NeynarContextProvider
          settings={{
            clientId: process.env.NEXT_PUBLIC_NEYNAR_CLIENT_ID || "",
            defaultTheme: Theme.Light,
            eventsCallbacks: {
              onAuthSuccess: async (params) => {
                console.log(params.user.signer_uuid);
                await addProfile(params.user.signer_uuid);
              },
            },
          }}
        >
          {children}
        </NeynarContextProvider>
      </DynamicContextProvider>
      <Toaster
        toastOptions={{
          style: {
            maxWidth: "fit-content",
          },
          position: "bottom-center",
        }}
      />
    </>
  );
};
