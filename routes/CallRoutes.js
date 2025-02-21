import express from 'express';
import {
  getCalls,
  addNewCall,
  deleteCall,
} from '../controllers/CallController.js';

const router = express.Router();

router.get('/', getCalls);
router.post('/', addNewCall);
router.delete('/:id', deleteCall);

export default router;
