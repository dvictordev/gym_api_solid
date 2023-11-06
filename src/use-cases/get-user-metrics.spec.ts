import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { hash } from "bcryptjs";
import { GetUserMetricsUseCase } from "./get-user-metrics";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";

let inMemoryCheckInsRepository: InMemoryCheckInsRepository;
let getUserMetricsUseCase: GetUserMetricsUseCase;

describe("Get User Metrics Use Case", () => {
  beforeEach(() => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository();
    getUserMetricsUseCase = new GetUserMetricsUseCase(
      inMemoryCheckInsRepository
    );
  });

  it("should be able to get user check-in count metrics", async () => {
    await inMemoryCheckInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });

    await inMemoryCheckInsRepository.create({
      gym_id: "gym-02",
      user_id: "user-01",
    });

    const { checkInsCount } = await getUserMetricsUseCase.execute({
      userId: "user-01",
    });

    expect(checkInsCount).toEqual(2);
  });
});
