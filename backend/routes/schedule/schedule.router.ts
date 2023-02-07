import { Router } from 'express';
const router = Router();

import { getSchedule } from './schedule.controller';

router.get('', getSchedule);

export default router;