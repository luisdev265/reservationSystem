import express from 'express';
const router = express.Router();

import { registerReservation, getReservationsController, getReservationIdController, updateReservationController, deleteReservationController, getReservationIdUserController } from '../controllers/reservasController.js'; 

router.get('/', getReservationsController);
router.get('/idReservation/:id', getReservationIdController);
router.get('/idUser/:id', getReservationIdUserController);
router.post('/', registerReservation);
router.patch('/:id', updateReservationController);
router.delete('/:id', deleteReservationController);

export default router;