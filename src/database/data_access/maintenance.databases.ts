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
    
}
export {MaintenanceDALs}