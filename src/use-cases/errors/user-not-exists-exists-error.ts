export class UserNotExistsError extends Error {
    constructor() {
        super('Usuario não existe')
    }
}