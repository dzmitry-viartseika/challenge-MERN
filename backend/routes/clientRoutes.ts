import express from 'express'
import ClientController from '../controllers/clientController'
import {authenticateToken} from "../middleware/auth/authenticateToken";
import cache from "../config/cache";

const router = express.Router()
/**
 * @swagger
 * components:
 *   schemas:
 *     Client:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *       properties:
 *         firstName:
 *           type: string
 *           description: The firstName of the client
 *         lastName:
 *           type: string
 *           description: The lastName of the client
 *         email:
 *           type: string
 *           description: The email of the client
 *         phoneNumber:
 *           type: string
 *           description: The phoneNumber of the client
 *         birthDate:
 *           type: string
 *           description: The birthDate of the client
 *         role:
 *           type: string
 *           description: The roles of the client
 *       example:
 *         firstName: User
 *         lastName: Test
 *         email: test@gmail.com
 *         phoneNumber: 123456789
 *         birthday: 01.01.1990
 *         role: User
 */
/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: The Clients managing API
 * /api/v1/clients:
 *   get:
 *     summary: Lists all the clients
 *     tags: [Clients]
 *     responses:
 *       200:
 *         description: The list of the clients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Client'
 *   post:
 *     summary: Create a new client
 *     tags: [Clients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Client'
 *     responses:
 *       200:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       500:
 *         description: Some server error
 * /api/v1/clients/{id}:
 *   get:
 *     summary: Get the client by id
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 *     responses:
 *       200:
 *         description: The book response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       404:
 *         description: The book was not found
 *   put:
 *    summary: Update the client by the id
 *    tags: [Clients]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The book id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Client'
 *    responses:
 *      200:
 *        description: The book was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Client'
 *      404:
 *        description: The book was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the client by id
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The client id
 *
 *     responses:
 *       200:
 *         description: The client was deleted
 *       404:
 *         description: The client was not found
 *       500:
 *         description: Internal Server Error
 */
router.post('/clients', authenticateToken, ClientController.createClient)
router.put('/clients/:id', authenticateToken, ClientController.updateClientById)
router.delete('/clients/:id', authenticateToken, ClientController.deleteClient)
router.get('/clients/:id', authenticateToken, ClientController.getClientById)
router.get('/clients', cache.route(), authenticateToken, ClientController.getClients)

export default router
