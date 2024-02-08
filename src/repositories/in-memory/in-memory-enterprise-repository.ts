import { Enterprise, Prisma, User } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { EnterpriseRepository } from "../enterprise-repository";
import { EnterpriseNotExistsError } from "@/use-cases/errors/enterprise-not-exists-error copy";


export class InMemoryEnterpriseRepository implements EnterpriseRepository {
    public items: Enterprise[] = []

    async findAllEnterprise() {
        return await this.items
    }

    async findById(id: string) {
        const enterprise = this.items.find(item => item.id === id)

        if (!enterprise) {
            return null
        }

        return enterprise
    }

    async delete(id: string) {
        const enterprise = this.items.find(item => item.id === id)

        if(!enterprise) {
            throw new EnterpriseNotExistsError()
        }

        enterprise.active = false

        return enterprise
    }

    async findByName(name: string) {
        const enterprise = this.items.find(item => item.name === name)

        if (!enterprise) {
            return null
        }

        return enterprise
    }

    async create(data: Prisma.EnterpriseCreateInput) {
        const enterprise = {
            id: randomUUID(),
            name: data.name,
            created_at: new Date(),
            active: data.active || true,
        }

        this.items.push(enterprise)

        return enterprise
    }

}