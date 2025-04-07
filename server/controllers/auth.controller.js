const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ApiError = require("../utils/apiError");
const Staff = require("../models/staff.model");
const generateToken = require("../utils/generateToken");


exports.register =asyncHandler(async (req, res, next) => {
    const { name, email, password } = req.body;

    const user = await Staff.create({
        name,
        email,
        password,
    });

    // Generate token
    generateToken(res, user, "account created successfully");
})


exports.loginEmail = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    
    const user = await Staff.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return next(new ApiError("Invalid email or password", 401));
    }
        

    delete user._doc.password; // Remove password from response

    // Generate token
    const token = generateToken(user._id);

    res.cookie('token', token, {
    httpOnly: true, 
    secure: process.env.NODE_ENV === 'production', 
    sameSite: 'None',
    maxAge:  2 * 24 * 60 * 60 * 1000 
    });

    res.status(200).json({
            status: "success",
            token,
            user,
    });

})

exports.loginPhone = asyncHandler(async (req, res, next) => {
    const { phone, password } = req.body;
    
    const user = await Staff.findOne({ phone });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return next(new ApiError("Invalid phone number or password", 401));
    }



    delete user._doc.password; // Remove password from response

    // Generate token
    const token = generateToken(user._id);

    res.cookie('token', token, {
    httpOnly: true, 
    secure: process.env.NODE_ENV === 'production', 
    sameSite: 'None',
    maxAge:  2 * 24 * 60 * 60 * 1000 
    });

    res.status(200).json({
            status: "success",
            token,
            user,
    });

})


exports.protect = asyncHandler(async (req, res, next) => {

    const token = req.cookies.token;
    if (!token) {
        return next(
        new ApiError(
            'You are not login, Please login to get access this route',
            401
        )
        );
    }

    // 2) Verify token (no change happens, expired token)
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // 3) Check if user exists
    const currentUser = await Staff.findById(decoded.userId);
    if (!currentUser) {
        return next(
        new ApiError(
            'The user that belong to this token does no longer exist',
            401
        )
        );
    }

    req.user = currentUser;
    next();
});


exports.allowedTo = (...roles) =>
    asyncHandler(async (req, res, next) => {
        // 1) access roles
        // 2) access registered user (req.user.role)
        if (!roles.includes(req.user.role)) {
        return next(
            new ApiError('You are not allowed to access this route', 403)
        );
        }
        next();
    });
