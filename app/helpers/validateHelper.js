const { validationResult } = require('express-validator');

// * Validate fields
const validateFields = (req, res, next) => {
    try {
        validationResult(req).throw();
        return next();
    } catch (error) {
        res.status(403).send({
            message: error.mapped()
        });
    }
}

// * Export helper
module.exports = {
    validateFields
}