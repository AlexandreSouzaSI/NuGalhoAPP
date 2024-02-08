import { Enterprise } from "@prisma/client"
import { EnterpriseRepository } from "@/repositories/enterprise-repository"
import { EnterpriseAlreadyExistsError } from "../../errors/enterprise-already-exists-error"

interface EnterpriseUseCaseRequest {
    name: string
}

interface EnterpriseUseCaseResponse {
    enterprise: Enterprise
}


export class EnterpriseUseCase {
    constructor(private enterpriseRepository: EnterpriseRepository) {

    }
    async execute({
        name,
    }: EnterpriseUseCaseRequest): Promise<EnterpriseUseCaseResponse> {

        const enterpriseNameExist = await this.enterpriseRepository.findByName(name)

        if(enterpriseNameExist) {
            throw new EnterpriseAlreadyExistsError()
        }
    
        const enterprise = await this.enterpriseRepository.create({
            name,
        })

        return {
            enterprise,
        }
    }
}

