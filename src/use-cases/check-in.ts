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

interface CheckInUseCaseRequest {
  userId: string;
  gymId: string;
  latitude: number;
  longitude: number;
}

interface CheckInUseCaseResponse {
  checkin: Checkin;
}

export class CheckInUseCase {
  constructor(
    private checkinRepositoryInteface: CheckInRepositoryInterface,
    private gymRepository: GymRepositoryInterface
  ) {}

  async execute({
    userId,
    gymId,
    latitude,
    longitude,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const gym = await this.gymRepository.findById(gymId);
    const MAX_DISTANCE_IN_KILOMETERS = 0.1;

    if (!gym) {
      throw new ResourceNotFoundError();
    }

    const userCoordinates = {};

    const distance = getDistanceBetweenCoordinates(
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      },
      {
        latitude,
        longitude,
      }
    );

    // calculate the distance here
    if (distance > MAX_DISTANCE_IN_KILOMETERS) {
      throw new MaxDistanceError();
    }

    const checkInOnSameDate =
      await this.checkinRepositoryInteface.findByUserIdOnDate(
        userId,
        new Date()
      );

    if (checkInOnSameDate) {
      throw new MaxNumberOfCheckInsError();
    }

    const checkin = await this.checkinRepositoryInteface.create({
      gym_id: gymId,
      user_id: userId,
      created_at: new Date(),
    });

    if (!checkin) {
      throw new InvalidCredentialError();
    }

    return {
      checkin,
    };
  }
}
