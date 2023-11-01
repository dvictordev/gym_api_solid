import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { InvalidCredentialError } from "@/use-cases/errors/invalid-credential-error";
import { makeAuthenticateUseCase } from "@/use-cases/factories/make-authenticate-use-case";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const authenticateUseCase = makeAuthenticateUseCase();

    const user = await authenticateUseCase.execute({ email, password });
  } catch (error) {
    if (error instanceof InvalidCredentialError) {
      return reply.status(409).send({ message: error.message });
    }

    return reply.status(500).send();
  }

  return reply.status(200).send("Authenticated");
}
