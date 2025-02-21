import { body } from 'express-validator';

export const subscriberValidation = [
  body('phoneNumber')
    .isNumeric()
    .withMessage('Phone number must contain only digits')
    .isLength({ min: 10, max: 10 })
    .withMessage('Phone number must be exactly 10 digits long'),

  body('edrpou')
    .isNumeric()
    .withMessage('EDRPOU code must contain only digits')
    .isLength({ min: 8, max: 8 })
    .withMessage('EDRPOU code must be exactly 8 digits long'),

  body('address')
    .isString()
    .withMessage('Address must be a string')
    .isLength({ min: 5 })
    .withMessage('Address must be at least 5 characters long'),
];
