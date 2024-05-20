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
       this.router.get('/get-space-requests/:email', this.spaceController.getSpaceRequests.bind(this.spaceController));
        this.router.get('/get-space-requests', this.spaceController.getAllSpaceRequests.bind(this.spaceController));
       return this.router;
    }
    postRoutes(){
        this.router.post('/create-space', this.spaceController.createSpace.bind(this.spaceController));
        this.router.post('/create-space-request', this.spaceController.createSpaceRequest.bind(this.spaceController));
        return this.router;
    }

    putRoutes(){
        this.router.put('/update-space/:id', this.spaceController.updateSpace.bind(this.spaceController));
         this.router.put('/cancel-space-request/:id', this.spaceController.cancelSpaceRequests.bind(this.spaceController));
        this.router.put('/update-status-space-request/:id', this.spaceController.updateStatusSpaceRequest.bind(this.spaceController));
         return this.router;   
    }  
    deleteRoutes(){
        this.router.delete('/delete-space/:id', this.spaceController.deleteSpace.bind(this.spaceController));
        return this.router;   
    }   

}

export {SpaceRoutes};