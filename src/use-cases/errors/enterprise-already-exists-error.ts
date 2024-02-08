export class EnterpriseAlreadyExistsError extends Error {
    constructor() {
        super('Empresa já existe')
    }
}