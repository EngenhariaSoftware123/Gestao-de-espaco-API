import {Router} from 'express';
import { ManagerControllers } from '../controllers/manager.controllers';

class ManagerRoutes {

    private readonly router: Router;
    private readonly managerControllers: ManagerControllers;

    constructor() {
        this.router = Router();
        this.managerControllers = new ManagerControllers();
    }

    getRoutes() {
        
        return this.router;
    }
    postRoutes(){
        this.router.post('/find-manager', this.managerControllers.findManager.bind(this.managerControllers));
        this.router.post('/create-manager', this.managerControllers.createManager.bind(this.managerControllers));
        return this.router;
    }

    putRoutes(){
        return this.router;   
    }       
}

export {ManagerRoutes};
