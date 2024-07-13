"use client"
import { NeynarContextProvider, Theme } from "@neynar/react";
import { Toaster } from "react-hot-toast";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NeynarContextProvider
        settings={{
          clientId: process.env.NEXT_PUBLIC_NEYNAR_CLIENT_ID || "",
          defaultTheme: Theme.Light,
          eventsCallbacks: {
            onAuthSuccess: () => {},
            onSignout() {},
          },
        }}
      >
        {children}
      </NeynarContextProvider>
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
