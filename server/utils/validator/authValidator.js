
const { check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const User = require('../../models/staff.model');

exports.registerValidator = [
    check('name')
        .notEmpty()
        .withMessage('User required')
        .isLength({ min: 3 })
        .withMessage('Too short User name'),

    check('email')
        .notEmpty()
        .withMessage('Email required')
        .isEmail()
        .withMessage('Invalid email address')
        .custom((val) =>
        User.findOne({ email: val }).then((user) => {
            if (user) {
            return Promise.reject(new Error('E-mail already exists'));
            }
        })
        ),

    check('password')
        .notEmpty()
        .withMessage('Password required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters')
        .custom((password, { req }) => {
        if (password !== req.body.passwordConfirm) {
            throw new Error('Password Confirmation incorrect');
        }
        return true;
        }),

    check('passwordConfirm')
        .notEmpty()
        .withMessage('Password confirmation required'),

    validatorMiddleware,
];

exports.loginEmailValidator = [
    check('email')
        .notEmpty()
        .withMessage('Email required')
        .isEmail()
        .withMessage('Invalid email address'),

    check('password')
        .notEmpty()
        .withMessage('Password required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters'),
    
    check('role')
        .notEmpty()
        .withMessage('Role required')
        .isIn(['Admin', 'Receptionist', 'LabTechnician'])
        .withMessage('Role must be one of the following: Admin, Receptionist, LabTechnician'),

    validatorMiddleware,
];

exports.loginPhoneValidator = [
    check('phone')
        .notEmpty()
        .withMessage('phone required')
        .isMobilePhone('any')
        .withMessage('Invalid phone number'),

    check('password')
        .notEmpty()
        .withMessage('Password required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters'),
    
    check('role')
        .notEmpty()
        .withMessage('Role required')
        .isIn(['Admin', 'Receptionist', 'LabTechnician'])
        .withMessage('Role must be one of the following: Admin, Receptionist, LabTechnician'),

    validatorMiddleware,
];