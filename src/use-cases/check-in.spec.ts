import { beforeEach, describe, expect, it, vi, afterEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckInUseCase } from "./check-in";
import { GymUseCase } from "./gym";
import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gym-repository";
import { InvalidDateError } from "./errors/date-invalid-error";
import { MaxDistanceError } from "./errors/max-distance-error";

let inMemoryCheckInsRepository: InMemoryCheckInsRepository;
let checkInUseCase: CheckInUseCase;
let gymUseCase: GymUseCase;
let gymRepository: InMemoryGymRepository;

describe("Check-in Use Case", () => {
  beforeEach(() => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository();
    gymRepository = new InMemoryGymRepository();
    checkInUseCase = new CheckInUseCase(
      inMemoryCheckInsRepository,
      gymRepository
    );

    gymRepository.create({
      description: "description TESTE",
      latitude: -29.9881335,
      longitude: -52.3719842,
      name: "GYM SOLID",
      phone: "51111111",
    });
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });
  /* --------- fake times ----------- 
  -29.9881335,-52.3719842
  -30.192668,-52.3717986

  
  olá {{nome_usuario}}, me chamo {{nome_atendente}} e sou do setor comercial da empresa {{nome_empresa}}. verifiquei que já temos atendimento com fibra óptica no seu endereço, gostaria de fazer a migração?
  
  */

  it("should create a checkin", async () => {
    const { checkin } = await checkInUseCase.execute({
      gymId: "gym-01",
      userId: "user-01",
      latitude: -29.9881335,
      longitude: -52.3719842,
    });

    expect(checkin.id).toEqual(expect.any(String));
  });

  it("should not be able to checkin twice on the same day", async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0));

    await checkInUseCase.execute({
      gymId: "gym-01",
      userId: "user-01",
      latitude: -29.9881335,
      longitude: -52.3719842,
    });

    await expect(() =>
      checkInUseCase.execute({
        gymId: "gym-01",
        userId: "user-01",
        latitude: -29.9881335,
        longitude: -52.3719842,
      })
    ).rejects.toBeInstanceOf(InvalidDateError);
  });

  it("should  be able to checkin twice but in different days", async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0));

    await checkInUseCase.execute({
      gymId: "gym-01",
      userId: "user-01",
      latitude: -29.9881335,
      longitude: -52.3719842,
    });

    vi.setSystemTime(new Date(2023, 0, 21, 8, 0, 0));

    const { checkin } = await checkInUseCase.execute({
      gymId: "gym-01",
      userId: "user-01",
      latitude: -29.9881335,
      longitude: -52.3719842,
    });

    expect(checkin.id).toEqual(expect.any(String));
  });

  it("should not be able to checkin on distant gym", async () => {
    gymRepository.create({
      description: "Gym SOLID",
      latitude: -30.192668,
      longitude: -52.3717986,
      name: "teste",
      phone: "51111111",
    });

    await expect(() =>
      checkInUseCase.execute({
        gymId: "gym-01",
        userId: "user-01",
        latitude: -29.7062307,
        longitude: -52.4240488,
      })
    ).rejects.toBeInstanceOf(MaxDistanceError);
  });
});
