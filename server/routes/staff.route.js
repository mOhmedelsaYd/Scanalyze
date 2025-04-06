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

router.use(protect, allowedTo('Admin'));

router
    .route('/')
    .get(getAllStaff)
    .post(uploadUserImage, resizeImage, createStaff);
router
    .route('/:id')
    .get(getStaff)
    .put(uploadUserImage, resizeImage, updateStaff)
    .delete(deleteStaff);


module.exports = router;