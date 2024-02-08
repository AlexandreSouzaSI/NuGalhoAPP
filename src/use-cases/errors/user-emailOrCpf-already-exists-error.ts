export class UserEmailOrCpfAlreadyExistsError extends Error {
    constructor() {
        super('E-mail ou Cpf já existe')
    }
}