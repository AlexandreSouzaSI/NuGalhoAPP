import { Enterprise, Prisma } from "@prisma/client";

export interface EnterpriseRepository {
    findById(id: string): Promise<Enterprise | null>
    findByName(name: string): Promise<Enterprise | null>
    findAllEnterprise(): Promise<Enterprise[]>
    delete(id: string): Promise<Enterprise>
    create(data: Prisma.EnterpriseCreateInput): Promise<Enterprise>
}