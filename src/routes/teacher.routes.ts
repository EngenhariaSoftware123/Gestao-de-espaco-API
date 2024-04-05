import {Router} from 'express';
import { TeacherController } from '../controllers/teacher.controller';

class TeacherRoutes {

    private readonly router: Router;
    private readonly teacherController: TeacherController;

    constructor() {
        this.router = Router();
        this.teacherController = new TeacherController();
    }

    getRoutes() {
        return this.router;
    }
    postRoutes(){
        this.router.post('/create-teacher', this.teacherController.createTeacher.bind(this.teacherController));
        return this.router;
    }

    putRoutes(){
        return this.router;   
    }       
}

export {TeacherRoutes};