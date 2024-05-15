
import {NotFoundError} from "../helpers/error.helpers"
import { MaintenanceDALs } from "../database/data_access/maintenance.databases";
import { SpaceDALs } from "../database/data_access/space.dals";
import {UserDALs} from '../database/data_access/user.dals';
import { IMaintenanceCreate, IMaintenanceData, IMaintenanceUpdate } from "../interfaces/maintenance.interfaces";
class MaintenanceService{
    maintenanceDALs: MaintenanceDALs;
    spaceDALs: SpaceDALs;
    userDALs: UserDALs;
    constructor(){
        this.maintenanceDALs = new MaintenanceDALs();
        this.spaceDALs = new SpaceDALs();
        this.userDALs = new UserDALs()
    }
    async createMaintenance({email, spaceId, description}: IMaintenanceData){
        const space = await this.spaceDALs.findSpaceById(spaceId);
        const user = await this.userDALs.findUserByEmail(email);

        if(!space){
            throw new NotFoundError({message: "espaço não encontrado"});
        }
        if(!user){
            throw new NotFoundError({message: "usuario não encontrado"});
        }

        const createdMaintenance = await this.maintenanceDALs.createMaintenance({spaceId: space.id, userId: user.id, description});

        return createdMaintenance;
    }

    async getMaintenance(){

       const maintenances = await this.maintenanceDALs.getMaintenances();
        return maintenances;

    }
    async changeStatusMaintenance({id, status}: IMaintenanceUpdate){
        const maintenance = await this.maintenanceDALs.findMaintenance(id);
        if(!maintenance){
            throw new NotFoundError({message: 'manuntenção não encontrada'})
        }  

        const updatedMaintenance = await this.maintenanceDALs.changeStatusMaintenance({id, status});
        return updatedMaintenance;
    }
}

export{MaintenanceService}