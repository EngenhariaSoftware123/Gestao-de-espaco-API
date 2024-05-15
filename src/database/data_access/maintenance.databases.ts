import { IMaintenanceCreate, IMaintenanceUpdate } from '../../interfaces/maintenance.interfaces';
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

    async findMaintenance(id:number){
        const result = await prisma.maintenance.findUnique({
            where:{
                id: id,
            }
        })
        return result;
    }   

    async changeStatusMaintenance({id, status}: IMaintenanceUpdate){
        const result = await prisma.maintenance.update({
            where:{
                id: id,
            },
            data:{
                status: status,
            }
        });

        return result;
    }
    
}
export {MaintenanceDALs}