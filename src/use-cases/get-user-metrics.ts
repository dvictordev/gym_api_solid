import { UsersRepositoryInterface } from "@/repositories/users-interface.repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { CheckInRepositoryInterface } from "@/repositories/checkin-inteface.repository";

interface GetUserMetricsUseCaseRequest {
  userId: string;
}

interface GetUserMetricsUseCaseResponse {
  checkInsCount: number;
}

export class GetUserMetricsUseCase {
  constructor(private checkinsRespository: CheckInRepositoryInterface) {}

  async execute({
    userId,
  }: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {
    const checkInsCount =
      await this.checkinsRespository.counterByUserId(userId);

    return {
      checkInsCount,
    };
  }
}
