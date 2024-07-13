"use client";

import { NeynarAuthButton, useNeynarContext } from "@neynar/react";
import { useRef } from "react";

export default function AddProfile() {
  const { user } = useNeynarContext();
  const ref = useRef<HTMLDialogElement>(null);
  return (
    <>
      <button className="btn" onClick={() => ref.current?.showModal()}>
        Add profile
      </button>
      <dialog id="my_modal_1" className="modal" ref={ref}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add profile</h3>
          {!user ? <NeynarAuthButton /> : <>Loading...</>}
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
