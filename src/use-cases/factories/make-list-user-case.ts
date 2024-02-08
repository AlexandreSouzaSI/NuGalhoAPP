import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { ListUserUseCase } from "../user/list-user/list-user"

export function makeListUsersUseCase() {
    const listUsersRepository = new PrismaUsersRepository()
    const listUsersUseCase = new ListUserUseCase(listUsersRepository)

    console.log("aquiiii :", listUsersUseCase)

    return listUsersUseCase
}