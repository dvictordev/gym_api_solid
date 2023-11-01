import {expect, it, describe} from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { beforeEach } from 'vitest'


let usersRepository : InMemoryUserRepository
let registerUseCase: RegisterUseCase

describe("Register use case", () => {
    beforeEach(()=> {
        usersRepository = new InMemoryUserRepository()
        registerUseCase = new RegisterUseCase(usersRepository)
    })

    it('should register a user', async ()=>{


        const {user} = await registerUseCase.execute({
            name:"victor",
            email:"example@email.com",
            password:"123456"
        })


        expect(user.id).toEqual(expect.any(String))
    })

    it('should hash user password before registration', async ()=>{


        const {user} = await registerUseCase.execute({
            name:"victor",
            email:"example@email.com",
            password:"123456"
        })

        const isPasswordHashed = await compare(
            '123456',
            user.password_hash
        )

        expect(isPasswordHashed).toBe(true)
    })

     it('should not register user with same email twice', async ()=>{

        const email = "example@email.com"
      
        await registerUseCase.execute({
            name:"victor",
            email:email,
            password:"123456"
        })

        await expect(()=> registerUseCase.execute({
            name:"victor",
            email:email,
            password:"123456"
        })).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })

})