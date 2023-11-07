import { PrismaChekinRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { ValidateCheckInUseCase } from "../validate-checkin";

export function makeValidateCheckin() {
  const prismaCheckinsRepository = new PrismaChekinRepository();
  const validateCheckin = new ValidateCheckInUseCase(prismaCheckinsRepository);

  return validateCheckin;
}
