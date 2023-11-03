import { Checkin } from "@prisma/client";
import { CheckInRepositoryInterface } from "@/repositories/checkin-inteface.repository";

interface FetchUserCheckInsHistoryUseCaseRequest {
  userId: string;
  page: number;
}

interface FetchUserCheckInsHistoryUseCaseResponse {
  checkIns: Checkin[];
}

export class FetchUserCheckInsHistoryUse {
  constructor(private checkinRepositoryInteface: CheckInRepositoryInterface) {}

  async execute({
    userId,
    page,
  }: FetchUserCheckInsHistoryUseCaseRequest): Promise<FetchUserCheckInsHistoryUseCaseResponse> {
    const checkIns =
      await this.checkinRepositoryInteface.findManyCheckinsByUser(userId, page);

    return {
      checkIns,
    };
  }
}
