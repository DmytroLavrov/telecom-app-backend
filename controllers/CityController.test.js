import { jest } from '@jest/globals';

jest.unstable_mockModule('../services/CityService.js', () => ({
  fetchAllCities: jest.fn(),
  createCity: jest.fn(),
  updateCityById: jest.fn(),
  deleteCityById: jest.fn(),
}));

const CityController = await import('./CityController.js');
const CityService = await import('../services/CityService.js');

const { getAllCities, addCity, updateCity, deleteCity } = CityController;

describe('CityController', () => {
  let req;
  let res;

  beforeEach(() => {
    req = { body: {}, params: {} };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllCities (TC-31)', () => {
    it('should return 200 and a list of cities', async () => {
      const mockCities = [{ _id: '1', name: 'Kyiv', dayRate: 2.5 }];
      CityService.fetchAllCities.mockResolvedValue(mockCities);

      await getAllCities(req, res);

      expect(CityService.fetchAllCities).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(mockCities);
    });
  });

  describe('addCity', () => {
    it('should return 201 and the new city (TC-32)', async () => {
      req.body = { name: 'Lviv', dayRate: 2, nightRate: 1, discounts: [] };
      CityService.createCity.mockResolvedValue({ _id: '2', ...req.body });

      await addCity(req, res);

      expect(CityService.createCity).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ _id: '2', ...req.body });
    });

    it('should return 400 when city already exists (TC-33)', async () => {
      req.body = { name: 'Kyiv' };
      const errorMessage = 'A city with this name already exists';
      CityService.createCity.mockRejectedValue(new Error(errorMessage));

      await addCity(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });

  describe('updateCity', () => {
    it('should return 200 and updated city (TC-34)', async () => {
      req.params.id = '123';
      req.body = { name: 'Odessa' };
      CityService.updateCityById.mockResolvedValue({ _id: '123', ...req.body });

      await updateCity(req, res);

      expect(CityService.updateCityById).toHaveBeenCalledWith('123', req.body);
      expect(res.json).toHaveBeenCalledWith({ _id: '123', ...req.body });
    });

    it('should return 400 when city is not found (TC-35)', async () => {
      req.params.id = '999';
      const errorMessage = 'City not found';
      CityService.updateCityById.mockRejectedValue(new Error(errorMessage));

      await updateCity(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });

  describe('deleteCity', () => {
    it('should return 200 and success message (TC-36)', async () => {
      req.params.id = '123';
      CityService.deleteCityById.mockResolvedValue(true);

      await deleteCity(req, res);

      expect(CityService.deleteCityById).toHaveBeenCalledWith('123');
      expect(res.json).toHaveBeenCalledWith({
        message: 'City successfully deleted',
      });
    });

    it('should return 404 when city is not found (TC-37)', async () => {
      req.params.id = 'invalid_id';
      const errorMessage = 'City not found';
      CityService.deleteCityById.mockRejectedValue(new Error(errorMessage));

      await deleteCity(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });
});
