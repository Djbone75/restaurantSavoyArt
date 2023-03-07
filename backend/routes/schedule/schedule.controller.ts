import { PrismaClient } from '.prisma/client';
const prisma = new PrismaClient();

export const getSchedule = async (req, res) => {
	const schedule = await prisma.horaires.findMany({
		orderBy: [
			{
				id: 'asc',
			},
		],
	});
	res.status(200).json({ schedule });
};

export const postSchedule = async (req, res) => {
	const updatedSchedule = await prisma.horaires.updateMany({
		where: {
			name: req.body.name,
		},
		data: {
			dayStartAM: req.body.dayStartAM,
			dayEndAM: req.body.dayEndAM,
			dayStartPM: req.body.dayStartPM,
			dayEndPM: req.body.dayEndPM,
		},
	});
	const schedule = await prisma.horaires.findMany({
		orderBy: [
			{
				id: 'asc',
			},
		],
	});
	res.json({ schedule });
};
