import { Router } from 'express';
const router = Router();
import { adminProtect, protect } from '../../middlewares/auth';
import {
	getReservations,
	getUserReservation,
	createReservation,
	createSimpleReservation,
} from './reservations.controller';

router.get('', adminProtect, getReservations);
router.get('/user', getUserReservation);
router.post('/notregistered', createSimpleReservation);
router.post('', protect, createReservation);

export default router;
