import { prisma } from "../prisma.databases";
import { ITeacherCreate } from "../../interfaces/teacher.interface";
import { ISectorCreate } from "../../interfaces/sector.interface";
class SectorDALs {
  constructor() {}
  async createSector({
    name,
    spaceId,
    contact,
    userId,
    acronym,
  }: ISectorCreate) {
    const result = await prisma.sector.create({
      data: {
        name,
        spaceId,
        contact,
        userId,
        acronym,
      },
    });

    return result;
  }

  async findSectors(){
    const result = await prisma.manager.findMany();
    return result;
  }

}

export { SectorDALs };