import express from 'express';
const router = express.Router();

import { registerReservation, getReservationController, getReservationIdController, updateReservationController } from '../controllers/reservasController.js'; 

router.get('/', getReservationController);
router.get('/:id', getReservationIdController);
router.post('/', registerReservation);
router.patch('/:id', updateReservationController);
router.delete('/');

export default router;