import { Router } from 'express';
import { MaintenancePartController } from '../controllers/MaintenancePartController';
import { authenticate } from '../middlewares/authenticationMiddleware';

const router = Router();
const maintenancePartController = new MaintenancePartController();

router.post('/maintenance-parts', authenticate, maintenancePartController.createMaintenancePart);
router.get('/maintenance-parts/:id', authenticate, maintenancePartController.getMaintenancePartById);
router.put('/maintenance-parts/:id', authenticate, maintenancePartController.updateMaintenancePart);
router.delete('/maintenance-parts/:id', authenticate, maintenancePartController.deleteMaintenancePart);

export default router;
