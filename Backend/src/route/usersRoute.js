const express = require('express');
const usersController = require('../controllers/usersController');
const router = express.Router();

// const {
//     homePageSite, getCreateUser, displayAllUsers, intoEditUser,
// } = require('../controllers/theController');

// router.get('/createUser', getCreateUser);
// router.get('/allUsers', displayAllUsers);
// router.get('/editUser/:userId', intoEditUser);
// router.get('/deleteUser/:userId', intoDeleteUser);

router.route('/')
    .get(usersController.getting)
    .post(usersController.creating)
    .patch(usersController.editting)
    .delete(usersController.deleting)

module.exports = router;

