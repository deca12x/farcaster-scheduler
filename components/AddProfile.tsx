"use client";

import { NeynarAuthButton, useNeynarContext } from "@neynar/react";
import { useEffect, useRef } from "react";

export default function AddProfile() {
  const { user, isAuthenticated, logoutUser } = useNeynarContext();
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (!isAuthenticated) return;
    if (isAuthenticated) {
      logoutUser();
      ref.current?.close();
    }
  }, [isAuthenticated]);
  return (
    <>
      <button
        className="btn btn-primary"
        onClick={() => ref.current?.showModal()}
      >
        Add profile
      </button>
      <dialog className="modal" ref={ref}>
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg mt-4">Add profile</h3>
          <p>Add a profile for starting schedule your posts in one click</p>
          <div className="flex flex-col items-center justify-center py-10">
            {!user ? <NeynarAuthButton /> : <>Loading...</>}
          </div>
        </div>
      </dialog>
    </>
  );
}
