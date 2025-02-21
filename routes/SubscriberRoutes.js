import express from 'express';
import {
  getAllSubscribers,
  getSubscriberDetailsById,
  addSubscriber,
  deleteSubscriber,
  updateSubscriber,
} from '../controllers/SubscriberController.js';

const router = express.Router();

router.get('/', getAllSubscribers);
router.get('/:id', getSubscriberDetailsById);
router.post('/', addSubscriber);
router.delete('/:id', deleteSubscriber);
router.put('/:id', updateSubscriber);

export default router;
