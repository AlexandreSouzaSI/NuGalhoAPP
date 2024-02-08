import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryEnterpriseRepository } from '@/repositories/in-memory/in-memory-enterprise-repository'
import { EnterpriseUseCase } from './enterprise'
import { EnterpriseAlreadyExistsError } from '../../errors/enterprise-already-exists-error'

let enterpriseRepository: InMemoryEnterpriseRepository
let sut: EnterpriseUseCase

describe('Enterprise Use Case', () => {
  beforeEach(() => {
    enterpriseRepository = new InMemoryEnterpriseRepository()
    sut = new EnterpriseUseCase(enterpriseRepository)
  })
  it('should be able to enterprise', async () => {
    

    const { enterprise } = await sut.execute({
      name: 'Alexandre Empresa',
    })

    expect(enterprise.id).toEqual(expect.any(String))
  })

  it('should not be able to register with same name twice', async () => {

    await sut.execute({
      name: 'Alexandre M',
    })

    await expect(() => 
      sut.execute({
        name: 'Alexandre M',
      })
    ).rejects.toBeInstanceOf(EnterpriseAlreadyExistsError)
  })
})
