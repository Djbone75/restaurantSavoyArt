import { PrismaClient } from '.prisma/client';
const prisma = new PrismaClient();

export const getReservations = async (req, res) => {
	const reservations = await prisma.reservation.findMany({});
	res.status(200).json({
		reservations,
	});
};

export const getUserReservation = async (req, res) => {
	const reservations = await prisma.reservation.findMany({
		select: {
			day: true,
			hour: true,
			totalGuests: true,
		},
	});
	res.status(200).json({
		reservations,
	});
};

export const createReservation = async (req, res, next) => {
	const reservation = await prisma.reservation.create({
		data: {
			day: req.body.day,
			hour: req.body.hour,
			totalGuests: parseInt(req.body.totalGuests),
			userName: req.body.userName,
			userId: req.userData.userId,
		},
	});

	res.json({ reservation });
};
export const createSimpleReservation = async (req, res, next) => {
	const reservation = await prisma.reservation.create({
		data: {
			day: req.body.day,
			hour: req.body.hour,
			totalGuests: parseInt(req.body.totalGuests),
			userName: req.body.userName,
		},
	});
	res.json({ reservation });
};
