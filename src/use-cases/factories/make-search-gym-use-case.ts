import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms.repository";
import { SearchGymUseCase } from "../search-gym";

export function makeSearchGymsUseCase() {
  const prismaGymsRepository = new PrismaGymsRepository();
  const searchGymsRepository = new SearchGymUseCase(prismaGymsRepository);

  return searchGymsRepository;
}
