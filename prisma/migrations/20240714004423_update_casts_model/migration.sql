-- CreateTable
CREATE TABLE "Users" (
    "address" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("address")
);

-- CreateTable
CREATE TABLE "SignerUUIDs" (
    "id" SERIAL NOT NULL,
    "address_user" TEXT NOT NULL,
    "signer_uid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "fid" TEXT NOT NULL,

    CONSTRAINT "SignerUUIDs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Casts" (
    "id" SERIAL NOT NULL,
    "cast_text" TEXT NOT NULL,
    "ipfs_url" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL,
    "fid" INTEGER NOT NULL,
    "likes_count" INTEGER NOT NULL,
    "recasts_count" INTEGER NOT NULL,
    "channel_name" TEXT NOT NULL,
    "signerUidId" INTEGER NOT NULL,

    CONSTRAINT "Casts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SignerUUIDs" ADD CONSTRAINT "SignerUUIDs_address_user_fkey" FOREIGN KEY ("address_user") REFERENCES "Users"("address") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Casts" ADD CONSTRAINT "Casts_fid_fkey" FOREIGN KEY ("fid") REFERENCES "SignerUUIDs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
