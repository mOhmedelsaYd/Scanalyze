const express = require('express');
const router = express.Router();
const { register, loginEmail, loginPhone } = require('../controllers/auth.controller');
const { registerValidator, loginEmailValidator, loginPhoneValidator } = require('../utils/validator/authValidator');

router.post('/staff/register', registerValidator, register);
router.post('/staff/login/email', loginEmailValidator, loginEmail);
router.post('/staff/login/phone', loginPhoneValidator, loginPhone);


module.exports = router;