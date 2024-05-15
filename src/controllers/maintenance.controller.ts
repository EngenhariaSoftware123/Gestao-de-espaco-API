import { Request, Response, NextFunction  } from "express";
import { MaintenanceService } from "../services/maintenance.service";
class MaintenanceControllers {
    private readonly maintenanceServices: MaintenanceService
    constructor(){
        this.maintenanceServices = new MaintenanceService();
    }
    async createMaintenance(request: Request, response: Response, next: NextFunction){
        const {email, spaceId, description} = request.body;
        const result = await this.maintenanceServices.createMaintenance({email, spaceId, description})
        return response.status(200).json(result);
    }
    async getMaintenances(request: Request, response: Response, next: NextFunction){
        const result = await this.maintenanceServices.getMaintenance();
        return response.status(200).json(result);
    }

    async updateMaintenance(request: Request, response: Response, next: NextFunction){
        const {id} = request.params;
        const {status} = request.body;
        const result = await this.maintenanceServices.changeStatusMaintenance({id: Number(id), status});
        return response.status(200).json(result);
    }
    
}

export {MaintenanceControllers};