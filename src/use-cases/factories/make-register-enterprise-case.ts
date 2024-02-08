import { PrismaEnterpriseRepository } from "@/repositories/prisma/prisma-enterprise-repository"
import { EnterpriseUseCase } from "../enterprise/create-enterprise/enterprise"

export function makeEnterpriseUseCase() {
    const enterpriseRepository = new PrismaEnterpriseRepository()
    const enterpriseUseCase = new EnterpriseUseCase(enterpriseRepository)

    return enterpriseUseCase
}