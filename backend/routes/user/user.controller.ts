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
		const user = await prisma.user.update({
			where: { email: req.userData.email },
			data: {
				averageGuests: req.body.averageGuests,
				firstname: req.body.firstname,
				lastname: req.body.lastname,
				allergies: req.body.allergies,
			},
		});
		console.log(user);
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
export const makeAdmin = async (req, res) => {
	try {
		const user = await prisma.user.update({
			where: { email: 'admin@admin.com' },
			data: {
				role: 'ADMIN',
			},
		});

		res.status(200).json({
			message: 'vous êtes maintenant un admin',
		});
	} catch (err) {
		res.status(401).json({
			message: 'something goes wrong' + err,
		});
	}
};
