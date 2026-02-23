import { jest } from '@jest/globals';

jest.unstable_mockModule('../services/AdminService.js', () => ({
  authenticateAdmin: jest.fn(),
}));

const AdminController = await import('./AdminController.js');
const AdminService = await import('../services/AdminService.js');

const { login } = AdminController;

describe('AdminController', () => {
  let req;
  let res;

  beforeEach(() => {
    req = { body: {} };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should return 200 and a token on successful login (TC-38)', async () => {
      req.body = { email: 'admin@test.com', password: 'password123' };
      const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';

      AdminService.authenticateAdmin.mockResolvedValue(fakeToken);

      await login(req, res);

      expect(AdminService.authenticateAdmin).toHaveBeenCalledWith(
        req.body.email,
        req.body.password,
      );
      expect(res.json).toHaveBeenCalledWith({ token: fakeToken });
    });

    it('should return 400 when admin is not found (TC-39)', async () => {
      req.body = { email: 'wrong@test.com', password: 'password123' };
      const errorMessage =
        'Admin not found. Please check your email or password';

      AdminService.authenticateAdmin.mockRejectedValue(new Error(errorMessage));

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    });

    it('should return 400 on invalid credentials (TC-40)', async () => {
      req.body = { email: 'admin@test.com', password: 'wrongPassword' };
      const errorMessage = 'Invalid credentials. Please check your password';

      AdminService.authenticateAdmin.mockRejectedValue(new Error(errorMessage));

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });
});
