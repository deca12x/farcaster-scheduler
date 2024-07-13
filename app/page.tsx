"use client";

import Image from "next/image";
import { NeynarAuthButton, useNeynarContext } from "@neynar/react";
import { DynamicWidget } from "@/lib/dynamic";
import { useState, useRef } from "react";
import "daisyui/dist/full.css";

export default function Home() {
  const { user } = useNeynarContext();
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [castText, setCastText] = useState<string>("");
  const [channel, setChannel] = useState<string>("");
  const [publishTime, setPublishTime] = useState<string>("");
  const [publishDate, setPublishDate] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files ? e.target.files[0] : null);
  };

  const handleAddImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleCastClick = async () => {
    if (user) {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("user", JSON.stringify(user));
      if (file) {
        formData.append("file", file);
      }
      formData.append("castText", castText);
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
        console.log("Response data:", data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.error("User is not authenticated");
    }
  };

  return (
    <main className="flex min-h-screen flex-row bg-base-200">
      {/* Sidebar */}
      <aside className="w-1/5 bg-base-100 p-4 shadow-lg flex flex-col items-center gap-4">
        <div className="mb-4">
          <Image src="/logo.svg" alt="Logo" width={100} height={50} />
        </div>
        <button className="btn btn-primary mb-6">Add Account</button>
        {/* Added Widgets */}
        <div className="w-full flex flex-col gap-4">
          <DynamicWidget />
          <NeynarAuthButton className="p-2 rounded shadow bg-base-100" />
        </div>
        {/* Accounts List */}
        <div className="flex flex-col gap-4 w-full">
          {[1, 2, 3, 4].map((index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-2 bg-base-100 rounded shadow"
            >
              <div className="avatar">
                <div className="w-10 h-10 rounded-full bg-neutral-focus"></div>
              </div>
              <p className="text-lg font-semibold">Nome</p>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <section className="w-4/5 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold">New Cast</h1>
          <a href="#" className="link link-primary">
            Analytics
          </a>
        </div>
        <div className="bg-base-100 p-6 rounded-lg shadow-md">
          <div className="flex flex-col gap-4">
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
                  type="date"
                  value={publishDate}
                  onChange={(e) => setPublishDate(e.target.value)}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium">
                  Publish Time
                </label>
                <input
                  type="time"
                  value={publishTime}
                  onChange={(e) => setPublishTime(e.target.value)}
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
        <h1 className="text-xl font-semibold">Scheduled Casts</h1>
        <div className="mt-12 bg-base-100 p-4 rounded shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="avatar">
                <div className="w-10 h-10 rounded-full bg-neutral-focus"></div>
              </div>
              <div className="ml-4">
                <p className="font-semibold">Post cast txt</p>
                <div className="text-gray-600">
                  <p>DD/MM/YY</p>
                  <p>00:00</p>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="btn btn-secondary btn-sm">Edit Cast</button>
              <button className="btn btn-error btn-sm">Delete Cast</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
