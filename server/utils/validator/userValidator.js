const { check, body } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const Staff = require('../../models/staff.model');

exports.createUserValidator = [


    check('email')
        .notEmpty()
        .withMessage('Email required')
        .isEmail()
        .withMessage('Invalid email address')
        .custom((val) =>
        Staff.findOne({ email: val }).then((user) => {
            if (user) {
            return Promise.reject(new Error('E-mail already in user'));
            }
        })
        ),

    check('password')
        .notEmpty()
        .withMessage('Password required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters'),


    check('phone')
        .optional()
        .isMobilePhone(['ar-EG', 'ar-SA'])
        .withMessage('Invalid phone number only accepted Egy and SA Phone numbers')
        .custom((val) =>
            Staff.findOne({ phone: val }).then((user) => {
                if (user) {
                    return Promise.reject(new Error('phone number already in user'));
                    }
            })
        ),
    ,

    check('profileImg').optional(),
    check('role')
        .notEmpty()
        .withMessage('Role required'),

    validatorMiddleware,
];


exports.getUserValidator = [
    check('id').isMongoId().withMessage('Invalid User id format'),
    validatorMiddleware,
];



exports.deleteUserValidator = [
    check('id').isMongoId().withMessage('Invalid User id format'),
    validatorMiddleware,
];


exports.updateUserValidator = [
    check('id').isMongoId().withMessage('Invalid User id format'),

    check('email')
        .notEmpty()
        .withMessage('Email required')
        .isEmail()
        .withMessage('Invalid email address')
        .custom((val) =>
            Staff.findOne({ email: val }).then((user) => {
                if (user) {
                    return Promise.reject(new Error('E-mail already in user'));
                }
            })
        ),
    check('phone')
        .optional()
        .isMobilePhone(['ar-EG', 'ar-SA'])
        .withMessage('Invalid phone number only accepted Egy and SA Phone numbers')
        .custom((val) =>
            Staff.findOne({ phone: val }).then((user) => {
                if (user) {
                    return Promise.reject(new Error('phone number already in user'));
                    }
            })
        ),
    

    check('profileImg').optional(),
    
    check('role')
        .notEmpty()
        .withMessage('Role required'),
    validatorMiddleware,
];