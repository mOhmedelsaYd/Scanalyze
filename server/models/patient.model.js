const mongoose = require('mongoose');

// Create a schema for the user model
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true, // Ensure email is unique
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true, // Ensure phone number is unique
    },
    otp: {
        type: String, // OTP value
        required: true,
    },
    otpExpiresAt: {
        type: Date, // OTP expiration time
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false, // Whether the user has verified their phone number or not
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
