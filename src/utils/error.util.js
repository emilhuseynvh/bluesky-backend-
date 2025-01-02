class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

class DublicateError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 409;
    }
}

class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 404;
    }
}

class UnauthorizationError extends Error {
    constructor(message) {
        super(message)
        this.statusCode = 401
    }
}

class ValidationError extends Error {
    constructor(message) {
        super(message)
        this.statusCode = 400
    }
}


module.exports = {
    AppError,
    DublicateError,
    NotFoundError,
    UnauthorizationError,
    ValidationError
}