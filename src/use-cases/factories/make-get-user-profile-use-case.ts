import { PrismaUsersRepository } from "@/repositories/prisma/prisma.users-repository";
import { GetUserProfileUseCase } from "../get-user-profile";

export function makeGetUserProfielUseCase() {
  const prismaUserRepository = new PrismaUsersRepository();
  const getUserProfileUseCase = new GetUserProfileUseCase(prismaUserRepository);

  return getUserProfileUseCase;
}
