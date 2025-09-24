'use server'

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const clearDb = async () => {
  await prisma.images.deleteMany();
  await prisma.superhero.deleteMany();
  await prisma.superpower.deleteMany();
};
export { clearDb };
