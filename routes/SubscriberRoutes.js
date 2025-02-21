import express from 'express';
import {
  getAllSubscribers,
  getSubscriberDetailsById,
  addSubscriber,
  deleteSubscriber,
  updateSubscriber,
} from '../controllers/SubscriberController.js';
import { subscriberValidation } from '../validations/SubscriberValidation.js';
import handleValidationErrors from '../middlewares/handleValidationErrors.js';
import checkAdminAuth from '../middlewares/checkAdminAuth.js';

const router = express.Router();

router.use(checkAdminAuth);

router.get('/', getAllSubscribers);
router.get('/:id', getSubscriberDetailsById);
router.post('/', subscriberValidation, handleValidationErrors, addSubscriber);
router.delete('/:id', deleteSubscriber);
router.put(
  '/:id',
  subscriberValidation,
  handleValidationErrors,
  updateSubscriber
);

export default router;

/**
 * @swagger
 * /subscribers:
 *   get:
 *     summary: Get all subscribers
 *     tags: [Subscribers]
 *     parameters:
 *       - in: header
 *         name: authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: JWT token for authorization
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved subscribers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "64f1b2b3c9e77b001a9b8e1f"
 *                   phoneNumber:
 *                     type: string
 *                     example: "0987654321"
 *                   edrpou:
 *                     type: string
 *                     example: "87654321"
 *                   address:
 *                     type: string
 *                     example: "Kyiv, Ukraine"
 *                   callsCount:
 *                     type: number
 *                     example: 1
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Failed to fetch the subscriber list. Please try again
 */

/**
 * @swagger
 * /subscribers/{id}:
 *   get:
 *     summary: Get a subscriber by ID
 *     tags: [Subscribers]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the subscriber to fetch
 *       - in: header
 *         name: authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: JWT token for authorization
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved subscriber details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 subscriber:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "64f1b2b3c9e77b001a9b8e1f"
 *                     phoneNumber:
 *                       type: string
 *                       example: "0987654321"
 *                     edrpou:
 *                       type: string
 *                       example: "87654321"
 *                     address:
 *                       type: string
 *                       example: "Kyiv, Ukraine"
 *                 calls:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "64f1b2b3c9e77b001a9b8e20"
 *                       city:
 *                         type: string
 *                         example: "Kyiv"
 *                       duration:
 *                         type: number
 *                         example: 15
 *                       timeOfDay:
 *                         type: string
 *                         enum: ["day", "night"]
 *                         example: "day"
 *                       cost:
 *                         type: number
 *                         example: 10.5
 *                       date:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-02-19T12:00:00Z"
 *       404:
 *         description: Subscriber not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Subscriber not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Failed to fetch subscriber details
 */

/**
 * @swagger
 * /subscribers:
 *   post:
 *     summary: Add a new subscriber
 *     tags: [Subscribers]
 *     parameters:
 *       - in: header
 *         name: authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: JWT token for authorization
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phoneNumber
 *               - edrpou
 *               - address
 *             properties:
 *               phoneNumber:
 *                 type: string
 *                 example: "0987654321"
 *               edrpou:
 *                 type: string
 *                 example: "12345678"
 *               address:
 *                 type: string
 *                 example: "Kyiv, Ukraine"
 *     responses:
 *       201:
 *         description: Subscriber created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "64f1b2b3c9e77b001a9b8e1f"
 *                 phoneNumber:
 *                   type: string
 *                   example: "0987654321"
 *                 edrpou:
 *                   type: string
 *                   example: "87654321"
 *                 address:
 *                   type: string
 *                   example: "Kyiv, Ukraine"
 *                 callsCount:
 *                   type: number
 *                   example: 0
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: A subscriber with this phone number already exists
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Failed to add a new subscriber. Please check the entered data
 */

/**
 * @swagger
 * /subscribers/{id}:
 *   put:
 *     summary: Update subscriber data
 *     tags: [Subscribers]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the subscriber to update
 *       - in: header
 *         name: authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: JWT token for authorization
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phoneNumber
 *               - edrpou
 *               - address
 *             properties:
 *               phoneNumber:
 *                 type: string
 *                 example: "0987654321"
 *               edrpou:
 *                 type: string
 *                 example: "12345678"
 *               address:
 *                 type: string
 *                 example: "Kyiv, Ukraine"
 *     responses:
 *       200:
 *         description: Subscriber data updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "64f1b2b3c9e77b001a9b8e1f"
 *                 phoneNumber:
 *                   type: string
 *                   example: "0987654321"
 *                 edrpou:
 *                   type: string
 *                   example: "12345678"
 *                 address:
 *                   type: string
 *                   example: "Kyiv, Ukraine"
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "A subscriber with this phone number already exists"
 *       404:
 *         description: Subscriber not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Subscriber not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to update subscriber data. Please check the entered data"
 */

/**
 * @swagger
 * /subscribers/{id}:
 *   delete:
 *     summary: Delete a subscriber
 *     tags: [Subscribers]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the subscriber to update
 *       - in: header
 *         name: authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: JWT token for authorization
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Subscriber deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Subscriber successfully deleted"
 *       404:
 *         description: Subscriber not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Subscriber not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to delete the subscriber. Please try again"
 */
