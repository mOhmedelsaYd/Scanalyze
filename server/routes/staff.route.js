const express = require('express');
const router = express.Router();
const { getStaff,
        getAllStaff,
        createStaff,
        updateStaff,
        deleteStaff,
        uploadUserImage,
        resizeImage
} = require('../controllers/staff.controller');
const { protect, allowedTo } = require('../controllers/auth.controller');
const { createUserValidator, getUserValidator, deleteUserValidator, updateUserValidator } = require('../utils/validator/userValidator');

router.use(protect, allowedTo('Admin'));

router
    .route('/')
    .get(getUserValidator, getAllStaff)
    .post(uploadUserImage, resizeImage, createUserValidator, createStaff);
router
    .route('/:id')
    .get(getStaff)
    .put(uploadUserImage, resizeImage, updateUserValidator, updateStaff)
    .delete(deleteUserValidator, deleteStaff);


module.exports = router;