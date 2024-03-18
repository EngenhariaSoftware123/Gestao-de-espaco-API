import { prisma } from '../prisma.databases';
import { IUserCreate, IUserUpdate } from '../../interfaces/user.interfaces';
class UserDALs{
    async createUser({email, role, favorites_space}: IUserCreate){
        const result = await prisma.user.create({
            data:{
                email: email,
                roles: role,
                
            }
        })

        return result;
    }
    async findUserByEmail(email: string){
        const result = await prisma.user.findUnique({
            where:{
                email: email,
            }
        })

        return result;
    }
     async findUserById(id: number){
        const result = await prisma.user.findUnique({
            where:{
                id: id,
            }
        })

        return result;
    }
    async updateUser({id, email, role, favorites_space}: IUserUpdate){
        const result = await prisma.user.update({
            where:{
                id: id,
            },
            data: {
                email: email,
                roles: {
                    set: role
                },

            }
        })

        return result;
    }


}

export{UserDALs}