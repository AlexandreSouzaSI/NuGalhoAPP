import { UsersRepository } from '@/repositories/users-repository';
import { User } from '@prisma/client';

interface ListUserUseCaseRequest {
    enterprise_id: string
}

interface ListUserUseCaseResponse {
    user: User[]
}

export class ListUserUseCase {
    constructor (
        private usersRepository: UsersRepository
    ) {}

    async execute({ 
        enterprise_id 
    }: ListUserUseCaseRequest): Promise<ListUserUseCaseResponse> {

        const user = await this.usersRepository.findManyByEnterpriseId(enterprise_id)

        return {
            user
        }
    }
}