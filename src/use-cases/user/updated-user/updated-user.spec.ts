import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UpdatedUserUseCase } from './updated-user'
import { hash } from 'bcryptjs'

let updatedUserRepository: InMemoryUsersRepository
let sut: UpdatedUserUseCase
let cpf: string

describe('Updated user Use Case', () => {
  beforeEach(() => {
    updatedUserRepository = new InMemoryUsersRepository()
    sut = new UpdatedUserUseCase(updatedUserRepository)

    cpf = '12345645625'
  })
  it('should be able to updated user', async () => {

    await updatedUserRepository.create({
      id: '123456',
      name: 'Alexandre M 2',
      email: 'alexandre1@example.com',
      password_hash: await hash('123456', 2),
      permission: 'gerente',
      enterprise_id: '12345'
    })
    
    const { user } = await sut.execute({
      id: '123456',
      name: 'Alexandre updated',
      email: 'ale@updated',
      password: '1234',
      permission: 'gerente',
      admissao: new Date(),
      demissao: new Date(),
      cargo: 'gerente',
      salario: 25000,
      cpf: '2816734214',
      nascimento: new Date(),
      pix: '19236236',
      contratado: 'não',
      enterprise_id: '19919191',
    })

    expect(user.id).toEqual(expect.any(String))
  })
})
