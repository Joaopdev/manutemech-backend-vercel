import { Router } from 'express';
import { WorkshopController } from '../controllers/WorkshopController';
import { authenticate } from '../middlewares/authenticationMiddleware';

const router = Router();
const workshopController = new WorkshopController();

router.get('/workshops', authenticate, workshopController.getAllWorkshops);
router.post('/workshops', authenticate, workshopController.createWorkshop);
router.get('/workshops/:id', authenticate, workshopController.getWorkshopById);
router.put('/workshops/:id', authenticate, workshopController.updateWorkshop);
router.delete('/workshops/:id', authenticate, workshopController.deleteWorkshop);

export default router;
