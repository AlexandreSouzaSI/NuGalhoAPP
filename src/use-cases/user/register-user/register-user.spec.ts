import { compare } from 'bcryptjs'
import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register-user'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserEmailAlreadyExistsError, UserEmailOrCpfAlreadyExistsError } from '../../errors/user-emailOrCpf-already-exists-error'
import { UserCpfAlreadyExistsError } from '@/use-cases/errors/user-cpf-already-exists-error'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase
let cpf: string

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)

    cpf = '12345645625'
  })
  it('should be able to register', async () => {
    

    const { user } = await sut.execute({
      name: 'Alexandre M',
      email: 'alexandre@example.com',
      password: '123456',
      permission: 'gerente',
      cpf
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'Alexandre M',
      email: 'alexandre@example.com',
      password: '123456',
      permission: 'gerente',
      cpf
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'alexandre1@example.com'

    await sut.execute({
      name: 'Alexandre M',
      email,
      password: '123456',
      permission: 'gerente',
      cpf
    })

    await expect(() => 
      sut.execute({
        name: 'Alexandre M',
        email,
        password: '123456',
        permission: 'gerente',
        cpf
      })
    ).rejects.toBeInstanceOf(UserEmailOrCpfAlreadyExistsError)
  })

  it('should not be able to register with same cpf twice', async () => {
    

    await sut.execute({
      name: 'Alexandre M',
      email: 'ale@teste.com',
      password: '123456',
      permission: 'gerente',
      cpf
    })

    await expect(() => 
      sut.execute({
        name: 'Alexandre M',
        email: 'ale@teste.com',
        password: '123456',
        permission: 'gerente',
        cpf
      })
    ).rejects.toBeInstanceOf(UserEmailOrCpfAlreadyExistsError)
  })
})
