const express = require('express');
const usersControllers = require('../controllers/usersControllers');
const router = express.Router();

router.route('/')
    .get(usersControllers.getting)
    .post(usersControllers.creating)
    .patch(usersControllers.editting)
    .delete(usersControllers.deleting)

module.exports = router;

