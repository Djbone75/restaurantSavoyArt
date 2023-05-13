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
export const basicSchedule = async (req, res) => {
	const result = await prisma.$executeRaw`
insert into "Horaires" ("id", "name", "dayStartAM", "dayEndAM", "dayStartPM", "dayEndPM") values (1, 'lundi', '11:00:00', '16:00:00', '18:00:00', '22:00:00'), (2, 'mardi', '11:00:00', '16:00:00', '18:00:00', '22:00:00'),(3, 'mercredi', '11:00:00', '16:00:00', '18:00:00', '22:00:00'),(4, 'jeudi', '11:00:00', '16:00:00', '18:00:00', '22:00:00'),(5, 'vendredi', '11:00:00', '16:00:00', '18:00:00', '22:00:00'),(6, 'samedi', '11:00:00', '16:00:00', '18:00:00', '22:00:00'), (7, 'dimanche', '11:00:00', '16:00:00', '18:00:00', '22:00:00');`;
	res
		.status(200)
		.json({ message: 'les horaires sont revenues aux valeures basiques' });
};
