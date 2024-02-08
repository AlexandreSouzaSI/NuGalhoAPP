import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from "zod"
import { makeListUsersUseCase } from '@/use-cases/factories/make-list-user-case'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-fount-error'


export async function listUsers(request: FastifyRequest, reply: FastifyReply) {

    
    const listUsersBodySchema = z.object({
        enterprise_id: z.string()
    })
    
    const { 
        enterprise_id
    } = listUsersBodySchema.parse(request.params)
    
    try {
        const listUsersUseCase = makeListUsersUseCase()
        
        await listUsersUseCase.execute({
            enterprise_id
        })

    } catch (error) {
        if (error instanceof ResourceNotFoundError){
            return reply.status(409).send({
                message: error.message
            })
        }
        
        throw error
    }

    return reply.status(201).send()
}