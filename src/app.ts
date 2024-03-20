import 'express-async-errors';
import express, { Application } from 'express';
import { UserRoutes } from './routes/user.routes';
import {MaintenanceRoutes} from './routes/maintenance.routes'
import {SpaceRoutes} from "./routes/space.routes"
import { errorMiddleware } from './middlewares/error.middlewares';

import { CorsMiddleware } from './server';

export class App {
  private app: Application;

  constructor(corsConfig: CorsMiddleware) {
    this.app = express();
    this.middleware(corsConfig);
    this.setupAllRoutes();
  }

  listen(port: number) {
    this.app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
    this.app.use(errorMiddleware);
  }
   private setupUserRoutes() {
    const userRoutes = new UserRoutes();
    const userBaseRoute = '/user';

    this.app.use(userBaseRoute, userRoutes.getRoutes());
    this.app.use(userBaseRoute, userRoutes.postRoutes());
  
  }

  private setupMaintenanceRoutes() {
    const maintenanceRoutes = new MaintenanceRoutes();
    const maintenanceBaseRoute = '/maintenance';
    this.app.use(maintenanceBaseRoute, maintenanceRoutes.postRoutes());
  
  }
   private setupSpaceRoutes() {
    const spaceRoutes = new SpaceRoutes();
    const spaceBaseRoute = '/space';
    this.app.use(spaceBaseRoute, spaceRoutes.postRoutes());
    this.app.use(spaceBaseRoute, spaceRoutes.getRoutes());
  
  }

  private setupAllRoutes() {
    this.setupUserRoutes();
    this.setupMaintenanceRoutes();
    this.setupSpaceRoutes();
    
  }

  

  private middleware(corsConfig: CorsMiddleware) {
    this.app.use(express.json());
    this.app.use(corsConfig);
    this.app.use(express.urlencoded({ extended: true }));
   
  }
}