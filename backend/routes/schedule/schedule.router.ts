import { Router } from 'express';
import { adminProtect } from '../../middlewares/auth';
const router = Router();

import {
	basicSchedule,
	getSchedule,
	postSchedule,
} from './schedule.controller';

router.get('', getSchedule);
router.get('/basicSchedule', basicSchedule);
router.put('', adminProtect, postSchedule);
export default router;
