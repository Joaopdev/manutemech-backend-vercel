import { Router } from 'express';
import { VehicleController } from '../controllers/VehicleController';
import { authenticate } from '../middlewares/authenticationMiddleware';

const router = Router();
const vehicleController = new VehicleController();

router.get('/vehicles', authenticate, vehicleController.getAllVehicles);
router.post('/vehicles', authenticate, vehicleController.createVehicle);
router.get('/vehicles/:id', authenticate, vehicleController.getVehicleById);
router.put('/vehicles/:id', authenticate, vehicleController.updateVehicle);
router.delete('/vehicles/:id', authenticate, vehicleController.deleteVehicle);

export default router;
