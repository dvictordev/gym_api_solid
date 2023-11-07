import { PrismaChekinRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { CheckInUseCase } from "../check-in";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms.repository";

export function makeCheckinUseCase() {
  const prismaCheckinsRepository = new PrismaChekinRepository();
  const prismaGymsRepository = new PrismaGymsRepository();
  const checkinUseCase = new CheckInUseCase(
    prismaCheckinsRepository,
    prismaGymsRepository
  );

  return checkinUseCase;
}
