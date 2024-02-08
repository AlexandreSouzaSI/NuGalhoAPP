import { EnterpriseRepository } from '@/repositories/enterprise-repository';
import { Enterprise } from '@prisma/client';


interface ListEnterpriseUseCaseResponse {
    enterprise: Enterprise[]
}

export class ListEnterpriseUseCase {
    constructor (
        private enterpriseRepository: EnterpriseRepository
    ) {}

    async execute(): Promise<ListEnterpriseUseCaseResponse> {

        const enterprise = await this.enterpriseRepository.findAllEnterprise()
        
        return {
            enterprise
        }
    }
}