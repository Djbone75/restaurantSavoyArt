import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import prisma from '../db';

export const comparePasswords = (password, hash) => {
	return bcrypt.compare(password, hash);
};

export const hashPassword = (password) => {
	return bcrypt.hash(password, 5);
};

export const createJWT = (user) => {
	const token = jwt.sign(
		{ id: user.id, email: user.email },
		process.env.JWT_SECRET
	);
	return token;
};

export const protect = (req, res, next) => {
	const bearer = req.headers.authorization;
	if (!bearer) {
		res.status(401);
		res.json({ message: 'utilisateur non autorisé' });
		return;
	}

	const [, token] = bearer.split(' ');
	if (!token) {
		res.status(401);
		res.json({ message: 'token invalide' });
		return;
	}

	try {
		const user = jwt.verify(token, process.env.JWT_SECRET);
		req.userData = {
			email: user.email,
			userId: user.id,
		};
		next();
	} catch (e) {
		res.json({ message: 'token invalide!' });
		res.status(401);
		return;
	}
};

export const adminProtect = async (req, res, next) => {
	const bearer = req.headers.authorization;
	if (!bearer) {
		res.status(401);
		res.json({ message: 'utilisateur non autorisé' });
		return;
	}

	const [, token] = bearer.split(' ');
	if (!token) {
		res.status(401);
		res.json({ message: 'token invalide' });
		return;
	}

	try {
		const user = jwt.verify(token, process.env.JWT_SECRET);

		req.userData = await prisma.user.findUnique({
			where: { email: user.email },
		});
		console.log(req.userData);
		if (req.userData.role != 'ADMIN') {
			res.json({ message: 'you must be an Admin' });
			return;
		}
		next();
	} catch (e) {
		res.json({ message: 'token invalide!' });
		res.status(401);
		return;
	}
};
