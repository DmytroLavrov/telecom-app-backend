import express from 'express';
import {
  getAllCities,
  addCity,
  updateCity,
  deleteCity,
} from '../controllers/CityController.js';

const router = express.Router();

router.get('/', getAllCities);
router.post('/', addCity);
router.put('/:id', updateCity);
router.delete('/:id', deleteCity);

export default router;
