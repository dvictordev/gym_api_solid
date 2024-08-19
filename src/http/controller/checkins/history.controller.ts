import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error";
import { makeGymUseCase } from "@/use-cases/factories/make-gym-use-case";
import { makeSearchGymsUseCase } from "@/use-cases/factories/make-search-gym-use-case";
import { makeFetchUserCheckInsHistoryUseCase } from "@/use-cases/factories/make-fetch-user-check-ins-history-use-case";

export async function historyController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const checkinHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = checkinHistoryQuerySchema.parse(request.params);

  const fetchUserCheckinHistoryUseCase = makeFetchUserCheckInsHistoryUseCase();

  const { checkIns } = await fetchUserCheckinHistoryUseCase.execute({
    userId: request.user.sub,
    page,
  });

  return reply.status(201).send({ checkIns });
}
