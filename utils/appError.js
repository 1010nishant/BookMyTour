class AppError extends Error {
    constructor(message, statusCode) {
        super(message);

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';

        // All errors created with this class are operational errors, which can be predicted.
        // For example, a user creating a tour without required fields is an operational error.
        this.isOperational = true;


        // The stack traces is a representation of the call stack at the point where the error occurred.
        // The Error.captureStackTrace method is used to capture the stack trace, excluding the AppError constructor from it. This helps in maintaining a cleaner trace.
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;

// here are two types of errors
// 1. operational errors: Operational errors are foreseeable issues that may arise in the future due to user actions, system behavior, or network conditions. These errors are unrelated to bugs in our code but require handling to ensure the application can gracefully manage such scenarios. Examples include a user accessing an invalid route, submitting invalid data, or the application failing to connect to a database. For Express, the term "exception" is sometimes used interchangeably with "error." Throughout this course, we'll use the term "error" to simplify discussions.

// 2. programming errors: programming errors stem from mistakes made by developers during code implementation. These bugs include actions like attempting to read properties from an undefined variable, using await without async, or mistakenly accessing request.query instead of request.body. While programming errors are inevitable, they are often more challenging to detect and handle.


// In the context of Express, when we refer to error handling, we primarily mean addressing operational errors. 