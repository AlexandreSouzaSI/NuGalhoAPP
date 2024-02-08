import { EnterpriseRepository } from '@/repositories/enterprise-repository';

interface DeleteEnterpriseUseCaseRequest {
    id: string
}

export class DeleteEnterpriseUseCase {
    constructor (
        private enterpriseRepository: EnterpriseRepository
    ) {}

    async execute({ id }: DeleteEnterpriseUseCaseRequest) {

        const enterprise = await this.enterpriseRepository.delete(id)

        return {
            enterprise
        }
    }
}