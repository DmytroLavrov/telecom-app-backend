import express from 'express';
import {
  getAllSubscribers,
  getSubscriberDetailsById,
  addSubscriber,
  deleteSubscriber,
  updateSubscriber,
} from '../controllers/SubscriberController.js';
import { subscriberValidation } from '../validations/SubscriberValidation.js';
import handleValidationErrors from '../middlewares/handleValidationErrors.js';

const router = express.Router();

router.get('/', getAllSubscribers);
router.get('/:id', getSubscriberDetailsById);
router.post('/', subscriberValidation, handleValidationErrors, addSubscriber);
router.delete('/:id', deleteSubscriber);
router.put(
  '/:id',
  subscriberValidation,
  handleValidationErrors,
  updateSubscriber
);

export default router;
