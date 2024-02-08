import { FastifyInstance } from "fastify"
import { register } from "./controllers/user/register-user/register"
import { authenticate } from "./controllers/authenticate"
import { enterprise } from "./controllers/enterprise/enterprise-create/enterprise"
import { listUsers } from "./controllers/user/list-user/list-users"

export async function appRoutes(app: FastifyInstance) {
    app.post('/users', register)
    app.get('/users/:enterprise_id', listUsers)

    app.post('/sessions', authenticate)

    app.post('/enterprise', enterprise)
}