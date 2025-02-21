import express from 'express';
import {
  getAllCities,
  addCity,
  updateCity,
  deleteCity,
} from '../controllers/CityController.js';
import { cityValidation } from '../validations/CityValidation.js';
import handleValidationErrors from '../middlewares/handleValidationErrors.js';

const router = express.Router();

router.get('/', getAllCities);
router.post('/', cityValidation, handleValidationErrors, addCity);
router.put('/:id', cityValidation, handleValidationErrors, updateCity);
router.delete('/:id', deleteCity);

export default router;
