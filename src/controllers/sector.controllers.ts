import { Request, Response, NextFunction  } from "express";
import { SectorServices } from "../services/sector.services";
class SectorControllers{
    private readonly sectorServices: SectorServices;
    constructor(){
        this.sectorServices = new SectorServices();
    }

    async createSector(request: Request, response: Response, next: NextFunction){
        const {name, spaceId, contact, email, acronym} = request.body;
        const result = await this.sectorServices.createSector({name, spaceId, contact, email, acronym });
        return response.status(200).json(result);
    }
}

export {SectorControllers};