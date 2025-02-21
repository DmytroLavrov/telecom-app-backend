import CityModel from '../models/City.js';
import CallModel from '../models/Call.js';

export const fetchAllCities = async () => {
  return await CityModel.find();
};

export const createCity = async (cityData) => {
  const { name, dayRate, nightRate, discounts } = cityData;

  const normalizedDiscounts = discounts.map((discount) => ({
    ...discount,
    discountRate: discount.discountRate / 100,
  }));

  const existingCity = await CityModel.findOne({ name });
  if (existingCity) {
    throw new Error('A city with this name already exists');
  }

  const newCity = new CityModel({
    name,
    dayRate,
    nightRate,
    discounts: normalizedDiscounts,
  });

  await newCity.save();
  return newCity;
};

export const updateCityById = async (cityId, updateData) => {
  const { name, dayRate, nightRate, discounts } = updateData;

  const normalizedDiscounts = discounts.map((discount) => ({
    ...discount,
    discountRate: discount.discountRate / 100,
  }));

  const existingCity = await CityModel.findOne({ name });
  if (existingCity && existingCity._id.toString() !== cityId) {
    throw new Error('A city with this name already exists');
  }

  const updatedCity = await CityModel.findByIdAndUpdate(
    cityId,
    { name, dayRate, nightRate, discounts: normalizedDiscounts },
    { new: true, runValidators: true }
  );

  if (!updatedCity) {
    throw new Error('City not found');
  }

  return updatedCity;
};

export const deleteCityById = async (cityId) => {
  await CallModel.deleteMany({ city: cityId });

  const deletedCity = await CityModel.findByIdAndDelete(cityId);
  if (!deletedCity) {
    throw new Error('City not found');
  }

  return deletedCity;
};
