import { UsersRepository } from '@/repositories/users-repository';
import { User } from '@prisma/client';
import { ResourceNotFoundError } from '../../errors/resource-not-fount-error';

interface DeleteUserUseCaseRequest {
    id: string
}

export class DeleteUserUseCase {
    constructor (
        private usersRepository: UsersRepository
    ) {}

    async execute({ id }: DeleteUserUseCaseRequest) {

        const user = await this.usersRepository.delete(id)

        return {
            user
        }
    }
}