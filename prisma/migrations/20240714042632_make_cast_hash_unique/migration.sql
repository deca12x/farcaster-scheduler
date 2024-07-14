/*
  Warnings:

  - A unique constraint covering the columns `[cast_hash]` on the table `Casts` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Casts_cast_hash_key" ON "Casts"("cast_hash");
