import { Router } from 'express';
import { ServiceController } from '../controllers/ServiceController';
import { authenticate } from '../middlewares/authenticationMiddleware';

const router = Router();
const serviceController = new ServiceController();

router.get('/services', authenticate, serviceController.getAllServices);
router.post('/services', authenticate, serviceController.createService);
router.get('/services/:id', authenticate, serviceController.getServiceById);
router.put('/services/:id', authenticate, serviceController.updateService);
router.delete('/services/:id', authenticate, serviceController.deleteService);

export default router;
