import { GymRepositoryInterface } from "@/repositories/gym-repository";
import { InvalidGymError } from "./errors/gym-invalid-error";
import { Gym } from "@prisma/client";

interface GymUseCaseRequest {
  latitude: number;
  longitude: number;
  name: string;
  phone: string;
  description: string | null;
}

interface GymUseCaseResponse {
  gym: Gym;
}

export class GymUseCase {
  constructor(private gymRepository: GymRepositoryInterface) {}

  async execute({
    description,
    latitude,
    longitude,
    name,
    phone,
  }: GymUseCaseRequest) {
    const data = await this.gymRepository.create({
      id: "gym-01",
      latitude,
      longitude,
      name,
      phone,
      description,
    });

    return { data };
  }
}
