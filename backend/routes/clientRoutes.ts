import express from 'express'
import ClientController from '../controllers/clientController'

const router = express.Router()

router.post('/clients', ClientController.createClient)
router.put('/clients/:id', ClientController.updateClientById)
router.delete('/clients/:id', ClientController.deleteClient)
router.get('/clients/:id', ClientController.getClientById)
router.get('/clients', ClientController.getClients)

export default router
