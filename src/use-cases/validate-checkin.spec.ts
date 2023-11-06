import { beforeEach, describe, expect, it, vi, afterEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { ValidateCheckInUseCase } from "./validate-checkin";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let inMemoryCheckInsRepository: InMemoryCheckInsRepository;
let validateCheckInUseCase: ValidateCheckInUseCase;

describe("Validate Check-in Use Case", () => {
  beforeEach(() => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository();
    validateCheckInUseCase = new ValidateCheckInUseCase(
      inMemoryCheckInsRepository
    );

    // vi.useFakeTimers();
  });

  afterEach(() => {
    // vi.useRealTimers();
  });
  /* --------- fake times ----------- 
  -29.9881335,-52.3719842
  -30.192668,-52.3717986

  
  olá {{nome_usuario}}, me chamo {{nome_atendente}} e sou do setor comercial da empresa {{nome_empresa}}. verifiquei que já temos atendimento com fibra óptica no seu endereço, gostaria de fazer a migração?
  
  */

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
});
