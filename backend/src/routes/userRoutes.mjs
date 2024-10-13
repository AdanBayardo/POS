import { Router } from 'express';
import userController from '../controllers/userController.mjs';

const userRoutes = Router();

userRoutes
  .route('/users')
  .get(userController.getUsers)
  .post(userController.createUser);
userRoutes
  .route('/:userId')
  .get(userController.getUserById)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

export default userRoutes;