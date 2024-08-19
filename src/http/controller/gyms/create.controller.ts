import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error";
import { makeGymUseCase } from "@/use-cases/factories/make-gym-use-case";

export async function createGymController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createGymBodySchema = z.object({
    name: z.string(),
    description: z.string().nullable(),
    phone: z.string(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const { description, latitude, longitude, name, phone } =
    createGymBodySchema.parse(request.body);

  const gymUseCase = makeGymUseCase();

  await gymUseCase.execute({ name, description, latitude, longitude, phone });

  return reply.status(201).send();
}
