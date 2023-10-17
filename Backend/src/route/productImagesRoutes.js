const express = require('express');
const productImagesController = require('../controllers/productImagesController');
const router = express.Router();

router.route('/')
    .get(productImagesController.getting)
    .post(productImagesController.creating)
    .patch(productImagesController.editting)
    .delete(productImagesController.deleting)

module.exports = router;