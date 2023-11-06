import { beforeEach, describe, expect, it, vi, afterEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { ValidateCheckInUseCase } from "./validate-checkin";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { LateCheckinValidationError } from "./errors/late-checkin-validation-error";

let inMemoryCheckInsRepository: InMemoryCheckInsRepository;
let validateCheckInUseCase: ValidateCheckInUseCase;

describe("Validate Check-in Use Case", () => {
  beforeEach(() => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository();
    validateCheckInUseCase = new ValidateCheckInUseCase(
      inMemoryCheckInsRepository
    );

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to validate checkin", async () => {
    const createdCheckin = await inMemoryCheckInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });

    const { checkin } = await validateCheckInUseCase.execute({
      checkInId: createdCheckin.id,
    });

    expect(checkin.validated_at).toEqual(expect.any(Date));
    expect(inMemoryCheckInsRepository.items[0].validated_at).toEqual(
      expect.any(Date)
    );
  });

  it("should not be able to validate an inexistent checkin", async () => {
    await expect(() =>
      validateCheckInUseCase.execute({
        checkInId: "123",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("should not be able to validate checkin after twenty minutes of its creation", async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40));

    const createdCheckin = await inMemoryCheckInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });

    const twentyOneMinutsByMiliSeconds = 1000 * 60 * 21;
    vi.advanceTimersByTime(twentyOneMinutsByMiliSeconds);

    await expect(() =>
      validateCheckInUseCase.execute({
        checkInId: createdCheckin.id,
      })
    ).rejects.toBeInstanceOf(LateCheckinValidationError);
  });
});
