import jwt from 'jsonwebtoken';
import AdminModel from '../models/Admin.js';

export const authenticateAdmin = async (email, password) => {
  const admin = await AdminModel.findOne({ email });

  if (!admin) {
    throw new Error('Admin not found. Please check your email or password');
  }

  if (password !== admin.password) {
    throw new Error('Invalid credentials. Please check your password');
  }

  const token = jwt.sign(
    {
      _id: admin._id,
    },
    process.env.SECRET_JWT,
    {
      expiresIn: '30d',
    }
  );

  return token;
};
