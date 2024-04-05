import {Router} from 'express';
import { TeacherController } from '../controllers/teacher.controller';
import { SectorControllers } from '../controllers/sector.controllers';

class SectorRoutes {

    private readonly router: Router;
    private readonly sectorControllers: SectorControllers;

    constructor() {
        this.router = Router();
        this.sectorControllers = new SectorControllers();
    }

    getRoutes() {
        return this.router;
    }
    postRoutes(){
        this.router.post('/create-sector', this.sectorControllers.createSector.bind(this.sectorControllers));
        return this.router;
    }

    putRoutes(){
        return this.router;   
    }       
}

export {SectorRoutes};