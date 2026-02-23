import { jest } from '@jest/globals';

jest.unstable_mockModule('../services/SubscriberService.js', () => ({
  fetchAllSubscribers: jest.fn(),
  fetchSubscriberDetailsById: jest.fn(),
  createSubscriber: jest.fn(),
  updateSubscriberById: jest.fn(),
  deleteSubscriberById: jest.fn(),
}));

const SubscriberController = await import('./SubscriberController.js');
const SubscriberService = await import('../services/SubscriberService.js');

const { getAllSubscribers, addSubscriber, deleteSubscriber } =
  SubscriberController;

describe('SubscriberController', () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      body: {},
      params: {},
    };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllSubscribers (TC-22)', () => {
    it('should return 200 and a list of subscribers', async () => {
      const mockSubscribers = [
        { _id: '1', phoneNumber: '0501234567', callsCount: 5 },
      ];
      SubscriberService.fetchAllSubscribers.mockResolvedValue(mockSubscribers);

      await getAllSubscribers(req, res);

      expect(SubscriberService.fetchAllSubscribers).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(mockSubscribers);
    });
  });

  describe('addSubscriber', () => {
    it('should return 201 and the new subscriber when data is valid (TC-23)', async () => {
      const newSubscriberData = {
        phoneNumber: '0671112233',
        edrpou: '12345678',
        address: 'Kyiv',
      };
      req.body = newSubscriberData;

      SubscriberService.createSubscriber.mockResolvedValue({
        _id: '2',
        ...newSubscriberData,
      });

      await addSubscriber(req, res);

      expect(SubscriberService.createSubscriber).toHaveBeenCalledWith(
        newSubscriberData,
      );
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ _id: '2', ...newSubscriberData });
    });

    it('should return 400 when subscriber already exists (TC-24)', async () => {
      req.body = { phoneNumber: '0671112233' };
      const errorMessage = 'A subscriber with this phone number already exists';

      SubscriberService.createSubscriber.mockRejectedValue(
        new Error(errorMessage),
      );

      await addSubscriber(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });

  describe('deleteSubscriber', () => {
    it('should return 200 and a success message when deleted successfully (TC-25)', async () => {
      req.params.id = '123';
      SubscriberService.deleteSubscriberById.mockResolvedValue(true);

      await deleteSubscriber(req, res);

      expect(SubscriberService.deleteSubscriberById).toHaveBeenCalledWith(
        '123',
      );
      expect(res.json).toHaveBeenCalledWith({
        message: 'Subscriber successfully deleted',
      });
    });

    it('should return 404 when subscriber is not found (TC-26)', async () => {
      req.params.id = '999';
      const errorMessage = 'Subscriber not found';

      SubscriberService.deleteSubscriberById.mockRejectedValue(
        new Error(errorMessage),
      );

      await deleteSubscriber(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });
});
