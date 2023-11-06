import { GymRepositoryInterface } from "@/repositories/gym-repository";
import { InvalidGymError } from "./errors/gym-invalid-error";
import { Gym } from "@prisma/client";

interface FetchNearGymsUseCaseRequest {
  userLatitude: number;
  userLongitude: number;
}

interface FetchNearGymsUseCaseResponse {
  gyms: Gym[];
}

export class FetchNearGymsUseCase {
  constructor(private gymRepository: GymRepositoryInterface) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearGymsUseCaseRequest): Promise<FetchNearGymsUseCaseResponse> {
    const gyms = await this.gymRepository.findManyNearGyms({
      latitude: userLatitude,
      longitude: userLongitude,
    });

    return {
      gyms,
    };
  }
}
