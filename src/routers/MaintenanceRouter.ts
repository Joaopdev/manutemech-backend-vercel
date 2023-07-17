import { Router } from 'express';
import MaintenanceController from '../controllers/MaintenanceController';
import { authenticate } from '../middlewares/authenticationMiddleware';

const router = Router();
const maintenanceController = new MaintenanceController();

router.get('/maintenances', authenticate, maintenanceController.getAllMaintenances);
router.post('/maintenances', authenticate, maintenanceController.createMaintenance);
router.get('/maintenances/:id', authenticate, maintenanceController.getMaintenanceById);
router.get('/maintenances/vehicle/:vehicleId', authenticate, maintenanceController.getMaintenanceByVehicle);
router.put('/maintenances/:id', authenticate, maintenanceController.updateMaintenance);
router.delete('/maintenances/:id', authenticate, maintenanceController.deleteMaintenance);

export default router;
