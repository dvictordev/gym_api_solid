import { FetchUserCheckInsHistoryUse } from "../fetch-user-check-ins-history";
import { PrismaChekinRepository } from "@/repositories/prisma/prisma-check-ins-repository";

export function makeFetchUserCheckInsHistoryUseCase() {
  const prismaCheckinsRepository = new PrismaChekinRepository();
  const getUserMetricsUseCase = new FetchUserCheckInsHistoryUse(
    prismaCheckinsRepository
  );

  return getUserMetricsUseCase;
}
