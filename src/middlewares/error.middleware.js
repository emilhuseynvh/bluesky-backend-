const errorMiddleware = (err, req, res, next) => {
    if (err.statusCode === 500 || !err.statusCode) {
        console.log(err);
        return res.status(500).json({ error: err.message });
    }

    return res.status(err.statusCode).json({ error: err.message });
}

module.exports = errorMiddleware;