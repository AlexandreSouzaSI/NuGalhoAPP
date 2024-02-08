import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "../users-repository";
import { randomUUID } from "node:crypto";
import { UserNotExistsError } from "@/use-cases/errors/user-not-exists-exists-error";


export class InMemoryUsersRepository implements UsersRepository {
    public items: User[] = []

    async update(id: string, data: User) {
        let user = this.items.find(item => item.id === id);

        if(!user) {
            throw new UserNotExistsError()
        }

        user = {... data}
        
        return user
    }

    async findById(id: string) {
        const user = this.items.find(item => item.id === id)

        if (!user) {
            return null
        }

        return user
    }

    async delete(id: string) {
        const user = this.items.find(item => item.id === id)

        if(!user) {
            throw new UserNotExistsError()
        }

        user.active = false

        return user
    }

    async findByEmail(email: string) {
        const user = this.items.find(item => item.email === email)

        if (!user) {
            return null
        }

        return user
    }

    async findManyByEnterpriseId(enterprise_id: string) {
        const user = this.items.filter(item => item.enterprise_id === enterprise_id)

        return user
    }

    async findByCpf(cpf: string) {
        const user = this.items.find(item => item.cpf === cpf)

        if (!user) {
            return null
        }

        return user
    }

    async create(data: Prisma.UserCreateInput) {
        const user = {
            id: randomUUID(),
            name: data.name,
            email: data.email,
            password_hash: data.password_hash,
            created_at: new Date() || String,
            permission: data.permission || null,
            active: data.active || true,
            admissao: data.admissao || String || null,
            demissao: data.demissao || String || null,
            cargo: data.cargo || null,
            salario: data.salario || null,
            cpf: data.cpf || null,
            nascimento: data.nascimento || String || null,
            pix: data.pix || null,
            contratado: data.contratado || null,
            enterprise_id: data.enterprise_id || null,
        }

        this.items.push(user)

        return user
    }

}