const errorHandler = (err, req, res, next) => {
    const status = res.statusCode ? res.statusCode : 500;
    res.status(status);
    res.json({ isError: true, message: err.message });
}

module.exports = errorHandler;