import { Request, Response, NextFunction } from "express";
import { SpaceServices } from "../services/space.services";
class SpaceController {
  spaceServices: SpaceServices;
  constructor() {
    this.spaceServices = new SpaceServices();
  }

  async createSpace(request: Request, response: Response, next: NextFunction) {
    const {
      name,
      typeRoom,
      capacity,
      available_equipments,
      pavilion,
      acessibility,
    } = request.body;
    const result = await this.spaceServices.createSpace({
      name,
      typeRoom,
      capacity,
      available_equipments,
      pavilion,
      acessibility,
    });
    return response.status(200).json(result);
  }
  async getSpaces(request: Request, response: Response, next: NextFunction) {
    const result = await this.spaceServices.getSpace();
    return response.status(200).json(result);
  }

  async getSpace(request: Request, response: Response, next: NextFunction) {
    const {id} = request.params;
    const result = await this.spaceServices.getSpaceId(Number(id));
    return response.status(200).json(result);
  }

  async updateSpace(request: Request, response: Response, next: NextFunction) {
    const { id } = request.params;
    const {
      name,
      typeRoom,
      capacity,
      available_equipments,
      pavilion,
      acessibility,
    } = request.body;

    const result = await this.spaceServices.updateSpace(Number(id), {
      name,
      typeRoom,
      capacity,
      available_equipments,
      pavilion,
      acessibility,
    });
    return response.status(200).json(result);
  }
  async createSpaceRequest(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { spaceId, initial_Period, end_Period, email } = request.body;
    const result = await this.spaceServices.createSpaceRequest({
      spaceId,
      initial_Period,
      end_Period,
      email,
    });
    return response.status(200).json(result);
  }

   async getSpaceRequests(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const {email } = request.params;
    const result = await this.spaceServices.getSpaceRequest(email);
    return response.status(200).json(result);
  }

   async cancelSpaceRequests(
    request: Request,
    response: Response,
    next: NextFunction
  ){
    const {id} = request.params;
    const result = await this.spaceServices.cancelSpaceRequest(Number(id));
    return response.status(200).json(result);
  }
  async updateStatusSpaceRequest( request: Request,
    response: Response,
    next: NextFunction){
      const {id} = request.params;
      const {status} = request.body;
      const result = await this.spaceServices.changeStatusSpaceRequest({id: Number(id), status});
      return response.status(200).json(result);
    }
   async deleteSpace(
    request: Request,
    response: Response,
    next: NextFunction
  ){
    const {id} = request.params;
    const result = await this.spaceServices.deleteSpace(Number(id));
    return response.status(200).json(result);
  }
  async getAllSpaceRequests(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
 
    const result = await this.spaceServices.getAllSpaceRequest();
    return response.status(200).json(result);
  }
  
}
export { SpaceController };
