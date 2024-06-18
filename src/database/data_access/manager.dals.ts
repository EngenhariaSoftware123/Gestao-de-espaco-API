import { prisma } from "../prisma.databases";
import { IManagerCreate } from "../../interfaces/manager.interfaces";
import { IManagerFind } from "../../interfaces/manager.interfaces";
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

  async findManagerByUserIdAndType({id, type}: IManagerFind){
    const result = await prisma.manager.findUnique({
      where:{
        userId: id,
        type
      }
      
    })

    return result;
  }

}

export { ManagerDALs };