import { Router } from 'express';
import { protect } from '../../middlewares/auth';

const router = Router();
import {
	createNewUser,
	login,
	makeAdmin,
	sendUserData,
	updateUser,
} from './user.controller';

router.get('/user', protect, sendUserData);
router.put('/user', protect, updateUser);
router.get('/makeadmin', makeAdmin);
router.post('/register', createNewUser);
router.post('/login', login);

export default router;
