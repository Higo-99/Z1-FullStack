const express = require('express');
const usersController = require('../controllers/usersController');
const router = express.Router();

router.route('/')
    .get(usersController.getting)
    .post(usersController.creating)
    .patch(usersController.editting)
    .delete(usersController.deleting)

module.exports = router;

