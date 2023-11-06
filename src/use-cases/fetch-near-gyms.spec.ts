import { beforeEach, describe, expect, it, vi, afterEach } from "vitest";
import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gym-repository";
import { SearchGymUseCase } from "./search-gym";
import { FetchNearGymsUseCase } from "./fetch-near-gyms";

let fetchNearGymsUseCase: FetchNearGymsUseCase;
let gymRepository: InMemoryGymRepository;

describe("Fetch Near Gyms Use Case", () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymRepository();
    fetchNearGymsUseCase = new FetchNearGymsUseCase(gymRepository);
  });

  it("should find a gym by name", async () => {
    await gymRepository.create({
      latitude: -29.9881335,
      longitude: -52.3719842,
      name: `Near Gym`,
      phone: "51111111",
    });

    await gymRepository.create({
      latitude: -30.5450388,
      longitude: -52.5146816,
      name: `Far Gym`,
      phone: "51111111",
    });

    const { gyms } = await fetchNearGymsUseCase.execute({
      userLatitude: -29.9881335,
      userLongitude: -52.3719842,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ name: "Near Gym" })]);
  });

  //   it.skip("shoule be able to search paginated gyms", async () => {
  //     for (let i = 1; i <= 22; i++) {
  //       await gymRepository.create({
  //         latitude: -29.9881335,
  //         longitude: -523719842,
  //         name: `Typescript ${i}`,
  //         phone: "51111111",
  //       });
  //     }

  //     const { gyms } = await fetchNearGymsUseCase.execute({
  //       name: "Typescript",
  //       page: 2,
  //     });

  //     expect(gyms).toHaveLength(2);
  //     expect(gyms).toEqual([
  //       expect.objectContaining({ name: `Typescript 21` }),
  //       expect.objectContaining({ name: `Typescript 22` }),
  //     ]);
  //   });
});
