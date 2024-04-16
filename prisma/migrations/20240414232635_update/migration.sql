/*
  Warnings:

  - You are about to drop the column `end_Hour` on the `Space_request` table. All the data in the column will be lost.
  - You are about to drop the column `initial_Hour` on the `Space_request` table. All the data in the column will be lost.
  - Added the required column `end_Period` to the `Space_request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `initial_Period` to the `Space_request` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Space_request" DROP COLUMN "end_Hour",
DROP COLUMN "initial_Hour",
ADD COLUMN     "end_Period" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "initial_Period" TIMESTAMP(3) NOT NULL;
