const { check } = require('express-validator');
const { validateFields } = require('../helpers/validateHelper');

// * Validate fields of the product model

const validateProductFields = [
    check('code')
        .exists()
        .not()
        .notEmpty()
        .withMessage('Code is required')
        .isLength({ min: 3, max: 20 })
        .withMessage('Code must be between 3 and 20 characters'),
    check('names')
        .exists()
        .not()
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 3, max: 100 })
        .withMessage('Names must be between 3 and 100 characters'),
    check('price')
        .exists()
        .not()
        .notEmpty()
        .withMessage('Price is required')
        .isDecimal()
        .withMessage('Price must be a decimal number'),
    (req, res, next) => validateFields(req, res, next)
]

// * Export module validateProductFields
module.exports = { 
    validateProductFields 
}