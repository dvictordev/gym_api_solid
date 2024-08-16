import { beforeEach, describe, expect, it } from "vitest";
import { GetUserProfileUseCase } from "./get-user-profile";
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { hash } from "bcryptjs";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let inMemoryUserRepository: InMemoryUserRepository;
let getUserProfileUseCase: GetUserProfileUseCase;

describe("Get User Profile Use Case", () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    getUserProfileUseCase = new GetUserProfileUseCase(inMemoryUserRepository);
  });

  it("should find a user profile", async () => {
    const inMemoryCreatedUser = await inMemoryUserRepository.create({
      email: "example1@email.com",
      name: "victor",
      password_hash: await hash("123456", 6),
    });

    const { user } = await getUserProfileUseCase.execute({
      userId: inMemoryCreatedUser.id,
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not find a user profile", async () => {
    await expect(() =>
      getUserProfileUseCase.execute({
        userId: "non-existing-id",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
