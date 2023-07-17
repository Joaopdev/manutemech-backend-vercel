import { Router } from 'express';
import { CategoryController } from '../controllers/CategoryController';
import { authenticate } from '../middlewares/authenticationMiddleware';

const router = Router();
const categoryController = new CategoryController();

router.get('/categories', authenticate, categoryController.getAllCategories);
router.post('/categories', authenticate, categoryController.createCategory);
router.get('/categories/:id', authenticate, categoryController.getCategoryById);
router.put('/categories/:id', authenticate, categoryController.updateCategory);
router.delete('/categories/:id', authenticate, categoryController.deleteCategory);

export default router;
