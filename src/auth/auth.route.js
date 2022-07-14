import express from 'express';
import * as authController from './auth.controller.js';
const routerAuth = express.Router();

routerAuth.post('/login', authController.loginController);

export { routerAuth };
