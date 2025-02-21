import express from 'express';
import {
  getCalls,
  addNewCall,
  deleteCall,
} from '../controllers/CallController.js';
import { callValidation } from '../validations/CallValidation.js';
import handleValidationErrors from '../middlewares/handleValidationErrors.js';

const router = express.Router();

router.get('/', getCalls);
router.post('/', callValidation, handleValidationErrors, addNewCall);
router.delete('/:id', deleteCall);

export default router;
