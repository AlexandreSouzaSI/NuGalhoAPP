import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryEnterpriseRepository } from '@/repositories/in-memory/in-memory-enterprise-repository'
import { DeleteEnterpriseUseCase } from './delete-enterprise'

let enterpriseRepository: InMemoryEnterpriseRepository
let sut: DeleteEnterpriseUseCase

describe('Delete enterprise Use Case', () => {

  beforeEach(() => {
    enterpriseRepository = new InMemoryEnterpriseRepository()
    sut = new DeleteEnterpriseUseCase(enterpriseRepository)
  })

  it('should be able to delete enterprise', async () => {
    const enterpriseCreate = await enterpriseRepository.create({
      name: 'Alexandre M teste',
    })
    
    const enterprise = await sut.execute({
      id: enterpriseCreate.id,
    })

    expect(enterprise.enterprise.active).toEqual(false)
  })
})