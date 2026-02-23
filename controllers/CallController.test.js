import { jest } from '@jest/globals';

jest.unstable_mockModule('../services/CallService.js', () => ({
  fetchAllCalls: jest.fn(),
  createCall: jest.fn(),
  removeCall: jest.fn(),
}));

const CallController = await import('./CallController.js');
const CallService = await import('../services/CallService.js');

const { getCalls, addNewCall, deleteCall } = CallController;

describe('CallController', () => {
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

  describe('getCalls (TC-27)', () => {
    it('should return 200 and a list of calls', async () => {
      const mockCalls = [{ _id: '1', duration: 120, cost: 5.5 }];
      CallService.fetchAllCalls.mockResolvedValue(mockCalls);

      await getCalls(req, res);

      expect(CallService.fetchAllCalls).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(mockCalls);
    });
  });

  describe('addNewCall (TC-28 & TC-29)', () => {
    it('should return 200 (or default Express 200) and the new call when data is valid (TC-28)', async () => {
      const newCallData = { subscriber: 'sub1', city: 'city1', duration: 300 };
      req.body = newCallData;

      CallService.createCall.mockResolvedValue({ _id: '2', ...newCallData });

      await addNewCall(req, res);

      expect(CallService.createCall).toHaveBeenCalledWith(newCallData);
      expect(res.json).toHaveBeenCalledWith({ _id: '2', ...newCallData });
    });

    it('should return 400 when an error occurs due to missing references (TC-29)', async () => {
      req.body = { duration: 300 };
      const errorMessage = 'Subscriber not found';

      CallService.createCall.mockRejectedValue(new Error(errorMessage));

      await addNewCall(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });

  describe('deleteCall (TC-30)', () => {
    it('should return 404 when call is not found', async () => {
      req.params.id = 'invalid_id';

      CallService.removeCall.mockResolvedValue(null);

      await deleteCall(req, res);

      expect(CallService.removeCall).toHaveBeenCalledWith('invalid_id');
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Call not found' });
    });
  });
});
