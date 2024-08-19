import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error";
import { makeGymUseCase } from "@/use-cases/factories/make-gym-use-case";
import { makeSearchGymsUseCase } from "@/use-cases/factories/make-search-gym-use-case";
import { makeFetchNearGymsUseCase } from "@/use-cases/factories/make-fetch-near-gyms-use-case";

export async function nearByGymController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const nearByGymQuerySchema = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const { latitude, longitude } = nearByGymQuerySchema.parse(request.query);

  const nearByGymUseCase = makeFetchNearGymsUseCase();

  const { gyms } = await nearByGymUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  });

  return reply.status(200).send({ gyms });
}
