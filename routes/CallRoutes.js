import express from 'express';
import {
  getCalls,
  addNewCall,
  deleteCall,
} from '../controllers/CallController.js';
import { callValidation } from '../validations/CallValidation.js';
import handleValidationErrors from '../middlewares/handleValidationErrors.js';
import checkAdminAuth from '../middlewares/checkAdminAuth.js';

const router = express.Router();

router.use(checkAdminAuth);

router.get('/', getCalls);
router.post('/', callValidation, handleValidationErrors, addNewCall);
router.delete('/:id', deleteCall);

export default router;

/**
 * @swagger
 * /calls:
 *   get:
 *     summary: Get all calls
 *     tags: [Calls]
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
 *         description: Successfully retrieved cities
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "67afdc3a7e0e7fa46e599e8d"
 *                   subscriber:
 *                     type: string
 *                     example: "0123456789"
 *                   city:
 *                     type: string
 *                     example: "Kyiv"
 *                   date:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-02-17T10:02:02.000Z"
 *                   duration:
 *                     type: number
 *                     example: 140461
 *                   timeOfDay:
 *                     type: string
 *                     enum: ["day", "night"]
 *                     example: "day"
 *                   cost:
 *                     type: number
 *                     example: 10.5
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Failed to fetch the call list. Please try again
 */

/**
 * @swagger
 * /calls:
 *   post:
 *     summary: Add a new call
 *     tags: [Calls]
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
 *               - subscriber
 *               - city
 *               - date
 *               - duration
 *             properties:
 *               subscriber:
 *                 type: string
 *                 example: "67b1c442d5d37c246ccf7cd9"
 *               city:
 *                 type: string
 *                 example: "67b474aceff651c555160f00"
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-02-17T10:02:02.000Z"
 *               duration:
 *                 type: number
 *                 example: 140461
 *     responses:
 *       201:
 *         description: City created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 subscriber:
 *                   type: string
 *                   example: "0123456789"
 *                 city:
 *                   type: string
 *                   example: "Kyiv"
 *                 date:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-02-17T10:02:02.000Z"
 *                 duration:
 *                   type: number
 *                   example: 140461
 *                 timeOfDay:
 *                   type: string
 *                   enum: ["day", "night"]
 *                   example: "day"
 *                 cost:
 *                   type: number
 *                   example: 10.5
 *                 _id:
 *                   type: string
 *                   example: "67afdc3a7e0e7fa46e599e8d"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Failed to add the call to the list. Please try again
 */

/**
 * @swagger
 * /calls/{id}:
 *   delete:
 *     summary: Delete a call
 *     tags: [Calls]
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
 *         description: Call successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Call successfully deleted"
 *       404:
 *         description: Call not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Call not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to delete the call. Please try again"
 */
