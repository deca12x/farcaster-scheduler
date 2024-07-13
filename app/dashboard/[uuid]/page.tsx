import prisma from "@/lib/db";

export default async function Page({ params }: { params: { uuid: string } }) {
  const casts = await prisma.casts.findMany({
    where: {
      signer_uid: {
        signer_uid: params.uuid,
      },
    },
  });

  return (
    <>
      <div className="flex w-full mt-8 px-4 items-center">
        <h1 className="grow font-semibold text-2xl">Casts scheduled</h1>
        <button className="btn btn-primary">+ schedule</button>
      </div>
      {casts.length === 0 ? (
        <div className="bg-base-200 rounded-xl m-4 p-4 flex flex-cols items-center justify-center flex-grow">
          <p>No cast scheduled</p>
        </div>
      ) : (
        <div className="bg-base-200 rounded-xl p-4">
          {casts.map((cast) => (
            <div>
              {cast.cast_text} {cast.date_time.toISOString()}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
