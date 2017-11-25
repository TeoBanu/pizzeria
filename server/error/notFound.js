export default class NotFoundError extends Error {

    constructor(message) {
        super(message);
        this.message = message;
        this.name = 'NotFoundError';
        this.status = 404;
    }

}