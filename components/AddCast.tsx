"use client";

import { SignerUUIDs } from "@prisma/client";
import { useRouter } from "next/navigation";
import { userInfo } from "os";
import { useRef, useState } from "react";

export default function AddCast({profile}: {profile: SignerUUIDs}) {
    const [isLoading, setIsLoading] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [castText, setCastText] = useState<string>("");
    const [channel, setChannel] = useState<string>("");
    const [publishDate, setPublishDate] = useState<string>("");
    const router = useRouter()
  
    const fileInputRef = useRef<HTMLInputElement>(null);
  
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFile(e.target.files ? e.target.files[0] : null);
    };
  
    const handleAddImageClick = () => {
      fileInputRef.current?.click();
    };
  
    const handleCastClick = async () => {
        setIsLoading(true);
        const formData = new FormData();
        if (file) {
          formData.append("file", file);
        }
        formData.append("castText", castText);
        formData.append("uuid", profile.signer_uid);
        formData.append("datetime", publishDate)
        if (channel) {
          formData.append("channel", channel);
        }
  
        try {
          console.log("Sending formData:", formData);
          const res = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });
          const data = await res.json();
          ref.current?.close()
          router.refresh();
          console.log("Response data:", data);
        } catch (error) {
          console.error("Error:", error);
        } finally {
          setIsLoading(false);
        }
      }
  const ref = useRef<HTMLDialogElement>(null);
 
  return (
    <>
      <button
        className="btn btn-primary"
        onClick={() => ref.current?.showModal()}
      >
        + schedule
      </button>
      <dialog className="modal" ref={ref}>
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-semibold mt-4">Add schedule</h3>
          <div className="flex flex-col gap-4 mt-6">
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Cast text"
              value={castText}
              onChange={(e) => setCastText(e.target.value)}
            ></textarea>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium">
                  Publish Date
                </label>
                <input
                  type="datetime-local"
                  value={publishDate}
                  onChange={(e) => setPublishDate(e.target.value)}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium">Channel</label>
                <input
                  type="text"
                  value={channel}
                  onChange={(e) => setChannel(e.target.value)}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="flex-1 flex items-end">
                <button
                  className="btn btn-outline w-full"
                  onClick={handleAddImageClick}
                >
                  Add Image
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </div>
            <button
              onClick={handleCastClick}
              className="btn btn-primary mt-4"
              disabled={isLoading}
            >
              {isLoading ? "Scheduling..." : "Schedule"}
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
