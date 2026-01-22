const validator = require('express-validator');

const saveProduct = [
    validator.body('name').notEmpty().withMessage('Name is required'),
    validator.body('category').notEmpty().withMessage('Category is required'),
    validator.body('brand').notEmpty().withMessage('Brand is required'),
    validator.body('description').notEmpty().withMessage('Description is required'),
    validator.body('price').isNumeric().withMessage('Price must be a number'),
    validator.body('stock').isInt().withMessage('Stock must be an integer'),
    validator.body('rating').isNumeric().withMessage('Rating must be a number'),
];

const saveOrder = [
    validator.body('userEmail').isEmail().withMessage('User email is required and must be valid'),
    validator.body('totalAmount').isNumeric().withMessage('Total amount is required and must be a number'),
    validator.body('status').isString().notEmpty().withMessage('Status is required and must be a string')
];

module.exports = {
    saveProduct,
    saveOrder
};
