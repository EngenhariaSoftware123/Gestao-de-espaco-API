import { Request, Response, NextFunction  } from "express";
import { TeacherServices } from "../services/teacher.services";
class TeacherController{
    private readonly teacherServices: TeacherServices;
    constructor(){
        this.teacherServices = new TeacherServices();
    }

    async createTeacher(request: Request, response: Response, next: NextFunction){
        const {name, enrollment, contact, email, department} = request.body;
        const result = await this.teacherServices.createTeacher({name, enrollment, contact, email, department});
        return response.status(200).json(result);
    }
}

export {TeacherController};