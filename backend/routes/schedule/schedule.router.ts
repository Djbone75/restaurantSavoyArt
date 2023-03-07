import { Router } from 'express';
import { adminProtect } from '../../middlewares/auth';
const router = Router();

import { getSchedule, postSchedule } from './schedule.controller';

router.get('', getSchedule);
router.put('', adminProtect, postSchedule);
export default router;
