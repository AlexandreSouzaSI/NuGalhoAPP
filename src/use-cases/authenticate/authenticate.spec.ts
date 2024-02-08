import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from '../errors/invalid-credentials-erros'
import { AuthenticateUseCase } from './authenticate'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticat', async () => {
    await usersRepository.create({
        name: 'Alexandre M',
        email: 'alexandre@example.com',
        password_hash: await hash('123456', 2),
        permission: 'gerente'
    })

    const { user } = await sut.execute({
      email: 'alexandre@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should be able to authenticat with wrong email', async () => {
    expect(() => sut.execute({
      email: 'alexandre@example.com',
      password: '123456',
    })).rejects.toBeInstanceOf(InvalidCredentialsError)

  })

  it('should be able to authenticat with wrong password', async () => {
    await usersRepository.create({
        name: 'Alexandre M',
        email: 'alexandre@example.com',
        password_hash: await hash('123456', 2),
        permission: 'gerente'
    })

    await expect(() => sut.execute({
      email: 'alexandre@example.com',
      password: '123123',
    })).rejects.toBeInstanceOf(InvalidCredentialsError)

  })

})