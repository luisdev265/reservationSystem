import express from 'express';
const router = express.Router();

import { registerReservation, getReservationController, getReservationIdController, updateReservationController, deleteReservationController } from '../controllers/reservasController.js'; 

router.get('/', getReservationController);
router.get('/:id', getReservationIdController);
router.post('/', registerReservation);
router.patch('/:id', updateReservationController);
router.delete('/:id', deleteReservationController);

export default router;