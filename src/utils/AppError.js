class AppError extends Error {
    message;
    isOperationalError = true;
    constructor(message) {
        super(message);
        this.message = message;
    }
}
export class BadRequestError extends AppError {
    statusCode = 400;
}
export class UnAuthorizedError extends AppError {
    statusCode = 401;
}
export class ForbiddenError extends AppError {
    statusCode = 403;
}
export class NotFoundError extends AppError {
    statusCode = 404;
}
export class ConflictError extends AppError {
    statusCode = 409;
}
//# sourceMappingURL=AppError.js.map