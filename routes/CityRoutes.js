import express from 'express';
import {
  getAllCities,
  addCity,
  updateCity,
  deleteCity,
} from '../controllers/CityController.js';
import { cityValidation } from '../validations/CityValidation.js';
import handleValidationErrors from '../middlewares/handleValidationErrors.js';
import checkAdminAuth from '../middlewares/checkAdminAuth.js';

const router = express.Router();

router.use(checkAdminAuth);

router.get('/', getAllCities);
router.post('/', cityValidation, handleValidationErrors, addCity);
router.put('/:id', cityValidation, handleValidationErrors, updateCity);
router.delete('/:id', deleteCity);

export default router;

/**
 * @swagger
 * /cities:
 *   get:
 *     summary: Get all cities
 *     tags: [Cities]
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
 *                     example: "65cbe23a8d134d0008f7e6f9"
 *                   name:
 *                     type: string
 *                     example: "Kyiv"
 *                   dayRate:
 *                     type: number
 *                     example: 1.5
 *                   nightRate:
 *                     type: number
 *                     example: 1.0
 *                   discounts:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         duration:
 *                           type: number
 *                           example: 10
 *                         discountRate:
 *                           type: number
 *                           example: 0.15
 *                         _id:
 *                           type: string
 *                           example: "67ab6272c204b5a77ecbaba5"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Failed to fetch the cities list. Please try again
 */

/**
 * @swagger
 * /cities:
 *   post:
 *     summary: Add a new city
 *     tags: [Cities]
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
 *               - name
 *               - dayRate
 *               - nightRate
 *               - discounts
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Kyiv"
 *               dayRate:
 *                 type: number
 *                 example: 1.5
 *               nightRate:
 *                 type: number
 *                 example: 1.0
 *               discounts:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - duration
 *                     - discountRate
 *                   properties:
 *                     duration:
 *                       type: number
 *                       example: 10
 *                     discountRate:
 *                       type: number
 *                       example: 15
 *     responses:
 *       201:
 *         description: City created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: "Kyiv"
 *                 dayRate:
 *                   type: number
 *                   example: 1.5
 *                 nightRate:
 *                   type: number
 *                   example: 1.0
 *                 discounts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       duration:
 *                         type: number
 *                         example: 10
 *                       discountRate:
 *                         type: number
 *                         example: 0.15
 *                       _id:
 *                         type: string
 *                         example: "67b64ccf2ddcff4e7284ad64"
 *                 _id:
 *                   type: string
 *                   example: "67b64ccf2ddcff4e7284ad63"
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: A city with this name already exists
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Failed to add the city. Please check the entered data
 */

/**
 * @swagger
 * /cities/{id}:
 *   put:
 *     summary: Update city data
 *     tags: [Cities]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the city to update
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
 *               - name
 *               - dayRate
 *               - nightRate
 *               - discounts
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Kyiv"
 *               dayRate:
 *                 type: number
 *                 example: 1.5
 *               nightRate:
 *                 type: number
 *                 example: 1.0
 *               discounts:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - duration
 *                     - discountRate
 *                   properties:
 *                     duration:
 *                       type: number
 *                       example: 10
 *                     discountRate:
 *                       type: number
 *                       example: 15
 *     responses:
 *       200:
 *         description: City data updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "67b64ccf2ddcff4e7284ad63"
 *                 name:
 *                   type: string
 *                   example: "Kyiv"
 *                 dayRate:
 *                   type: number
 *                   example: 1.5
 *                 nightRate:
 *                   type: number
 *                   example: 1.0
 *                 discounts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       duration:
 *                         type: number
 *                         example: 10
 *                       discountRate:
 *                         type: number
 *                         example: 0.15
 *                       _id:
 *                         type: string
 *                         example: "67b64ccf2ddcff4e7284ad64"
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "A city with this name already exists"
 *       404:
 *         description: City not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "City not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Failed to update the city. Please check the entered data
 */

/**
 * @swagger
 * /cities/{id}:
 *   delete:
 *     summary: Delete a city
 *     tags: [Cities]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the city to update
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
 *         description: City deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "City successfully deleted"
 *       404:
 *         description: City not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "City not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to delete the city. Please try again"
 */
