import { prisma } from "../prisma.databases";
import { IManagerCreate } from "../../interfaces/manager.interfaces";
class ManagerDALs {
  constructor() {}
  async createManager({
    type,
    spaceId,
    userId,
  }: IManagerCreate) {
    const result = await prisma.manager.create({
      data: {
        type,
        spaceId,
        userId,
      },
    });

    return result;
  }

}

export { ManagerDALs };