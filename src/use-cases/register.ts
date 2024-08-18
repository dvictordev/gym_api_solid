import { UsersRepositoryInterface } from "@/repositories/users-interface.repository";
import { Prisma, User } from "@prisma/client";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

interface RegisterUserCaseProps {
  name: string;
  email: string;
  password: string;
}

interface RegisterUseCaseResponse {
  user: User;
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepositoryInterface) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUserCaseProps): Promise<RegisterUseCaseResponse> {
    const existUserWithEmail = await this.usersRepository.findByEmail(email);

    if (existUserWithEmail) {
      throw new UserAlreadyExistsError();
    }

    const password_hash: string = (await hash(password, 6)).toString();

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    });

    return { user };
  }
}
