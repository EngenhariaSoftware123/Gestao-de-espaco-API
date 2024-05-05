import { prisma } from "../prisma.databases";
import { ISpaceCreate, ISpaceUpdate } from "../../interfaces/space.interface";
import { ISpaceRequestCreate, ISpaceRequestUpdateStatus } from "../../interfaces/spaceRequest.interfaces";

class SpaceRequestDALs {
  constructor() {}

  async CreateSpaceResquest({
    spaceId,
    initial_Period,
    end_Period,
    userId,
  }: ISpaceRequestCreate) {

    const result = await prisma.space_request.create({
        data:{
            spaceId,
            initial_Period,
            end_Period,
            userId

        }
    })

    return result;
  }

  async findSpaceRequestBySpace(spaceId: number){
    const result = await prisma.space_request.findMany({
      where:{spaceId}
    })
    return result;
  }
  async findSpaceRequestByUser(userId: number){
    const result = await prisma.space_request.findMany({
      where:{
        userId
      },
      select:{
        id: true,
        user:{
          select:{
            email: true,
          }
        },
        space:{
          select:{
            name: true,
            pavilion: true,
          },
        },
        initial_Period: true,
        end_Period: true,
        status: true
      }
    });
    return result;
  }
  async deleteSpaceRequest(id: number){
    const result = await prisma.space_request.delete({
      where:{id}
    });

    return result;
  }
  async findSpaceRequestById(id: number){
    const result = await prisma.space_request.findUnique({
      where: {id: id},
    });

    return result;
  }

  async updateStatusSpaceRequest({id, status}: ISpaceRequestUpdateStatus){
    const result = await prisma.space_request.update({
      where:{id},
      data:{
        status,
      }
    });

    return result;
  }
}

export { SpaceRequestDALs };
