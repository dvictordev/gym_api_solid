import { beforeEach, describe, expect, it, vi, afterEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckInUseCase } from "./check-in";
import { GymUseCase } from "./gym";
import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gym-repository";
import { MaxDistanceError } from "./errors/max-distance-error";
import { MaxNumberOfCheckInsError } from "./errors/max-number-of-check-ins-error";
import { FetchUserCheckInsHistoryUse } from "./fetch-user-check-ins-history";

let inMemoryCheckInsRepository: InMemoryCheckInsRepository;
let fetchUserCheckInsHistoryUse: FetchUserCheckInsHistoryUse;

describe("Fetch Checkins Use Case", () => {
  beforeEach(() => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository();
    fetchUserCheckInsHistoryUse = new FetchUserCheckInsHistoryUse(
      inMemoryCheckInsRepository
    );
    vi.useFakeTimers();
  });

  it("should be able to fetch check-in histoy", async () => {
    await inMemoryCheckInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
      created_at: new Date(),
    });

    await inMemoryCheckInsRepository.create({
      gym_id: "gym-02",
      user_id: "user-01",
      created_at: new Date(),
    });

    const { checkIns } = await fetchUserCheckInsHistoryUse.execute({
      userId: "user-01",
      page: 1,
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: "gym-01" }),
      expect.objectContaining({ gym_id: "gym-02" }),
    ]);
  });

  it("should be able to fetch paginated check-in histoy", async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryCheckInsRepository.create({
        gym_id: `gym-${i}`,
        user_id: "user-01",
      });
    }

    const { checkIns } = await fetchUserCheckInsHistoryUse.execute({
      userId: "user-01",
      page: 2,
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: "gym-21" }),
      expect.objectContaining({ gym_id: "gym-22" }),
    ]);
  });
});
