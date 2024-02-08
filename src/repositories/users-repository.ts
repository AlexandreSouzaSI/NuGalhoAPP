import { Prisma, User } from "@prisma/client";

export interface UsersRepository {
    findManyByEnterpriseId(enterprise_id: string): Promise<User[]>
    findByCpf(cpf: string): Promise<User | null>
    findById(id: string): Promise<User | null>
    delete(id: string): Promise<User>
    findByEmail(email: string): Promise<User | null>
    create(data: Prisma.UserCreateInput): Promise<User>
    update(id: string, data: Prisma.UserUpdateInput): Promise<User>
}