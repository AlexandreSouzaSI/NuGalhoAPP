import { UsersRepository } from "@/repositories/users-repository"
import { hash } from "bcryptjs"
import { UserEmailOrCpfAlreadyExistsError } from "../../errors/user-emailOrCpf-already-exists-error"
import { User } from "@prisma/client"

interface RegisterUseCaseRequest {
    name: string
    email: string
    password: string
    permission: string
    admissao?: Date
    cargo?: string
    salario?: number
    cpf: string
    nascimento?: Date
    pix?: string
    contratado?: string,
    enterprise_id?: string
}

interface RegisterUseCaseResponse {
    user: User
}


export class RegisterUseCase {
    constructor(private usersRepository: UsersRepository) {

    }
    async execute({
        name,
        email,
        password,
        permission,
        admissao,
        cargo,
        salario,
        cpf,
        nascimento,
        pix,
        contratado,
        enterprise_id
    }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    
        const password_hash = await hash(password, 2)
    
        const userWithSameEmail = await this.usersRepository.findByEmail(email)

        const userWithSameCpf = await this.usersRepository.findByCpf(cpf)

        if (userWithSameCpf || userWithSameEmail) {
            throw new UserEmailOrCpfAlreadyExistsError()
        } 

        
        const user = await this.usersRepository.create({
            name,
            email,
            password_hash,
            permission,
            admissao,
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

