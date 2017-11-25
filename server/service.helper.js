export default class ControllerHelper {

    static handleError(next, statusCode) {
        return (err) => {
            if (!err.status && statusCode) {
                err.status = statusCode;
            }
            return next(err);
        };
    }

    static respondWithResult(res, statusCode) {
        statusCode = statusCode || 200;
        return (entity) => {
            if (entity) {
                res.status(statusCode).json(entity);
            }
        };
    }
}
