import { Router } from 'express';
import { SupplierController } from '../controllers/SupplierController';
import { authenticate } from '../middlewares/authenticationMiddleware';

const router = Router();
const supplierController = new SupplierController();

router.get('/suppliers', authenticate, supplierController.getAllSuppliers);
router.post('/suppliers', authenticate, supplierController.createSupplier);
router.get('/suppliers/:id', authenticate, supplierController.getSupplierById);
router.put('/suppliers/:id', authenticate, supplierController.updateSupplier);
router.delete('/suppliers/:id', authenticate, supplierController.deleteSupplier);

export default router;
