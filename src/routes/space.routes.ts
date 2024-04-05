import {Router} from 'express';
import { SpaceController } from '../controllers/space.controller';

class SpaceRoutes {

    private readonly router: Router;
    private readonly spaceController: SpaceController;

    constructor() {
        this.router = Router();
        this.spaceController = new SpaceController();
    }

    getRoutes() {
       this.router.get('/get-spaces', this.spaceController.getSpaces.bind(this.spaceController));
        return this.router;
    }
    postRoutes(){
        this.router.post('/create-space', this.spaceController.createSpace.bind(this.spaceController));
        return this.router;
    }

    putRoutes(){
        this.router.put('/update-space/:id', this.spaceController.updateSpace.bind(this.spaceController) );
        return this.router;   
    }       
}

export {SpaceRoutes};