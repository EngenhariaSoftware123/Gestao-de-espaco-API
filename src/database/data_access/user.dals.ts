import { prisma } from "../prisma.databases";
import { IFavoriteSpace, IUserCreate, IUserUpdate } from "../../interfaces/user.interfaces";
class UserDALs {
  async createUser({ email, role, favorites_space }: IUserCreate) {
    const result = await prisma.user.create({
      data: {
        email: email,
        roles: role,
      },
    });

    return result;
  }
  async findUserByEmail(email: string) {
    const result = await prisma.user.findUnique({
      where: {
        email: email,
      },
      include:{
        favorite_spaces: true
      }
    });

    return result;
  }
  async findUserById(id: number) {
    const result = await prisma.user.findUnique({
      where: {
        id: id,
      },
      
    });

    return result;
  }
  async updateUser({ id, email, role, favorites_space }: IUserUpdate) {
    const result = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        email: email,
        roles: {
          set: role,
        },
      },
    });

    return result;
  }

  async favoriteSpace({id, spaceId}: IFavoriteSpace) {
    const result = await prisma.user.update({
      where: { id: id },
      data: {
        favorite_spaces: {
          connect: { id: spaceId },
        },
      },
    });

    return result;
  }

  async getUsers(){
    const result = await prisma.user.findMany({
       include: {
        favorite_spaces: {
          select:{id: true}
        }
      }
    });

    return result;
  }
  
  async unFavoriteSpace({id, spaceId}: IFavoriteSpace) {
    const result = await prisma.user.update({
      where: { id: id },
      data: {
        favorite_spaces: {
          disconnect: { id: spaceId },
        },
      },
    });

    return result;
  }
}

export { UserDALs };
