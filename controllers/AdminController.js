import { authenticateAdmin } from '../services/AdminService.js';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const token = await authenticateAdmin(email, password);
    res.json({ token });
  } catch (err) {
    console.error('Error in login:', err.message);

    if (
      err.message === 'Admin not found. Please check your email or password' ||
      err.message === 'Invalid credentials. Please check your password'
    ) {
      return res.status(400).json({ message: err.message });
    }

    res.status(500).json({
      message:
        'An error occurred during admin authentication. Please try again later',
    });
  }
};
