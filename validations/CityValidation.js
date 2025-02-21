import { body } from 'express-validator';

export const cityValidation = [
  body('name')
    .isString()
    .withMessage('City name must be a string')
    .isLength({ min: 3 })
    .withMessage('City name must be at least 3 characters long'),

  body('dayRate')
    .isNumeric()
    .withMessage('Day rate must be a number')
    .custom((value) => value > 0)
    .withMessage('Day rate must be greater than 0'),

  body('nightRate')
    .isNumeric()
    .withMessage('Night rate must be a number')
    .custom((value) => value > 0)
    .withMessage('Night rate must be greater than 0'),

  body('discounts')
    .isArray()
    .withMessage('Discounts must be an array')
    .custom((discounts) => {
      if (discounts.length > 3) {
        throw new Error('Maximum number of discounts is 3');
      }
      return true;
    })
    .withMessage('Maximum number of discounts is 3')
    .custom((discounts) => {
      const durations = discounts.map((d) => d.duration);
      const uniqueDurations = new Set(durations);
      if (durations.length !== uniqueDurations.size) {
        throw new Error('Discount duration must be unique');
      }
      return true;
    })
    .withMessage('Discount duration must be unique'),

  body('discounts.*.duration')
    .isNumeric()
    .withMessage('Discount duration must be a number')
    .custom((value) => value > 0)
    .withMessage('Discount duration must be greater than 0'),

  body('discounts.*.discountRate')
    .isNumeric()
    .withMessage('Discount rate must be a number')
    .custom((value) => value > 0 && value <= 100)
    .withMessage('Discount rate must be greater than 0 and not exceed 100'),
];
