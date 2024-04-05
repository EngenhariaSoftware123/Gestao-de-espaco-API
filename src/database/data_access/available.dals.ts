import {prisma} from "../prisma.databases"
import { IAvailable_EquipmentsCreate } from "../../interfaces/availableEquipments.interface";
class Available_equipmentsDALs{
    async createAvailable({name, quantity, spaceId}: IAvailable_EquipmentsCreate){
        const result = await prisma.available_equipment.create({
            data:{
                name: name,
                quantity: quantity,
                spaceId: spaceId,
            }
        });
        return result;
    }

    async findAvailablesbySpaceId(spaceId: number){
        const result = await prisma.available_equipment.findMany({
            where: {spaceId: spaceId},
        })

        return result;
    }

    async deleteAvailableBySpaceId(spaceid: number){
        const result = await prisma.available_equipment.deleteMany({
            where:{
                spaceId: spaceid,
            }
        });
        return result;
    }
}
export {Available_equipmentsDALs}