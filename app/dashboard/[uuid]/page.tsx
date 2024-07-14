import AddCast from "@/components/AddCast";
import prisma from "@/lib/db";
import Image from "next/image";

export default async function Page({ params }: { params: { uuid: string } }) {
  const profile = await prisma.signerUUIDs.findFirstOrThrow({
    where: {
      signer_uid: params.uuid,
    },
  });
  const casts = await prisma.casts.findMany({
    where: {
      signerUidId: profile.id,
      published: false,
    },
  });

  return (
    <>
      <div className="flex w-full mt-8 px-4 items-center">
        <h1 className="grow font-semibold text-2xl">Casts scheduled</h1>
        <AddCast profile={profile} />
      </div>
      {casts.length === 0 ? (
        <div className="bg-base-200 rounded-xl m-4 p-4 flex flex-cols items-center justify-center flex-grow">
          <p>No cast scheduled</p>
        </div>
      ) : (
        <div className="flex flex-col mt-4">
          {casts.map((cast) => (
            <div
              key={cast.id}
              className="bg-base-200 p-4 m-4 rounded-xl flex items-center gap-4"
            >
              <Image
                src={cast.ipfs_url}
                alt="image"
                className="w-10 h-10"
                width={100}
                height={100}
              />{" "}
              <span className="grow">
                {cast.cast_text}{" "}
                {new Date(cast.date_time).toISOString().split("T").at(0)}{" "}
                {new Date(cast.date_time)
                  .toISOString()
                  .split("T")
                  .at(1)
                  ?.slice(0, 5)}
              </span>
              {new Date().getTime() < new Date(cast.date_time).getTime() ? (
                <>
                  <span>Scheduled</span>
                  <span className="w-4 h-4 rounded-full bg-yellow-400"></span>
                </>
              ) : (
                <>
                  <span>Posted</span>
                  <span className="w-4 h-4 rounded-full bg-green-500"></span>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
