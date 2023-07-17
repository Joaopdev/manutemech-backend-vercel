import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { authenticate } from '../middlewares/authenticationMiddleware';

const router = Router();
const userController = new UserController();

router.get('/users', authenticate, userController.getAllUsers);
router.post('/users', userController.createUser);
router.get('/users/:id', authenticate, userController.getUserById);
router.put('/users/:id', authenticate, userController.updateUser);
router.delete('/users/:id', authenticate, userController.deleteUser);

export default router;
