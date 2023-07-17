import express from 'express';
import { MaintenanceServiceController } from '../controllers/MaintenanceServiceController';
import { authenticate } from '../middlewares/authenticationMiddleware';

const router = express.Router();
const maintenanceServiceController = new MaintenanceServiceController();

router.post('/maintenance-services', authenticate, maintenanceServiceController.createMaintenanceService);
router.get('/maintenance-services/:id', authenticate, maintenanceServiceController.getMaintenanceServicesByMaintenanceId);
router.put('/maintenance-services/:id', authenticate, maintenanceServiceController.updateMaintenanceService);
router.delete('/maintenance-services/:id', authenticate, maintenanceServiceController.deleteMaintenanceService);

export default router;
