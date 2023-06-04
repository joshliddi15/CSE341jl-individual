const { check, validationResult } = require('express-validator');
 
exports.userValidation = [
    check('fname', 'First Name is requied').not().isEmpty(),
    check('lname', 'Last Name is requied').not().isEmpty(),
    check('city', 'City is requied').not().isEmpty(),
    check('state', 'State is requied').not().isEmpty(),
    check('zip', 'Zip code is requied').not().isEmpty().isLength({ min: 5 }),
    check('zip', 'Zip code must be a numeric value').isNumeric(),
    check('address', 'address is requied').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true }),
    check('', 'Password must be 6 or more characters').isLength({ min: 6 })
]
 
exports.productValidation = [
    check('name', 'Product name is requied').not().isEmpty(),
    check('price', 'Price is requied').not().isEmpty(),
    check('description', 'description is requied').not().isEmpty(),
    check('price', 'Price must be a number').isNumeric()
]
