import { prisma } from "@/lib/prisma"
import { hash } from "bcryptjs"

interface RegisterUseCaseRequest {
    name: string
    email: string
    password: string
    permission: string
    admissao?: Date
    cargo?: string
    salario?: number
    cpf?: string
    nascimento?: Date
    pix?: string
    contratado?: string

}

export class RegisterUseCase {
    constructor(private usersRepository: any) {

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
        contratado
    }: RegisterUseCaseRequest) {
    
        const password_hash = await hash(password, 2)
    
        const userWithSameEmail = await prisma.user.findUnique({
            where: {
                email
            }
        })
    
        if (userWithSameEmail) {
            throw new Error('E-mail already exists.')
        }
        
        await this.usersRepository.create({
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
            contratado
        })
    }
}

