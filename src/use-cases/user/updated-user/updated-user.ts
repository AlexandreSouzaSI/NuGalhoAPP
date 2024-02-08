import { UsersRepository } from "@/repositories/users-repository"
import { hash } from "bcryptjs"
import { UserEmailOrCpfAlreadyExistsError } from "../../errors/user-emailOrCpf-already-exists-error"
import { User } from "@prisma/client"

interface UpdatedUserUseCaseRequest {
    id: string
    name: string
    email: string
    password: string
    permission: string
    admissao?: Date
    demissao?: Date
    cargo?: string
    salario?: number
    cpf: string
    nascimento?: Date
    pix?: string
    contratado?: string,
    enterprise_id?: string
}

interface UpdatedUserUseCaseResponse {
    user: User
}


export class UpdatedUserUseCase {
    constructor(private usersRepository: UsersRepository) {

    }
    async execute({
        id,
        name,
        email,
        password,
        permission,
        admissao,
        demissao,
        cargo,
        salario,
        cpf,
        nascimento,
        pix,
        contratado,
        enterprise_id
    }: UpdatedUserUseCaseRequest): Promise<UpdatedUserUseCaseResponse> {
    
        // const password_hash = await hash(password, 2)
    
        const userWithSameEmail = await this.usersRepository.findByEmail(email)

        const userWithSameCpf = await this.usersRepository.findByCpf(cpf)

        if (userWithSameCpf || userWithSameEmail) {
            throw new UserEmailOrCpfAlreadyExistsError()
        } 

        
        const user = await this.usersRepository.update(id ,{
            name,
            email,
            permission,
            admissao,
            demissao,
            cargo,
            salario,
            cpf,
            nascimento,
            pix,
            contratado,
            enterprise_id
        })

        return {
            user,
        }
    }
}

