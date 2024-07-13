"use client";

import Image from "next/image";
import { NeynarAuthButton, useNeynarContext } from "@neynar/react";
import { DynamicWidget } from "@/lib/dynamic";
import { useState } from "react";
import "daisyui/dist/full.css";

export default function Home() {
  const { user } = useNeynarContext();
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [castText, setCastText] = useState<string>("");
  const [channel, setChannel] = useState<string>("");
  const [publishTime, setPublishTime] = useState<string>("");
  const [publishDate, setPublishDate] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files ? e.target.files[0] : null);
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
      <aside className="w-1/4 bg-base-100 p-4 shadow-lg">
        <div className="flex flex-col items-center">
          <div className="mb-4">
            <Image src="/logo.svg" alt="Logo" width={100} height={50} />
          </div>
          <button className="btn btn-primary mb-6">Add Account</button>
          {/* Accounts List */}
          <div className="flex flex-col gap-4">
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
        </div>
      </aside>

      {/* Main Content */}
      <section className="w-3/4 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Schedule a Cast</h1>
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
            <input
              type="file"
              onChange={handleFileChange}
              className="input input-bordered w-full"
            />
            <div className="flex gap-4">
              <div className="w-1/3">
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
              <div className="w-1/3">
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
              <input
                type="text"
                value={channel}
                onChange={(e) => setChannel(e.target.value)}
                placeholder="Channel"
                className="input input-bordered w-1/3"
              />
            </div>
            <button
              onClick={handleCastClick}
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? "Scheduling..." : "Schedule"}
            </button>
          </div>
        </div>
        <div className="mt-6 bg-base-100 p-4 rounded shadow-md">
          <p>Post cast txt</p>
          <div className="flex justify-between mt-4">
            <div className="avatar">
              <div className="w-10 h-10 rounded-full bg-neutral-focus"></div>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-gray-600">DD/MM/YY</p>
              <p className="text-gray-600">00:00</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
