export default class NotAcceptableError extends Error {

    constructor(message) {
        super(message);
        this.message = message;
        this.name = 'NotAcceptableError';
        this.status = 406;
    }

}