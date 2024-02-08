import { EnterpriseAlreadyExistsError } from '../../../../use-cases/errors/enterprise-already-exists-error';
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from "zod"
import { makeEnterpriseUseCase } from '@/use-cases/factories/make-register-enterprise-case'


export async function enterprise(request: FastifyRequest, reply: FastifyReply) {

    const enterpriseBodySchema = z.object({
        name: z.string(),
    })
    
    const { 
        name, 
    } = enterpriseBodySchema.parse(request.body)

    try {
        const enterpriseUseCase = makeEnterpriseUseCase()

        await enterpriseUseCase.execute({
            name,
        })
    } catch (error) {
        if (error instanceof EnterpriseAlreadyExistsError){
            return reply.status(409).send({
                message: error.message
            })
        }
        
        throw error
    }

    return reply.status(201).send()
}