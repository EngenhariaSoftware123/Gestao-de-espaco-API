import {Router} from 'express';
import {UserControllers} from '../controllers/user.controller';

class UserRoutes {

    private readonly router: Router;
    private readonly userController: UserControllers;

    constructor() {
        this.router = Router();
        this.userController = new UserControllers();
    }

    getRoutes() {
       this.router.get('/find-user/:email', this.userController.findUserByEmail.bind(this.userController));
        return this.router;
    }
    postRoutes(){
        this.router.post('/auth-user', this.userController.authUser.bind(this.userController));
        return this.router;
    }
    putRoutes(){
        this.router.put('/favorite-space', this.userController.favoriteSpace.bind(this.userController));
        this.router.put('/unfavorite-space', this.userController.unFavoriteSpace.bind(this.userController));
        return this.router;
    }
}

export {UserRoutes};
