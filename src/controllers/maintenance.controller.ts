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
    
}

export {MaintenanceControllers};