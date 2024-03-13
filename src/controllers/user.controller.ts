import { Request, Response, NextFunction  } from "express";
import { UserServices } from "../services/user.service";
class UserControllers {
    private readonly userServices: UserServices
    constructor(){
        this.userServices = new UserServices();
    }

    async listUsers(request: Request, response: Response, next: NextFunction){
        const result = await this.userServices.listUsers();
        return response.status(201).json(result);
    }
}

export {UserControllers};