import { body } from 'express-validator';

export const loginValidation = [
  body('email', 'Please provide a valid email address.').isEmail(),
  body('password', 'Password must be at least 5 characters long.').isLength({
    min: 5,
  }),
];
