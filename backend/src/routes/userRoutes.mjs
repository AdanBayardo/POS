import { Router } from 'express';
import userController from '../controllers/userController.mjs';
import authMiddleware from '../middleware/authMiddleware.mjs';

const userRoutes = Router();

userRoutes
  .route('/')
  .get(authMiddleware, userController.getUsers);
userRoutes
  .route('/:userId')
  .get(authMiddleware, userController.getUserById)
  .put(authMiddleware, userController.updateUser)
  .delete(authMiddleware, userController.deleteUser);

export default userRoutes;
