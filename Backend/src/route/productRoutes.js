const express = require('express');
const productsControllers = require('../controllers/productsControllers');
const router = express.Router();

router.route('/')
    .get(productsControllers.getting)
    .post(productsControllers.creating)
    .patch(productsControllers.editting)
    .delete(productsControllers.deleting)

module.exports = router;