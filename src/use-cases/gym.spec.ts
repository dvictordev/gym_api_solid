import { beforeEach, describe, expect, it, vi, afterEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckInUseCase } from "./check-in";
import { GymUseCase } from "./gym";
import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gym-repository";
import { Decimal } from "@prisma/client/runtime/library";

let gymUseCase: GymUseCase;
let gymRepository: InMemoryGymRepository;

describe("Check-in Use Case", () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymRepository();
    gymUseCase = new GymUseCase(gymRepository);

    gymRepository.create({
      latitude: -29.9881335,
      longitude: -52.3719842,
      name: "teste",
      phone: "51111111",
    });
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });
  /* --------- fake times ----------- 
      latitude: -29.9881335,
      longitude: -52.3719842,
 
  */

  it("should create a gym", async () => {
    const { data } = await gymUseCase.execute({
      name: "GYM SOLID",
      description: "GYM",
      phone: "5111111111",
      latitude: -29.9881335,
      longitude: 52.3719842,
    });

    expect(data.id).toEqual(expect.any(String));
  });
});
