import { beforeEach, describe, expect, it, vi, afterEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckInUseCase } from "./check-in";
import { GymUseCase } from "./gym";
import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gym-repository";
import { Decimal } from "@prisma/client/runtime/library";
import { SearchGymUseCase } from "./search-gym";
import { object } from "zod";

let searchGymUseCase: SearchGymUseCase;
let gymRepository: InMemoryGymRepository;

describe("Search Gym Use Case", () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymRepository();
    searchGymUseCase = new SearchGymUseCase(gymRepository);
  });

  it("should find a gym by name", async () => {
    await gymRepository.create({
      latitude: -29.9881335,
      longitude: -523719842,
      name: `Typescript`,
      phone: "51111111",
    });

    await gymRepository.create({
      latitude: -29.9881335,
      longitude: -523719842,
      name: `Javascript`,
      phone: "51111111",
    });

    const { gyms } = await searchGymUseCase.execute({
      name: "Typescript",
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ name: "Typescript" })]);
  });

  it("shoule be able to search paginated gyms", async () => {
    for (let i = 1; i <= 22; i++) {
      await gymRepository.create({
        latitude: -29.9881335,
        longitude: -523719842,
        name: `Typescript ${i}`,
        phone: "51111111",
      });
    }

    const { gyms } = await searchGymUseCase.execute({
      name: "Typescript",
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ name: `Typescript 21` }),
      expect.objectContaining({ name: `Typescript 22` }),
    ]);
  });
});
