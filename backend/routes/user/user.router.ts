import { Router } from 'express';
import { protect } from '../../middlewares/auth';

const router = Router();
import {
	createNewUser,
	login,
	sendUserData,
	updateUser,
} from './user.controller';

router.get('/user', protect, sendUserData);
router.put('/user', protect, updateUser);
router.post('/register', createNewUser);
router.post('/login', login);

export default router;
