"use client";

import { DynamicConnectButton, DynamicWidget, useIsLoggedIn } from "@dynamic-labs/sdk-react-core";
import Link from "next/link";
import Image from "next/image";

export default function Page() {
  const isLoggedIn = useIsLoggedIn();
  return (
    <main className="px-8 md:px-24 py-12">
      <div className="flex w-full items-center">
        <div className="flex-grow items-center justify-items-center">
          <Image src="/Logobru.png" alt="Logo" width={150} height={150} />
        </div>
        <div className="space-x-10 items-center hidden md:flex">
          <a href="#why" className="font-bold">Why use HOOT</a>
          <a href="#how" className="font-bold">How it works</a>
          {isLoggedIn ? <Link className="btn btn-primary" href="/dashboard">Enter app</Link> : <DynamicWidget />}
        </div>
      </div>
      <div className="mt-20 text-center flex flex-col place-content-center">
        <div className="text-7xl font-bold">
        Schedule your casts in a <span className="text-[#004DFB]">HOOT</span>
        </div>
        <div className="font-bold text-lg text-gray-600 mt-12 max-w-xl flex self-center">
        Plan and automate your posts to reach your audience at the best times for maximum engagement and visibility
        </div>
      </div>
      <div className="mt-12 flex place-content-center">
      {isLoggedIn ? <Link className="btn btn-primary" href="/dashboard">Enter app</Link> : <DynamicWidget />}
      </div>
      <div className="mt-12 flex place-content-center">
        <Image src="/globe.png" width={600} height={600} alt="globe" />
      </div>
      <div className="mt-20 text-center" id="why">
        <p className="text-5xl font-bold">Why Use HOOT</p>
      </div>
      <div className="divider divider-vertical max-w-4xl mx-auto"></div>
      <div className="mt-12 grid grid-cols-1 xl:grid-cols-3 gap-8 text-white">
        <div className="card bg-gradient-to-tr from-[#1C1E34] to-[#21297C]">
          <div className="card-body">
            <Image
              unoptimized
              src={"/Group.png"}
              width={25}
              height={25}
              alt="group"
            />
            <p className="text-3xl font-bold">Effortless Scheduling</p>
            <p>
            Automate your Farcaster posts with ease. Set your content to be published at the optimal times without lifting a finger
            </p>
          </div>
        </div>
        <div className="card bg-gradient-to-tr from-[#1C1E34] to-[#21297C]">
          <div className="card-body">
            <Image
              unoptimized
              src={"/Group1.png"}
              width={25}
              height={25}
              alt="second"
            />
            <p className="text-3xl font-bold">Advanced Analytics</p>
            <p>
            Leverage powerful analytics to fine-tune your posting strategy. Understand your audience and maximize engagement with data-driven insights.
            </p>
          </div>
        </div>
        <div className="card bg-gradient-to-tr from-[#1C1E34] to-[#21297C]">
          <div className="card-body">
            <Image
              unoptimized
              src={"/Vector.png"}
              width={25}
              height={25}
              alt="travel"
            />
            <p className="text-3xl font-bold">Consistent Engagement</p>
            <p>
            Ensure your Farcaster presence remains consistent. Schedule posts in advance to keep your audience engaged, even when you're offline.
            </p>
          </div>
        </div>
      </div>
      <div className="text-center mt-36" id="how">
        <p className="text-5xl font-bold">How it works</p>
      </div>
      <div className="divider divider-vertical max-w-4xl mx-auto"></div>
      <div className="mt-20 grid grid-cols-1 xl:grid-cols-2 gap-y-10 xl:gap-y-0 justify-items-center items-center max-w-5xl mx-auto">
        <div>
          <Image src="/donna1.png" width={300} height={300} alt="work1" />
        </div>
        <div>
          <p className="text-4xl font-bold">
          Connect Your Farcaster Account
          </p>
          <p className="max-w-md font-semibold mt-4">
          Plan and automate your posts to reach your audience at the best times for maximum engagement and visibility
          </p>
        </div>
      </div>
      <div className="mt-24 grid grid-cols-1 xl:grid-cols-2 gap-y-10 xl:gap-y-0 justify-items-center items-center max-w-5xl mx-auto">
        <div className="order-last xl:order-first">
          <p className="text-4xl font-bold">
          Create and Schedule Your Posts
          </p>
          <p className="max-w-md font-semibold mt-4">
          Input your text, upload an image or frame URL, and select the date and time for your cast. Chrono makes it easy to plan and schedule your content in advance.
          </p>
        </div>
        <div>
          <Image src="/donna2.png" width={300} height={300} alt="work2" />
        </div>
      </div>
      <div className="mt-24 grid grid-cols-1 xl:grid-cols-2 justify-items-center gap-y-10 xl:gap-y-0 items-center max-w-5xl mx-auto">
        <div>
          <Image src="/donna3.png" width={300} height={300} alt="work3" />
        </div>
        <div>
          <p className="text-4xl font-bold">
          Automate and Optimize
          </p>
          <p className="max-w-md font-semibold mt-4">
          Once your posts are scheduled, Chrono takes care of the rest. Your posts will be automatically published at the right time, and you'll get analytics to optimize future postings.
          </p>
        </div>
      </div>
    </main>
  );
}
