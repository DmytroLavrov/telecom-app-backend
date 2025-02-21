import express from 'express';
import { login } from '../controllers/AdminController.js';
import { loginValidation } from '../validations/AdminValidation.js';
import handleValidationErrors from '../middlewares/handleValidationErrors.js';

const router = express.Router();

router.post('/login', loginValidation, handleValidationErrors, login);

export default router;
