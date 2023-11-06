import { UsersRepositoryInterface } from "@/repositories/users-interface.repository";
import { InvalidCredentialError } from "./errors/invalid-credential-error";
import { compare } from "bcryptjs";
import { Checkin, User } from "@prisma/client";
import { CheckInRepositoryInterface } from "@/repositories/checkin-inteface.repository";
import { GymRepositoryInterface } from "@/repositories/gym-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";
import { Decimal } from "@prisma/client/runtime/library";
import { MaxDistanceError } from "./errors/max-distance-error";
import { InvalidDateError } from "./errors/date-invalid-error";
import { MaxNumberOfCheckInsError } from "./errors/max-number-of-check-ins-error";
import dayjs from "dayjs";
import { LateCheckinValidationError } from "./errors/late-checkin-validation-error";

interface ValidateCheckInUseCaseRequest {
  checkInId: string;
}

interface ValidateCheckInUseCaseResponse {
  checkin: Checkin;
}

export class ValidateCheckInUseCase {
  constructor(private checkinRepositoryInteface: CheckInRepositoryInterface) {}

  async execute({
    checkInId,
  }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const checkin = await this.checkinRepositoryInteface.findById(checkInId);

    if (!checkin) {
      throw new ResourceNotFoundError();
    }

    const distancInMinutesFromCheckinCreation = dayjs(new Date()).diff(
      checkin.created_at,
      "minutes"
    );

    if (distancInMinutesFromCheckinCreation > 20) {
      throw new LateCheckinValidationError();
    }
    checkin.validated_at = new Date();

    await this.checkinRepositoryInteface.save(checkin);

    return { checkin };
  }
}
