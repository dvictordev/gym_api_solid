import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms.repository";
import { GymUseCase } from "../gym";

export function makeGymUseCase() {
  const prismaGymsRepository = new PrismaGymsRepository();
  const gymUseCase = new GymUseCase(prismaGymsRepository);

  return gymUseCase;
}
