module.exports = fn => {
    return (req, res, next) => {
        // we need the next function in order to pass the error into it so that that error can then be handled in the global error handling middleware.
        fn(req, res, next).catch(next);
    };
};