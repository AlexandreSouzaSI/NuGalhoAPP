import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { ResourceNotFoundError } from '../../errors/resource-not-fount-error'
import { ListUserUseCase } from './list-user'

let usersRepository: InMemoryUsersRepository
let sut: ListUserUseCase

describe('List User Profile Use Case', () => {

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new ListUserUseCase(usersRepository)
  })

  it('should be able to get list users', async () => {
    await usersRepository.create({
        name: 'Alexandre M 1',
        email: 'alexandre@example.com',
        password_hash: await hash('123456', 2),
        permission: 'gerente',
        enterprise_id: '12345'
    })

    await usersRepository.create({
      name: 'Alexandre M 2',
      email: 'alexandre1@example.com',
      password_hash: await hash('123456', 2),
      permission: 'gerente',
      enterprise_id: '12345'
  })

    const { user } = await sut.execute({
      enterprise_id: '12345'
    })

    expect(user).toHaveLength(2)
    expect(user).toEqual([
      expect.objectContaining({name: 'Alexandre M 1'}),
      expect.objectContaining({name: 'Alexandre M 2'}),
    ])
  })
})