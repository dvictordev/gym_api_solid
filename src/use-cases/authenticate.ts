import { UsersRepositoryInterface } from "@/repositories/users-interface.repository";
import { InvalidCredentialError } from "./errors/invalid-credential-error";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";

interface AuthUseCaseRequest{
    email:string,
    password:string
}

interface AuthUseCaseResponse{
    user:User
}


export class AuthenticateUseCase{
    constructor(private usersRepository: UsersRepositoryInterface) {}

    async execute({email, password}: AuthUseCaseRequest):Promise<AuthUseCaseResponse>{
        // auth
        const user = await this.usersRepository.findByEmail(email)

        if(!user){
            throw new InvalidCredentialError()
        }

        const doesPasswordMatches = await compare(password, user.password_hash)

        if(!doesPasswordMatches){
            throw new InvalidCredentialError()
        }

        return {
            user
        }
    }
}