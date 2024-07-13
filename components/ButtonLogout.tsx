"use client"
import { useNeynarContext } from "@neynar/react";
import { useButton } from "./ButtonContext";
import { useRouter } from "next/router";

export const ButtonLogout = () => {
    const { logoutUser } = useNeynarContext();
    const { buttonRef } = useButton();

  return (
    <button ref={buttonRef} className="hidden" onClick={() => {
        console.log("logout ccc")
        logoutUser()}}>
    </button>
  );
}