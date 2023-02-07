import { Router } from 'express';
import prisma from '../../db';
const router = Router();
import { createNewUser, login } from './user.controller';

router.post('/register', createNewUser);
router.post('/login', login);
router.get('', async (req, res) => {
    const users = await prisma.user.findMany({});
    res.json({users})
})
export default router;
