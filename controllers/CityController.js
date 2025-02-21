import {
  fetchAllCities,
  createCity,
  updateCityById,
  deleteCityById,
} from '../services/CityService.js';

export const getAllCities = async (req, res) => {
  try {
    const cities = await fetchAllCities();
    res.json(cities);
  } catch (err) {
    console.error('Error fetching cities:', err.message);
    res.status(500).json({
      message: 'Failed to fetch the list of cities. Please try again',
    });
  }
};

export const addCity = async (req, res) => {
  try {
    const newCity = await createCity(req.body);
    res.status(201).json(newCity);
  } catch (err) {
    console.error('Error adding city:', err.message);
    res.status(400).json({ message: err.message });
  }
};

export const updateCity = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCity = await updateCityById(id, req.body);
    res.json(updatedCity);
  } catch (err) {
    console.error('Error updating city:', err.message);
    res.status(400).json({ message: err.message });
  }
};

export const deleteCity = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteCityById(id);
    res.json({ message: 'City successfully deleted' });
  } catch (err) {
    console.error('Error deleting city:', err.message);
    res.status(404).json({ message: err.message });
  }
};
