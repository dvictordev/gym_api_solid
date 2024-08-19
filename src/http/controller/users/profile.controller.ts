import { makeGetUserProfielUseCase } from "@/use-cases/factories/make-get-user-profile-use-case";
import { FastifyRequest, FastifyReply } from "fastify";
import { openAsBlob } from "fs";

export async function profileController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  await request.jwtVerify();

  const getUserProfile = makeGetUserProfielUseCase();

  const { user } = await getUserProfile.execute({ userId: request.user.sub });

  return reply.status(200).send({
    user: {
      ...user,
      password_hash: undefined,
    },
  });
}
