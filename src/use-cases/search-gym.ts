import { GymRepositoryInterface } from "@/repositories/gym-repository";
import { InvalidGymError } from "./errors/gym-invalid-error";
import { Gym } from "@prisma/client";

interface SearchGymUseCaseRequest {
  name: string;
  page: number;
}

interface SearchGymUseCaseResponse {
  gyms: Gym[];
}

export class SearchGymUseCase {
  constructor(private gymRepository: GymRepositoryInterface) {}

  async execute({
    name,
    page,
  }: SearchGymUseCaseRequest): Promise<SearchGymUseCaseResponse> {
    const gyms = await this.gymRepository.searchMany(name, page);

    return {
      gyms,
    };
  }
}
