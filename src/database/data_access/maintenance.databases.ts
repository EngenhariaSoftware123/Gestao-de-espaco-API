import { IMaintenanceCreate } from '../../interfaces/maintenance.interfaces';
import {prisma} from '../prisma.databases'
class MaintenanceDALs{
    async createMaintenance({spaceId, userId, description}: IMaintenanceCreate){
        const result = await prisma.maintenance.create({
            data:{
                description,
                userId,
                spaceId
            }
        })
        return result;
    }
    async getMaintenances(){
        const results =await prisma.maintenance.findMany();

        return results;
    }
    
}
export {MaintenanceDALs}