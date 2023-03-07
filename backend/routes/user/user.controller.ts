import {
	createJWT,
	hashPassword,
	comparePasswords,
} from '../../middlewares/auth';
import prisma from '../../db';

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

export const updateUser = async (req, res) => {
	try {
		const userUpdate = await prisma.user.update({
			where: { email: req.userData.email },
			data: {
				averageGuests: req.body.averageGuests,
				firstname: req.body.firstname,
				lastname: req.body.lastname,
				allergies: req.body.allergies,
			},
		});
		const user = await prisma.user.findUnique({
			where: { email: req.userData.email },
		});
		res.status(200).json({
			user,
		});
	} catch (err) {
		res.status(200).json({
			message: 'something goes wrong' + err,
		});
	}
};

export const login = async (req, res) => {
	const user = await prisma.user.findUnique({
		where: { email: req.body.email },
	});
	if (!user) {
		return res.status(401).json({ message: 'no user found' });
	}

	const isValid = await comparePasswords(req.body.password, user.password);

	if (!isValid) {
		res.status(401);
		res.json({ message: 'token invalide' });
		return;
	}
	const token = createJWT(user);
	res.json({
		token: token,
		user: user,
	});
};

export const sendUserData = async (req, res) => {
	const user = await prisma.user.findUnique({
		where: { email: req.userData.email },
	});
	if (!user) {
		return res.status(401).json({ message: 'no user found' });
	}
	res.json({ user });
};
