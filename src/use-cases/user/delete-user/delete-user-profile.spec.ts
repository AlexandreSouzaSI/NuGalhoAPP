import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { DeleteUserUseCase } from './delete-user-profile'

let usersRepository: InMemoryUsersRepository
let sut: DeleteUserUseCase

describe('Delete user Use Case', () => {

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new DeleteUserUseCase(usersRepository)
  })

  it('should be able to delete user', async () => {
    const createdUser = await usersRepository.create({
        name: 'Alexandre M',
        email: 'alexandre@example.com',
        password_hash: await hash('123456', 2),
        permission: 'gerente'
    })
    
    const user = await sut.execute({
      id: createdUser.id,
    })

    expect(user.user.active).toEqual(false)
  })
})