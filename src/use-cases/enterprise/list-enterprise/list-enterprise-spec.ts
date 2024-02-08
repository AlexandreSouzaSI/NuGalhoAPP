import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InMemoryEnterpriseRepository } from '@/repositories/in-memory/in-memory-enterprise-repository'
import { ListEnterpriseUseCase } from './list-enterprise'

let enterpriseRepository: InMemoryEnterpriseRepository
let sut: ListEnterpriseUseCase

describe('List Enterprise Profile Use Case', () => {

  beforeEach(() => {
    enterpriseRepository = new InMemoryEnterpriseRepository()
    sut = new ListEnterpriseUseCase(enterpriseRepository)
  })

  it('should be able to get list enterprise', async () => {
    await enterpriseRepository.create({
        name: 'Alexandre M 1',
    })

    await enterpriseRepository.create({
      name: 'Alexandre M 2',
  })

    const { enterprise } = await sut.execute()

    expect(enterprise).toHaveLength(2)
    expect(enterprise).toEqual([
      expect.objectContaining({name: 'Alexandre M 1'}),
      expect.objectContaining({name: 'Alexandre M 2'}),
    ])
  })
})