const filePayloadExists = (req, res, next) => {
    if (!req.files) {
        return (
            res.status(400).json({ status: "error", message: "Missing imgs" })
        )
    };
    next();
};

module.export = filePayloadExists