/*
  Warnings:

  - You are about to drop the column `sectorId` on the `Space_request` table. All the data in the column will be lost.
  - You are about to drop the column `teacherId` on the `Space_request` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Space_request` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Space_request" DROP CONSTRAINT "Space_request_sectorId_fkey";

-- DropForeignKey
ALTER TABLE "Space_request" DROP CONSTRAINT "Space_request_teacherId_fkey";

-- AlterTable
ALTER TABLE "Space_request" DROP COLUMN "sectorId",
DROP COLUMN "teacherId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Space_request" ADD CONSTRAINT "Space_request_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
