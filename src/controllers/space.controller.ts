import { Request, Response, NextFunction  } from "express";
import { SpaceServices } from "../services/space.services";
class SpaceController{
    spaceServices: SpaceServices
    constructor(){
        this.spaceServices = new SpaceServices();
    }

    async createSpace(request: Request, response: Response, next: NextFunction){
       const {name, typeRoom, capacity, available_equipments, pavilion, acessibility} = request.body
       const result = await this.spaceServices.createSpace({name, typeRoom, capacity, available_equipments, pavilion, acessibility}); 
        return response.status(200).json(result);
    }
    async getSpaces(request: Request, response: Response, next: NextFunction){
       const result = await this.spaceServices.getSpace(); 
        return response.status(200).json(result);
    }
}
export {SpaceController}