import { Request, Response, NextFunction  } from "express";
import { UserServices } from "../services/user.service";
class UserControllers {
    private readonly userServices: UserServices
    constructor(){
        this.userServices = new UserServices();
    }
    async authUser(request: Request, response: Response, next: NextFunction){
        const {email} = request.body;
        const result = await this.userServices.authUsers(email);
        return response.status(200).json(result);
    }

   async favoriteSpace(request: Request, response: Response, next: NextFunction){
        const {email, spaceId} = request.body;
        const result = await this.userServices.favoriteSpaces({email, spaceId});
        return response.status(200).json(result);
    }
    async unFavoriteSpace(request: Request, response: Response, next: NextFunction){
        const {email, spaceId} = request.body;
        const result = await this.userServices.unFavoriteSpaces({email, spaceId});
        return response.status(200).json(result);
    }
    async findUserByEmail(request: Request, response: Response, next: NextFunction){
        const {email} = request.params;
        const result = await this.userServices.findUserByEmail(email);
        return response.status(200).json(result);
    }
     async updateRoles(request: Request, response: Response, next: NextFunction){
        const {email, roles} = request.body;
        const result = await this.userServices.updateRole({email, roles});
        return response.status(200).json(result);
    }
}

export {UserControllers};