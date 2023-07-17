import { Router } from 'express';
import { PartController } from '../controllers/PartController';
import { authenticate } from '../middlewares/authenticationMiddleware';

const router = Router();
const partController = new PartController();

router.get('/parts', authenticate, partController.getAllParts);
router.post('/parts', authenticate, partController.createPart);
router.get('/parts/:id', authenticate, partController.getPartById);
router.put('/parts/:id', authenticate, partController.updatePart);
router.delete('/parts/:id', authenticate, partController.deletePart);

export default router;
