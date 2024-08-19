import { GetUserMetricsUseCase } from "../get-user-metrics";
import { PrismaChekinRepository } from "@/repositories/prisma/prisma-check-ins-repository";

export function makeGetUserMetricsUseCase() {
  const prismaCheckinsRepository = new PrismaChekinRepository();
  const getUserMetricsUseCase = new GetUserMetricsUseCase(
    prismaCheckinsRepository
  );

  return getUserMetricsUseCase;
}
