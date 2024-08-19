import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error";
import { makeGymUseCase } from "@/use-cases/factories/make-gym-use-case";
import { makeCheckinUseCase } from "@/use-cases/factories/make-checkin-use-case";

export async function createCheckiController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createCheckInParamsSchema = z.object({
    gymId: z.string().uuid(),
  });

  const createCheckinBodySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 1;
    }),
  });

  const { latitude, longitude } = createCheckinBodySchema.parse(request.body);
  const { gymId } = createCheckInParamsSchema.parse(request.params);

  const checkInUseCase = makeCheckinUseCase();

  await checkInUseCase.execute({
    latitude,
    longitude,
    gymId,
    userId: request.user.sub,
  });

  return reply.status(201).send();
}
