/*
  Warnings:

  - You are about to drop the column `service` on the `Space` table. All the data in the column will be lost.
  - Added the required column `pavilion` to the `Space` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Space" DROP COLUMN "service",
ADD COLUMN     "pavilion" TEXT NOT NULL,
ADD COLUMN     "typeRoom" TEXT;
