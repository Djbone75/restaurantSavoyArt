import { createJWT, hashPassword, comparePasswords } from '../../middlewares/auth';
import prisma from '../../db'

export const createNewUser = async (req, res, next) => {
    
  try {
    const user = await prisma.user.create({
      data: {
        email: req.body.email,
        password: await hashPassword(req.body.password),
      },
    });
    const token = createJWT(user);
    res.json({ token: token });
  } catch (e) {
    e.type = 'input';
    next(e);
  }
};

export const login = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { email: req.body.email },
  });

  const isValid = await comparePasswords(req.body.password, user.password);

  if (!isValid) {
    res.status(401);
    res.json({ message: 'token invalide' });
    return;
  }
  const token = createJWT(user);
  res.json({ token: token });
};
