export class EnterpriseNotExistsError extends Error {
    constructor() {
        super('Empresa não existe')
    }
}