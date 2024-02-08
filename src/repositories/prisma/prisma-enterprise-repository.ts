import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { EnterpriseRepository } from "../enterprise-repository";
import { EnterpriseNotExistsError } from "@/use-cases/errors/enterprise-not-exists-error copy";

export class PrismaEnterpriseRepository implements EnterpriseRepository {

    async findAllEnterprise() {
        return await prisma.enterprise.findMany()
    }
    
    async findById(id: string) {
        const enterprise = await prisma.enterprise.findUnique({
            where: {
                id
            }
        })

        return enterprise
    }

    async delete(id: string) {
        const enterprise = await prisma.enterprise.findUnique({
            where: {
                id
            }
        })

        if (!enterprise) {
            throw new (EnterpriseNotExistsError)
        }

        enterprise.active = false

        return enterprise
    }

    async findByName(name: string) {
        const enterprise = await prisma.enterprise.findFirst({
            where: {
                name
            }
        })

        return enterprise
    }

    async create(data: Prisma.EnterpriseCreateInput) {
        const enterprise = await prisma.enterprise.create({
            data,
        })

        return enterprise
    }
}