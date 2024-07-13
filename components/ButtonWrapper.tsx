"use client";
import { ButtonProvider, useButton } from "./ButtonContext";
import { Providers } from "./Providers";

export const ButtonWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ButtonProvider>
        <Providers>{children}</Providers>
      </ButtonProvider>
    </>
  );
};
