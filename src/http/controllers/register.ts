import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from "zod"
import { RegisterUseCase } from '@/use-cases/register'
import { PrismaUsersRepository } from '@/repositories/prisma-users-repository'


export async function register(request: FastifyRequest, reply: FastifyReply) {

    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
        permission: z.string(),
        admissao: z.date().optional(),
        cargo: z.string().optional(),
        salario: z.number().optional(),
        cpf: z.string().optional(),
        nascimento: z.date().optional(),
        pix: z.string().optional(),
        contratado: z.string().optional()
    })
    
    const { 
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
    } = registerBodySchema.parse(request.body)

    try {
        const prismaUsersRepository = new PrismaUsersRepository()
        const registerUseCase = new RegisterUseCase(prismaUsersRepository)
        
        await registerUseCase.execute({
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
        })
    } catch (error) {
        return reply.status(409).send()
    }

    return reply.status(201).send()
}