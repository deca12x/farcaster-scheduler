/*
  Warnings:

  - You are about to drop the column `channel_name` on the `Casts` table. All the data in the column will be lost.
  - You are about to drop the column `datetime` on the `Casts` table. All the data in the column will be lost.
  - You are about to drop the column `fid` on the `Casts` table. All the data in the column will be lost.
  - You are about to drop the column `likes_count` on the `Casts` table. All the data in the column will be lost.
  - You are about to drop the column `recasts_count` on the `Casts` table. All the data in the column will be lost.
  - Added the required column `date_time` to the `Casts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Casts" DROP CONSTRAINT "Casts_fid_fkey";

-- AlterTable
ALTER TABLE "Casts" DROP COLUMN "channel_name",
DROP COLUMN "datetime",
DROP COLUMN "fid",
DROP COLUMN "likes_count",
DROP COLUMN "recasts_count",
ADD COLUMN     "cast_hash" TEXT,
ADD COLUMN     "date_time" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "Casts" ADD CONSTRAINT "Casts_signerUidId_fkey" FOREIGN KEY ("signerUidId") REFERENCES "SignerUUIDs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
