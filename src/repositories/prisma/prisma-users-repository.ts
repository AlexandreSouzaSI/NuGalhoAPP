import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { UsersRepository } from "../users-repository";
import { UserNotExistsError } from "@/use-cases/errors/user-not-exists-exists-error";

export class PrismaUsersRepository implements UsersRepository {
    
    async update(id: string, data: Prisma.UserUpdateInput) {
        const user = await prisma.user.update({
            where: { id }, 
            data,          
        });

        return user
    }

    async delete(id: string) {
        const users = await prisma.user.findUnique({
            where: {
                id
            }
        })

        if (!users) {
            throw new UserNotExistsError()
        }

        users.active = false

        return users
    }

    async findManyByEnterpriseId(enterprise_id: string) {
        const users = await prisma.user.findMany({
            where: {
                enterprise_id
            }
        })
        return users
    }

    async findById(id: string) {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        })
        return user
    }

    async findByEmail(email: string) {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        return user
    }

    async findByCpf(cpf: string) {
        const user = await prisma.user.findUnique({
            where: {
                cpf
            }
        })
        return user
    }

    
    async create(data: Prisma.UserCreateInput) {
        const user = await prisma.user.create({
            data,
        })

        return user
    }
}