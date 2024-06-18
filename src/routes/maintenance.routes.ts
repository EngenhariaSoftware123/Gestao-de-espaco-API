import {Router} from 'express';
import {MaintenanceControllers} from '../controllers/maintenance.controller';

class   MaintenanceRoutes {

    private readonly router: Router;
    private readonly maintenanceController: MaintenanceControllers;

    constructor() {
        this.router = Router();
        this.maintenanceController = new MaintenanceControllers();
    }

    getRoutes() {
       this.router.get('/get-maintenance', this.maintenanceController.getMaintenances.bind(this.maintenanceController));
        this.router.get('/get-maintenance/:spaceId', this.maintenanceController.getMaintenancesById.bind(this.maintenanceController));
       return this.router;
    }
    postRoutes(){
        this.router.post('/create-maintenance', this.maintenanceController.createMaintenance.bind(this.maintenanceController));
        return this.router;
    }
    putRoutes(){
        this.router.put('/update-status-maintenance/:id', this.maintenanceController.updateMaintenance.bind(this.maintenanceController));
        return this.router;
    }
}

export {MaintenanceRoutes};