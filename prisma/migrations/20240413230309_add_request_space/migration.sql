-- CreateTable
CREATE TABLE "Space_request" (
    "id" SERIAL NOT NULL,
    "spaceId" INTEGER NOT NULL,
    "initial_Hour" TIMESTAMP(3) NOT NULL,
    "end_Hour" TIMESTAMP(3) NOT NULL,
    "teacherId" INTEGER NOT NULL,
    "sectorId" INTEGER NOT NULL,

    CONSTRAINT "Space_request_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Space_request" ADD CONSTRAINT "Space_request_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "Space"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Space_request" ADD CONSTRAINT "Space_request_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Space_request" ADD CONSTRAINT "Space_request_sectorId_fkey" FOREIGN KEY ("sectorId") REFERENCES "Sector"("id") ON DELETE CASCADE ON UPDATE CASCADE;
