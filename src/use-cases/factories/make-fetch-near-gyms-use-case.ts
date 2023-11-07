import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms.repository";
import { FetchNearGymsUseCase } from "../fetch-near-gyms";

export function makeFetchNearGymsUseCase() {
  const prismaGymsRepository = new PrismaGymsRepository();
  const fetchNearGymsUseCase = new FetchNearGymsUseCase(prismaGymsRepository);

  return fetchNearGymsUseCase;
}
