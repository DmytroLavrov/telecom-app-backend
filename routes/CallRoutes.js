import express from 'express';
import {
  getCalls,
  addNewCall,
  deleteCall,
} from '../controllers/CallController.js';
import { callValidation } from '../validations/CallValidation.js';
import handleValidationErrors from '../middlewares/handleValidationErrors.js';
import checkAdminAuth from '../middlewares/checkAdminAuth.js';

const router = express.Router();

router.use(checkAdminAuth);

router.get('/', getCalls);
router.post('/', callValidation, handleValidationErrors, addNewCall);
router.delete('/:id', deleteCall);

export default router;
