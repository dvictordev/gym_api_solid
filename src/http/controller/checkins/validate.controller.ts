import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { makeValidateCheckin } from "@/use-cases/factories/make-validate-checkin-use-case";

export async function validateController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const validateCheckinParamsSchema = z.object({
    checkInId: z.string().uuid(),
  });

  const { checkInId } = validateCheckinParamsSchema.parse(request.params);

  const checkInUseCase = makeValidateCheckin();

  await checkInUseCase.execute({
    checkInId,
  });

  return reply.status(204).send();
}
