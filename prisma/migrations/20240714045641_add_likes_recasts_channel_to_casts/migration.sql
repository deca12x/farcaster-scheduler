-- DropForeignKey
ALTER TABLE "Casts" DROP CONSTRAINT "Casts_signerUidId_fkey";

-- AlterTable
ALTER TABLE "Casts" ADD COLUMN     "channel_name" TEXT,
ADD COLUMN     "likes_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "recasts_count" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "signerUidId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Casts" ADD CONSTRAINT "Casts_signerUidId_fkey" FOREIGN KEY ("signerUidId") REFERENCES "SignerUUIDs"("id") ON DELETE SET NULL ON UPDATE CASCADE;
