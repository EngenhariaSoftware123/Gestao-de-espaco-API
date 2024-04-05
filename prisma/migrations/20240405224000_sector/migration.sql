/*
  Warnings:

  - A unique constraint covering the columns `[spaceId]` on the table `Sector` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `acronym` to the `Sector` table without a default value. This is not possible if the table is not empty.
  - Added the required column `spaceId` to the `Sector` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sector" ADD COLUMN     "acronym" TEXT NOT NULL,
ADD COLUMN     "spaceId" INTEGER NOT NULL,
ALTER COLUMN "contact" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Sector_spaceId_key" ON "Sector"("spaceId");

-- AddForeignKey
ALTER TABLE "Sector" ADD CONSTRAINT "Sector_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "Space"("id") ON DELETE CASCADE ON UPDATE CASCADE;
