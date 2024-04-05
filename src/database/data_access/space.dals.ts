import { prisma } from "../prisma.databases";
import {ISpaceCreate, ISpaceUpdate} from "../../interfaces/space.interface"

class SpaceDALs{
    constructor(){

    }
    async createSpace({name, typeRoom, pavilion, acessibility, capacity}: ISpaceCreate){
        const result = await prisma.space.create({
            data: {
                name,
                typeRoom,
                pavilion,
                acessibility,
                capacity
            }
        });

        return result;
    }

    async findSpaces(){
        const result = await prisma.space.findMany();
        return result;
    }
    async findSpaceById(id: number){
        const result = await prisma.space.findUnique({
            where:{
                id: id,
            }
        });

        return result;
    }

    async updateSpace({id, name, typeRoom, pavilion, acessibility, capacity}: ISpaceUpdate){
        const result = await prisma.space.update({
            where:{
                id: id,
            },
            data:{
                name,
                typeRoom,
                pavilion,
                acessibility,
                capacity
            }
        });

        return result;
    }
}

export {SpaceDALs};
