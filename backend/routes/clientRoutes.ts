import express from 'express'
import ClientController from '../controllers/clientController'

const router = express.Router()
/**
 * @swagger
 * components:
 *  schemas:
 *     Clients:
 *      type: object
 *      properties:
 *          id:
 *              type: integer
 *              description: Pet id
 *          name:
 *              type: string
 *              description: Pet name
 *          age:
 *              type: integer
 *              description: Pet age
 *          type:
 *              type: string
 *              description: Pet type
 *          breed:
 *              type: string
 *              description: Pet breed
 *     example:
 *          id: 1
 *          name: Rexaurus
 *          age: 3
 *          breed: labrador
 *          type: dog
 */
/**
 * @swagger
 * /clients:
 *  get:
 *     summary: Get all clients
 *     description: Get all clients
 *     responses:
 *      200:
 *         description: Success
 *      500:
 *         description: Internal Server Error
 */
router.post('/clients', ClientController.createClient)
router.put('/clients/:id', ClientController.updateClientById)
router.delete('/clients/:id', ClientController.deleteClient)
router.get('/clients/:id', ClientController.getClientById)
router.get('/clients', ClientController.getClients)

export default router
