import { FastifyRequest, FastifyReply } from "fastify";
import { makeGetUserMetricsUseCase } from "@/use-cases/factories/make-get-user-metrics-use-case";

export async function metricsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const fetchUserCheckinHistoryUseCase = makeGetUserMetricsUseCase();

  const { checkInsCount } = await fetchUserCheckinHistoryUseCase.execute({
    userId: request.user.sub,
  });

  return reply.status(200).send({ checkInsCount });
}
