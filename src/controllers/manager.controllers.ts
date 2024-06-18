import { Request, Response, NextFunction  } from "express";
import { SectorServices } from "../services/sector.services";
import { ManagerServices } from "../services/manager.services";
class ManagerControllers{
    
    private readonly managerServices: ManagerServices;
    constructor(){
        this.managerServices = new ManagerServices();
    }

    async createManager(request: Request, response: Response, next: NextFunction){
        const {type, spaceId, email} = request.body;
        const result = await this.managerServices.createManager({type, email, spaceId });
        return response.status(200).json(result);
    }
    async findManager(request: Request, response: Response, next: NextFunction){
        const {type, email} = request.body;
        const result = await this.managerServices.findManager({type, email });
        return response.status(200).json(result);
    }
}

export {ManagerControllers};