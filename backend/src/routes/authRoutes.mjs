import passport from 'passport';
import { Router } from 'express';
import authController from '../controllers/authController.mjs';

const authRoutes = Router();

authRoutes.post(
  '/signup',
  passport.authenticate('signup', { session: false }),
  authController.signUp
);

authRoutes.post(
  '/login',
  authController.logIn
);

authRoutes.post('/token', authController.updateToken);

authRoutes.post('/logout', authController.logOut);

export default authRoutes;