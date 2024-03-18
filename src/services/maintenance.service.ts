
import {NotFoundError} from "../helpers/error.helpers"
import { MaintenanceDALs } from "../database/data_access/maintenance.databases";
import { SpaceDALs } from "../database/data_access/space.dals";
import {UserDALs} from '../database/data_access/user.dals';
import { IMaintenanceCreate, IMaintenanceData } from "../interfaces/maintenance.interfaces";
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
}

export{MaintenanceService}