
import { PrismaClient } from '.prisma/client';
const prisma = new PrismaClient();

export const getSchedule = async (req, res) => {
  const schedule = await prisma.horaires.findMany({});
  res.json({ schedule });
};
