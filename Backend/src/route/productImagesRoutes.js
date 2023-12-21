const express = require('express');
const productImagesController = require('../controllers/productImagesController');
const router = express.Router();
const fileUpload = require('express-fileupload');

router.route('/')
    .get(productImagesController.getting)
    .post(fileUpload({ createParentPath: true }),
        productImagesController.creating)
    .patch(productImagesController.editting)
    .delete(productImagesController.deleting)

module.exports = router;