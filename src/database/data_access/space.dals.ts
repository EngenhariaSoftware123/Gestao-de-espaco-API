import { prisma } from "../prisma.databases";

class SpaceDALs{
    constructor(){

    }

    async findSpaceById(id: number){
        const result = await prisma.space.findUnique({
            where:{
                id: id,
            }
        });

        return result;
    }
}

export {SpaceDALs};
