import { body } from 'express-validator';

export const callValidation = [
  body('subscriber')
    .isMongoId()
    .withMessage('Subscriber ID must be a valid MongoDB ObjectId')
    .notEmpty()
    .withMessage('Subscriber ID is required'),

  body('city')
    .isMongoId()
    .withMessage('City ID must be a valid MongoDB ObjectId')
    .notEmpty()
    .withMessage('City ID is required'),

  body('duration')
    .isNumeric()
    .withMessage('Duration must be a number')
    .custom((value) => {
      if (value <= 0) {
        throw new Error('Duration must be greater than 0');
      }
      return true;
    }),

  body('date')
    .optional()
    .custom((value) => {
      if (typeof value === 'number' && !isNaN(value)) {
        return true;
      }

      if (typeof value === 'string') {
        const date = new Date(value);
        if (!isNaN(date.getTime())) {
          return true;
        }
      }

      throw new Error('Date must be a valid timestamp or ISO date string');
    }),
];
