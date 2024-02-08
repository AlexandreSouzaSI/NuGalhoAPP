import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from "zod"
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-user-case'
import { UserEmailOrCpfAlreadyExistsError } from '@/use-cases/errors/user-emailOrCpf-already-exists-error'


export async function register(request: FastifyRequest, reply: FastifyReply) {

    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
        permission: z.string(),
        admissao: z.date().optional(),
        cargo: z.string().optional(),
        salario: z.number().optional(),
        cpf: z.string(),
        nascimento: z.date().optional(),
        pix: z.string().optional(),
        contratado: z.string().optional(),
        enterprise_id: z.string().optional()
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
        contratado,
        enterprise_id
    } = registerBodySchema.parse(request.body)

    try {
        const registerUseCase = makeRegisterUseCase()

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
            contratado,
            enterprise_id
        })
    } catch (error) {
        if (error instanceof UserEmailOrCpfAlreadyExistsError){
            return reply.status(409).send({
                message: error.message
            })
        }
        
        throw error
    }

    return reply.status(201).send()
}